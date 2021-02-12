import sequelize from "../../models/index.js"
import User from "../../models/user.model.js"
import bcrypt from "bcryptjs"

export const index = async (req, res) => {
    const users = await User.findAll();
    const infoMessages = await req.consumeFlash('info');
    const errorMessages = await req.consumeFlash('error');

    res.render('admin/user/index', {
        users: users,
        messages: {
            info: infoMessages,
            error: errorMessages,
        }
    });
};

export const create = async (req, res) => {
    res.render('admin/user/create', {
        roles: User.rolesArr,
    });
}

export const store = async (req, res) => {
    const { email, firstname, lastname, password, role } = req.body
    
    const validationErrors = await storeValidationErrors(req);
    if (validationErrors) {
        res.render('admin/user/create', {errors: validationErrors, roles: User.rolesArr});
    } else {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await User.create({
            email,
            firstName: firstname,
            lastName: lastname,
            role: role,
            passwordHash
        });
        await req.flash('info', `User (${[firstname, lastname].join(' ')}) Successfully created`);

        res.redirect("/admin/user");
    }

    
}

const storeValidationErrors = async req => {
    const { email, firstname, lastname, password, repassword, role } = req.body

    if(!email || !firstname || !lastname || !password || !repassword || !role){
        return ["Please fill out all the inputs"];
    }

    let errors = [];
    if(!User.rolesArr.includes(role)) {
        errors.push("Role is not defined")
    }

    if(password != repassword) {
        errors.push("Passwords are not equal");
    }

    const user = await User.findOne({
        where: {email: email}
    })
    if (user) {
        errors.push("Email already exists");
    }

    return errors.length ? errors : false;
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({
        where: {id: id}
    })

    if (user == null) {
        await req.flash('error', `User with id (${id}) does not exists`);
        return res.redirect('/admin/user');
    }
    
    await user.destroy()

    await req.flash('info', `User (${user.email}) successfully deleted`);

    res.redirect('/admin/user');
}

export const edit = async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({
        where: {id: id}
    })

    if (user == null) {
        await req.flash('error', `User with id (${id}) does not exists to edit`);
        return res.redirect('/admin/user');
    }

    res.render('admin/user/edit', {
        user: user,
        roles: User.rolesArr,
    });
}

export const update = async (req, res) => {
    const id = req.params.id
    const { email, firstname, lastname, password, repassword, role } = req.body;

    if(!email || !firstname || !lastname || !role){
        return ["Please fill out all the inputs"];
    }

    let errors = [];
    if(!User.rolesArr.includes(role)) {
        errors.push("Role is not defined")
    }

    if (password) {
        if (!repassword) {
            errors.push("Please provide the repeat of password in the inputs");
        } else if (password != repassword) {
            errors.push("Passwords are not equal");
        }
    }

    const user = await User.findOne({
        where: {id: id}
    })
    const userChanged = await User.findOne({
        where: {email: email}
    })
    if (userChanged && user.id != userChanged.id) {
        errors.push("Email already exists");
    }

    if (errors.length) {
        return res.render('admin/user/edit', {
            user: user,
            roles: User.rolesArr,
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
    user.role = role;
    await user.save();

    await req.flash('info', `User with id (${id}) Successfully updated`);
    res.redirect("/admin/user");
}