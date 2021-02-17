import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Category = sequelize.define('Category',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Types.STRING
    }, {
    instanceMethods: {
    }
})

Category.createSubTree = async root => {
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
            const subTree = await Category.createSubTree(child)
            rootObject.data.push(subTree)
        }
    }

    return rootObject
}

Category.createTree = async () => {
    const tree = []
    const roots = await Category.findAll({
        where: {
            CategoryId: null
        }
    })

    for (const root of roots) {
        const subTree = await Category.createSubTree(root)
        tree.push(subTree)
    }

    return tree
}

Category.getCategoryIdByName = tree => {
    let dict = {}

    for (const node of tree) {
        dict[node.title] = node.id
        if (node.data)
            dict = Object.assign(dict, Category.getCategoryIdByName(node.data))
    }

    return dict
}

export default Category
