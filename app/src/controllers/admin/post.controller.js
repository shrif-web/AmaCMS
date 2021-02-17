import Category from "../../models/category.model.js";
import Post from "../../models/post.model.js";

export const create = async (req, res) => {
    const tree = await Category.createTree()
    const categoryIdByName = Category.getCategoryIdByName(tree)
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
        },
        categories: tree,
        categoryIdByName: categoryIdByName,
        postCategory: null
    });
}

export const edit = async (req, res) => {
    const tree = await Category.createTree()
    const categoryIdByName = Category.getCategoryIdByName(tree)
    const id = req.params.id
    const post = await Post.findOne({
        where: {
            id: id
        }
    })
    const postCategory = post.CategoryId != null ? await Category.findOne({
        where: {
            id: post.CategoryId
        }
    }) : null

    res.render('admin/post/post-editor', {
        title: "Edit Post",
        post: post,
        submit_btn: {
            method: 'PUT',
            url: `/api/post/${id}`,
            text: 'Update'
        },
        categories: tree,
        categoryIdByName: categoryIdByName,
        postCategory: postCategory
    });
}

export const index = async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: Category,
            }
        ]
    });

    res.render('admin/post/index', {
        title: "Posts",
        posts: posts.sort((a, b) => b.createdAt - a.createdAt)
    });
};
