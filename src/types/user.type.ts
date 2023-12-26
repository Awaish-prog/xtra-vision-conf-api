export type User = {
    id: string,
    name: string,
    email: string,
    encryptedPassword?: string,
    password?: string
}