const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'interventions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.forEach(intervention => {
    if (
        typeof intervention.internalSystem === 'string' &&
        /^[a-fA-F0-9]{24}$/.test(intervention.internalSystem)
    ) {
        intervention.internalSystem = { $oid: intervention.internalSystem };
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Conversión completada.');