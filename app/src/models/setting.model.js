import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Setting = sequelize.define('Setting', {
    key: {
        type: Types.STRING,
        primaryKey: true,
    },
    value: Types.TEXT,
})

Setting.getSettingsObject = async () => {
    const settingPairs = await Setting.findAll({})
    let settings = {}

    for (const pair of settingPairs) {
        settings[pair.key] = pair.value
    }

    return settings
}

export default Setting
