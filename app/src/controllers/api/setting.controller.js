import Setting from "../../models/setting.model.js"

export const update = async (req, res) => {
    const { key, value } = req.body
    
    const setting = await Setting.findOne({
        where: {
            key: key
        }
    })

    if (!setting) {
        return res.status(404).json({
            message: 'key not found'
        })
    }

    setting.value = value
    await setting.save()

    res.json({
        message: 'done'
    })
}
