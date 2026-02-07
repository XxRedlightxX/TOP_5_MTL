import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { EventApi } from 'Playwright/api/EventApi';
import { validEvent, invalidEvent, emptyEvent } from 'Playwright/mockData/EventDats';
import { validUser, validUserWithRegularRole, validOtherOrgUser } from 'Playwright/mockData/UserData';
import { UserApi } from 'Playwright/api/UserApi';
import { createUser, deleteUser } from 'Playwright/helper/auth.helper';
import { EventModal } from 'Playwright/models/EventModal';
import {User} from 'Playwright/models/User'


let userApi : UserApi;
let eventApi : EventApi;
let authApi: AuthApi;


let orgUser;
let regularUser;
let otherOrgUser;

test.describe('User Creation API Tests', () => {

    test.beforeEach(async ({ request }) => {
        authApi = new AuthApi(request);
        eventApi = new EventApi(request);
        userApi = new UserApi(request);
        
        orgUser = await createUser(authApi, validUser);
        otherOrgUser = await createUser(authApi, validOtherOrgUser);
        regularUser = await createUser(authApi, validUserWithRegularRole);
        
    });

    test.afterEach(async ({ request }) => {
        userApi = new UserApi(request);
        const usersToDelete = [orgUser, regularUser, otherOrgUser].filter(Boolean);
        await Promise.all(
            usersToDelete.map(u =>
            deleteUser(userApi, u.id, u.token)
                .catch(err => console.warn("Cleanup failed for", u.id, err))
            )
        );
        
      });

test('Given an user, When sending a PUT request to modify user with updated name but without authentication token, Then API should respond with 401 Accepted status', async () => {
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });
    const res = await userApi.modifyUser(null, authUser.payload, "");
    const body = await res.json();

    expect(body).toHaveProperty("message", "Unauthenticated.");
    expect(res.status()).toBe(401);
});

   test('Given an auth user, When sending a PUT request to modify user with updated name , Then API should respond with 202 Accepted status', async () => {
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });
    const res = await userApi.modifyUser(orgUser.id, authUser.payload, orgUser.token);
    const body = await res.json();

    expect(body).toHaveProperty("name", "Jean-Gabriel");
    expect(res.status()).toBe(202);
});

 test('Given an auth user, When sending a PUT request tries to modify that doesnt belong to him with updated name , Then API should respond with 403 Forbidden status', async () => {
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });
    
    const res = await userApi.modifyUser(orgUser.id, authUser.payload, regularUser.token);
    //Assert
    //expect(body).toHaveProperty("name", body.name);
    expect(res.status()).toBe(403);
});


test('Given an user, When sending a PUT request tries to modify that doesnt belong to him with updated name , Then API should respond with 401 Unauthorized status', async () => {
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });
    
    const res = await userApi.modifyUser(orgUser.id, authUser.payload, "");

    //Assert
    expect(res.status()).toBe(401);
});

test('Given an user, When sending a DELETE request tries to delete that doesnt belong to him with updated name and without authentication token, , Then API should respond with 401 Unauthorized status', async () => {
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });
    
    const res = await userApi.deleteUser(orgUser.id, "");

    //Assert
    expect(res.status()).toBe(401);
});


test('Given an auth user, When sending a DELETE request tries to delete that does belong to him , Then API should respond with 200 OK status', async () => { 
    const res = await userApi.deleteUser(orgUser.id, orgUser.token);
    const body = await res.json();
    console.log(body)
    
    //Assert
    expect(res.status()).toBe(200);
});


test('Given an auth user, When sending a DELETE request that doesnt belong to him , Then API should respond with 200 Unauthorized status', async () => {
   
    
    const res = await userApi.deleteUser(orgUser.id, regularUser.token);
    const body = await res.json();
    console.log(body)
    
    //Assert
    expect(res.status()).toBe(403);
});



    







});