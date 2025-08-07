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
           try {
  
            const token = localStorage.getItem('token');
    
            
            if (!token) {
            throw new Error('No authentication token found');
            }

           // Fetch de l objet provenant du Backend
                const response = await fetch("/api/user", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                });

                
                if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch user data');
                }

                // On recupere l objet user et le retourn
                const userData = await response.json();
                this.user = userData;
                
                return userData;
                
            } catch (error) {
                console.error('Failed to get user:', error);
                
                // Ca Clean la le cache lorsque la requete a failed
                if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                localStorage.removeItem('token');
                }
                
                throw error; // Re-throw to let calling code handle it
            }
        },

        
        


        //Register
           async authenticate(apiRoute, formData) {
                const res = await fetch(`/api/${apiRoute}`, {
                    method: "post",
                    body: JSON.stringify(formData),
                });

                const data = await res.json();
                if (data.errors) {
                    this.errors = data.errors;
                } else {
                    this.errors = {};
                    localStorage.setItem("token", data.token);
                    this.user = data.user;
                    this.router.push({ name: "home" });
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