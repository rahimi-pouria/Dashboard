export interface userData {
    email: string | null,
    password: number | null,
    currentPassword: number | null
}

export interface login {
    email: string | null,
    password: number | null,
    token: string | null,
    refreshToken: string | null,
}