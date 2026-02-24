import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { EventApi } from 'Playwright/api/EventApi';
import { UserApi } from 'Playwright/api/UserApi';
import { validEvent, invalidEvent, emptyEvent, otherValidEvent } from 'Playwright/mockData/EventData';
import { validUser, validUserWithRegularRole, validOtherOrgUser } from 'Playwright/mockData/UserData';
import { createUser, deleteUser } from 'Playwright/helper/auth.helper';
import { EventModal } from 'Playwright/models/Event';
import { HttpStatus } from 'Playwright/helper/api/statusCodes';

let authApi: AuthApi;
let eventApi: EventApi;
let userApi: UserApi;

let orgUser: any;
let regularUser: any;
let otherOrgUser: any;
let currentEventData : any;

test.describe('Event Creation API Tests', () => {


    test.describe.configure({ mode: 'serial' });

  // -----------------------------
  // Setup and Teardown
  // -----------------------------
  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
    eventApi = new EventApi(request);

     currentEventData  = {
      ...validEvent,
      titre: `${validEvent.titre}_${Math.floor(Math.random() * 1000)}`
    };

    // Register users for tests
    orgUser = await createUser(authApi, validUser);
    otherOrgUser = await createUser(authApi, validOtherOrgUser);
    regularUser = await createUser(authApi, validUserWithRegularRole);
  });

  test.afterEach(async ({ request }) => {
    userApi = new UserApi(request);

    const usersToDelete = [orgUser, regularUser, otherOrgUser].filter(Boolean);

    // Clean up created users
    await Promise.all(
        usersToDelete.map(u =>
          deleteUser(userApi, u.id, u.token).catch(err => console.warn("Cleanup failed for", u.id, err))
        )
    );
  });

  // -----------------------------
  // Event Creation Tests
  // -----------------------------

  test('Scenario: Event creation fails without authentication token', async () => {
    // Given: an event payload and no auth token
    const event = new EventModal({ ...validEvent.payload });

    // When: attempting to create the event
    const res = await eventApi.addEvent(event.payload, "");

    // Then: the API should return 401 Unauthorized
    expect(res.status()).toBe(HttpStatus.UNAUTHORIZED);
  });

  test('Scenario: Authenticated organisateur creates event successfully', async () => {
    // Given: a valid event payload and an authenticated organisateur
    const event = new EventModal({ ...validEvent.payload });

    // When: creating the event
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    // Then: the API should return 201 Created
    expect(res.status()).toBe(HttpStatus.CREATED);
  });

  test('Scenario: Event creation fails with invalid type/category by organisateur', async () => {
    // Given: a valid event payload with invalid type
    const event = new EventModal({ ...validEvent.payload });
    event.update({ type_name: "inactive" });

    // When: attempting to create the event
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    // Then: the API should return 422 Unprocessable Entity
    expect(res.status()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  test('Scenario: Event creation fails with valid data by a particulier', async () => {
    // Given: a valid event payload and a regular user (particulier)
    const event = new EventModal({ ...validEvent.payload });

    // When: attempting to create the event
    const res = await eventApi.addEvent(event.payload, regularUser.token);

    // Then: the API should return 403 Forbidden
    expect(res.status()).toBe(HttpStatus.FORBIDDEN);
  });

  test('Scenario: Event creation fails with invalid day format by organisateur', async () => {
    // Given: a valid event payload with invalid day
    const event = new EventModal({ ...validEvent.payload });
    event.update({ statut_journee: "inactive" });

    // When: attempting to create the event
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    // Then: the API should return 422 Unprocessable Entity
    expect(res.status()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  test('Scenario: Event creation fails with empty payload by organisateur', async () => {
    // Given: an empty event payload
    const event = new EventModal({ ...emptyEvent.payload });

    // When: attempting to create the event
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    // Then: the API should return 422 Unprocessable Entity
    expect(res.status()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  // -----------------------------
  // Event Deletion Tests
  // -----------------------------
  test('Scenario: Organisateur deletes own event successfully', async () => {
    // Given: an event created by the organisateur
    const event = new EventModal({ ...otherValidEvent.payload });
    const res = await eventApi.addEvent(event.payload, orgUser.token);
    const body = await res.json();
    
    const eventId = Array.isArray(body) ? body.at(-1).id : body.id;
    expect(res.status()).toBe(HttpStatus.CREATED);
    // When: the organisateur deletes the event
    const deleteRes = await eventApi.deleteEvent(eventId, orgUser.token);

    // Then: deletion should succeed with 200 OK
    expect(deleteRes.status()).toBe(HttpStatus.OK);
  });

  test('Scenario: Organisateur cannot delete event created by another organisateur', async () => {

    // Given: an event created by orgUser
    const res = await eventApi.addEvent(currentEventData, orgUser.token);
    const body = await res.json();
    console.log(body)
    const eventId = Array.isArray(body) ? body.at(-1).id : body.id;

    // When: another organisateur attempts to delete it
    const deleteRes = await eventApi.deleteEvent(eventId, otherOrgUser.token);

    // Then: deletion should fail with 403 Forbidden
    expect(deleteRes.status()).toBe(HttpStatus.FORBIDDEN);
  });

   test('Scenario: Delete non-existent event should return 404 NOT FOUND', async () => {
    const nonExistentEventId = "-33";

    // When: an organisateur attempts to delete a non-existent event
    const deleteRes = await eventApi.deleteEvent(nonExistentEventId, otherOrgUser.token);

    // Then: API should return 404 NOT FOUND
    expect(deleteRes.status()).toBe(HttpStatus.NOT_FOUND);
    });


  // -----------------------------
  // Event Modification Tests
  // -----------------------------
  test('Scenario: Organisateur modifies own event successfully', async () => {
    // Given: an event created by the organisateur
    

    const res = await eventApi.addEvent(currentEventData, orgUser.token);
    const body = await res.json();
  
    const eventId = Array.isArray(body) ? body.at(-1).id : body.id;

    // When: the organisateur modifies the event
    const modifyRes = await eventApi.modifyEvent(eventId, orgUser.token);

   
    // Then: modification should succeed with 202 Accepted
    expect(modifyRes.status()).toBe(HttpStatus.ACCEPTED);
  });

  test('Scenario: Organisateur cannot modify event created by another organisateur', async () => {
    // Given: an event created by orgUser
    const event = new EventModal({ ...validEvent.payload });
    const res = await eventApi.addEvent(currentEventData, orgUser.token);
    const body = await res.json();
    const eventId = Array.isArray(body) ? body.at(-1).id : body.id;

    // When: another organisateur attempts to modify it
    const modifyRes = await eventApi.modifyEvent(eventId, otherOrgUser.token);

    // Then: modification should fail with 403 Forbidden
    expect(modifyRes.status()).toBe(HttpStatus.FORBIDDEN);
  });


    test('Scenario: Modify non-existent event should return 404 NOT FOUND', async () => {
        // Given: a non-existent event ID
        const nonExistentEventId = "-33";

        // When: an organisateur attempts to modify it
        const modifyRes = await eventApi.modifyEvent(nonExistentEventId, otherOrgUser.token);

        // Then: the API should return 404 NOT FOUND
        expect(modifyRes.status()).toBe(HttpStatus.NOT_FOUND);
    });

});
