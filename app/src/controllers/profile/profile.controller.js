import sequelize from "../../models/index.js"
import User from "../../models/user.model.js"

export const index = async (req, res) => {
    const infoMessages = await req.consumeFlash('info');

    res.render('profile/index', {
        user: req.session.user,
        messages: {
            info: infoMessages,
        },
    });
};

export const edit = async (req, res) => {
    res.render('profile/edit', {
        user: req.session.user
    });
}

export const update = async (req, res) => {
    const { email, firstname, lastname, password, repassword } = req.body;
    
    if(!email || !firstname || !lastname){
        return ["Please fill out all the inputs"];
    }

    let errors = [];

    if (password) {
        if (!repassword) {
            errors.push("Please provide the repeat of password in the inputs");
        } else if (password != repassword) {
            errors.push("Passwords are not equal");
        }
    }

    const user = await User.findOne({
        where: {id: req.session.user.id}
    })
    const userChanged = await User.findOne({
        where: {email: email}
    })
    if (userChanged && user.id != userChanged.id) {
        errors.push("Email already exists");
    }

    if (errors.length) {
        return res.render('profile/edit', {
            user: user,
            errors: errors,
        });
    }

    if (password) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        user.passwordHash = passwordHash;
    }
    user.email = email;
    user.firstName = firstname,
    user.lastName = lastname;
    await user.save();

    req.session.user = user;

    await req.flash('info', `Information successfully updated`);
    res.redirect("/profile");
}