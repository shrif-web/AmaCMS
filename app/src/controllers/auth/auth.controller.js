
import sequelize from "../../models/index.js"
import User from "../../models/user.model.js"
import SocialMedia from "../../models/socialMedia.model.js"
import Post from "../../models/post.model.js";
import { getWhichRouterForTopMenu } from "./../../utils.js"
import bcrypt from "bcryptjs"
import { errors } from "@elastic/elasticsearch";

export const register = async (req, res) => {
    const socialMedias = await SocialMedia.findAll();
    const topPosts = await Post.findAll({
        order: [
            ['likes', 'DESC'],
            ['views', 'DESC']
        ],
        limit: 5
    })

    res.render('auth/register', {
        socialMedias,
        whichRouter: getWhichRouterForTopMenu(req),
        user: null,
        topPosts,
    });
};


export const doRegister = async (req, res) => {
    const { email, firstname, lastname, password } = req.body

    const validationErrors = await registerValidationErrors(req);
    if (validationErrors) {
        res.render('auth/register', {errors: validationErrors});
    } else {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await User.create({
            email,
            firstName: firstname,
            lastName: lastname,
            role: User.roles.NORMAL,
            passwordHash
        });
        req.session.user = {
            id: user.id,
        };
        res.redirect("/");
    }
};

const registerValidationErrors = async req => {
    const { email, firstname, lastname, password, repassword } = req.body
    
    if(!email || !firstname || !lastname || !password || !repassword){
        return ["Please fill out all the inputs"];
    }

    if(password != repassword) {
        return ["Passwords are not equal"];
    }

    const user = await User.findOne({
        where: {email: email}
    })
    if (user) {
        return ["Email already exists"];
    }

    return false;
}

export const login = async (req, res) => {
    const socialMedias = await SocialMedia.findAll();
    const topPosts = await Post.findAll({
        order: [
            ['likes', 'DESC'],
            ['views', 'DESC']
        ],
        limit: 5
    })

    res.render('auth/login', {
        socialMedias,
        whichRouter: getWhichRouterForTopMenu(req),
        user: null,
        topPosts,
    });
}

export const doLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.render('auth/login', {errors: ["Please fill out all the inputs"]});
    } else {
        const user = await User.findOne({
            where: {email: email}
        })
    
        if (!user) {
            res.render('auth/login', {errors: ["Email not exists"]});
        } else if (!bcrypt.compareSync(password, user.passwordHash)) {
            res.render('auth/login', {errors: ["Wrong Password"]});
        } else {
            req.session.user = {
                id: user.id,
            };
            if (user.role == User.roles.ADMIN) {
                res.redirect("/admin");
            } else {
                res.redirect("/");
            }
        }
    }
}

export const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

export const testHome = async (req, res) => {
    const user = req.session.user ? await User.findOne({
        where: {id: req.session.user.id}
    }) : null;

    res.render('auth/testHome', {
        currentUser: user
    });
}