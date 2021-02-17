import Post from "../../models/post.model.js"
import elastic from "../..//services/elastic.js"

export const sync = async (req, res) => {
    const posts = await Post.findAll({})
    await elastic.deleteByQuery({
        index: 'posts',
        body: {
            query: {
                match_all: {}
            }
        }
    });
    for (const post of posts) {
        await elastic.createPost(post)
    }
    res.json({
        message: 'done.'
    })
}
