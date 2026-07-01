import { SequelizeCustomer } from './customer/customer.model';
import { SequelizeRoute } from './route/route.model';
import { SequelizeAddress } from './address/address.model';
import { SequelizeCustomerRoute } from './customer-route/customer-route.model';
import { SequelizeMetricType } from './metric-type/metric-type.model';
import { SequelizeDetailModelItem } from './detail-model-item/detail-model-item.model';

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

//Sequelize Customer Route Foreign Key
SequelizeCustomer.hasMany(SequelizeCustomerRoute, {
    foreignKey: "cmp_uuid",
    sourceKey: 'cmp_uuid'
});
SequelizeCustomer.hasMany(SequelizeCustomerRoute, {
    foreignKey: 'cus_uuid',
    sourceKey: 'cus_uuid',
    as: 'customerRoutes'
});

SequelizeCustomerRoute.belongsTo(SequelizeRoute, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeCustomerRoute.belongsTo(SequelizeRoute, {
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

//----------------------------------------------------------------
// DETAIL MODEL ITEMS & METRIC TYPES
//----------------------------------------------------------------
SequelizeDetailModelItem.belongsTo(SequelizeMetricType, {
    foreignKey: 'mety_uuid',
    as: 'mety'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCustomer.sync();
    SequelizeRoute.sync();
    SequelizeAddress.sync();
    SequelizeCustomerRoute.sync();
    SequelizeMetricType.sync();
}