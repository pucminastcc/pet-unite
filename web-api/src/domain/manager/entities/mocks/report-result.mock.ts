export class ReportResult {
    img: string;
    username: string;
    email: string;
    type: string;
    subject: string;
    description: string;
    date: string;

    constructor(img: string, username: string, email: string, type: string, subject: string, description: string, date: string) {
        this.img = img;
        this.username = username;
        this.email = email;
        this.type = type;
        this.subject = subject;
        this.description = description;
        this.date = date;
    }
}
