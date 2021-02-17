import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js"

export const index = async (req, res) => {
    const socialMedias = await SocialMedia.findAll();
    const favoritePosts = await Post.findAll({
        limit: 4
    })

    res.render('admin/home/index', {
        socialMedias,
        favoritePosts
    });
}; 