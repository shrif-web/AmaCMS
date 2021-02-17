import sequelize from "./models/index.js"
import User from "./models/user.model.js"
import bcrypt from "bcryptjs"
import fs from 'fs'
import path from "path"
import Setting from "./models/setting.model.js"


const __dirname = path.resolve()


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

const createDefaultSettings = async () => {
    const defaultSettingsFile = fs.readFileSync(path.join(__dirname, 'default.settings.json'))
    const defaultSettings = JSON.parse(defaultSettingsFile)

    for (const key in defaultSettings) {
        const exists = await Setting.count({ where: { key: key} } )
        if (!exists) {
            await Setting.create({
                key: key,
                value: defaultSettings[key]
            })
            console.log(`Creating ${key} setting by default`);
        }
    }
}

export default async () => {
    await sequelize.sync()
    await createSuperUser()
    await createDefaultSettings()
}
