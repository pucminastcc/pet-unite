export class PermissionRequestBaseResult {
    id: string;
    userId: string;
    username: string;
    email: string;
    provider: string;
    date: string;
    
    constructor(id: string, userId: string, username: string, email: string, provider: string, date: string) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.provider = provider;
        this.date = date;
    }
}
