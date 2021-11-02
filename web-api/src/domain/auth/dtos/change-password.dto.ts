export interface ChangePasswordDto {
    readonly email: string;
    readonly code: string;
    password: string;
}
