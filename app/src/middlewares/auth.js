import jwt from "jsonwebtoken";

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

export const authorize = (req, res, next) => {
    let authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(403).json({
            message: "No authorization token provided"
        })
    }

    let accessToken = authHeader.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid authorization token"
            })
        }
        req.user = await User.find({
            email: user.email
        })
        next()
    })
}

export const postPrivilege = (req, res, next) => {
    const postId = req.params.id

    // Post.findById(postId)
    //     .populate("user")
    //     .then(data => {
    //         if (!data)
    //             return res.status(404).json({ message: `Not found Post with id = ${postId}`});
    //         if (!data.user.id == req.user.id) {
    //             return res.status(403).json({
    //                 message: "You can't access someone else's post",
    //             })
    //         }
    //          next()
            
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: `Error retrieving Post with id = ${postId}`
    //         });
    //     });
}
