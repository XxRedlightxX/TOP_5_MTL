import {defineStore} from "pinia";
import { useAuthStore } from "./auth";



export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            user : null,
            users : [],
            errors: {},
            validationErrors : {}
           
        }
    },

    getters : {
       
    },
    actions : {

        async getListUser() {
            const token = localStorage.getItem("token")
            if (token) {
                const res = await fetch("/api/activite", {
                    
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
           
            if (res.ok) {
                this.activities = data;
                return this.activities;
                
            }else if(data.errors) {
                this.errors= data.errors;
                console.log(data.errors);
            }        

            else {
                console.log("NOPE")
            }

            
            }
        },

        async modifyUser(formData) {
            const token = localStorage.getItem("token");
            const authStore = useAuthStore();
            if (token && authStore.user?.id) {
                const res = await fetch(`http://127.0.0.1:8000/api/user/${authStore.user.id}`, {
                method: "put",
                headers: {
                     'Content-Type': 'application/json', // Add this
                'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                   
                },
                body: JSON.stringify(formData), 
            });
             if (!res.ok) {
                const text = await res.text(); // debug pour voir la réponse Laravel
                throw new Error(`HTTP ${res.status}: ${text}`);
            }

            const data = await res.json();

            if (data.errors) {
                this.errors = data.errors;
                console.log("Validation errors:", data.errors);
                return null;
            } else {
                this.errors = {};
                this.user = data;
                return this.user;
            }
        }
    },

        async addImageProfile(formData) {
            const token = localStorage.getItem("token")
            const authStore = useAuthStore();
            if (token) {
                const res = await fetch(`http://127.0.0.1:8000/api/user/profile-picture`, {
                method: "POST",
                body: formData,
                headers: {
                    
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
             console.log("Full response:", data);
            if (!res.ok) {
                if (data.errors) {
                    this.validationErrors.value = data.errors;
                    console.error("Validation errors:", data.errors);
                }
                throw new Error(data.message || 'Upload failed');
                }

            if (data.avatar_url) {
                return data.avatar_url;
              
            }

            else if(data.errors) {
                this.errors= data.errors;
                console.log(data.errors);
            }       

        }
    },

        async getActivityById(activityId) {
            const token = localStorage.getItem("token")
            const res = await fetch(`/api/activity/${activityId}/comments`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();

            if (res.ok) {
                this.activity = data;
                console.log(this.activity)
                
                return data;
                
            }else if(data.errors) {
                    this.errors= data.errors;
                    console.log(data.errors);
            } 
        },

        async addCommentToEvent(formData, activityId) {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/activity/${activityId}/comments`,{
            method: "post",
            body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

        const data = await res.json();
        if (data.error) {
            this.error = data.error;
            console.log(this.error);
            return data.error;
        } else {
            this.errors = {};
            console.log(data)
            return data;

            
        }
    },

   async searchUsers(username) {
    const token = localStorage.getItem("token");
    if (!token) return [];
    
    try {
        const res = await fetch(`/api/user/search?username=${encodeURIComponent(username)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const response = await res.json();
        
        if (!res.ok || response.error) {
            this.errors = response.error || 'Search failed';
            return [];
        }
        
        this.errors = {};
        return response.data; 
                   
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }

}

        
        


        //Register
   
    },
});