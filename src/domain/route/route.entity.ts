export interface RouteEntity {
    cmp_uuid: string,
    rou_uuid: string,
    rou_name: string,
    rou_order: number,
    rou_description: string,
    rou_bkcolor: string,
    rou_frcolor: string,
    rou_active: boolean,
    rou_createdat: Date,
    rou_updatedat: Date
}

//Update
export type RouteUpdateData = Pick<RouteEntity, 'rou_name' | 'rou_order' | 'rou_description' | 'rou_bkcolor' | 'rou_frcolor' | 'rou_active'>;
