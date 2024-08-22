import pg from 'pg'

const pool =new pg.Pool({
    user:'postgres',
    host :'localhost',
    database:'postgres',
    password:'postgres',
    prot:5432,

});

export default pool;