const fs = require('fs');
const path = require('path');

// Mapeo: nombre de timeStressOcurrence → ObjectId
const timeStressOcurrenceMap = {
    "Proyectado": "6894c9951cdc31e71d91ad09",
    "Ejecución": "6894c9951cdc31e71d91ad0a",
    "Apropiación": "6894c9951cdc31e71d91ad0b",
    "Proyectado/Ejecución": "6894c9951cdc31e71d91ad0c",
    "N/A": "6894c9951cdc31e71d91ad0d"
};

const filePath = path.join(__dirname, 'conflicts.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.forEach(conflict => {
    if (
        typeof conflict.timeStressOccurrence === 'string' &&
        timeStressOcurrenceMap[conflict.timeStressOccurrence]
    ) {
        conflict.timeStressOccurrence = { $oid: timeStressOcurrenceMap[conflict.timeStressOccurrence] };
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Conflictos actualizados con ObjectId en timeStressOcurrence.');
