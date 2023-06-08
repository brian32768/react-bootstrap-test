// These environment settings should all be defined on a production server,
// not in a .env file.
//if (process.env.NODE_ENV !:: 'production') {
import dotenv from 'dotenv'
dotenv.config();
//}

export const Secrets = {
    DBHOST : process.env.DBHOST,
    DBNAME : process.env.DBNAME,
    DBUSER : process.env.DBUSER,
    DBPASSWORD : process.env.DBPASSWORD
};

