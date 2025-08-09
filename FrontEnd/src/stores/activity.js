import {defineStore} from "pinia";

export const  useActivityStore = defineStore('activitiesStore', {
    state: () => {
        return {
             activities: [],
             user : null,
  
            errors: {},
           
        }
    },

    getters : {
       
    },
    actions : {

        async getActivities() {
            const token = localStorage.getItem("token")
            if (token) {
                const res = await fetch("/api/activite", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log()
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

        
        


        //Register
   
    },
});