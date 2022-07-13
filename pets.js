import fs from 'fs';
const subcommand = process.argv[2]


switch (subcommand) {
    case 'read': {
        const index = process.argv[3]
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            data = JSON.parse(data);
            if (!index) { //if no index passed in
                console.log(data)
            }  else if (!(data[index])) { //if index out of bounds
                console.error('Usage: node pets.js read INDEX');
                process.exit(1)
            } else if (index) { //if all good
                console.log(data[index]);
            }
        })
        break;
    } 
    case 'create': {
        const age = parseInt(process.argv[3]);
        const kind = process.argv[4];
        const name = process.argv[5];
        if (!age || !kind || !name) {
            console.error('Usage: node pets.js create AGE KIND NAME')
        } else {
            fs.readFile('./pets.json', 'utf-8', (err, data) => {
                let pet = {
                    "age": age, 
                    "kind": kind,
                    "name": name
                }
                data = JSON.parse(data)
                data.push(pet)
                fs.writeFile('./pets.json', JSON.stringify(data), (err) =>{
                    if (err) {
                        console.error(err)
                        process.exit(1)
                    } else {
                        console.log(pet)
                    }
                } )
            })
        }
        break;

    }
    case 'update': {
        const index = parseInt(process.argv[3])
        const age = parseInt(process.argv[4]);
        const kind = process.argv[5];
        const name = process.argv[6];
        if ((!index && index !==0) || !age || !kind || !name) {
            console.error('Usage: node pets.js update INDEX AGE KIND NAME')
            process.exit(1)
        } else {
            fs.readFile('./pets.json', 'utf-8', (err, data) => {
                data = JSON.parse(data)
                data[index] = {
                    "age": age, 
                    "kind": kind,
                    "name": name
                }
                
                fs.writeFile('./pets.json', JSON.stringify(data), (err) =>{
                    if (err) {
                        console.error('error')
                    } else {
                        console.log(data[index])
                    }
                } )
            })
        }
        break;

    }
    case 'destroy': {
        const index = parseInt(process.argv[3])
        if (!index && index !==0) {
            console.error('Usage: node pets.js destroy INDEX')
            process.exit(1)
        } else {
            fs.readFile('./pets.json', 'utf-8', (err, data) => {
                data = JSON.parse(data)
                data.splice(index, 1)
                fs.writeFile('./pets.json', JSON.stringify(data), (err) =>{
                    if (err) {
                        console.error('error')
                    } else {
                        console.log(data)
                    }
                } )
            })
                
            }

            
            break;
    }
    default: {
        console.error('Usage: node pets.js [read | create | update | destroy]')
    }
}
    
