import {defineStore} from "pinia";




export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
  
            error: {},
           
        }
    },

    getters : {
       
    },
    actions : {

        async getUser() {
            if (localStorage.getItem("token")) {
                const res = await fetch("/api/user", {
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
            
        }

             /* try {
        const res = await fetch(`/api/${apiRoute}`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

   

        const data = await res.json();
        
        if (data.errors) {
            this.errors = data.errors;
           this.isLogged = false; // Explicitly return false on failure
        } else {
            this.errors = {};
            localStorage.setItem("token", data.token);
            this.user = data.user;
            this.isLogged = true; // Explicitly return true on success
        }
    } catch (error) {
        console.error('Authentication error:', error);
        this.errors = { network: 'Failed to connect to server' };
       this.isLogged = false;
    }

    return this.isLogged;*/
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