export type UserPayload = {
    id : number;
  username: string;
  email: string;
  num_tel: string;
  type_utilisateur: string;
  password: string;
  password_confirmation: string;
};


export class User {
     id : number;
    username?: string;
    email?: string;
    num_tel?: string;
    type_utilisateur?: string;
    password?: string;
    password_confirmation?: string;

   constructor(payload: UserPayload) {
    this.id = payload.id;
    this.username = payload.username;
    this.email = payload.email;
    this.num_tel = payload.num_tel;
    this.type_utilisateur = payload.type_utilisateur;
    this.password = payload.password;
    this.password_confirmation = payload.password_confirmation;
  }
}