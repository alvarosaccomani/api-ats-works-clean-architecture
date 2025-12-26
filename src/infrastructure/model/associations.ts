import { SequelizeCustomer } from './customer/customer.model';
import { SequelizeRoute } from './route/route.model';
import { SequelizeAddress } from './address/address.model';

//----------------------------------------------------------------
// CUSTOMERS
//----------------------------------------------------------------

//Sequelize Route Foreign Key
SequelizeCustomer.belongsTo(SequelizeRoute, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeCustomer.belongsTo(SequelizeRoute, {
    foreignKey: 'rou_uuid',
    targetKey: "rou_uuid",
    as: 'rou'
});

//Sequelize Address Foreign Key
SequelizeCustomer.hasMany(SequelizeAddress, {
    foreignKey: "cmp_uuid",
    sourceKey: 'cmp_uuid'
});
SequelizeCustomer.hasMany(SequelizeAddress, {
    foreignKey: 'cus_uuid',
    sourceKey: 'cus_uuid',
    as: 'adrs'
});

//----------------------------------------------------------------
// ADDRESS
//----------------------------------------------------------------

//Sequelize Address Foreign Key
SequelizeAddress.belongsTo(SequelizeCustomer, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeAddress.belongsTo(SequelizeCustomer, {
    foreignKey: 'cus_uuid',
    targetKey: "cus_uuid",
    as: 'cus'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCustomer.sync();
    SequelizeRoute.sync();
    SequelizeAddress.sync();
}