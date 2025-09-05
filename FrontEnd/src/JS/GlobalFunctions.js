

export const formatDateSpecial  = (dateString) => {
  const date = new Date(dateString);
  const mois = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  return `${mois[date.getMonth()]} ${date.getDate()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}${date.getHours() >= 12 ? 'pm' : 'am'}`;
}

export const formatDateApi = (dateInput, timeInput) => {
    if (!dateInput || !timeInput) return null;
  
    
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
   
    const [hours, minutes] = timeInput.split(':');
    const time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    

    return `${year}-${month}-${day} ${time}`;

}