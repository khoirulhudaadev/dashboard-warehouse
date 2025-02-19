export type DeliveryType = {
    delivery_id: number,
    item_name: string,
    management_in: string,
    management_out: string,
    type_name: string,
    unit_name: string,
    amount: 2,
    image: string,
    image_public_id: string,
    created_at: Date | null,
    updated_at: Date | null
}

export type Delivery = {
    deliveries: DeliveryType[],
    detailDelivery: DeliveryType | null
}
