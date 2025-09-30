import { CollectionFormRepository } from "../../domain/collection-form/collection-form.repository";
import { CollectionFormValue } from "../../domain/collection-form/collection-form.value";

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
            const collectionForms = this.collectionFormRepository.getCollectionForms(cmp_uuid);
            if(!collectionForms) {
                throw new Error('No hay collection forms.');
            }
            return collectionForms;
        } catch (error: any) {
            console.error('Error en getCollectionForms (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCollectionForm(cmp_uuid: string, cfrm_uuid: string) {
        try {
            const collectionForm = this.collectionFormRepository.findCollectionFormById(cmp_uuid, cfrm_uuid);
            if(!collectionForm) {
                throw new Error(`No hay collection form con el Id: ${cmp_uuid}, ${cfrm_uuid}`);
            }
            return collectionForm;
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
            return collectionFormCreated;
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
            return collectionFormUpdated;
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
            return collectionFormDeleted;
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