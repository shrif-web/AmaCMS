import redis from 'redis'
import Post from "../models/post.model.js";
import User from "../models/user.model.js"
import Comment from "../models/comment.model.js"
import Package from "../models/package.model.js";

let redisClient = redis.createClient('redis://cache')

const HOME_STATISTICS_KEY = "HOME_STATIsSTICS_KEY"

redisClient.homeStatistics = async function() {
    var stats = {}
    let client = this

    client.get(HOME_STATISTICS_KEY, async function(err, reply) {
        if (reply) {
            console.log("----- Read Home Statistics from cache -----");
            stats = JSON.parse(reply)
        } else {
            stats = {
                usersCount: await User.count(),
                postsCount: await Post.count(),
                packagesCount: await Package.count(),
                commentsCount: await Comment.count(),
            }

            console.log("----- Caching Home Statistics -----");
            client.set(HOME_STATISTICS_KEY, JSON.stringify(stats))
        }
        
        console.log("11111111111111111111111111111")
        console.log(stats)

        return stats
    });

    console.log("+++++++++++++++++++++++++")
    console.log(stats)
    return stats;
}

export default redisClient
