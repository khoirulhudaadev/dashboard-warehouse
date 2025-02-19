
export type RoleType = {
    role_id: number;
    role_name: string;
    created_at?: string | null;
    updated_at?: string | null;
}

export type Role = {
    roles: RoleType[],
    detailRole: RoleType | null
}