export const configuration = () => {
    return {
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        dbConn: process.env.DB_CONN,
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        smtpUser: process.env.SMTP_USER,
        smtpPass: process.env.SMTP_PASS,
    };
}
