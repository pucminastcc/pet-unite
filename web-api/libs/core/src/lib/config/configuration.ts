export const configuration = () => {
    return {
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        apiUrl: process.env.API_URL,
        appUrl: process.env.APP_URL,
        dbConn: process.env.DB_CONN,
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        smtpUser: process.env.SMTP_USER,
        smtpPass: process.env.SMTP_PASS,
        jwtSecret: process.env.JWT_SECRET,
    };
}
