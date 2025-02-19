export type TypeType = {
    type_id?: number,
    type_name: string,
    created_at?: Date | string | null,
    updated_at?: Date | string | null
}

export type Type = {
    types: TypeType[],
    detailType: TypeType | null
}