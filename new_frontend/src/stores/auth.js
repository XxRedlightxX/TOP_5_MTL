import {defineStore} from "pinia";
import { apiRequest, buildQueryString } from "../api/api";
export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
      errors: {},
    }
  },

  getters : {},
  actions : {
    async getUser() {

      /*if (localStorage.getItem("token")) {
        const res = await fetch("/api/user/activite", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.user = data;
        }
      }*/
     try {
      if(localStorage.getItem("token")) {
        this.user = await apiRequest("/api/user/activite");
        
      }
     } catch (err) {
      this.errors = err;
     }


    },

    //Register
    async authenticate(apiRoute, formData) {
      /*const res = await fetch(`/api/${apiRoute}`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.error) {
        this.error = data.error;
        console.log(this.error);
        return false
      } else {
        this.errors = {};
        localStorage.setItem("token", data.token);
        this.user = data.user;
        return true;
      }*/
      try {
        const data = await apiRequest(`/api/${apiRoute}`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        this.errors = {};
        localStorage.setItem("token", data.token);
        this.user = data.user;
        return true;
      } catch (err) {
        this.errors = err;
      }

    },

    async getUserActivities() {
      /*const token = localStorage.getItem("token")
      if (token) {
        const res = await fetch("/api/user/activite", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await res.json();

        if (res.ok) {
          this.user = data;
          console.log(this.user);
          return this.user;
        }else if(data.errors) {
          this.errors= data.errors;
          console.log(data.errors);
        }
      }*/
      try {
        const token = localStorage.getItem("token")
        if(token) {
          return this.user = await apiRequest(`/api/user/activite`);
        }
      } catch (err) {
      this.errors = err;
     }

    },

    async logout() {

      try {
        const data = await apiRequest(`/api/logout`, {
          method: "POST",
        });
        this.errors = {};
        localStorage.removeItem("token");
        this.user = null;
        return true;
      } catch (err) {
        this.errors = err;
      }

      /*const res = await fetch("/api/logout", {
        method: "post",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        this.user = null;
        this.errors = {};
        localStorage.removeItem("token");
      }*/
  

    },
  },
});