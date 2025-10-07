import {defineStore} from "pinia";
import { useAuthStore } from "./auth";



export const useFriendStore = defineStore('friendStore', {
    state: () => {
        return {
            followers : [{}],
            followings : [],
            errors: {},
            validationErrors : {},
            isLoading : false
           
        }
    },

    getters : {
        followersCount: (state) => state.followers.length
       
    },
    actions : {

        async getListUserFollowers(apiRoute) {
            const token = localStorage.getItem("token")
            if (token) {
                const res = await fetch(`/api/${apiRoute}`, {
                    
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
           
            if (res.ok) {
                this.followings = data;
                console.log("Followers data:", data);
                return data;
                
            }else if(data.errors) {
                this.errors= data.errors;
                console.log(data.errors);
            }        

            else {
                console.log("NOPE")
            }

            
            }
        },

       





            

        

        
        


      
   
    },
});