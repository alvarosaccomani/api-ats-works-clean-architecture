import { CollectionFormEntity, CollectionFormUpdateData } from "../../../domain/collection-form/collection-form.entity";
import { CollectionFormRepository } from "../../../domain/collection-form/collection-form.repository";
import { SequelizeCollectionForm } from "../../model/collection-form/collection-form.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CollectionFormRepository {
    async getCollectionForms(cmp_uuid: string): Promise<CollectionFormEntity[] | null> {
        try {
            const collectionForms = await SequelizeCollectionForm.findAll();
            if(!collectionForms) {
                throw new Error(`No hay collection forms`);
            };
            return collectionForms;
        } catch (error: any) {
            console.error('Error en getCollectionForms:', error.message);
            throw error;
        }
    }
    async findCollectionFormById(cmp_uuid: string, cfrm_uuid: string): Promise<CollectionFormEntity | null> {
        try {
            const collectionForm = await SequelizeCollectionForm.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cfrm_uuid: cfrm_uuid ?? null
                } 
            });
            if(!collectionForm) {
                throw new Error(`No hay collection form con el Id: ${cfrm_uuid}`);
            };
            return collectionForm.dataValues;
        } catch (error: any) {
            console.error('Error en findCollectionFormById:', error.message);
            throw error;
        }
    }
    async createCollectionForm(collectionForm: CollectionFormEntity): Promise<CollectionFormEntity | null> {
        try {
            let { cmp_uuid, cfrm_uuid, cfrm_name, cfrm_order, cfrm_bkcolor, cfrm_frcolor, cfrm_active, cfrm_createdat, cfrm_updatedat } = collectionForm
            const result = await SequelizeCollectionForm.create({ cmp_uuid, cfrm_uuid, cfrm_name, cfrm_order, cfrm_bkcolor, cfrm_frcolor, cfrm_active, cfrm_createdat, cfrm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el collection form`);
            };
            let newCollectionForm = result.dataValues as SequelizeCollectionForm;
            return newCollectionForm;
        } catch (error: any) {
            console.error('Error en createCollectionForm:', error.message);
            throw error;
        }
    }
    async updateCollectionForm(cmp_uuid: string, cfrm_uuid: string, collectionForm: CollectionFormUpdateData): Promise<CollectionFormEntity | null> {
        try {
            const [updatedCount, [updatedCollectionForm]] = await SequelizeCollectionForm.update(
                { 
                    cfrm_name: collectionForm.cfrm_name, 
                    cfrm_order: collectionForm.cfrm_order,
                    cfrm_bkcolor: collectionForm.cfrm_bkcolor,
                    cfrm_frcolor: collectionForm.cfrm_frcolor,
                    cfrm_active: collectionForm.cfrm_active
                },
                { 
                    where: { cmp_uuid, cfrm_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el collection form`);
            };
            return updatedCollectionForm.get({ plain: true }) as CollectionFormEntity;
        } catch (error: any) {
            console.error('Error en updateCollectionForm:', error.message);
            throw error;
        }
    }
    async deleteCollectionForm(cmp_uuid: string, cfrm_uuid: string): Promise<CollectionFormEntity | null> {
        try {
            const collectionForm = await this.findCollectionFormById(cmp_uuid, cfrm_uuid);
            const result = await SequelizeCollectionForm.destroy({ where: { cmp_uuid, cfrm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el collection form`);
            };
            return collectionForm;
        } catch (error: any) {
            console.error('Error en deleteCollectionForm:', error.message);
            throw error;
        }
    }
    async findCollectionFormByName(dtp_name: string, excludeUuid?: string): Promise<CollectionFormEntity | null> {
        try {
            const whereCondition: any = { dtp_name: dtp_name ?? null };
            if (excludeUuid) {
                whereCondition.cfrm_uuid = { [Op.ne]: excludeUuid };
            }
            const collectionForm = await SequelizeCollectionForm.findOne({ 
                where: whereCondition
            });
            return collectionForm;
        } catch (error: any) {
            console.error('Error en findCollectionFormByName:', error.message);
            throw error;
        }
    }
    
}