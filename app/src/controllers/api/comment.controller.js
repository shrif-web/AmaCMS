
import sequelize from "../../models/index.js"
import Comment from "../../models/comment.model.js"
import User from "../../models/user.model.js"

export const create = async (req, res) => {
    const { postId, content } = req.body
    const user = await User.findOne({
        where: {id: req.session.user.id}
    })
    
    const status = user.role == User.roles.ADMIN ? Comment.statuses.ACCEPTED : Comment.statuses.PENDING;
    
    const comment = await Comment.create({
        PostId: postId,
        content: content,
        status: status,
        UserId: user.id
    });

    res.status(200).json({
        comment: comment
    })
}