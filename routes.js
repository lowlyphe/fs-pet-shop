import fs from 'fs/promises'

export const routes = {
    '/pets': ((req,res) => {
        fs.readFile("./pets.json", 'utf-8').then((data)  => {
            data = JSON.parse(data)
            res.end(JSON.stringify(data))            
        })
        
    }),
    '/pets/0': ((req,res) => {
        fs.readFile("./pets.json", 'utf-8').then((data)  => {
            data = JSON.parse(data)
            res.end(JSON.stringify(data[0]))            
        })
        
    }),
    '/pets/1': ((req,res) => {
        fs.readFile("./pets.json", 'utf-8').then((data)  => {
            data = JSON.parse(data)
            res.end(JSON.stringify(data[1]))            
        })
        
    })
}
