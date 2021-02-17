import jwt from "jsonwebtoken";
import User from "./../models/user.model.js"

export const authenticated = (req, res, next) => {
    if (req.session.user == undefined) {
        return res.redirect("/login");
    }

    next();
}

export const authenticatedApi = (req, res, next) => {
    if (req.session.user == undefined) {
        return res.status("401").json({
            message: "You're not authenticated"
        });
    }

    next();
}

export const guestOnly = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
}

export const authorize = async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const user = await User.findByPk(req.session.user.id)
    if (user.role != User.roles.ADMIN) {
        return res.redirect("/")
    }

    next();
}