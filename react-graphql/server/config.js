// These environment settings should all be predefined on a production server,
// not read from a .env file. I need a better way to test this.
import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const Secrets = {
    DBHOST : process.env.DBHOST,
    DBNAME : process.env.DBNAME,
    DBUSER : process.env.DBUSER,
    DBPASSWORD : process.env.DBPASSWORD
};

export const Data = {
    INSTRUMENTS : '[ccuser].[CLERK_V_PARTY_DIRECT]',
    //INSTRUMENTS : Secrets.DBNAME + '.public.instruments',
}
