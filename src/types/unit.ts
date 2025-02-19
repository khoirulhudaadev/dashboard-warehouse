export type UnitType = {
    unit_id?: number,
    unit_name: string,
    created_at?: Date | string | null,
    updated_at?: Date | string | null
}

export type Unit = {
    units: UnitType[],
    detailUnit: UnitType | null
}