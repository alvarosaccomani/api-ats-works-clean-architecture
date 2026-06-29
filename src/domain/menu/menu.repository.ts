import { MenuEntity, MenuUpdateData } from "./menu.entity";

export interface MenuRepository {
    getMenus(mnu_title?: string, field_order?: string, mnu_orderby?: string): Promise<MenuEntity[] | null>;
    findMenuById(mnu_uuid: string): Promise<MenuEntity | null>;
    createMenu(menu: MenuEntity): Promise<MenuEntity | null>;
    updateMenu(mnu_uuid: string, menu: MenuUpdateData): Promise<MenuEntity | null>;
    deleteMenu(mnu_uuid: string): Promise<MenuEntity | null>;
    findMenuByTitle(mnu_title: string): Promise<MenuEntity | null>;
    getMenuItems(): Promise<MenuEntity[] | null>;
    getDashboardMenuItems(): Promise<MenuEntity[] | null>;
}