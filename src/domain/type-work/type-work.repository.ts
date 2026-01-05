import { TypeWorkEntity, TypeWorkUpdateData } from "./type-work.entity";

export interface TypeWorkRepository {
    getTypeWorks(cmp_uuid: string): Promise<TypeWorkEntity[] | null>;
    findTypeWorkById(cmp_uuid: string, twrk_uuid: string): Promise<TypeWorkEntity | null>;
    createTypeWork(twrk: TypeWorkEntity): Promise<TypeWorkEntity | null>;
    updateTypeWork(cmp_uuid: string, twrk_uuid: string, twrk: TypeWorkUpdateData): Promise<TypeWorkEntity | null>;
    deleteTypeWork(cmp_uuid: string, twrk_uuid: string): Promise<TypeWorkEntity | null>;
    findTypeWorkByName(cmp_uuid: string, twrk_name: string, excludeUuid?: string | null): Promise<TypeWorkEntity | null>;
}