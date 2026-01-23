import { EventModal } from 'Playwright/models/EventModal';
import { BaseApi } from './BaseApi';

export class EventApi extends BaseApi {

    async addEvent(pEvent : EventModal, token? : string) {
       return this.post('/api/user/activite', pEvent, { token });
    
    }
}