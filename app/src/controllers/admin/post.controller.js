import Category from "../../models/category.model.js";
import Post from "../../models/post.model.js";

const createSubTree = async root => {
    const rootObject = {
        href: `#cat${root.id}`,
        id: root.id,
        title: root.name,
    }

    const children = await Category.findAll({
        where: {
            CategoryId: root.id
        }
    })

    if (children.length) {
        rootObject.data = []
        for (const child of children) {
            const subTree = await createSubTree(child)
            rootObject.data.push(subTree)
        }
    }

    return rootObject
}

const createTree = async () => {
    const tree = []
    const roots = await Category.findAll({
        where: {
            CategoryId: null
        }
    })

    for (const root of roots) {
        const subTree = await createSubTree(root)
        tree.push(subTree)
    }

    return tree
}

const getCategoryIdByName = tree => {
    let dict = {}

    for (const node of tree) {
        dict[node.title] = node.id
        if (node.data)
            dict = Object.assign(dict, getCategoryIdByName(node.data))
    }

    return dict
}

export const create = async (req, res) => {
    const tree = await createTree()
    const categoryIdByName = getCategoryIdByName(tree)
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
