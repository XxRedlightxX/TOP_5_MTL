import { EventModal, EventPayload } from 'Playwright/models/EventModal';
import { BaseApi } from './BaseApi';
import { APIResponse } from '@playwright/test';

export class EventApi extends BaseApi {

    async addEvent(pEvent : EventPayload, token? : string) {
       return this.post('/api/user/activite', pEvent, { token });
    
    }

    async deleteEvent(eventId: string | number, token?: string) {
        return this.delete(`/api/activite/${eventId}`, token)
    }

     async modifyEvent(eventId: string | number, token?: string) {
        return this.modify(`/api/activite/${eventId}`, token)
    }
}