import {defineStore} from "pinia";

export const  useActivityStore = defineStore('activitiesStore', {
    state: () => {
        return {
             activities: [],
             user : null,
            activity: null,
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

        async addEvent(formData) {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/activite", {
                method : "post",
                headers: {
                     'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if(data.errors) {
                this.errors = data.errors;
                return data.errors
            } else {
                this.errors = {};
                console.log(data)
                return data;
            }
        }

        
        


        //Register
   
    },
});