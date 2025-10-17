import fs from 'fs';
import path from 'path';

// Define las rutas de entrada y salida
const csvFilePath = path.join(process.cwd(), 'public', 'AgenteVertical-AtencinCliente-SoporteTcnico-VentasMarketing-RRHH-FinanzasLegal-IndustriaProduccin-LogsticaTransporte-EducacinFormacin-SaludMedicina-ServiciosPblicosSmartCities-ComercioElectrnicoRetail-EventosOcio.csv');
const jsonFilePath = path.join(process.cwd(), 'src/lib/agentes-database.json');

try {
  console.log(`Leyendo CSV desde: ${csvFilePath}`);
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  const lines = csvData.trim().split('\n');
  // Limpia las comillas de los encabezados
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const agentColumnName = headers[0];

  const agents = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const agentName = values[0];
    
    const verticals = {};
    for (let j = 1; j < headers.length; j++) {
      verticals[headers[j]] = parseInt(values[j], 10) || 0;
    }

    agents.push({
      name: agentName,
      verticals: verticals,
    });
  }

  console.log(`Procesados ${agents.length} agentes. Escribiendo JSON en: ${jsonFilePath}`);
  fs.writeFileSync(jsonFilePath, JSON.stringify(agents, null, 2));
  console.log('¡Archivo JSON generado con éxito!');

} catch (error) {
  console.error('Error durante el procesamiento del CSV:', error);
  process.exit(1);
}
