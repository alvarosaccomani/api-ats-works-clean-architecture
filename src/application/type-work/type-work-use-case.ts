import { TypeWorkRepository } from "../../domain/type-work/type-work.repository";
import { TypeWorkValue } from "../../domain/type-work/type-work.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class TypeWorkUseCase {
    constructor(
        private readonly typeWorkRepository: TypeWorkRepository
    ) {
        this.getTypeWorks = this.getTypeWorks.bind(this);
        this.getDetailTypeWork = this.getDetailTypeWork.bind(this);
        this.createTypeWork = this.createTypeWork.bind(this);
        this.updateTypeWork = this.updateTypeWork.bind(this);
        this.deleteTypeWork = this.deleteTypeWork.bind(this);
        this.findTypeWorkByName = this.findTypeWorkByName.bind(this);
    }

    public async getTypeWorks(cmp_uuid: string) {
        try {
            const typeWorks = await this.typeWorkRepository.getTypeWorks(cmp_uuid);
            if(!typeWorks) {
                throw new Error('No hay tipos de trabajo.');
            }
            return typeWorks.map(typeWork => ({
                twrk_uuid: typeWork.twrk_uuid,
                twrk_name: typeWork.twrk_name,
                twrk_description: typeWork.twrk_description,
                twrk_createdat: TimezoneConverter.toIsoStringInTimezone(typeWork.twrk_createdat, 'America/Buenos_Aires'),
                twrk_updatedat: TimezoneConverter.toIsoStringInTimezone(typeWork.twrk_updatedat, 'America/Buenos_Aires'),
            }));
        } catch (error: any) {
            console.error('Error en getTypeWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailTypeWork(cmp_uuid: string, twrk_uuid: string) {
        try {
            const typeWork = await this.typeWorkRepository.findTypeWorkById(cmp_uuid, twrk_uuid);
            if(!typeWork) {
                throw new Error(`No hay tipo de trabajo con el Id: ${twrk_uuid}`);
            }
            return {
                twrk_uuid: typeWork.twrk_uuid,
                twrk_name: typeWork.twrk_name,
                twrk_description: typeWork.twrk_description,
                twrk_createdat: TimezoneConverter.toIsoStringInTimezone(typeWork.twrk_createdat, 'America/Buenos_Aires'),
                twrk_updatedat: TimezoneConverter.toIsoStringInTimezone(typeWork.twrk_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en getDetailTypeWork (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createTypeWork({ cmp_uuid, twrk_uuid, twrk_name, twrk_description } : { cmp_uuid: string, twrk_uuid: string, twrk_name: string, twrk_description: string }) {
        try {
            const typeWorkValue = new TypeWorkValue({ cmp_uuid, twrk_uuid, twrk_name, twrk_description });
            const typeWorkCreated = await this.typeWorkRepository.createTypeWork(typeWorkValue);
            if(!typeWorkCreated) {
                throw new Error(`No se pudo insertar el tipo de trabajo.`);
            }
            return {
                twrk_uuid: typeWorkCreated.twrk_uuid,
                twrk_name: typeWorkCreated.twrk_name,
                twrk_description: typeWorkCreated.twrk_description,
                twrk_createdat: TimezoneConverter.toIsoStringInTimezone(typeWorkCreated.twrk_createdat, 'America/Buenos_Aires'),
                twrk_updatedat: TimezoneConverter.toIsoStringInTimezone(typeWorkCreated.twrk_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en createTypeWork (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateTypeWork(cmp_uuid: string, twrk_uuid: string, { twrk_name, twrk_description } : { twrk_name: string, twrk_description: string }) {
        try {
            const typeWorkUpdated = await this.typeWorkRepository.updateTypeWork(cmp_uuid, twrk_uuid, { twrk_name, twrk_description });
            if(!typeWorkUpdated) {
                throw new Error(`No se pudo actualizar el tipo de trabajo.`);
            }
            return {
                twrk_uuid: typeWorkUpdated.twrk_uuid,
                twrk_name: typeWorkUpdated.twrk_name,
                twrk_description: typeWorkUpdated.twrk_description,
                twrk_createdat: TimezoneConverter.toIsoStringInTimezone(typeWorkUpdated.twrk_createdat, 'America/Buenos_Aires'),
                twrk_updatedat: TimezoneConverter.toIsoStringInTimezone(typeWorkUpdated.twrk_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en updateTypeWork (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteTypeWork(cmp_uuid: string, twrk_uuid: string) {
        try {
            const typeWorkDeleted = await this.typeWorkRepository.deleteTypeWork(cmp_uuid, twrk_uuid);
            if(!typeWorkDeleted) {
                throw new Error(`No se pudo eliminar el tipo de trabajo.`);
            }
            return {
                twrk_uuid: typeWorkDeleted.twrk_uuid,
                twrk_name: typeWorkDeleted.twrk_name,
                twrk_description: typeWorkDeleted.twrk_description,
                twrk_createdat: TimezoneConverter.toIsoStringInTimezone(typeWorkDeleted.twrk_createdat, 'America/Buenos_Aires'),
                twrk_updatedat: TimezoneConverter.toIsoStringInTimezone(typeWorkDeleted.twrk_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en deleteTypeWork (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findTypeWorkByName(cmp_uuid: string, twrk_name: string, excludeUuid?: string) {
        try {
            const typeWork = await this.typeWorkRepository.findTypeWorkByName(cmp_uuid, twrk_name, excludeUuid)
            if(typeWork) {
                throw new Error(`Ya existe un tipo de trabajo con el nombre ${twrk_name}.`);
            }
            return typeWork
        } catch (error: any) {
            console.error('Error en findTypeWorkByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}