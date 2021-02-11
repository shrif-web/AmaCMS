import sequelize from "../models/index.js"
import Category from "../models/category.model.js"

export const index = async (req, res) => {
    const categories = await Category.findAll();

    res.render('admin/category/index', {
        title: "Categories",
        categories: categories
    });
};

export const create = async (req, res) => {
    const categories = await Category.findAll();

    res.render('admin/category/create', {
        title: "Create a new Category",
        parents: categories,
    });
}

export const store = async (req, res) => {
    let { name, parent } = req.body
    parent = parent == -1 ? null : parent

    const transaction = await sequelize.transaction()

    try {
        await Category.create({
            name: name,
            CategoryId: parent
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

    res.redirect('/admin/category');
}

export const deleteTag = async (req, res) => {
    const id = req.params.id
    const category = await Category.findOne({
        where: {id: id}
    })

    if (category == null) {
        res.redirect('/admin/category');
    }
    
    const transaction = await sequelize.transaction()

    try {
        await category.destroy({
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

    res.redirect('/admin/category');
}

export const edit = async (req, res) => {
    const id = req.params.id
    const category = await Category.findOne({
        where: {id: id}
    })

    if (category == null) {
        res.redirect('/admin/category');
    }

    const categories = await Category.findAll();

    res.render('admin/category/edit', {
        title: "Edit Category",
        category: category,
        parents: categories
    });
}

export const update = async (req, res) => {
    const id = req.params.id
    const category = await Category.findOne({
        where: {id: id}
    })

    if (category == null) {
        res.redirect('/admin/category');
    }
    
    let { name, parent } = req.body
    parent = parent == -1 ? null : parent
    
    const transaction = await sequelize.transaction()

    try {
        category.name = name
        category.CategoryId = parent

        await category.save({
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

    res.redirect('/admin/category');
}