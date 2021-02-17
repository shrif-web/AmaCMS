import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js"
import Comment from "../../models/comment.model.js"
import UserLikePost from "../../models/userLikePost.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"
import Package from "../../models/package.model.js";
import { htmlToText } from 'html-to-text'

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

    let packages = await Package.findAll({
        order: [
            ['likes', 'DESC'],
            ['view', 'DESC']
        ],
        limit: 3
    }) // TODO : We can order by number of sells 
    packages = packages.map(function (p) {
        p.rawContent = htmlToText(p.description, {
            tags: {
                a: {
                    options: {
                        ignoreHref: true
                    }
                },
                img: {
                    format: 'skip'
                }
            }
        })

        return p;
    });

    res.render("front/index", {
        socialMedias,
        user,
        whichRouter: getWhichRouterForTopMenu(req),
        topPosts,
        statistics,
        packages
    });
}