import { CollectionFormRepository } from "../../domain/collection-form/collection-form.repository";
import { CollectionFormValue } from "../../domain/collection-form/collection-form.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CollectionFormUseCase {
    constructor(
        private readonly collectionFormRepository: CollectionFormRepository
    ) {
        this.getCollectionForms = this.getCollectionForms.bind(this);
        this.getDetailCollectionForm = this.getDetailCollectionForm.bind(this);
        this.createCollectionForm = this.createCollectionForm.bind(this);
        this.updateCollectionForm = this.updateCollectionForm.bind(this);
        this.deleteCollectionForm = this.deleteCollectionForm.bind(this);
        this.findCollectionFormByName = this.findCollectionFormByName.bind(this);
    }

    public async getCollectionForms(cmp_uuid: string) {
        try {
            const collectionForms = await this.collectionFormRepository.getCollectionForms(cmp_uuid);
            if(!collectionForms) {
                throw new Error('No hay collection forms.');
            }
            return collectionForms.map((collectionForm) => ({
                cmp_uuid: collectionForm.cmp_uuid,
                cfrm_uuid: collectionForm.cfrm_uuid,
                cfrm_name: collectionForm.cfrm_name,
                cfrm_order: collectionForm.cfrm_order,
                cfrm_bkcolor: collectionForm.cfrm_bkcolor,    
                cfrm_frcolor: collectionForm.cfrm_frcolor,
                cfrm_active: collectionForm.cfrm_active,
                cfrm_createdat: TimezoneConverter.toIsoStringInTimezone(collectionForm.cfrm_createdat, 'America/Buenos_Aires'),
                cfrm_updatedat: TimezoneConverter.toIsoStringInTimezone(collectionForm.cfrm_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCollectionForms (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCollectionForm(cmp_uuid: string, cfrm_uuid: string) {
        try {
            const collectionForm = await this.collectionFormRepository.findCollectionFormById(cmp_uuid, cfrm_uuid);
            if(!collectionForm) {
                throw new Error(`No hay collection form con el Id: ${cmp_uuid}, ${cfrm_uuid}`);
            }
            return {
                cmp_uuid: collectionForm.cmp_uuid,
                cfrm_uuid: collectionForm.cfrm_uuid,
                cfrm_name: collectionForm.cfrm_name,
                cfrm_order: collectionForm.cfrm_order,
                cfrm_bkcolor: collectionForm.cfrm_bkcolor,    
                cfrm_frcolor: collectionForm.cfrm_frcolor,
                cfrm_active: collectionForm.cfrm_active,
                cfrm_createdat: TimezoneConverter.toIsoStringInTimezone(collectionForm.cfrm_createdat, 'America/Buenos_Aires'),
                cfrm_updatedat: TimezoneConverter.toIsoStringInTimezone(collectionForm.cfrm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCollectionForm (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCollectionForm({ cmp_uuid, cfrm_uuid, cfrm_name, cfrm_order, cfrm_bkcolor, cfrm_frcolor, cfrm_active, cfrm_createdat, cfrm_updatedat } : { cmp_uuid: string, cfrm_uuid: string, cfrm_name: string, cfrm_order: number, cfrm_bkcolor: string, cfrm_frcolor: string, cfrm_active: boolean, cfrm_createdat: Date, cfrm_updatedat: Date }) {
        try {
            const collectionFormValue = new CollectionFormValue({ cmp_uuid, cfrm_uuid, cfrm_name, cfrm_order, cfrm_bkcolor, cfrm_frcolor, cfrm_active, cfrm_createdat, cfrm_updatedat });
            const collectionFormCreated = await this.collectionFormRepository.createCollectionForm(collectionFormValue);
            if(!collectionFormCreated) {
                throw new Error(`No se pudo insertar el collection form.`);
            }
            return {
                cmp_uuid: collectionFormCreated.cmp_uuid,
                cfrm_uuid: collectionFormCreated.cfrm_uuid,
                cfrm_name: collectionFormCreated.cfrm_name,
                cfrm_order: collectionFormCreated.cfrm_order,
                cfrm_bkcolor: collectionFormCreated.cfrm_bkcolor,    
                cfrm_frcolor: collectionFormCreated.cfrm_frcolor,
                cfrm_active: collectionFormCreated.cfrm_active,
                cfrm_createdat: TimezoneConverter.toIsoStringInTimezone(collectionFormCreated.cfrm_createdat, 'America/Buenos_Aires'),
                cfrm_updatedat: TimezoneConverter.toIsoStringInTimezone(collectionFormCreated.cfrm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCollectionForm (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCollectionForm(cmp_uuid: string, cfrm_uuid: string, { cfrm_name, cfrm_order, cfrm_bkcolor, cfrm_frcolor, cfrm_active, cfrm_createdat, cfrm_updatedat } : { cfrm_uuid: string, cfrm_name: string, cfrm_order: number, cfrm_bkcolor: string, cfrm_frcolor: string, cfrm_active: boolean, cfrm_createdat: Date, cfrm_updatedat: Date }) {
        try {
            const collectionFormUpdated = await this.collectionFormRepository.updateCollectionForm(cmp_uuid, cfrm_uuid, { cmp_uuid, cfrm_uuid, cfrm_name, cfrm_order, cfrm_bkcolor, cfrm_frcolor, cfrm_active, cfrm_createdat, cfrm_updatedat });
            if(!collectionFormUpdated) {
                throw new Error(`No se pudo actualizar el collection form.`);
            }
            return {
                cmp_uuid: collectionFormUpdated.cmp_uuid,
                cfrm_uuid: collectionFormUpdated.cfrm_uuid,
                cfrm_name: collectionFormUpdated.cfrm_name,
                cfrm_order: collectionFormUpdated.cfrm_order,
                cfrm_bkcolor: collectionFormUpdated.cfrm_bkcolor,    
                cfrm_frcolor: collectionFormUpdated.cfrm_frcolor,
                cfrm_active: collectionFormUpdated.cfrm_active,
                cfrm_createdat: TimezoneConverter.toIsoStringInTimezone(collectionFormUpdated.cfrm_createdat, 'America/Buenos_Aires'),
                cfrm_updatedat: TimezoneConverter.toIsoStringInTimezone(collectionFormUpdated.cfrm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCollectionForm (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCollectionForm(cmp_uuid: string, cfrm_uuid: string) {
        try {
            const collectionFormDeleted = await this.collectionFormRepository.deleteCollectionForm(cmp_uuid, cfrm_uuid);
            if(!collectionFormDeleted) {
                throw new Error(`No se pudo eliminar el collection form.`);
            }
            return {
                cmp_uuid: collectionFormDeleted.cmp_uuid,
                cfrm_uuid: collectionFormDeleted.cfrm_uuid,
                cfrm_name: collectionFormDeleted.cfrm_name,
                cfrm_order: collectionFormDeleted.cfrm_order,
                cfrm_bkcolor: collectionFormDeleted.cfrm_bkcolor,    
                cfrm_frcolor: collectionFormDeleted.cfrm_frcolor,
                cfrm_active: collectionFormDeleted.cfrm_active,
                cfrm_createdat: TimezoneConverter.toIsoStringInTimezone(collectionFormDeleted.cfrm_createdat, 'America/Buenos_Aires'),
                cfrm_updatedat: TimezoneConverter.toIsoStringInTimezone(collectionFormDeleted.cfrm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteCollectionForm (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCollectionFormByName(cmp_uuid: string, cfrm_name: string, excludeUuid?: string) {
        try {
            const collectionForm = await this.collectionFormRepository.findCollectionFormByName(cmp_uuid, cfrm_name, excludeUuid)
            if(collectionForm) {
                throw new Error(`Ya existe un collection form con el nombre ${cfrm_name}.`);
            }
            return collectionForm
        } catch (error: any) {
            console.error('Error en findCollectionFormByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}