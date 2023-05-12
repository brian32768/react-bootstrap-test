// These environment settings should all be defined on a production server,
// not in a .env file.
//if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
//}

const IMAPHOST = process.env.IMAPHOST;
const IMAPUSER = process.env.IMAPUSER;
const IMAPPASSWORD = process.env.IMAPPASSWORD;


module.exports = { IMAPHOST, DBNAME, IMAPUSER, IMAPPASSWORD}
