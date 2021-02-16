import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js"
import Comment from "../../models/comment.model.js"
import UserLikePost from "../../models/userLikePost.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"

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

    res.render("front/index", {
        socialMedias,
        user,
        whichRouter: getWhichRouterForTopMenu(req),
        topPosts,
    });
}