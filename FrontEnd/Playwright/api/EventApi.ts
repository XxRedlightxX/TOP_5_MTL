import { EventPayload } from 'Playwright/models/EventModal';
import { BaseApi } from './BaseApi';

export class EventApi extends BaseApi {

    /**
     * Adds a new event for the user
     * 
     * @param pEvent - The payload object containing all event details (title, date, location, etc.).
     * @param pToken - Optional authentication token for the API request.
     * @returns A Promise resolving to the API response.
    */
    async addEvent(pEvent : EventPayload, pToken? : string) {
       return this.post('/api/user/activite', pEvent, { pToken });
    }

    /**
     * Deletes an existing event by ID.
     * 
     * @param eventId - The ID of the event to delete (string or number).
     * @param token - Optional authentication token for the API request.
     * @returns A Promise resolving to the API response.
    */
    async deleteEvent(eventId: string | number, token?: string) {
        return this.delete(`/api/activite/${eventId}`, token)
    }

    /**
     * Modifies an existing event by ID.
     * 
     * @param eventId - The ID of the event to modify (string or number).
     * @param token - Optional authentication token for the API request.
     * @returns A Promise resolving to the API response.
    */
     async modifyEvent(eventId: string | number, token?: string) {
        return this.modify(`/api/activite/${eventId}`, token)
    }
}