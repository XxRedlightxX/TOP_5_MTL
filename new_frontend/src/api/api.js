export async function apiRequest(url, options = {}) {
  try {
    const token = localStorage.getItem("token");
    
    // Create headers object - start with Authorization only
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
     // Vérifie la requête si elle contient body qui possède une classe FormData ou pas si c'est le cas il va ajouter le header  
    if (options.body && !(options.body instanceof FormData) && !options.headers?.['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    
    const res = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers, 
      },
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

/**
 * Construit une chaîne de requête URL à partir d'un objet
 * Format de sortie: ?cle1=valeur1&cle2=valeur2
 * 
 * @param {Object} obj - Objet contenant les paramètres à convertir
 * @returns {string} - Chaîne de requête URL ou chaîne vide si aucun paramètre valide
 */
export function buildQueryString(obj) {
  let query = '';
  let first = true;
  
  for (const key in obj) {
    const value = obj[key];
    if (value != null && value !== '') {
      if (first) {
        query = `?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        first = false;
      } else {
        query += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    }
  }
  
  return query;
}
