export type ItemType = {
    item_id: number;
    item_name: string;
    unit_id: number;
    type_id: number;
    amount: number;
    image: File | string | null;
    created_at: Date | string | null;
    updated_at: Date | string | null;
    units: {
        unit_id: number,
        unit_name: string,
    },
    types: {
        type_id: number,
        type_name: string,
    },
    users: {
        user_id: number,
        username: string,
        email: string
    }
}

export type Item = {
    items: ItemType[],
    detailItem: ItemType | null
}

export type AmountType = {
    amount: number;
}

export type ItemOnly = {
    user_id?: number;
    item_name: string;
    unit_id: number;
    type_id: number;
    amount: number;
    image?: File | string | null;
}