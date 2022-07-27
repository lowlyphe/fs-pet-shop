import pg from 'pg';

const pool = new pg.Pool({
    database: "petshop"
})

pool.query("SELECT * FROM", (err, res) => {
    console.log(res.rows)
    pool.end();
});

