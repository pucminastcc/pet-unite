export class ReportBaseResult {
    id: string;
    email: string;
    username: string;
    type: string;
    subject: string;
    date: string;

    constructor(id: string, email: string, username: string, type: string, subject: string, date: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.type = type;
        this.subject = subject;
        this.date = date;
    }
}
