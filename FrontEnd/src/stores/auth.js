import {defineStore} from "pinia";




export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
  
            errors: {},
           
        }
    },

    getters : {
       
    },
    actions : {

        async getUser() {
            if (localStorage.getItem("token")) {
                const res = await fetch("/api/user/activite", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                this.user = data;
            }
        }
        },

        
        


        //Register
    async authenticate(apiRoute, formData) {

        const res = await fetch(`/api/${apiRoute}`, {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                    'Content-Type': 'application/json',
  }         ,
        });

        const data = await res.json();
        if (data.errors) {
            // Validation errors (like missing email, bad format, etc.)
            this.errors = data.errors;
            console.log(this.errors);
            return false;
        } else if (data.error) {
            // Authentication error (invalid credentials)
            this.errors = { general: [data.error] };
             console.log(this.errors);
            return false;
        } else {
            // Success
            this.errors = {};
            localStorage.setItem("token", data.token);
            this.user = data.user;
            return true;
        }

    },

     async getUserActivities() {
            const token = localStorage.getItem("token")
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

        }
    },

     async logout() {
      const res = await fetch("/api/logout", {
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
        
      }
    },

    },
});