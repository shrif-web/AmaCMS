import sequelize from "../../models/index.js";
import Package from "../../models/package.model.js"
import Post from "../../models/post.model.js"
import Category from "../../models/category.model.js"
import SocialMedia from "../../models/socialMedia.model.js"
import PaymentLog from "../../models/paymentLog.model.js"
import { getWhichRouterForTopMenu } from "./../../utils.js"
import { getCurrentUser } from "./../../services/auth.js"

export const getPackage = async (req, res) => {
    let packgeObj = await Package.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Category
            }
        ]
    })
    
    if (!packgeObj) {
        return res.redirect("/");
    }

    packgeObj.view += 1;
    await packgeObj.save();
    
    const socialMedias = await SocialMedia.findAll();
    const user = await getCurrentUser(req);
    const topPosts = await Post.findAll({
        order: [
            ['likes', 'DESC'],
            ['views', 'DESC']
        ],
        limit: 5
    })

    let isBoughtByUser = await PaymentLog.findAll({
        where: {
            UserId: req.session.user ? req.session.user.id : null,
            PackageId: packgeObj.id, 
        }
    });
    isBoughtByUser = isBoughtByUser.length > 0;

    res.render("front/package/index", {
        socialMedias,
        user,
        whichRouter: getWhichRouterForTopMenu(req),
        package: packgeObj,
        topPosts,
        isBoughtByUser
    });
}