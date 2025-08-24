import { UserRolCompanyEntity } from "../../../domain/user-rol-company/user-rol-company.entity";
import { UserRolCompanyRepository } from "../../../domain/user-rol-company/user-rol-company.repository";
import { SequelizeUserRolCompany } from "../../model/user-rol-company/user-rol-company.model";

export class SequelizeRepository implements UserRolCompanyRepository {
    async getUserRolesCompany(): Promise<UserRolCompanyEntity[] | null> {
        try {
            const userRolesCompany = await SequelizeUserRolCompany.findAll();
            if(!userRolesCompany) {
                throw new Error(`No hay user roles company`)
            };
            return userRolesCompany;
        } catch (error: any) {
            console.error('Error en getUserRolesCompany:', error.message);
            throw error;
        }
    }
    async findUserRolCompanyById(cmp_uuid: string, usrrolcmp_uuid: string, usr_uuid: string, rol_uuid: string): Promise<UserRolCompanyEntity | null> {
        try {
            const userRolCompany = await SequelizeUserRolCompany.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    usrrolcmp_uuid: usrrolcmp_uuid ?? null,
                    usr_uuid: usr_uuid ?? null,
                    rol_uuid: rol_uuid ?? null
                } 
            });
            if(!userRolCompany) {
                throw new Error(`No hay user rol company con el Id: ${cmp_uuid}`);
            };
            return userRolCompany.dataValues;
        } catch (error: any) {
            console.error('Error en findUserRolCompanyById:', error.message);
            throw error;
        }
    }
    async createUserRolCompany(userRolCompany: UserRolCompanyEntity): Promise<UserRolCompanyEntity | null> {
        try {
            let { cmp_uuid, usrrolcmp_uuid, usr_uuid, rol_uuid, usrrolcmp_createdat, usrrolcmp_updatedat } = userRolCompany
            const result = await SequelizeUserRolCompany.create({ cmp_uuid, usrrolcmp_uuid, usr_uuid, rol_uuid, usrrolcmp_createdat, usrrolcmp_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el company item`);
            }
            let newUserRolCompany = result.dataValues as SequelizeUserRolCompany
            return newUserRolCompany;
        } catch (error: any) {
            console.error('Error en createUserRolCompany:', error.message);
            throw error;
        }
    }
    async updateUserRolCompany(cmp_uuid: string, usrrolcmp_uuid: string, usr_uuid: string, rol_uuid: string, userRolCompany: UserRolCompanyEntity): Promise<UserRolCompanyEntity | null> {
        try {
            let { usrrolcmp_createdat, usrrolcmp_updatedat } = userRolCompany
            const result = await SequelizeUserRolCompany.update({ usrrolcmp_createdat, usrrolcmp_updatedat }, { where: { cmp_uuid, usrrolcmp_uuid, usr_uuid, rol_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el userrolcompany`);
            };
            return userRolCompany;
        } catch (error: any) {
            console.error('Error en updateUserRolCompany:', error.message);
            throw error;
        }
    }
    async deleteUserRolCompany(cmp_uuid: string, usrrolcmp_uuid: string, usr_uuid: string, rol_uuid: string): Promise<UserRolCompanyEntity | null> {
        try {
            const userRolCompany = await this.findUserRolCompanyById(cmp_uuid, usrrolcmp_uuid, usr_uuid, rol_uuid);
            const result = await SequelizeUserRolCompany.destroy({ where: { cmp_uuid, usrrolcmp_uuid, usr_uuid, rol_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el userrolcompany`);
            };
            return userRolCompany;
        } catch (error: any) {
            console.error('Error en deleteUserRolCompany:', error.message);
            throw error;
        }
    }
    async existUserRolCompany(cmp_uuid: string, usrrolcmp_uuid: string, usr_uuid: string, rol_uuid: string): Promise<UserRolCompanyEntity | null> {
        try {
            const userRolCompany = await SequelizeUserRolCompany.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    usrrolcmp_uuid: usrrolcmp_uuid ?? null,
                    usr_uuid: usr_uuid ?? null,
                    rol_uuid: rol_uuid ?? null
                } 
            });
            return userRolCompany;
        } catch (error: any) {
            console.error('Error en deleteUserRolCompany:', error.message);
            throw error;
        }
    }
    
}