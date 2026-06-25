import { WorkHistoryEntity, WorkHistoryUpdateData } from "../../../domain/work-history/work-history.entity";
import { WorkHistoryRepository } from "../../../domain/work-history/work-history.repository";
import { SequelizeWorkHistory } from "../../model/work-history/work-history.model";
import { SequelizeWorkState } from "../../model/work-state/work-state.model";
import { SequelizeUser } from "../../model/user/user.model";
import { DbErrorHandler } from '../../utils/db-error-handler';

export class SequelizeRepository implements WorkHistoryRepository {
    async getWorksHistory(cmp_uuid: string, wrk_uuid: string): Promise<WorkHistoryEntity[] | null> {
        try {
            const histories = await SequelizeWorkHistory.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null
                },
                include: [
                    {
                        model: SequelizeWorkState,
                        as: 'wrks'
                    },
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email', 'usr_image']
                    }
                ],
                order: [['wrkh_createdat', 'DESC']]
            });
            return histories;
        } catch (error: any) {
            console.error('Error en getWorksHistory:', error.message);
            throw error;
        }
    }

    async findWorkHistoryById(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string): Promise<WorkHistoryEntity | null> {
        try {
            const history = await SequelizeWorkHistory.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null,
                    wrkh_uuid: wrkh_uuid ?? null
                },
                include: [
                    {
                        model: SequelizeWorkState,
                        as: 'wrks'
                    },
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email', 'usr_image']
                    }
                ]
            });
            if (!history) {
                throw new Error(`No hay historial de trabajo con el Id: ${wrkh_uuid}`);
            }
            return history;
        } catch (error: any) {
            console.error('Error en findWorkHistoryById:', error.message);
            throw error;
        }
    }

    async createWorkHistory(workHistory: WorkHistoryEntity): Promise<WorkHistoryEntity | null> {
        try {
            const { cmp_uuid, wrk_uuid, wrkh_uuid, wrks_uuid, usr_uuid, wrkh_comment, wrkh_createdat } = workHistory;
            const result = await SequelizeWorkHistory.create({
                cmp_uuid,
                wrk_uuid,
                wrkh_uuid,
                wrks_uuid,
                usr_uuid,
                wrkh_comment,
                wrkh_createdat
            });
            if (!result) {
                throw new Error(`No se pudo agregar el historial de trabajo.`);
            }
            return await this.findWorkHistoryById(cmp_uuid, wrk_uuid, result.wrkh_uuid);
        } catch (error: any) {
            console.error('Error en createWorkHistory:', error.message);
            throw error;
        }
    }

    async updateWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string, workHistory: WorkHistoryUpdateData): Promise<WorkHistoryEntity | null> {
        try {
            const [updatedCount] = await SequelizeWorkHistory.update(
                {
                    wrkh_comment: workHistory.wrkh_comment
                },
                {
                    where: { cmp_uuid, wrk_uuid, wrkh_uuid }
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el historial de trabajo.`);
            }
            return await this.findWorkHistoryById(cmp_uuid, wrk_uuid, wrkh_uuid);
        } catch (error: any) {
            console.error('Error en updateWorkHistory:', error.message);
            throw error;
        }
    }

    async deleteWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string): Promise<WorkHistoryEntity | null> {
        try {
            const history = await this.findWorkHistoryById(cmp_uuid, wrk_uuid, wrkh_uuid);
            const result = await SequelizeWorkHistory.destroy({
                where: { cmp_uuid, wrk_uuid, wrkh_uuid }
            });
            if (!result) {
                throw new Error(`No se pudo eliminar el historial de trabajo.`);
            }
            return history;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }
            console.error('Error en deleteWorkHistory:', error.message);
            throw error;
        }
    }
}
