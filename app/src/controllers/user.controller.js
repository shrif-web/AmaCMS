import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    
    if (!email || !password) return res.status(400).json({
            message: "request length should be 2."
        })

    let userExists = await User.count({
        where: {
            email: email
        }
    })

    if (userExists) return res.status(409).json({
        message: "email already exists."
    })

    if (!emailReg.test(email)) return res.status(400).json({
        message: "field `email` is not valid."
    })
    
    if (password.length < 5) return res.status(400).json({
        message: "field `password` length should be gt 5."
    })
    
    const salt = await bcrypt.genSalt(10)
    const pHash = await bcrypt.hash(password, salt)
    
    await User.create({
        email: email,
        passwordHash: pHash,
        firstName: firstName,
        lastName: lastName,
        role: User.roles.NORMAL
    })

    res.status(201).json({
        message: "user has been created."
    })
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({
        message: "request length should be 2."
    })

    if (!emailReg.test(email)) return res.status(400).json({
        message: "field `email` is not valid."
    })

    let user = await User.findOne({
        email: email
    })

    if (user == null) {
        return res.status(401).json({
            message: "wrong email"
        })
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({
            message: "wrong password"
        })
    }

    const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h"
    })

    res.status(200).json({
        token: `Bearer ${accessToken}`
    })
}

export const read = (req, res) => res.json(req.user)
