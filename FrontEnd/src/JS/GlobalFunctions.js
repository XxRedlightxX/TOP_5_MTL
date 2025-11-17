

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


export const formatDate = (dateString) => {
  if (!dateString) return "";

  // Convert "YYYY-MM-DD HH:MM:SS" → ISO
  const iso = dateString.replace(" ", "T");
  const date = new Date(iso);

  if (isNaN(date)) return dateString;

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month} ${day} · ${hours}:${minutes}`;
};

export const formatDateComment = (dateString, actualLang) => {
  const safeString = dateString.replace(" ", "T");
  const date = new Date(safeString);
  const now = new Date();

  const diffMs = now - date;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffDays >= 1) {
    return actualLang 
      ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      : `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours >= 1) {
    return actualLang
      ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      : `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  } else if (diffMin >= 1) {
    return actualLang
      ? `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
      : `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
  } else {
    return actualLang ? 'just now' : 'à l’instant';
  }

}

export const formatDateEventStartandEnd = (aStartDateEvent, aEndDate) => {
  const start = new Date(aStartDateEvent);
  const end = new Date(aEndDate);

  const optionsDay = { month: "long", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };

  const startDay = new Intl.DateTimeFormat("en-US", optionsDay).format(start);
  const startTime = new Intl.DateTimeFormat("en-US", optionsTime).format(start);
  const endDay = new Intl.DateTimeFormat("en-US", optionsDay).format(end);
  const endTime = new Intl.DateTimeFormat("en-US", optionsTime).format(end);

  
  if (start.toDateString() === end.toDateString()) {
    return `${startDay} · ${startTime} - ${endTime}`;
  } else {
    return `${startDay} · ${startTime} - ${endDay} · ${endTime}`;
  }
}

export const getAvatarUrl = (imagePath) => {
  const defaultImage= "/src/assets/UnknowUser.jpg";
    
  if (!isValidImagePath(imagePath)) {
        return defaultImage;
    }
    
    if (isFullUrl(imagePath)) {
        return imagePath;
    }
    return `${import.meta.env.VITE_API_BASE_URL}${imagePath}` ;

}

export const getEventUrl = (imagePath) => {
  const defaultImage = "/src/assets/Curtain.jpg";
    
    if (!isValidImagePath(imagePath)) {
        return defaultImage;
    }
    
    if (isFullUrl(imagePath)) {
        return imagePath;
    }
    
    return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;

}

const isValidImagePath = (path) => {
    if (!path || typeof path !== 'string') return false;
    if (path.trim() === '') return false;
    if (path === 'null' || path === 'undefined') return false;
    
    // Check for common image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext => 
        path.toLowerCase().includes(ext)
    );
    
    return hasImageExtension;
}

const isFullUrl = (path) => {
    return path.startsWith('http') || 
           path.startsWith('data:') || 
           path.startsWith('blob:') || 
           path.startsWith('/');
}

export const formatDateEventEndDate = (startDateTime, hours) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + (hours * 60 * 60 * 1000)); 
    
  
    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, '0');
    const day = String(endDate.getDate()).padStart(2, '0');
    const hoursFormatted = String(endDate.getHours()).padStart(2, '0');
    const minutes = String(endDate.getMinutes()).padStart(2, '0');
    const seconds = String(endDate.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hoursFormatted}:${minutes}:${seconds}`;
};