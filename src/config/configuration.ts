export default () => (
    {
        origin:process.env.origin,
        secretKey: process.env.SECRET_KEY,
        database: {
            id: process.env.DB_ID,
            pw: process.env.DB_PW,
            table: process.env.DB_TABLE,
            port: +process.env.DB_PORT,
            host: process.env.DB_HOST
        }
    })