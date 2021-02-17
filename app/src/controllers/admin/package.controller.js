import Category from "../../models/category.model.js";
import Package from "../../models/package.model.js";

export const create = async (req, res) => {
    const tree = await Category.createTree()
    const categoryIdByName = Category.getCategoryIdByName(tree)
    res.render('admin/package/package-editor', {
        title: "Create a new Package",
        the_package: {
            title: '',
            imageUrl: '',
            description: '',
            fileUrl: '',
            price: 0
        },
        submit_btn: {
            method: 'POST',
            url: `/api/package`,
            text: 'Publish'
        },
        categories: tree,
        categoryIdByName: categoryIdByName,
        packageCategory: null,
    });
}

export const edit = async (req, res) => {
    const tree = await Category.createTree()
    const categoryIdByName = Category.getCategoryIdByName(tree)
    const id = req.params.id
    const the_package = await Package.findOne({
        where: {
            id: id
        }
    })
    const packageCategory = the_package.CategoryId != null ? await Category.findOne({
        where: {
            id: the_package.CategoryId
        }
    }) : null

    res.render('admin/package/package-editor', {
        title: "Edit Package",
        the_package: the_package,
        submit_btn: {
            method: 'PUT',
            url: `/api/package/${id}`,
            text: 'Update'
        },
        categories: tree,
        categoryIdByName: categoryIdByName,
        packageCategory: packageCategory,
    });
}

export const index = async (req, res) => {
    const packages = await Package.findAll();

    res.render('admin/package/index', {
        title: "Packages",
        packages: packages.sort((a, b) => b.createdAt - a.createdAt)
    });
};
