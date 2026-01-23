export type EventPayload = {
    titre: string;
    date_debut: string;
    date_fin: string;
    statut_journee: string;
    saison_name: string;
    description: string;
    type_name : string;
    lieu: string;
    latitude : string;
    longitude : string;
};

export class EventModal {
 
    titre?: string;
    date_debut?: string;
    date_fin?: string;
    statut_journee?: string;
    saison_name?: string;
    description?: string;
    type_name? : string;
    lieu?: string;
    latitude?: string;
    longitude?: string;

   constructor(payload: EventPayload) {
    
    this.titre = payload.titre;
    this.date_debut = payload.date_debut;
    this.date_fin = payload.date_fin;
    this.statut_journee = payload.statut_journee
    this.saison_name = payload.saison_name;
    this.description = payload.description;
    this.type_name =  payload.type_name;
    this.lieu = payload.lieu;
    this.latitude = payload.latitude;
    this.longitude = payload.longitude;
  }
}


