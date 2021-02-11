import Post from "../../models/post.model.js";

export const create = (req, res) => {
    res.render('admin/post/post-editor', {
        title: "Create a new Post",
        post: {
            title: '',
            imageUrl: '',
            content: '',
        },
        submit_btn: {
            method: 'POST',
            url: `/api/post`,
            text: 'Publish'
        }
    });
}

export const edit = async (req, res) => {
    const id = req.params.id
    const post = await Post.findOne({
        where: {
            id: id
        }
    })
    res.render('admin/post/post-editor', {
        title: "Edit Post",
        post: post,
        submit_btn: {
            method: 'PUT',
            url: `/api/post/${id}`,
            text: 'Update'
        }
    });
}

export const index = async (req, res) => {
    const posts = await Post.findAll();

    res.render('admin/post/index', {
        title: "Posts",
        posts: posts.sort((a, b) => b.createdAt - a.createdAt)
    });
};
