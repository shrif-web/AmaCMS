
import Comment from "../../models/comment.model.js"
import User from "../../models/user.model.js"

export const create = async (req, res) => {
    const { postId, content, replyTo } = req.body
    const user = await User.findOne({
        where: {id: req.session.user.id}
    })

    let replyToComment = null;
    if (replyTo) {
        replyToComment = await Comment.findOne({
            where: {id: replyTo}
        })

        if (!replyToComment) {
            return res.status(404).json({
                message: "Reply to an invalid comment"
            })
        }

        if (replyToComment.status != Comment.statuses.ACCEPTED) {
            return res.status(406).json({
                message: "Reply to an unapproved comment not possible"
            })
        }
    }

    
    const status = user.role == User.roles.ADMIN ? Comment.statuses.ACCEPTED : Comment.statuses.PENDING;
    
    const comment = await Comment.create({
        PostId: postId,
        content: content,
        status: status,
        UserId: user.id,
        CommentId: replyToComment ? replyToComment.id : null,
    });

    res.status(200).json({
        comment: comment
    })
}

export const changeStatus = async (req, res) => {
    const { commentId, status } = req.body
    const comment = await Comment.findOne({
        where: {id: commentId}
    })

    if (comment == null) {
        return res.status(404).json({
            message: "Comment does not exists"
        })
    }

    if (!Comment.statusesArr.includes(status)) {
        return res.status(400).json({
            message: "Wrong status to change to"
        })
    }

    comment.status = status;
    await comment.save();
    
    res.status(200).json({
        comment: comment
    })
}