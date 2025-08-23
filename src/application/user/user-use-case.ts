import { UserRepository } from "../../domain/user/user.repository";
import { UserValue } from "../../domain/user/user.value";

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
            const users = this.userRepository.getUsers();
            if(!users) {
                throw new Error('No hay usuarios.');
            }
            return users;
        } catch (error: any) {
            console.error('Error en getUsers (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailUser(usr_uuid: string) {
        try {
            const user = this.userRepository.findUserById(usr_uuid);
            if(!user) {
                throw new Error(`No hay usuario con el Id: ${usr_uuid}`);
            }
            return user;
        } catch (error: any) {
            console.error('Error en getDetailUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getUserByEmail(usr_email: string) {
        const user = this.userRepository.findUserByEmail(usr_email);
        return user;
    }

    public async registerUser({ usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat } : { usr_uuid: string, usr_name: string, usr_surname: string, usr_password: string, usr_image: string, usr_email: string, usr_nick: string, usr_bio: string, usr_registered: Date, usr_socket: string, usr_online: boolean, usr_confirmed: boolean, usr_confirmationtoken: string, usr_resetpasswordtoken: string, usr_resetpasswordexpires: Date, usr_createdat: Date, usr_updatedat: Date }) {
        try {
            const userValue = new UserValue({ usr_uuid, usr_name, usr_surname, usr_password, usr_image, usr_email, usr_nick, usr_bio, usr_registered, usr_socket, usr_online, usr_confirmed, usr_confirmationtoken, usr_resetpasswordtoken, usr_resetpasswordexpires, usr_createdat, usr_updatedat });
            const userCreated = await this.userRepository.registerUser(userValue);
            if(!userCreated) {
                throw new Error(`No se pudo insertar el usuario.`);
            }
            return userCreated;
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
            return userUpdated;
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
            return userDeleted;
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
            const userSaved = await this.userRepository.saveUser(userValue)
            return userSaved
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