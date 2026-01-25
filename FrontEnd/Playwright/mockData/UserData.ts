import { User } from "Playwright/models/User";

export const validUser = new User({
    id : null,
  username: `user_${Date.now()}`,
  email: `userOrg_${Date.now()}@gmail.com`,
  num_tel: '5142229495',
  type_utilisateur: 'organisateur',
  password: '123',
  password_confirmation: '123'
});

export const validUserWithRegularRole = new User({
    id : null,
  username: `userReg_${Date.now()}`,
  email: `userReg_${Date.now()}@gmail.com`,
  num_tel: '5142229495',
  type_utilisateur: 'particulier',
  password: '1234',
  password_confirmation: '1234'
});


export const newUser = new User({
    id : null,
  username: `user_${Date.now()}`,
  email: `user_${Date.now()}@gmail.com`,
  num_tel: '5143819396',
  type_utilisateur: 'organisateur',
  password: '123',
  password_confirmation: '123'
});