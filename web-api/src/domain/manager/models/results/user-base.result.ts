export interface UserBaseResult {
    id: string;
    img: string;
    username: string;
    email: string;
    isSuperUser: boolean;
    isInstitution: boolean;
    provider: string;
    blocked: boolean;
}
