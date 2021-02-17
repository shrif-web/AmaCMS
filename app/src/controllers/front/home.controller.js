import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js"
import Comment from "../../models/comment.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"
import Package from "../../models/package.model.js";
import asyncRedis from 'async-redis'
import Setting from "../../models/setting.model.js";

const redisClient = asyncRedis.createClient('redis://cache')

const HOME_STATISTICS_KEY = "HOME_STATISTICS_KEY"

const homeStatistics = async function() {
    var stats = null
    
    const statsString = await redisClient.get(HOME_STATISTICS_KEY)

    if (!statsString) {
        stats = {
            usersCount: await User.count(),
            postsCount: await Post.count(),
            packagesCount: await Package.count(),
            commentsCount: await Comment.count(),
        }

        console.log("----- Caching Home Statistics -----");
        
        await redisClient.set(HOME_STATISTICS_KEY, JSON.stringify(stats))
    } else {
        stats = JSON.parse(statsString)
        console.log("----- Reading Statistics From Cache -----");
    }

    console.log(stats)
    return stats;
}

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

    const statistics = await homeStatistics()

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
        settings: await Setting.getSettingsObject(),
    });
}