import { Sequelize } from 'sequelize';
import { SubscriptionPlanEntity, SubscriptionPlanUpdateData } from "../../../domain/subscription-plan/subscription-plan.entity";
import { SubscriptionPlanRepository } from "../../../domain/subscription-plan/subscription-plan.repository";
import { SequelizeSubscriptionPlan } from "../../model/subscription-plan/subscription-plan.model";
import { Op } from "sequelize";

export class SequelizeRepository implements SubscriptionPlanRepository {
    async getSubscriptionPlans(cmp_uuid: string): Promise<SubscriptionPlanEntity[] | null> {
        try {
            const subscriptionPlans = await SequelizeSubscriptionPlan.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!subscriptionPlans) {
                throw new Error(`No hay planes de suscripción`)
            };
            return subscriptionPlans;
        } catch (error: any) {
            console.error('Error en getSubscriptionPlans:', error.message);
            throw error;
        }
    }
    async findSubscriptionPlanById(cmp_uuid: string, subp_uuid: string): Promise<SubscriptionPlanEntity | null> {
        try {
            const subscriptionPlan = await SequelizeSubscriptionPlan.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    subp_uuid: subp_uuid ?? null
                } 
            });
            if(!subscriptionPlan) {
                throw new Error(`No hay plan de suscripción con el Id: ${subp_uuid}`);
            };
            return subscriptionPlan.dataValues;
        } catch (error: any) {
            console.error('Error en findSubscriptionPlanById:', error.message);
            throw error;
        }
    }
    async createSubscriptionPlan(subscriptionPlan: SubscriptionPlanEntity): Promise<SubscriptionPlanEntity | null> {
        try {
            let { cmp_uuid, subp_uuid, subp_name, subp_description, subp_active, subp_createdat, subp_updatedat } = subscriptionPlan
            const result = await SequelizeSubscriptionPlan.create({ cmp_uuid, subp_uuid, subp_name, subp_description, subp_active, subp_createdat, subp_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el plan de suscripción`);
            }
            let newSubscriptionPlan = result.dataValues as SequelizeSubscriptionPlan
            return newSubscriptionPlan;
        } catch (error: any) {
            console.error('Error en createSubscriptionPlan:', error.message);
            throw error;
        }
    }
    async updateSubscriptionPlan(cmp_uuid: string, subp_uuid: string, subscriptionPlan: SubscriptionPlanUpdateData): Promise<SubscriptionPlanEntity | null> {
        try {
            const [updatedCount, [updatedSubscriptionPlan]] = await SequelizeSubscriptionPlan.update(
                {
                    subp_name: subscriptionPlan.subp_name,
                    subp_description: subscriptionPlan.subp_description,
                    subp_active: subscriptionPlan.subp_active
                },
                {
                    where: { cmp_uuid, subp_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el plan de suscripción`);
            }
            return updatedSubscriptionPlan.get({ plain: true }) as SubscriptionPlanEntity;
        } catch (error: any) {
            console.error('Error en updateSubscriptionPlan:', error.message);
            throw error;
        }
    }
    async deleteSubscriptionPlan(cmp_uuid: string, subp_uuid: string): Promise<SubscriptionPlanEntity | null> {
        try {
            const subscriptionPlan = await this.findSubscriptionPlanById(cmp_uuid, subp_uuid);
            const result = await SequelizeSubscriptionPlan.destroy({ where: { cmp_uuid, subp_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el plan de suscripción`);
            };
            return subscriptionPlan;
        } catch (error: any) {
            console.error('Error en deleteSubscriptionPlan:', error.message);
            throw error;
        }
    }
    async findSubscriptionPlanByName(cmp_uuid: string, subp_name: string, excludeUuid?: string | null): Promise<SubscriptionPlanEntity | null> {
        try {
            const whereCondition: any = { cmp_uuid, subp_name: subp_name ?? null };
            if (excludeUuid) {
                whereCondition.subp_uuid = { [Op.ne]: excludeUuid };
            }
            const subscriptionPlan = await SequelizeSubscriptionPlan.findOne({ 
                where: whereCondition
            });
            return subscriptionPlan;
        } catch (error: any) {
            console.error('Error en findSubscriptionPlanByName:', error.message);
            throw error;
        }
    }
    
}