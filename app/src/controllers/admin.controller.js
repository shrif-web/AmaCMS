export const index = async (req, res) => {
    res.render('admin/home/index', {
        title: "Admin Panel"
    });
};