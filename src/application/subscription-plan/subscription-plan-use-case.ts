import { SubscriptionPlanRepository } from "../../domain/subscription-plan/subscription-plan.repository";
import { SubscriptionPlanValue } from "../../domain/subscription-plan/subscription-plan.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class SubscriptionPlanUseCase {
    constructor(
        private readonly subscriptionPlanRepository: SubscriptionPlanRepository
    ) {
        this.getSubscriptionPlans = this.getSubscriptionPlans.bind(this);
        this.getDetailSubscriptionPlan = this.getDetailSubscriptionPlan.bind(this);
        this.createSubscriptionPlan = this.createSubscriptionPlan.bind(this);
        this.updateSubscriptionPlan = this.updateSubscriptionPlan.bind(this);
        this.deleteSubscriptionPlan = this.deleteSubscriptionPlan.bind(this);
        this.findSubscriptionPlanByName = this.findSubscriptionPlanByName.bind(this);
    }

    public async getSubscriptionPlans(cmp_uuid: string, subp_name: string | undefined, field_order: string | undefined, subplan_order: string | undefined) {
        try {
            const subscriptionPlans = await this.subscriptionPlanRepository.getSubscriptionPlans(cmp_uuid, subp_name, field_order, subplan_order);
            if(!subscriptionPlans) {
                throw new Error('No hay planes de suscripcion.');
            }
            return subscriptionPlans.map(subscriptionPlan => ({
                cmp_uuid: subscriptionPlan.cmp_uuid,
                subp_uuid: subscriptionPlan.subp_uuid,
                subp_name: subscriptionPlan.subp_name,
                subp_description: subscriptionPlan.subp_description,
                subp_active: subscriptionPlan.subp_active,
                subp_createdat: TimezoneConverter.toIsoStringInTimezone(subscriptionPlan.subp_createdat, 'America/Buenos_Aires'),
                subp_updatedat: TimezoneConverter.toIsoStringInTimezone(subscriptionPlan.subp_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddresses (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailSubscriptionPlan(cmp_uuid: string, subp_uuid: string) {
        try {
            const subscriptionPlan = await this.subscriptionPlanRepository.findSubscriptionPlanById(cmp_uuid, subp_uuid);
            if(!subscriptionPlan) {
                throw new Error(`No hay plan de suscripcion con el Id: ${cmp_uuid}, ${subp_uuid}`);
            }
            return {
                cmp_uuid: subscriptionPlan.cmp_uuid,
                subp_uuid: subscriptionPlan.subp_uuid,
                subp_name: subscriptionPlan.subp_name,
                subp_description: subscriptionPlan.subp_description,
                subp_active: subscriptionPlan.subp_active,
                subp_createdat: TimezoneConverter.toIsoStringInTimezone(subscriptionPlan.subp_createdat, 'America/Buenos_Aires'),
                subp_updatedat: TimezoneConverter.toIsoStringInTimezone(subscriptionPlan.subp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailSubscriptionPlan (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createSubscriptionPlan({ cmp_uuid, subp_uuid, subp_name, subp_description, subp_active } : { cmp_uuid: string, subp_uuid: string, subp_name: string, subp_description: string, subp_active: boolean }) {
        try {
            const subscriptionPlanValue = new SubscriptionPlanValue({ cmp_uuid, subp_uuid, subp_name, subp_description, subp_active });
            const addressCreated = await this.subscriptionPlanRepository.createSubscriptionPlan(subscriptionPlanValue);
            if(!addressCreated) {
                throw new Error(`No se pudo insertar el address.`);
            }
            return {
                cmp_uuid: addressCreated.cmp_uuid,
                subp_uuid: addressCreated.subp_uuid,
                subp_name: addressCreated.subp_name,
                subp_description: addressCreated.subp_description,
                subp_active: addressCreated.subp_active,
                subp_createdat: TimezoneConverter.toIsoStringInTimezone(addressCreated.subp_createdat, 'America/Buenos_Aires'),
                subp_updatedat: TimezoneConverter.toIsoStringInTimezone(addressCreated.subp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateSubscriptionPlan(cmp_uuid: string, subp_uuid: string, { subp_name, subp_description, subp_active } : { subp_name: string, subp_description: string, subp_active: boolean }) {
        try {
            const addressUpdated = await this.subscriptionPlanRepository.updateSubscriptionPlan(cmp_uuid, subp_uuid, { subp_name, subp_description, subp_active });
            if(!addressUpdated) {
                throw new Error(`No se pudo actualizar el address.`);
            }
            return {
                cmp_uuid: addressUpdated.cmp_uuid,
                subp_uuid: addressUpdated.subp_uuid,
                subp_name: addressUpdated.subp_name,
                subp_description: addressUpdated.subp_description,
                subp_active: addressUpdated.subp_active,
                subp_createdat: TimezoneConverter.toIsoStringInTimezone(addressUpdated.subp_createdat, 'America/Buenos_Aires'),
                subp_updatedat: TimezoneConverter.toIsoStringInTimezone(addressUpdated.subp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateSubscriptionPlan (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteSubscriptionPlan(cmp_uuid: string, subp_uuid: string) {
        try {
            const addressDeleted = await this.subscriptionPlanRepository.deleteSubscriptionPlan(cmp_uuid, subp_uuid);
            if(!addressDeleted) {
                throw new Error(`No se pudo eliminar el address.`);
            }
            return {
                cmp_uuid: addressDeleted.cmp_uuid,
                subp_uuid: addressDeleted.subp_uuid,
                subp_description: addressDeleted.subp_description,
                subp_active: addressDeleted.subp_active,
                subp_createdat: TimezoneConverter.toIsoStringInTimezone(addressDeleted.subp_createdat, 'America/Buenos_Aires'),
                subp_updatedat: TimezoneConverter.toIsoStringInTimezone(addressDeleted.subp_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteSubscriptionPlan (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findSubscriptionPlanByName(cmp_uuid: string, subp_name: string, excludeUuid?: string) {
        try {
            const address = await this.subscriptionPlanRepository.findSubscriptionPlanByName(cmp_uuid, subp_name, excludeUuid)
            if(address) {
                throw new Error(`Ya existe un address con el nombre ${subp_name}.`);
            }
            return address
        } catch (error: any) {
            console.error('Error en findSubscriptionPlanByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}