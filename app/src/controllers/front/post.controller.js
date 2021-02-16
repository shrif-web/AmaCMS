import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js"
import Comment from "../../models/comment.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"

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
            },
        ]
    })

    const topPosts = await Post.findAll({
        order: [
            ['likes', 'DESC'],
            ['views', 'DESC']
        ],
        limit: 5
    })
    
    post.approvedComments = post.Comments.filter(function (comment) {
        return comment.status == Comment.statuses.ACCEPTED;
    })

    if (!post) {
        return res.redirect("/");
    }

    const socialMedias = await SocialMedia.findAll();
    const user = await getCurrentUser(req);

    res.render("front/post", {
        socialMedias,
        user,
        whichRouter: getWhichRouterForTopMenu(req),
        post,
        topPosts,
    });
}