import {defineStore} from "pinia";
import { useAuthStore } from "./auth";

export const  useActivityStore = defineStore('activitiesStore', {
    state: () => {
        return {
             activities: [],
             user : null,
            activity: null,
            loading : false,
            filters: {
                daytime: "" ?? null,
                type: "",
                season: "",
                title: "",
            },
            errors: {},
           
        }
    },

    getters : {
       
    },
    actions : {

        async getActivities(dayTime) {

            const params = new URLSearchParams();
 
            const token = localStorage.getItem("token")
            for (const [key, value] of Object.entries(this.filters)) {
                if (value) {
                params.append(key, value);
               
                }
            }

            const res = await fetch(`/api/activite/filter?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            });
            
            const data = await res.json();
            console.log(data)
        
            if (res.ok) {
                this.activities = data;
                return this.activities;
                
            }else if(data.errors) {
                this.errors= data.errors;
                console.log(data.errors);
            }        

            else {
                 console.error("Error fetching activities", data);
            }

            
          
        },

        async getUserActivities() {
            const token = localStorage.getItem("token");

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

        async getByActivityByDayTime(dayTime) {
            const token = localStorage.getItem("token");

            // if no filter selected → fetch all events
            let url = "http://127.0.0.1:8000/api/activite/search";
            if (dayTime) {
                url += `?statut_journee=${dayTime}`;
            }

            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            const data = await res.json();

            if (data.errors) {
                this.errors = data.errors;
                return data.errors;
            } else {
                this.errors = {};
                console.log(data)
                return data;

            }
        },

        async addEvent(formData) {
            const token = localStorage.getItem("token");
            const res = await fetch("http://127.0.0.1:8000/api/user/activite", {
                method: "POST",
                body: formData,
                headers: {
                    
                    'Authorization': `Bearer ${token}`
                },
              
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
        },

         async deleteEvent(activity) {
            const token = localStorage.getItem("token");
            const authStore = useAuthStore();
            if(authStore.user.id === activity.utilisateur_id) {
                const res = await fetch(`/api/user/activite/${activity.id}`, {
                method: "delete",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            
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

            } else {
                console.log("Not Allowd")
            }
           
        },


         /*async getActivitiesFilter(dayTime) {

            let query = new URLSearchParams(this.filters).toString();
            const filter = `/filter?${query}`
            const token = localStorage.getItem("token")
            const res = await fetch(`/api/activite${filter}`, {
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

            
          
        },*/

        
        


        //Register
   
    },
});