import { CompanySettingRepository } from "../../domain/company-setting/company-setting.repository";

export class CompanySettingResolver {
  constructor(private companySettingRepository: CompanySettingRepository) {}

  /**
   * Obtiene el valor nativo string de una configuración.
   * Si la configuración no existe, retorna el valor por defecto de forma segura.
   */
  async getValue(cmp_uuid: string, key: string, defaultValue: string = ''): Promise<string> {
    try {
      if (!cmp_uuid || !key) return defaultValue;
      
      const setting = await this.companySettingRepository.findCompanySettingByKey(cmp_uuid, key);
      return setting && setting.cmps_value !== null && setting.cmps_value !== undefined 
        ? setting.cmps_value 
        : defaultValue;
    } catch (error) {
      console.error(`Error resolviendo configuración ${key} para empresa ${cmp_uuid}:`, error);
      return defaultValue;
    }
  }

  /**
   * Obtiene el valor booleano de una configuración.
   * Si la configuración no existe, retorna el valor por defecto.
   */
  async getBoolean(cmp_uuid: string, key: string, defaultValue: boolean = false): Promise<boolean> {
    const val = await this.getValue(cmp_uuid, key, defaultValue ? 'true' : 'false');
    return val.toLowerCase() === 'true' || val === '1';
  }

  /**
   * Obtiene el valor numérico de una configuración.
   * Si la configuración no existe o no es un número válido, retorna el valor por defecto.
   */
  async getNumber(cmp_uuid: string, key: string, defaultValue: number = 0): Promise<number> {
    const val = await this.getValue(cmp_uuid, key, String(defaultValue));
    const num = Number(val);
    return isNaN(num) ? defaultValue : num;
  }
}
