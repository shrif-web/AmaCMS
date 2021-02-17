import sequelize from "./models/index.js"
import User from "./models/user.model.js"
import bcrypt from "bcryptjs"

const createSuperUser = async () => {
    const adminCount = await User.count({
        where: {
            role: User.roles.ADMIN
        }
    })
    
    if (adminCount == 0) {
        console.log('No superuser found! Creating the superuser from env SU_EMAIL and SU_PASSWORD')

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(process.env.SU_PASSWORD, salt)

        await User.create({
            email: process.env.SU_EMAIL,
            firstName: 'super',
            lastName: 'user',
            passwordHash: passwordHash,
            role: User.roles.ADMIN,
        })
        console.log('superuser created successfully')
    }
}

Number.prototype.priceFormat = function() {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default async () => {
    await sequelize.sync()
    await createSuperUser()
}
