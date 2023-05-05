const { log } = require('console');
const fs = require('fs');
const { json } = require('stream/consumers');

let data;

console.log(process.argv);

try {
    data = fs.readFileSync('./data/test.csv', 'utf8');
    console.log('Csv letto:', data);
    const json = parseCsvToJSON(data);
    writeJsonToFile(json);
} catch (err) {
    console.error(err);
}

function parseCsvToJSON(data){

     //1) data = "name,surname,yob,gender\njing,wang,1993,female\nsimone,maccarone,2003,male\npietro,viglino,1988,male\nvalentina,cherubini,2001,female"
     console.log('csv in stringa', data);
     //2) trasformare la stringa in un array di righe: (.split(/\r?\n/);)
     //   righe = ["name,surname,yob,gender", "jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"];
     const rows = data.split(/\r?\n/);
     //3) separare la prima riga dalle successive:
     //   intestazione = "name,surname,yob,gender"
     //   righe = ["jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"];
     const headers = rows.shift();
     //4) trasformare intestazione in un array:
     //   intestazione = ["name","surname","yob","gender"]
     //   righe = ["jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"];
     const headersArray = headers.split(',');
     //5) creare un array temporaneo
     const tempArray = [];
     //6) cicliamo le righe
     //7) trasformiamo la riga in un array
     // 8) creare un nuovo oggetto vuoto
     // 9) ciclare su intestazione e aggiungere una proprietà all'oggetto per ogni elemento di intestazione
     // 10) aggiungere l'oggetto all'array temporaneo
     for (let i = 0; i < rows.length; i++) {
         const row = rows[i];
         const rowArray = row.split(',')
         const obj = {};
         for (let j = 0; j < headersArray.length; j++) {
             const key = headersArray[j];
             const value = rowArray[j];
             obj[key] = value;
         }
         tempArray.push(obj);
     }
     // 11) fare strigify dell'array temporaneo
     const jsonString = JSON.stringify(tempArray);
     // 12) ritornare la stringa json
     return jsonString
     // return JSON.stringify(data.split(/\r?\n/).map((r, i, a) => r.split(',').reduce((p, c, i) => ({...p, [a[0].split(',')[i]]: c}), {} )).slice(1))

}

function writeJsonToFile(json){
    let contest = 'ciao'
    try {
        fs.writeFileSync('./output/test.json', contest);
        // file written successfully
    } catch (err) {
        console.error(err);
    }

}