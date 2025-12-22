import { SubscriptionPlanEntity, SubscriptionPlanUpdateData } from "./subscription-plan.entity";

export interface SubscriptionPlanRepository {
    getSubscriptionPlans(cmp_uuid: string, subp_name: string | undefined, field_order: string | undefined, subplan_order: string | undefined): Promise<SubscriptionPlanEntity[] | null>;
    findSubscriptionPlanById(cmp_uuid: string, subp_uuid: string): Promise<SubscriptionPlanEntity | null>;
    createSubscriptionPlan(subscriptionPlan: SubscriptionPlanEntity): Promise<SubscriptionPlanEntity | null>;
    updateSubscriptionPlan(cmp_uuid: string, subp_uuid: string, subscriptionPlan: SubscriptionPlanUpdateData): Promise<SubscriptionPlanEntity | null>;
    deleteSubscriptionPlan(cmp_uuid: string, subp_uuid: string): Promise<SubscriptionPlanEntity | null>;
    findSubscriptionPlanByName(cmp_uuid: string, subp_name: string, excludeUuid?: string | null): Promise<SubscriptionPlanEntity | null>;
}