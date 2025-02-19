export type authType = {
    user_id?: number;
    username?: string;
    email: string;
    password?: string;
    role_id?: string | number;
    updated_at?: string | Date | null;
    created_at?: string | Date | null;
}

export type resetPassword = {
    email: string;
    token: string;
}

export type Role = {
    role_id: number;  // ID role
    role_name: string; // Nama role
    updated_at: string | Date | null;
    created_at: string | Date | null;
}

export type User = {
    id?: number;
    user_id?: number;
    username?: string;
    email?: string;
    role_id?: number;
    role: Role,
    email_verified_at: string | null;
    updated_at: string | Date | null;
    created_at: string | Date | null;
  }

  export type UserLogin = {
    auth: User | null,
    token: string,
  }

  export type UserData = {
    users: User[]
    detailUser: User | null,
  }
  
  export type AuthData = {
    expires_in: number;
    token: string;
    token_type: string;
    user: User | null;
  }
  
  export type AuthResponse = {
    status: boolean;
    message: string;
    data: AuthData | null;
    statusCode: number;
  }
  
  export type UserResponse = {
    status: boolean;
    message: string;
    data: authType | null;
    statusCode: number;
  }
  