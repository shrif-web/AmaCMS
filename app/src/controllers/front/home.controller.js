import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js"
import Comment from "../../models/comment.model.js"
import UserLikePost from "../../models/userLikePost.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"
import Package from "../../models/package.model.js";

export const index = async (req, res) => {
    const topPosts = await Post.findAll({
        order: [
            ['likes', 'DESC'],
            ['views', 'DESC']
        ],
        limit: 5
    })

    const socialMedias = await SocialMedia.findAll();
    const user = await getCurrentUser(req);

    const statistics = {
        usersCount: await User.count(),
        postsCount: await Post.count(),
        packagesCount: await Package.count(),
        commentsCount: await Comment.count(),
    }

    let favoritePackages = await Package.findAll({
        order: [
            ['likes', 'DESC'],
            ['view', 'DESC']
        ],
        limit: 3
    }) // TODO : We can order by number of sells 

    let packages = await Package.findAll({
        limit: 4
    })

    let posts = await Post.findAll({
        limit: 3, // TODO : Read from parameters or somewhere ...
        include: [
            {
                model: User
            }
        ]
    })

    res.render("front/index", {
        socialMedias,
        user,
        whichRouter: getWhichRouterForTopMenu(req),
        topPosts,
        statistics,
        favoritePackages,
        packages,
        posts,
    });
}