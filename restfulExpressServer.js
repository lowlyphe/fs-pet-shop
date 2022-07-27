import express from 'express'
import pg from 'pg';

const app = express();
const PORT = 3000

const pool = new pg.Pool({
    database: "petshop"
})

app.use(express.json());

//get all pets
app.get('/pets', (req,res) => {
    pool.query("SELECT * FROM pets").then((data) => {
        res.send(data.rows)
        
    })
    
})
// get specific pet @ id
app.get('/pets:id', (req,res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM pets WHERE id = $1', [id]).then((data) => {
         
    })
})

// create pet
app.post('/pets', (req,res) => {
    const pet = req.body[0];
    const { name, age, kind } = pet ;
    const text = 'INSERT INTO pets(name, age, kind) VALUES($1, $2, $3) RETURNING *'
    const values = [name, age, kind];
    if (!name || !age || !kind) {
        res.status(400).type('text/plain').send('Bad Request')
    } else {
        pool.query(text, values).then((data) => {
            res.type('application/json').send(data.rows[0]);          
        
        }).catch(e => {
            console.log(e.stack)
            res.status(500).type('text/plain').send('Internal Server Error')
        })
            
    }
    console.log(name, age, kind)
    
})

// delete pet @ id
app.delete("/pets/:id", (req,res) => {
    const id = req.params.id;
    pool.query("DELETE FROM pets where id = $1 RETURNING *", [id]).then((data) => {
        res.status(200).type('application/json').send(data)
    });

}) 

// update pet @ id
app.patch("/pets/:id", (req,res) => {
    const id = req.params.id;
    const pet = req.body[0];
    const { name, age, kind } = pet
    const text = `UPDATE pets SET name = COALESCE($1, name),
                    age = COALESCE($2, age),
                        kind = COALESCE($3, kind)
                            WHERE id = $4
                                RETURNING *`
    const values = [name, age, kind, id];
 


    pool.query(text, values).then((data) => {
        res.status(200).send(data.rows[0])
    }).catch(e => {
        console.log(e.stack);
    })
})

app.use((err,req,res,next) => {
    res.sendStatus(500)
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})