export const index = async (req, res) => {
    res.render('admin/home/index', {
        title: "Title of the page"
    });
};