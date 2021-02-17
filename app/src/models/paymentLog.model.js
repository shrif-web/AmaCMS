import Types from "sequelize";
import sequelize from "../services/mysql.js"
import Package from "./package.model.js";

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

PaymentLog.afterCreate(async (log, options) => {
    await Package.increment({ sellCount: 1 }, {
        where: {
            id: log.PackageId
        },
        transaction: options.transaction
    })
})

export default PaymentLog
