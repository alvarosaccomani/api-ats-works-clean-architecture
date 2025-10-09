import { WorkStateEntity, WorkStateUpdateData } from "../../../domain/work-state/work-state.entity";
import { WorkStateRepository } from "../../../domain/work-state/work-state.repository";
import { SequelizeWorkState } from "../../model/work-state/work-state.model";
import { Op } from "sequelize";

export class SequelizeRepository implements WorkStateRepository {
    async getWorkStates(cmp_uuid: string): Promise<WorkStateEntity[] | null> {
        try {
            const workStates = await SequelizeWorkState.findAll({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!workStates) {
                throw new Error(`No hay work states`)
            };
            return workStates;
        } catch (error: any) {
            console.error('Error en getWorkStates:', error.message);
            throw error;
        }
    }
    async findWorkStateById(cmp_uuid: string, wrks_uuid: string): Promise<WorkStateEntity | null> {
        try {
            const workState = await SequelizeWorkState.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrks_uuid: wrks_uuid ?? null
                } 
            });
            if(!workState) {
                throw new Error(`No hay work state con el Id: ${cmp_uuid}, ${wrks_uuid}`);
            };
            return workState.dataValues;
        } catch (error: any) {
            console.error('Error en findWorkStateById:', error.message);
            throw error;
        }
    }
    async createWorkState(workState: WorkStateEntity): Promise<WorkStateEntity | null> {
        try {
            let { cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor, wrks_createdat, wrks_updatedat } = workState
            const result = await SequelizeWorkState.create({ cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor, wrks_createdat, wrks_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el work state`);
            }
            let newWorkState = result.dataValues as SequelizeWorkState
            return newWorkState;
        } catch (error: any) {
            console.error('Error en createWorkState:', error.message);
            throw error;
        }
    }
    async updateWorkState(cmp_uuid: string, wrks_uuid: string, workState: WorkStateUpdateData): Promise<WorkStateEntity | null> {
        try {
            const [updatedCount, [updatedWorkState]] = await SequelizeWorkState.update(
                { 
                    wrks_name: workState.wrks_name,
                    wrks_description: workState.wrks_description,
                    wrks_bkcolor: workState.wrks_bkcolor,
                    wrks_frcolor: workState.wrks_frcolor
                }, 
                { 
                    where: { cmp_uuid, wrks_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el work state`);
            };
            return updatedWorkState.get({ plain: true }) as WorkStateEntity;
        } catch (error: any) {
            console.error('Error en updateWorkState:', error.message);
            throw error;
        }
    }
    async deleteWorkState(cmp_uuid: string, wrks_uuid: string): Promise<WorkStateEntity | null> {
        try {
            const workState = await this.findWorkStateById(cmp_uuid, wrks_uuid);
            const result = await SequelizeWorkState.destroy({ where: { cmp_uuid, wrks_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el workstate`);
            };
            return workState;
        } catch (error: any) {
            console.error('Error en deleteWorkState:', error.message);
            throw error;
        }
    }
    async findWorkStateByName(cmp_uuid: string, wrks_name: string, excludeUuid?: string): Promise<WorkStateEntity | null> {
        try {
            const whereCondition: any = {
                cmp_uuid: cmp_uuid ?? null,
                wrks_name: wrks_name ?? null
            };
            if (excludeUuid) {
                whereCondition.wrks_uuid = { [Op.ne]: excludeUuid };
            }
            const workState = await SequelizeWorkState.findOne({ 
                where: whereCondition
            });
            return workState;
        } catch (error: any) {
            console.error('Error en findWorkStateByName:', error.message);
            throw error;
        }
    }
    
}