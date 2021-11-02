export interface RegisterDto {
    readonly email: string;
    readonly username: string;
    password: string;
    terms: boolean;
    activated: boolean;
    provider: string;
}
