export const configuration = () => {
    return {
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        dbConn: process.env.DB_CONN,
    };
}
