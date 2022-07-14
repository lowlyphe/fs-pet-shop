import http, { ServerResponse } from 'http';
import fs from 'fs/promises'



const server = http.createServer((req, res) => {
    

        if (req.method === 'GET') {
            const pets = fs.readFile("./pets.json", 'utf-8').then((pets)  => {
                return JSON.parse(pets)
                        
            })
            pets.then((pets) => {
                const petRegExp = /^\/pets\/(.*)$/;
                const subURL = req.url
                const match = subURL.match(petRegExp)
                const path = parseInt(match[1])
                if (pets[path]) {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify(pets[path]))    
                } else if (subURL.match(petRegExp) && match[1] === '') {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify(pets)) 
            }
             else {
                res.writeHead(404, {'Content-Type': 'text/plain'})
                res.end('Not Found')
            }
            })
            
        } else if (req.method === 'POST') {
            const pets = fs.readFile("./pets.json", 'utf-8').then((pets)  => {
                return JSON.parse(pets)
                        
            })
            pets.then((pets) => {
                console.log(pets)
                let body = '';
                req.on('data', (chunk) => {
                body += chunk;
                })
                req.on('end', () => {
                    const newPet = JSON.parse(body);
                    console.log(newPet)
                    if (newPet.name && newPet.age && newPet.kind) {
                        pets.push(newPet)
                        fs.writeFile('pets.json', JSON.stringify(pets))
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(newPet)
                }
                
            })
            })
            
        }

    
    //else {
    //     res.writeHead(404, {'Content-Type': 'text/plain'})
    //     res.end("Not Found")
    // }


})


server.listen(8000, () => {
    console.log('server started on port 8000')

})