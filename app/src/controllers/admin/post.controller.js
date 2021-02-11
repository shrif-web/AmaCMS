export const create = async (req, res) => {
    res.render('admin/post/create', {
        title: "Create a new Post",
    });
}
