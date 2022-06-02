export class UserBaseResult {
    id: string;
    img: string;
    username: string;
    email: string;
    isSuperUser: boolean;
    provider: string;
    blocked: boolean;

    constructor(id: string, img: string, username: string, email: string, isSuperUser: boolean,
                provider: string, blocked: boolean) {
        this.id = id;
        this.img = img;
        this.username = username;
        this.email = email;
        this.isSuperUser = isSuperUser;
        this.provider = provider;
        this.blocked = blocked;
    }
}
