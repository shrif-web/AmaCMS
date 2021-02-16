import sequelize from "../../models/index.js"
import Post from "../../models/post.model.js"
import User from "../../models/user.model.js"

export const create = async (req, res) => {
    const { title, imageUrl, content } = req.body

    const transaction = await sequelize.transaction()

    try {
        await Post.create({
            title: title,
            imageUrl: imageUrl,
            content: content,
            UserId: req.session.user.id,
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

    return res.status(201).json({
        message: "post has been created."
    })
}

export const deleteById = async (req, res) => {
    const id = req.params.id
    const post = await Post.findOne({
        where: {
            id: id
        }
    })

    if (post == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    const transaction = await sequelize.transaction()

    try {
        await post.destroy({
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

    res.status(200).json({
        message: `Deleted!`
    })
}


export const update = async (req, res) => {
    const id = req.params.id
    const { title, imageUrl, content } = req.body
    const post = await Post.findOne({
        where: {
            id: id
        }
    })

    if (post == null) {
        return res.status(400).json({
            message: `there's no post with id ${id}`
        })
    }

    const transaction = await sequelize.transaction()

    try {

        post.title = title === undefined ? post.title : title
        post.imageUrl = imageUrl === undefined ? post.imageUrl : imageUrl
        post.content = content === undefined ? post.content : content

        await post.save({
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

    res.status(200).json({
        message: `Updated!`
    })
}

export const get = async (req, res) => {
    const id = req.params.id
    const post = await Post.findOne({
        where: {
            id: id
        }
    })

    if (post == null) {
        return res.status(404).json({
            message: `there's no post with id ${id}`
        })
    }

    res.status(200).json(post)
}

export const getAll = async (req, res) => {
    const posts = await Post.findAll()
    res.status(200).json(
        posts.sort((a, b) => b.createdAt - a.createdAt)
    )
}
