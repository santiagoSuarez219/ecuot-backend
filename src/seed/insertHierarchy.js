const fs = require('fs');
const path = require('path');

// Mapeo: nombre de jerarquía → ObjectId
const hierarchyMap = {
    "Ciudad": "6894c5d74cad0142c0ca580b",
    "Barrial y Suburbano": "6894c5d74cad0142c0ca580c",
    "Metropolitano y Regional": "6894c5d74cad0142c0ca580d",
    "Zonal y Corregimental": "6894c5d74cad0142c0ca580e"
};

const filePath = path.join(__dirname, 'interventions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.forEach(intervention => {
    // Convertir hierarchy si es string válido en el diccionario
    if (
        typeof intervention.hierarchy === 'string' &&
        hierarchyMap[intervention.hierarchy]
    ) {
        intervention.hierarchy = { $oid: hierarchyMap[intervention.hierarchy] };
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Conversión completada.');
