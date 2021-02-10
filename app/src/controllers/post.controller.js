import sequelize from "../models/index.js"
import Post from "../models/post.model.js"

export const create = async (req, res) => {
    const { title, imageUrl, content } = req.body

    const transaction = await sequelize.transaction()

    try {
        await Post.create({
            title: title,
            imageUrl: imageUrl,
            content: content
        }, {
            transaction: transaction
        })        
        transaction.commit()
    } catch (error) {
        console.log(error)
        transaction.rollback()
        return res.status(500).json({
            'message': `Internal Server Error: ${error}`
        })
    }

    return res.status(201).json({
        message: "post has been created."
    })
}

export const getAll = async (req, res) => {
    const posts = await Post.findAll()
    res.status(200).json(
        posts.sort((a, b) => b.createdAt - a.createdAt)
    )
}
