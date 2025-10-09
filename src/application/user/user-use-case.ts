import { UserRepository } from "../../domain/user/user.repository";
import { UserValue } from "../../domain/user/user.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class UserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {
        this.getUsers = this.getUsers.bind(this);
        this.getDetailUser = this.getDetailUser.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.userExist = this.userExist.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.setSocketUser = this.setSocketUser.bind(this);
        this.confirmAccount = this.confirmAccount.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.getUserByResetToken = this.getUserByResetToken.bind(this);
        this.findUserByNick = this.findUserByNick.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    public async getUsers() {
        try {
            const users = await this.userRepository.getUsers();
            if(!users) {
                throw new Error('No hay usuarios.');
            }
            return users.map(user => ({
                usr_uuid: user.usr_uuid,
                usr_name: user.usr_name,
                usr_surname: user.usr_surname,
                usr_image: user.usr_image,
                usr_email: user.usr_email,
                usr_nick: user.usr_nick,
                usr_bio: user.usr_bio,
                usr_registered: TimezoneConverter.toIsoStringInTimezone(user.usr_registered, 'America/Buenos_Aires'),
                usr_socket: user.usr_socket,
                usr_online: user.usr_online,
                usr_confirmed: user.usr_confirmed,
                usr_confirmationtoken: user.usr_confirmationtoken,
                usr_resetpasswordtoken: user.usr_resetpasswordtoken,
                usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(user.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
                usr_createdat: TimezoneConverter.toIsoStringInTimezone(user.usr_createdat, 'America/Buenos_Aires'),
                usr_updatedat: TimezoneConverter.toIsoStringInTimezone(user.usr_updatedat, 'America/Buenos_Aires')

            }));
        } catch (error: any) {
            console.error('Error en getUsers (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailUser(usr_uuid: string) {
        try {
            const user = await this.userRepository.findUserById(usr_uuid);
            if(!user) {
                throw new Error(`No hay usuario con el Id: ${usr_uuid}`);
            }
            return {
                usr_uuid: user.usr_uuid,
                usr_name: user.usr_name,
                usr_surname: user.usr_surname,
                usr_image: user.usr_image,
                usr_email: user.usr_email,
                usr_nick: user.usr_nick,
                usr_bio: user.usr_bio,
                usr_registered: TimezoneConverter.toIsoStringInTimezone(user.usr_registered, 'America/Buenos_Aires'),
                usr_socket: user.usr_socket,
                usr_online: user.usr_online,
                usr_confirmed: user.usr_confirmed,
                usr_confirmationtoken: user.usr_confirmationtoken,
                usr_resetpasswordtoken: user.usr_resetpasswordtoken,
                usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(user.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
                usr_createdat: TimezoneConverter.toIsoStringInTimezone(user.usr_createdat, 'America/Buenos_Aires'),
                
            };
        } catch (error: any) {
            console.error('Error en getDetailUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getUserByEmail(usr_email: string) {
        const user = await this.userRepository.findUserByEmail(usr_email);
        if(!user) {
            throw new Error(`No hay usuario con el email: ${usr_email}`);
        }
        return {
            usr_uuid: user.usr_uuid,
            usr_name: user.usr_name,
            usr_surname: user.usr_surname,
            usr_image: user.usr_image,
            usr_email: user.usr_email,
            usr_nick: user.usr_nick,
            usr_bio: user.usr_bio,
            usr_registered: TimezoneConverter.toIsoStringInTimezone(user.usr_registered, 'America/Buenos_Aires'),
            usr_socket: user.usr_socket,
            usr_online: user.usr_online,
            usr_confirmed: user.usr_confirmed,
            usr_confirmationtoken: user.usr_confirmationtoken,
            usr_resetpasswordtoken: user.usr_resetpasswordtoken,
            usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(user.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
            usr_createdat: TimezoneConverter.toIsoStringInTimezone(user.usr_createdat, 'America/Buenos_Aires'),
            usr_updatedat: TimezoneConverter.toIsoStringInTimezone(user.usr_updatedat, 'America/Buenos_Aires')
        };
    }

    public async registerUser({ usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat } : { usr_uuid: string, usr_name: string, usr_surname: string, usr_password: string, usr_image: string, usr_email: string, usr_nick: string, usr_bio: string, usr_registered: Date, usr_socket: string, usr_online: boolean, usr_confirmed: boolean, usr_confirmationtoken: string, usr_resetpasswordtoken: string, usr_resetpasswordexpires: Date, usr_createdat: Date, usr_updatedat: Date }) {
        try {
            const userValue = new UserValue({ usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat });
            const userCreated = await this.userRepository.registerUser(userValue);
            if(!userCreated) {
                throw new Error(`No se pudo insertar el usuario.`);
            }
            return {
                usr_uuid: userCreated.usr_uuid,
                usr_name: userCreated.usr_name,
                usr_surname: userCreated.usr_surname,
                usr_image: userCreated.usr_image,
                usr_email: userCreated.usr_email,
                usr_nick: userCreated.usr_nick,
                usr_bio: userCreated.usr_bio,
                usr_registered: TimezoneConverter.toIsoStringInTimezone(userCreated.usr_registered, 'America/Buenos_Aires'),
                usr_socket: userCreated.usr_socket,
                usr_online: userCreated.usr_online,
                usr_confirmed: userCreated.usr_confirmed,
                usr_confirmationtoken: userCreated.usr_confirmationtoken,
                usr_resetpasswordtoken: userCreated.usr_resetpasswordtoken,
                usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(userCreated.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
                usr_createdat: TimezoneConverter.toIsoStringInTimezone(userCreated.usr_createdat, 'America/Buenos_Aires'),
                usr_updatedat: TimezoneConverter.toIsoStringInTimezone(userCreated.usr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en registerUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateUser(usr_uuid: string, { usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat } : { usr_name: string, usr_surname: string, usr_password: string, usr_image: string, usr_email: string, usr_nick: string, usr_bio: string, usr_registered: Date, usr_socket: string, usr_online: boolean, usr_confirmed: boolean, usr_confirmationtoken: string, usr_resetpasswordtoken: string, usr_resetpasswordexpires: Date, usr_createdat: Date, usr_updatedat: Date }) {
        try {
            const userUpdated = await this.userRepository.updateUser(usr_uuid, { usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat });
            if(!userUpdated) {
                throw new Error(`No se pudo actualizar el usuario.`);
            }
            return {
                usr_uuid: userUpdated.usr_uuid,
                usr_name: userUpdated.usr_name,
                usr_surname: userUpdated.usr_surname,
                usr_image: userUpdated.usr_image,
                usr_email: userUpdated.usr_email,
                usr_nick: userUpdated.usr_nick,
                usr_bio: userUpdated.usr_bio,
                usr_registered: TimezoneConverter.toIsoStringInTimezone(userUpdated.usr_registered, 'America/Buenos_Aires'),
                usr_socket: userUpdated.usr_socket,
                usr_online: userUpdated.usr_online,
                usr_confirmed: userUpdated.usr_confirmed,
                usr_confirmationtoken: userUpdated.usr_confirmationtoken,
                usr_resetpasswordtoken: userUpdated.usr_resetpasswordtoken,
                usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(userUpdated.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
                usr_createdat: TimezoneConverter.toIsoStringInTimezone(userUpdated.usr_createdat, 'America/Buenos_Aires'),
                usr_updatedat: TimezoneConverter.toIsoStringInTimezone(userUpdated.usr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteUser(usr_uuid: string) {
        try {
            const userDeleted = await this.userRepository.deleteUser(usr_uuid);
            if(!userDeleted) {
                throw new Error(`No se pudo eliminar el usuario.`);
            }
            return {
                usr_uuid: userDeleted.usr_uuid,
                usr_name: userDeleted.usr_name,
                usr_surname: userDeleted.usr_surname,
                usr_image: userDeleted.usr_image,
                usr_email: userDeleted.usr_email,
                usr_nick: userDeleted.usr_nick,
                usr_bio: userDeleted.usr_bio,
                usr_registered: TimezoneConverter.toIsoStringInTimezone(userDeleted.usr_registered, 'America/Buenos_Aires'),
                usr_socket: userDeleted.usr_socket,
                usr_online: userDeleted.usr_online,
                usr_confirmed: userDeleted.usr_confirmed,
                usr_confirmationtoken: userDeleted.usr_confirmationtoken,
                usr_resetpasswordtoken: userDeleted.usr_resetpasswordtoken,
                usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(userDeleted.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
                usr_createdat: TimezoneConverter.toIsoStringInTimezone(userDeleted.usr_createdat, 'America/Buenos_Aires'),
                usr_updatedat: TimezoneConverter.toIsoStringInTimezone(userDeleted.usr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async userExist(usr_nick: string, usr_email: string) {
        try {
            const user = await this.userRepository.userExist(usr_nick, usr_email)
            if(user) {
                throw new Error(`Ya existe un usuario con el nick ${usr_nick}.`);
            }
            return user
        } catch (error: any) {
            console.error('Error en userExist (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async loginUser(usr_nick: string, usr_password: string, gettoken: boolean) {
        try {
            const user = await this.userRepository.loginUser(usr_nick, usr_password, gettoken);
            if (!user) {
                throw new Error('Credenciales incorrectas.');
            }
            return user
        } catch (error: any) {
            console.error('Error en loginUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async saveUser({ usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat } : { usr_uuid: string, usr_name: string, usr_surname: string, usr_password: string, usr_image: string, usr_email: string, usr_nick: string, usr_bio: string, usr_registered: Date, usr_socket: string, usr_online: boolean, usr_confirmed: boolean, usr_confirmationtoken: string, usr_resetpasswordtoken: string, usr_resetpasswordexpires: Date, usr_createdat: Date, usr_updatedat: Date }) {
        try {
            const userValue = new UserValue({ usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat });
            const userSaved = await this.userRepository.saveUser(userValue);
            if(!userSaved) {
                throw new Error(`No se pudo guardar el usuario.`);
            }
            return {
                usr_uuid: userSaved.usr_uuid,
                usr_name: userSaved.usr_name,
                usr_surname: userSaved.usr_surname,
                usr_image: userSaved.usr_image,
                usr_email: userSaved.usr_email,
                usr_nick: userSaved.usr_nick,
                usr_bio: userSaved.usr_bio,
                usr_registered: TimezoneConverter.toIsoStringInTimezone(userSaved.usr_registered, 'America/Buenos_Aires'),
                usr_socket: userSaved.usr_socket,
                usr_online: userSaved.usr_online,
                usr_confirmed: userSaved.usr_confirmed,
                usr_confirmationtoken: userSaved.usr_confirmationtoken,
                usr_resetpasswordtoken: userSaved.usr_resetpasswordtoken,
                usr_resetpasswordexpires: TimezoneConverter.toIsoStringInTimezone(userSaved.usr_resetpasswordexpires!, 'America/Buenos_Aires'),
                usr_createdat: TimezoneConverter.toIsoStringInTimezone(userSaved.usr_createdat, 'America/Buenos_Aires'),
                usr_updatedat: TimezoneConverter.toIsoStringInTimezone(userSaved.usr_updatedat, 'America/Buenos_Aires')
            }
        } catch (error: any) {
            console.error('Error en saveUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async setSocketUser( usr_uuid: string = '', usr_socket: string = '', usr_online: boolean = true ) {
        try {
            const userSocket = await this.userRepository.setSocketUser(usr_uuid, usr_socket, usr_online);
            return userSocket
        } catch (error: any) {
            console.error('Error en setSocketUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async confirmAccount( usr_confirmationtoken: string = '' ) {
        const userConfirmation = await this.userRepository.confirmAccount(usr_confirmationtoken);
        return userConfirmation
    }

    public async forgotPassword ( usr_email: string = '' ) {        
        try {
            // Buscar al usuario por su correo electrónico
            const user = await this.userRepository.findUserByEmail(usr_email);

            if (!user) {
                throw new Error('No se encontró ningún usuario con este correo electrónico.');
            }

            const userForgotPassword = await this.userRepository.forgotPassword(user);
            return userForgotPassword;
        } catch (error: any) {
            console.error('Error en forgotPassword (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getUserByResetToken(token: string, expirationDate: Date) {
        try {
            const user = await this.userRepository.findUserByResetToken(token, expirationDate);

            if (!user) {
                throw new Error('No se encontró ningún usuario con este correo electrónico.');
            }

            return user
        } catch (error: any) {
            console.error('Error en getUserByResetToken (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findUserByNick(usr_nick: string) {
        try {
            const user = await this.userRepository.findUserByNick(usr_nick);

            if (!user) {
                throw new Error(`No se encontró ningún usuario con el nick ${usr_nick}.`);
            }

            return user
        } catch (error: any) {
            console.error('Error en findUserByNick (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async findSocketUser(usr_uuid: string) {
        try {
            const userSocket = await this.userRepository.findSocketUser(usr_uuid);

            if (!userSocket) {
                throw new Error(`No se encontró el socket para el usuario con Id: ${usr_uuid}.`);
            }

            return userSocket
        } catch (error: any) {
            console.error('Error en findSocketUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updatePassword(usr_uuid: string, newPassword: string) {
        try {
            await this.userRepository.updatePassword(usr_uuid, newPassword);
        } catch (error: any) {
            console.error('Error en updatePassword (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}