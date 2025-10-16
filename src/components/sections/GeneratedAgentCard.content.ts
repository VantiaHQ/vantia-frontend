export const externalHeading = 'Tu Agente';

export const viewAgentTooltip = 'Ver Agente';
export const savingsTooltip = 'Ahorro';
export const deleteTooltip = 'Eliminar';

export const alertDialogTitle = '¿Estás absolutamente seguro?';
export const alertDialogDescription = 'Esta acción eliminará la referencia a este agente de tu navegador. No podrás recuperarla a menos que generes el agente de nuevo.';
export const alertDialogCancelButton = 'Cancelar';
export const alertDialogActionButton = 'Eliminar';

export const capitalizeFirstWord = (str: string) => {
  if (!str) return '';
  const words = str.split(' ');
  if (words.length === 0) return '';
  return words[0].charAt(0).toUpperCase() + words[0].slice(1) + (words.length > 1 ? ' ' + words.slice(1).join(' ') : '');
};
