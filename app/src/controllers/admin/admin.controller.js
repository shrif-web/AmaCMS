import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js"
import PostViewLog from "../../models/postViewLog.model.js"
import sequelize from "../../models/index.js"

export const index = async (req, res) => {
    const socialMedias = await SocialMedia.findAll();
    const favoritePosts = await Post.findAll({
        limit: 4
    })

    let viewsStat = await PostViewLog.findAll({
        attributes: ['date', [sequelize.fn('sum', sequelize.col('views')), 'views']],
        group: ['date'],
        limit: 7,
        order: [['date', 'DESC']]
    })

    res.render('admin/home/index', {
        socialMedias,
        favoritePosts,
        viewsStat: {
            key: viewsStat.map(r => r.date),
            val: viewsStat.map(r => r.views),
        }
    });
}; 