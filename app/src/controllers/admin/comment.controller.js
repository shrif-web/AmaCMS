
import sequelize from "../../models/index.js"
import Comment from "../../models/comment.model.js"
import User from "../../models/user.model.js"
import Post from "../../models/post.model.js"

export const index = async (req, res) => {
    const comments = await Comment.findAll({
        include: [
            {
                model: User,
                required: true,
            },
            {
                model: Post,
                required: true
            }
        ]
    });
    const infoMessages = await req.consumeFlash('info');
    const errorMessages = await req.consumeFlash('error');

    res.render('admin/comment/index', {
        comments: comments,
        messages: {
            info: infoMessages,
            error: errorMessages,
        },
        statuses: Comment.statuses
    });
};


export const deleteComment = async (req, res) => {
    const id = req.params.id
    const comment = await Comment.findOne({
        where: {id: id}
    })

    if (comment == null) {
        await req.flash('error', `Comment with ID (${id}) does not exist`);
        return res.redirect('/admin/comment');
    }

    await comment.destroy()

    await req.flash('info', `Comment successfully deleted`);
    res.redirect('/admin/comment');
}

export const changeStatus = async (req, res) => {
    const id = req.params.id
    const comment = await Comment.findOne({
        where: {id: id}
    })

    if (comment == null) {
        await req.flash('error', `Comment with ID (${id}) does not exist`);
        return res.redirect('/admin/comment');
    }

    const status = req.query.status;

    if (!Comment.statusesArr.includes(status)) {
        await req.flash('error', `Status (${status}) does not exist`);
        return res.redirect('/admin/comment');
    }

    comment.status = status;
    await comment.save();
    await req.flash('info', `Status successfully changed`);
    
    return res.redirect('/admin/comment');
}