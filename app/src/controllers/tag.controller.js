import sequelize from "../models/index.js"
import Tag from "../models/tag.model.js"

export const index = async (req, res) => {
    const tags = await Tag.findAll();

    res.render('admin/tag/index', {
        title: "Tags",
        tags: tags
    });
};

export const create = async (req, res) => {
    res.render('admin/tag/create', {
        title: "Create a new Tag",
    });
}

export const store = async (req, res) => {
    const { title } = req.body

    const transaction = await sequelize.transaction()

    try {
        await Tag.create({
            name: title,
        }, {
            transaction: transaction
        })        
        await transaction.commit()
    } catch (error) {
        console.log(error)
        await transaction.rollback()
        return res.status(500).json({
            message: `Internal Server Error: ${error}`
        })
    }

    res.redirect('/admin/tag');
}

export const deleteTag = async (req, res) => {
    const id = req.params.id
    const tag = await Tag.findOne({
        where: {id: id}
    })

    if (tag == null) {
        res.redirect('/admin/tag');
    }
    
    const transaction = await sequelize.transaction()

    try {
        await tag.destroy({
            transaction: transaction
        })
        await transaction.commit()
    } catch (error) {
        console.log(error)
        await transaction.rollback()
        return res.status(500).json({
            message: `Internal Server Error: ${error}`
        })
    }

    res.redirect('/admin/tag');
}

export const edit = async (req, res) => {
    const id = req.params.id
    const tag = await Tag.findOne({
        where: {id: id}
    })

    if (tag == null) {
        res.redirect('/admin/tag');
    }

    res.render('admin/tag/edit', {
        title: "Edit Tag",
        tag: tag,
    });
}

export const update = async (req, res) => {
    const id = req.params.id
    const tag = await Tag.findOne({
        where: {id: id}
    })

    if (tag == null) {
        res.redirect('/admin/tag');
    }
    
    const { title } = req.body
    const transaction = await sequelize.transaction()

    try {
        tag.name = title

        await tag.save({
            transaction: transaction
        })
        await transaction.commit()
    } catch (error) {
        console.log(error)
        await transaction.rollback()
        return res.status(500).json({
            message: `Internal Server Error: ${error}`
        })
    }

    res.redirect('/admin/tag');
}