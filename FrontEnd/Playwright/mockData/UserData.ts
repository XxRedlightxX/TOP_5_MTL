import { User } from "Playwright/models/User";

export const validUser = new User({
    id : null,
    name : `user_NameOrg_${Date.now()}`,
  username: `userOrg_${Date.now()}`,
  email: `userOrg_${Date.now()}@gmail.com`,
  num_tel: '5142229495',
  type_utilisateur: 'organisateur',
  password: '123',
  password_confirmation: '123'
});

export const validOtherOrgUser= new User({
  id : null,
  name : `user_NameOtherOrg_${Date.now()}`,
  username: `userOtherOrg_${Date.now()}`,
  email: `userOtherOrg_${Date.now()}@gmail.com`,
  num_tel: '5142229495',
  type_utilisateur: 'organisateur',
  password: '123',
  password_confirmation: '123'
});

export const validUserWithRegularRole = new User({
    id : null,
    name : `user_NameRegOrg_${Date.now()}`,
  username: `userReg_${Date.now()}`,
  email: `userReg_${Date.now()}@gmail.com`,
  num_tel: '5142229495',
  type_utilisateur: 'particulier',
  password: '1234',
  password_confirmation: '1234'
});


export const newUser = new User({
    id : null,
    name : `user_New_${Date.now()}`,
  username: `userNew_${Date.now()}`,
  email: `user_${Date.now()}@gmail.com`,
  num_tel: '5143819396',
  type_utilisateur: 'organisateur',
  password: '123',
  password_confirmation: '123'
});

export const getFreshUser = () => ({
  username: `user_${Math.random().toString(36).substring(7)}`,
  email: `test_${Date.now()}_${Math.random().toString(36).substring(7)}@example.com`,
  password: "SafePassword123!"
});