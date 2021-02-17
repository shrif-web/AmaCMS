import Setting from "../../models/setting.model.js";

export const index = async (req, res) => {
    const settings = await Setting.getSettingsObject()

    console.log(settings);

    res.render('admin/setting/index', {
        title: "Setting",
        settings: settings
    });
};
