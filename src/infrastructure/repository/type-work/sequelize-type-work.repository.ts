import { TypeWorkEntity, TypeWorkUpdateData } from "../../../domain/type-work/type-work.entity";
import { TypeWorkRepository } from "../../../domain/type-work/type-work.repository";
import { SequelizeTypeWork } from "../../model/type-work/type-work.model";
import { Op } from "sequelize";

export class SequelizeRepository implements TypeWorkRepository {
    async getTypeWorks(cmp_uuid: string): Promise<TypeWorkEntity[] | null> {
        try {
            const typeWorks = await SequelizeTypeWork.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!typeWorks) {
                throw new Error(`No hay tipos de trabajos`)
            };
            return typeWorks;
        } catch (error: any) {
            console.error('Error en getTypeWorks:', error.message);
            throw error;
        }
    }
    async findTypeWorkById(cmp_uuid: string, twrk_uuid: string): Promise<TypeWorkEntity | null> {
        try {
            const typeWork = await SequelizeTypeWork.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    twrk_uuid: twrk_uuid ?? null
                } 
            });
            if(!typeWork) {
                throw new Error(`No hay tipo de trabajo con el Id: ${twrk_uuid}`);
            };
            return typeWork.dataValues;
        } catch (error: any) {
            console.error('Error en findTypeWorkById:', error.message);
            throw error;
        }
    }
    async createTypeWork(typeWork: TypeWorkEntity): Promise<TypeWorkEntity | null> {
        try {
            let { cmp_uuid, twrk_uuid, twrk_name, twrk_description, twrk_createdat, twrk_updatedat } = typeWork
            const result = await SequelizeTypeWork.create({ cmp_uuid, twrk_uuid, twrk_name, twrk_description, twrk_createdat, twrk_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el tipo de trabajo`);
            }
            let newTypeWork = result.dataValues as SequelizeTypeWork
            return newTypeWork;
        } catch (error: any) {
            console.error('Error en createTypeWork:', error.message);
            throw error;
        }
    }
    async updateTypeWork(cmp_uuid: string, twrk_uuid: string, typeWork: TypeWorkUpdateData): Promise<TypeWorkEntity | null> {
        try {
            const [updatedCount, [updatedTypeWork]] = await SequelizeTypeWork.update(
                {
                    twrk_name: typeWork.twrk_name,
                    twrk_description: typeWork.twrk_description
                },
                {
                    where: {
                        cmp_uuid: cmp_uuid ?? null,
                        twrk_uuid: twrk_uuid ?? null
                    },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el tipo de trabajo`);
            }
            return updatedTypeWork.get({ plain: true }) as TypeWorkEntity;
        } catch (error: any) {
            console.error('Error en updateTypeWork:', error.message);
            throw error;
        }
    }
    async deleteTypeWork(cmp_uuid: string, twrk_uuid: string): Promise<TypeWorkEntity | null> {
        try {
            const typeWork = await this.findTypeWorkById(cmp_uuid, twrk_uuid);
            const result = await SequelizeTypeWork.destroy({ where: { 
                cmp_uuid: cmp_uuid ?? null,
                twrk_uuid: twrk_uuid ?? null
            } });
            if(!result) {
                throw new Error(`No se ha eliminado el tipo de trabajo`);
            };
            return typeWork;
        } catch (error: any) {
            console.error('Error en deleteTypeWork:', error.message);
            throw error;
        }
    }
    async findTypeWorkByName(cmp_uuid: string, twrk_name: string, excludeUuid?: string): Promise<TypeWorkEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                twrk_name: twrk_name ?? null 
            };
            if (excludeUuid) {
                whereCondition.twrk_uuid = { [Op.ne]: excludeUuid };
            }
            const typeWork = await SequelizeTypeWork.findOne({ 
                where: whereCondition
            });
            return typeWork;
        } catch (error: any) {
            console.error('Error en findTypeWorkByName:', error.message);
            throw error;
        }
    }
    
}