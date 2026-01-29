import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { EventApi } from 'Playwright/api/EventApi';
import { validEvent, invalidEvent, emptyEvent } from 'Playwright/mockData/EventDats';
import { validUser, validUserWithRegularRole, validOtherOrgUser } from 'Playwright/mockData/UserData';
import { UserApi } from 'Playwright/api/UserApi';
import { createUser, deleteUser } from 'Playwright/helper/auth.helper';
import { User } from 'Playwright/models/User';
import { EventModal } from 'Playwright/models/EventModal';


 let authApi: AuthApi;
 let eventApi : EventApi;
 let userApi : UserApi;
/*let authToken: string;
let userId : string;

let userId2 : string;
let authToken2 : string;
*/

let orgUser;
let regularUser;
let otherOrgUser;

test.describe('Event Creation API Tests', () => {

    test.beforeEach(async ({ request }) => {
        authApi = new AuthApi(request);
        eventApi = new EventApi(request);
        //userApi = new UserApi(request);
        
        /*if( orgUser != null || regularUser != null ) {
            await deleteUser(userApi, orgUser.id, orgUser.token);
            await deleteUser(userApi, regularUser.id, regularUser.token);
        }*/
       

        /*const res = await authApi.register(validUser);
        const body =  await res.json();*/

        orgUser = await createUser(authApi, validUser);
        otherOrgUser = await createUser(authApi, validOtherOrgUser);
        regularUser = await createUser(authApi, validUserWithRegularRole);
        
    });

    test.afterEach(async ({ request }) => {
        userApi = new UserApi(request);
        const usersToDelete = [orgUser, regularUser, otherOrgUser].filter(Boolean);
        //await deleteUser(userApi,regularUser.id,regularUser.token);
        //await deleteUser(userApi,orgUser.id,orgUser.token);
        await Promise.all(
            usersToDelete.map(u =>
            deleteUser(userApi, u.id, u.token)
                .catch(err => console.warn("Cleanup failed for", u.id, err))
            )
        );
        //const userApi = new UserApi(request);
        //const test = await userApi.deleteUser(userId, authToken);
        //const body = await test.json();
       
      });

    test('Event Creation without token', async () => {
        const event = new EventModal({ ...validEvent.payload });
        const res = await eventApi.addEvent(event.payload, "");
        expect(res.status()).toBe(401);

    });

   test('Event Creation with auth User and has organisateur role', async () => {
    // 1. Login
    const response = await authApi.login(
        validUser.email,
        validUser.password,
        200 
    );
    const body = await response.json();
    
    // 2. Create event
    const event = new EventModal({ ...validEvent.payload }); // or factory
    const res = await eventApi.addEvent(event.payload, body.token);
    
    // 3. Get response body with await
    const responseBody = await res.json();  
    console.log(responseBody, "Response body");
    
    // 4. Assert
    expect(res.status()).toBe(201);
});

test('When an authenticated user with organisateur role creates an event with nonexistent type/category format, Then the system should return a 422 validation error', async () => {
    // 1. Login
    
    
    // 2. Create event
    const event = new EventModal({ ...validEvent.payload }); // or factory
    event.update({ type_name: "inactive" });
    const res = await eventApi.addEvent(event.payload, orgUser.token);
    
    // 3. Get response body with await
    const responseBody = await res.json();  
    console.log(responseBody, "Response body");
    
    // 4. Assert
    expect(res.status()).toBe(422);
});


test('When an authenticated user with parrticuler role creates an event with valid data format, Then the system should return a 401 validation error', async () => {
   
    // 2. Create event
    const event = new EventModal({ ...validEvent.payload }); // or factory
    
    const res = await eventApi.addEvent(event.payload, regularUser.token);
    
    // 4. Assert
    expect(res.status()).toBe(403);
});

test('When an authenticacted user with organisateur role creates an event with invalid day format, Then the system should return a 422 validation error', async () => {
   
    const event = new EventModal({ ...validEvent.payload }); // or factory
    event.update({ statut_journee: "inactive" });

    const res = await eventApi.addEvent(event.payload, orgUser.token);
    
    // 4. Assert
    expect(res.status()).toBe(422);
});

test('When an authenticacted user with organisateur role creates an event with empty data format, Then the system should return a 422 validation error', async () => {
   
    const event = new EventModal({ ...emptyEvent.payload }); // or factory
    const res = await eventApi.addEvent(event.payload, orgUser.token);
    
    // 4. Assert
    expect(res.status()).toBe(422);
});

test('When an authenticacted user with organisateur role delete is own event, Then the system should return a 200 ', async () => {
   
    const event = new EventModal({ ...validEvent.payload }); // or factory
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    const body = await res.json();
    const response =await eventApi.deleteEvent(body[1].id ,orgUser.token )
    
    // 4. Assert
    expect(response.status()).toBe(200);
});


test('When an authenticacted user with organisateur role delete tries to delete event that doesnt belong to him, Then the system should return a 403 ', async () => {
   
    const event = new EventModal({ ...validEvent.payload }); // or factory
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    const body = await res.json();
    const test =await eventApi.deleteEvent(body[1].id ,otherOrgUser.token )
    
    // 4. Assert
    expect(test.status()).toBe(403);
});

test('When an authenticacted user with organisateur role  tries to modify event that belong to him, Then the system should return a 403 ', async () => {
   
    const event = new EventModal({ ...validEvent.payload }); 
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    const body = await res.json();
    console.log(body);
    const test =await eventApi.modifyEvent(body[1].id ,orgUser.token )
    
    // 4. Assert
    expect(test.status()).toBe(202);
});


test('When an authenticacted user with organisateur role  tries to modify event that doesnt belong to him, Then the system should return a 403 ', async () => {
   
    const event = new EventModal({ ...validEvent.payload }); // or factory
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    const body = await res.json();
    const test =await eventApi.modifyEvent(body[1].id ,otherOrgUser.token )
    
    // 4. Assert
    expect(test.status()).toBe(403);
});


test('When an authenticacted user with organisateur role  tries to modify event that belong to him, Then the system should return a 200 ', async () => {
   
    const event = new EventModal({ ...validEvent.payload }); // or factory
    const res = await eventApi.addEvent(event.payload, orgUser.token);

    const body = await res.json();
    const test =await eventApi.modifyEvent(body[1].id ,orgUser.token )
    
    // 4. Assert
    expect(test.status()).toBe(202);
});







});