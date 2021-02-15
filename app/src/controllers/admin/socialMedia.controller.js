import sequelize from "../../models/index.js"
import SocialMedia from "../../models/socialMedia.model.js"

export const create = async (req, res) => {
    res.render('admin/socialMedia/create');
}

export const store = async (req, res) => {
    const { name, link, classes, color } = req.body

    if (!name || !link || !classes || !color) {
        return res.render('admin/socialMedia/create', {
            errors: ["Please provide all fields"]
        });
    }

    await SocialMedia.create({
        name,
        link,
        class: classes,
        color,
    });

    res.redirect('/admin');
}

export const deleteSocialMedia = async (req, res) => {
    const id = req.params.id
    const socialMedia = await SocialMedia.findOne({
        where: {id: id}
    })

    if (socialMedia == null) {
        res.redirect('/admin');
    }

    await socialMedia.destroy();

    res.redirect('/admin');
}

export const edit = async (req, res) => {
    const id = req.params.id
    const socialMedia = await SocialMedia.findOne({
        where: {id: id}
    })

    if (socialMedia == null) {
        res.redirect('/admin');
    }

    res.render('admin/socialMedia/edit', {
        socialMedia: socialMedia,
    });
}

export const update = async (req, res) => {
    const id = req.params.id
    const socialMedia = await SocialMedia.findOne({
        where: {id: id}
    })

    if (socialMedia == null) {
        res.redirect('/admin');
    }

    const { name, link, classes, color } = req.body

    if (!name || !link || !classes || !color) {
        return res.render('admin/socialMedia/edit', {
            errors: ["Please provide all fields"],
            socialMedia: socialMedia,
        });
    }

    socialMedia.name = name;
    socialMedia.link = link;
    socialMedia.class = classes;
    socialMedia.color = color;
    await socialMedia.save();

    res.redirect('/admin');
} 