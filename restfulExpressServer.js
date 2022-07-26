import express from 'express'
import fs from "fs/promises"
import { readPetsFile } from './shared.js'

const app = express();
const PORT = 3000

app.use(express.json());

//get all pets
app.get('/pets', (req,res) => {
    readPetsFile.then((pets) => {
        res.send(pets)
    })
    
})

//get pet at index
app.get('/pets/:id', (req,res) => {

    readPetsFile.then((pets) => {
        const id = req.params.id
        if (pets[id]) {
            res.set(
                'Content-Type', 'application/json'
            )
            res.send(pets[id])
        } 
        
    })    
})

//create a new pet
app.post('/pets', (req,res) => {
    const newPet = req.body
    if (typeof newPet.age === 'number' && newPet.kind && newPet.name) {
        fs.readFile('pets.json', 'utf-8').then(str => {
            console.log("good")
            const pets = JSON.parse(str)
            pets.push(newPet)
            fs.writeFile('pets.json', JSON.stringify(pets))
            res.set(
                'Content-Type', 'application/json'
            ).then((pets) => {
                res.send(pets)
            })
            
        })
        
    } else {
        res.set(
            'Content-Type', 'text/plain'
        )
        res.status(400).send('Bad Request')
    }
    
})



// update pet information
app.patch('/pets/:id', (req,res) => {
    const badRequest = () => {
        res.set(
            'Content-Type', 'text/plain'
        )
        res.status(400).send('Bad Request')
    }
    readPetsFile.then((pets) => {
        const id = req.params.id;
        const update = req.body;
        if (pets[id]) {
            if (update.age) {
                if (typeof update.age !== "number") {
                    badRequest();
                }
            }
            
            for (let key in update) {

                pets[id][key] = update[key]
            }
            fs.writeFile('pets.json', JSON.stringify(pets))
            res.type('application/json')
            res.send(pets[id])
        } else {
            res.status(404).send("Sorry can't find that!")
        }
        
        
    })    
})


// delete pet
app.delete('/pets/:id', (req,res) => {
    const badRequest = () => {
        res.set(
            'Content-Type', 'text/plain'
        )
        res.status(400).send('Bad Request')
    }
    const id = req.params.id
    readPetsFile.then((pets) => {
        if (pets[id]) {
            let deleted = pets[id]
            pets.splice(id,1)
            fs.writeFile('pets.json', JSON.stringify(pets))
            res.type('application/json')
            res.send(deleted)
        } else {
            badRequest();
        }
    })
})

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})