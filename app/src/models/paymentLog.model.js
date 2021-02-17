import Types from "sequelize";
import sequelize from "../services/mysql.js"

const PaymentLog = sequelize.define('PaymentLog', {
    UserId: {
        type: Types.INTEGER,
        primaryKey: true,
    },
    PackageId: {
        type: Types.INTEGER,
        primaryKey: true,
    },
    refId: {
        type: Types.STRING,
        allowNull: false,
    }
})

export default PaymentLog
