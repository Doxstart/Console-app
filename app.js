const { log } = require('console');
const fs = require('fs');

let data;

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
    //2) trasformare la stringa in un array di righe: (.split(/\r?\n/);)
    // righe = ["name,surname,yob,gender", "jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"]
    //3) separare la prima riga dalle successive
    // intestazione = "name,surname,yob,gender"
    // righe = ["jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"]
    //4) trasformare intestazione in un array:
    // intestazione = ["name,surname,yob,gender"]
    // righe = ["jing,wang,1993,female", "simone,maccarone,2003,male", "pietro,viglino,1988,male", "valentina,cherubini,2001,female"]
    //5) creare un array temporaneo
    //6) cicliamo le righe 
    //7) trasformiamo ogni riga in un array
    //8) creare un nuovo oggetto vuoto
    //9) ciclare su intestazione e aggiungere una propietà all'oggetto per ogni elemento di intestazione
    //10) aggiungere l'oggetto all'array temporaneo
    //11) fare stringify dell'array temporaneo
    //12) ritornare la stringa json
    let dataArray = data.split(/\r?\n/);

    let intestazione = dataArray.shift();
    console.log(intestazione);
    let intestazioneArray = intestazione.split(',');
    console.log(intestazioneArray);
    let tempArray = [];
    for (let i = 0; i < dataArray.length; i++) {
        const element = dataArray[i];
        dataArray[i] = element.split(',');
        console.log(dataArray);
        let tempObj = {};
        for (let j = 0; j < intestazioneArray.length; j++) {
            const element = intestazioneArray[j];
            tempObj[element] = dataArray[i][j];
        }
        tempArray.push(tempObj);
    }
    console.log(tempArray);
    let jsonString = tempArray.stringify();
    console.log(jsonString);
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