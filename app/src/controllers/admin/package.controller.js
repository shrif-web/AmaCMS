import Package from "../../models/package.model.js";

export const create = (req, res) => {
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
        }
    });
}

export const edit = async (req, res) => {
    const id = req.params.id
    const the_package = await Package.findOne({
        where: {
            id: id
        }
    })
    res.render('admin/package/package-editor', {
        title: "Edit Package",
        the_package: the_package,
        submit_btn: {
            method: 'PUT',
            url: `/api/package/${id}`,
            text: 'Update'
        }
    });
}

export const index = async (req, res) => {
    const packages = await Package.findAll();

    res.render('admin/package/index', {
        title: "Packages",
        packages: packages.sort((a, b) => b.createdAt - a.createdAt)
    });
};
