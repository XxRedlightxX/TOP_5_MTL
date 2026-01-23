import { User } from "Playwright/models/User";
import { EventModal } from "Playwright/models/EventModal";

export const validEvent = new EventModal({
  titre: `Event_${Date.now()}`,
  date_debut: '2025-12-19 16:40:00',
  date_fin : '2025-09-30 21:00:00',
  statut_journee: 'jour',
  saison_name: 'Hiver',
  type_name : 'Show',
  description: 'This is a test event created by automation',
  lieu: 'Montreal',
  latitude: '45.5017',
  longitude: '-73.5673'
})

export const invalidEvent = new EventModal({
  titre: `Event_${Date.now()}`,
  date_debut: '2025-12-19 16:40:00',
  date_fin : '2025-09-30 21:00:00',
  statut_journee: 'Blackout',
  saison_name: 'Hiver',
  type_name : 'Show',
  description: 'This is a test event created by automation',
  lieu: 'Montreal',
  latitude: '45.5017',
  longitude: '-73.5673'
})