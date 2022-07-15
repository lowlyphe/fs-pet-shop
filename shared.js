import fs from 'fs/promises'

export const readPetsFile = 
    fs.readFile("./pets.json", 'utf-8').then((data)  => {
        return JSON.parse(data)
        
    })

