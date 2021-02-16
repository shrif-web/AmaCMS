import sequelize from "../services/mysql.js"
import User from "./user.model.js";
import Post from "./post.model.js";

const UserLikePost = sequelize.define('UserLikePost', {}, { timestamps: false });
  
UserLikePost.afterDestroy(async (ulp, options) => {
    Post.increment({likes: -1}, {
        where: {
            id: ulp.PostId
        }
    })
})

UserLikePost.afterCreate(async (ulp, options) => {
    Post.increment({likes: 1}, {
        where: {
            id: ulp.PostId
        }
    })
})

export default UserLikePost