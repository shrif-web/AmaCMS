import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js"
import Comment from "../../models/comment.model.js"
import Category from "../../models/category.model.js"
import UserLikePost from "../../models/userLikePost.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"
import sequelize from "../../models/index.js";
import PostViewLog from "../../models/postViewLog.model.js";

export const getPost = async (req, res) => {
    const post = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                required: true,
            }, {
                model: Comment,
                include: [{
                    model: User
                }]
            }, {
                model: Category
            }
        ]
    })

    const topPosts = await Post.findAll({
        order: [
            ['likes', 'DESC'],
            ['views', 'DESC']
        ],
        limit: 5
    })
    
    if (!post) {
        return res.redirect("/");
    }

    post.approvedComments = post.Comments.filter(function (comment) {
        return comment.status == Comment.statuses.ACCEPTED;
    })

    const userLiked = await UserLikePost.findOne({
        where: {
            UserId: req.session.user ? req.session.user.id : null,
            PostId: post.id
        }
    }) ? true : false

    const transaction = await sequelize.transaction()
    try {
        post.views += 1;
        await post.save({
            transaction: transaction
        });

        const now = new Date()

        let viewLog = await PostViewLog.findOne({
            where: {
                PostId: post.id,
                date: now,
            }
        })

        if (!viewLog) {
            viewLog = await PostViewLog.create({
                PostId: post.id,
                date: now,
            }, {
                transaction: transaction
            })
        }

        viewLog.views += 1
        await viewLog.save({
            transaction: transaction
        })
        
        transaction.commit()
    } catch (error) {
        transaction.rollback()
        console.log(error)
    }

    const socialMedias = await SocialMedia.findAll();
    const user = await getCurrentUser(req);

    let viewsStat = await PostViewLog.findAll({
        where: {
            PostId: post.id,
        },
        attributes: ['date', 'views'],
        limit: 7,
        order: [['date', 'ASC']]
    })

    res.render("front/post", {
        socialMedias,
        user,
        whichRouter: getWhichRouterForTopMenu(req),
        post,
        topPosts,
        userLiked,
        viewsStat: {
            key: viewsStat.map(r => r.date),
            val: viewsStat.map(r => r.views),
        }
    });
}