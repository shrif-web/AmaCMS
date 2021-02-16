import User from "./../models/user.model.js"

export async function getCurrentUser(req) {
    return req.session.user ? await User.findOne({
        where: {id: req.session.user.id}
    }) : null;
}