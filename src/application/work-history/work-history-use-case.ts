import { WorkHistoryRepository } from "../../domain/work-history/work-history.repository";
import { WorkHistoryValue } from "../../domain/work-history/work-history.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class WorkHistoryUseCase {
    constructor(
        private readonly workHistoryRepository: WorkHistoryRepository
    ) {
        this.getWorksHistory = this.getWorksHistory.bind(this);
        this.getDetailWorkHistory = this.getDetailWorkHistory.bind(this);
        this.createWorkHistory = this.createWorkHistory.bind(this);
        this.updateWorkHistory = this.updateWorkHistory.bind(this);
        this.deleteWorkHistory = this.deleteWorkHistory.bind(this);
    }

    private formatHistory(history: any) {
        return {
            cmp_uuid: history.cmp_uuid,
            wrk_uuid: history.wrk_uuid,
            wrkh_uuid: history.wrkh_uuid,
            wrks_uuid: history.wrks_uuid,
            usr_uuid: history.usr_uuid,
            wrkh_comment: history.wrkh_comment,
            wrkh_createdat: TimezoneConverter.toIsoStringInTimezone(history.wrkh_createdat, 'America/Argentina/Buenos_Aires'),
            wrks: history.wrks ? {
                cmp_uuid: history.wrks.cmp_uuid,
                wrks_uuid: history.wrks.wrks_uuid,
                wrks_name: history.wrks.wrks_name,
                wrks_description: history.wrks.wrks_description,
                wrks_bkcolor: history.wrks.wrks_bkcolor,
                wrks_frcolor: history.wrks.wrks_frcolor,
            } : null,
            usr: history.usr ? {
                usr_uuid: history.usr.usr_uuid,
                usr_name: history.usr.usr_name,
                usr_surname: history.usr.usr_surname,
                usr_email: history.usr.usr_email,
                usr_image: history.usr.usr_image,
            } : null
        };
    }

    public async getWorksHistory(cmp_uuid: string, wrk_uuid: string) {
        try {
            const histories = await this.workHistoryRepository.getWorksHistory(cmp_uuid, wrk_uuid);
            if (!histories) {
                throw new Error('No hay historial para este trabajo.');
            }
            return histories.map((history) => this.formatHistory(history));
        } catch (error: any) {
            console.error('Error en getWorksHistory (use case):', error.message);
            throw error;
        }
    }

    public async getDetailWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string) {
        try {
            const history = await this.workHistoryRepository.findWorkHistoryById(cmp_uuid, wrk_uuid, wrkh_uuid);
            if (!history) {
                throw new Error(`No hay historial de trabajo con el Id: ${wrkh_uuid}`);
            }
            return this.formatHistory(history);
        } catch (error: any) {
            console.error('Error en getDetailWorkHistory (use case):', error.message);
            throw error;
        }
    }

    public async createWorkHistory({ cmp_uuid, wrk_uuid, wrkh_uuid, wrks_uuid, usr_uuid, wrkh_comment }: {
        cmp_uuid: string;
        wrk_uuid: string;
        wrkh_uuid?: string;
        wrks_uuid: string;
        usr_uuid: string;
        wrkh_comment: string;
    }) {
        try {
            const workHistoryValue = new WorkHistoryValue({ cmp_uuid, wrk_uuid, wrkh_uuid, wrks_uuid, usr_uuid, wrkh_comment });
            const historyCreated = await this.workHistoryRepository.createWorkHistory(workHistoryValue);
            if (!historyCreated) {
                throw new Error('No se pudo insertar el historial de trabajo.');
            }
            return this.formatHistory(historyCreated);
        } catch (error: any) {
            console.error('Error en createWorkHistory (use case):', error.message);
            throw error;
        }
    }

    public async updateWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string, { wrkh_comment }: { wrkh_comment: string }) {
        try {
            const historyUpdated = await this.workHistoryRepository.updateWorkHistory(cmp_uuid, wrk_uuid, wrkh_uuid, { wrkh_comment });
            if (!historyUpdated) {
                throw new Error('No se pudo actualizar el historial de trabajo.');
            }
            return this.formatHistory(historyUpdated);
        } catch (error: any) {
            console.error('Error en updateWorkHistory (use case):', error.message);
            throw error;
        }
    }

    public async deleteWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string) {
        try {
            const historyDeleted = await this.workHistoryRepository.deleteWorkHistory(cmp_uuid, wrk_uuid, wrkh_uuid);
            if (!historyDeleted) {
                throw new Error('No se pudo eliminar el historial de trabajo.');
            }
            return this.formatHistory(historyDeleted);
        } catch (error: any) {
            console.error('Error en deleteWorkHistory (use case):', error.message);
            throw error;
        }
    }
}
