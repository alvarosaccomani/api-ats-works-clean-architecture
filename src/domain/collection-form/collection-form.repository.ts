import { CollectionFormEntity } from "./collection-form.entity";

export interface CollectionFormRepository {
    getCollectionForms(cmp_uuid: string): Promise<CollectionFormEntity[] | null>;
    findCollectionFormById(cmp_uuid: string, cfrm_uuid: string): Promise<CollectionFormEntity | null>;
    createCollectionForm(collectionForm: CollectionFormEntity): Promise<CollectionFormEntity | null>;
    updateCollectionForm(cmp_uuid: string, cfrm_uuid: string, collectionForm: CollectionFormEntity): Promise<CollectionFormEntity | null>;
    deleteCollectionForm(cmp_uuid: string, cfrm_uuid: string): Promise<CollectionFormEntity | null>;
    findCollectionFormByName(cmp_uuid: string, cus_fullname: string, excludeUuid?: string | null): Promise<CollectionFormEntity | null>;
}