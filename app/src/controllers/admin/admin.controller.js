import SocialMedia from "../../models/socialMedia.model.js"

export const index = async (req, res) => {
    const socialMedias = await SocialMedia.findAll();

    res.render('admin/home/index', {
        socialMedias: socialMedias,
    });
};