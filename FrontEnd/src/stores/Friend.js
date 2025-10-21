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
                
                console.log("Followers data:", data);
                return data;
                
            }else if(data.errors) {
                this.errors= data.errors;
                console.log(data.errors);
            }        


            
            }
        },

async addUserFollowings(formData) {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`/api/follow`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Backend might not always return JSON if there's an error
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      data = { message: "Invalid JSON response" };
    }

    console.log("Raw backend response:", data);

    // ✅ Always return the backend data, no matter what
    return data;

  } catch (error) {
    console.error("Error in addUserFollowings:", error);
    return { message: "Request failed", error };
  }
},

      async deleteUserFollowing($userId) {
            const token = localStorage.getItem("token")
            if (token) {
                const res = await fetch(`/api/follow/${$userId}`, {
                method: "DELETE",
               
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            if (data.errors) {
              if(data.errors) {
                this.errors = data.errors;
                return data.errors
            } else {
                this.errors = {};
                console.log(data+"dadsadsa")
                return data;
            }
        }
    }
    }


       





            

        

        
        


      
   
    },
});