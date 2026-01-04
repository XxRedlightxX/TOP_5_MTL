import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { apiRequest, buildQueryString } from "../api/api";
import StorageManager from "@/JS/LocalStaorageManager";

/*export const useActivityStore = defineStore('activitiesStore', {

    state: () => ({
        mode: StorageManager.getMode(),
        activities: [],
        upcoming: { days: [], nights: [] },
        carousel: { days: [], nights: [] },
        user: null,
        activity: null,
        categories: [],
        isLoading: false,
        filters: {
        daytime: null,
        type: "",
        season: "",
        title: "",
        },
        errors: {},
    }),
    getters : {
   
       
    },
    actions : {


        toggleMode() {
        // Reverse: Toggle between 'nights' and 'days'
            this.mode = this.mode === 'nights' ? 'days' : 'nights';
            StorageManager.setMode(this.mode);
            
            // Update derived data (also reversed)
            this.activities = this.mode === 'nights' ? this.nights : this.days;
            this.carouselactivities = this.mode === 'nights' ? this.carouselnights : this.carouseldays;
            this.upcomingactivities = this.mode === 'nights' ? this.upcomingnights : this.upcomingdays;
        },
    

        async getUpcomingEvents() {
            try {
                const res = await fetch("/api/activite/test", {
                headers: {
                    'Content-Type': 'application/json',
                },
                });

                if (!res.ok) {
                    throw new Error(`Erreur API: ${res.status}`);
                }

                const data = await res.json();
                this.upcomingnights = data.nights || []
                this.upcomingdays = data.days || []
            
                this.upcomingactivities = this.mode === 'days' ? this.upcomingdays : this.upcomingdays;
                
                
                this.errors = {};
                //return this.upcomingactivities;
                
            } catch (err) {
                console.error("getUpcomingEvents failed:", err);
                this.errors = { upcoming: err.message };
                return [];
            }
        },

        async getActivities() {
            this.isLoading = true; // Start loading
            this.errors = {};
            try {
                const params = new URLSearchParams();
    
                for (const [key, value] of Object.entries(this.filters)) {
                    if (value) {
                    params.append(key, value);
                
                    }
                }

                const res = await fetch(`/api/activite/filtrer?${params.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    
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
            } catch (error) {
                console.error("Network error:", error);
                this.errors = { network: "Failed to fetch activities" };
            } finally {
                this.isLoading = false; // End loading
            }
        },

        async getUserActivities() {
             try {
                const token = localStorage.getItem("token");
                 this.isLoading = true;
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
                }}
             } catch (error) {
                console.error("ge failed:", error);
                
            } finally {
                this.isLoading = false;
            }
    },

    async getActivityUserbyId($activityid) {
       
        const res = await fetch(`/api/activite/user/${$activityid}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
    
        if (res.ok) {
            console.log(data.user, "Test")
            return data.user;
            
            
        }else if(data.errors) {
            this.errors= data.errors;
            console.log(data.errors);
        }       
    },

       async getHigherRateEvent() {
        try {
            this.isLoading = true;
            const res = await fetch("/api/likedActivities", {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const data = await res.json();
            
            if (res.ok) {
                this.carouselnights= data.nights || [];
                this.carouseldays = data.days || [];
                this.carouselactivities = this.mode === 'days' ? this.carouseldays : this.carouselnights;
                
                console.log("Days:", this.carouseldays[0]);
                console.log("Nights:", this.carouselnights[0]);
                console.log("Activities to display:",this.carouselactivities);
                
                this.errors = {}; // Clear errors on success
                //return data
            } else if (data.errors) {
                this.errors = data.errors;
                console.log("API errors:", data.errors);
                throw new Error(data.errors.message || "API returned errors");
            }
            
        } catch (error) {
            console.error("getHigherRateEvent failed:", error);
            this.errors = { higherRate: error.message };
            // Don't return the error, just let it be handled by the store
            
        } finally {
            this.isLoading = false;
        }
    },



        async getActivityById(activityId) {
           
            try {
                this.isLoading=true;
                const res = await fetch(`/api/activity/${activityId}/comments`,{
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                });
                
                const data = await res.json();

                if (res.ok) {
                    this.activity = data;
                    console.log(this.activity);
                    return data;
                }
                else if(data.errors) {
                    this.errors= data.errors;
                    console.log(data.errors);
                   
                }
            } catch ($error) {
                return $error;
            } finally {
                this.isLoading=false;
            }
        },

        async getActivitiesByOtherUserId(activityId) {
           
            try {
                this.isLoading=true;
                const res = await fetch(`/api/user/activite/${activityId}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const data = await res.json();

                if (res.ok) {
                    console.log(data , "test")
                    return data;
                    
                }
                else if(data.errors) {
                    this.errors= data.errors;
                    console.log(data.errors);
                   
                }
            } catch ($error) {
                return $error;
            } finally {
                this.isLoading=false;
            }
        },


        async addCommentToEvent(formData, activityId) {
            const token = localStorage.getItem("token");
            if (!token) return this.router.push({ name: "Profile" });
            try {
                this.isLoading =true
               
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
            } catch ($error) {

            } finally {
                this.isLoading =false
            }

    async deleteEvent(activity) {
      const token = localStorage.getItem("token");
      const authStore = useAuthStore();
      if (authStore.user.id === this.activity.creator.id) {
        const res = await fetch(`/api/activite/${activity.id}`, {
          method: "delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        async addEvent(formData) {
            const token = localStorage.getItem("token");
            if (!token) return this.router.push({ name: "Profile" });
            const res = await fetch(`http://127.0.0.1:8000/api/user/activite`, {
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
                console.log(data+"dadsadsa")
                return data;
            }
        },

         async updateEvent(activity, formData) {
            const authStore = useAuthStore();

            if (authStore.user.id === this.activity.creator.id) {
                const res = await fetch(`http://127.0.0.1:8000/api/activite/${activity.id}`, {
                    method: "POST", 
                    headers: {
                       
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: formData, 
                });

                const data = await res.json();

                if (data.errors) {
                    this.errors = data.errors;
                     console.log(data.errors)
                } else {
                    this.errors = {};
                    console.log(data+"s")
                    return data;
                }
            }
        },

         async deleteEvent(activity) {
            const token = localStorage.getItem("token");
            const authStore = useAuthStore();
            if(authStore.user.id === this.activity.creator.id) {
                const res = await fetch(`/api/activite/${activity.id}`, {
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
                console.log("Not Allowed");
               
              
            }
           
        },

   

        async getCategories() {
            const res = await fetch("/api/categories", {
                headers: {
                    'Content-Type': 'application/json',
                    
                },
            });
            const data = await res.json();
       
            if (res.ok) {
                this.categories = data;
                console.log(this.categories);
                return data;
                
            }else if(data.errors) {
                this.errors= data.errors;
                console.log(data.errors);
            }
    },

      async getListFavoritesActivities() {
        const token = localStorage.getItem("token");

        if (!token) {
            this.errors = { message: "No token found" };
            return null;
        }

        this.isLoading = true;
        this.errors = {};

        try {
            const res = await fetch("/api/favorite", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            // Check if response is OK before parsing JSON
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Favorites data:", data);
            return data;
            
        } catch (error) {
            this.errors = { 
                message: error.message || "Failed to fetch favorites" 
            };
            console.error("Fetch error:", error);
            return null;
        } finally {
            this.isLoading = false;
        }
    },

    async getFavoritesActivities() {
        const token = localStorage.getItem("token")
        if (!token) return []

        try {
            const res = await fetch("/api/favorite", {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            })

            if (!res.ok) return []

            const data = await res.json()

            if (!data?.favoris) return []

            return data.favoris // array of fav objects
        } catch (err) {
            console.error(err)
            return []
        }
},

    async addFavoritesActivities(activityId) {
        const token = localStorage.getItem("token");
        if (!token) return this.router.push({ name: "Profile" });
        
        this.errors = {};

        try {
            const res = await fetch("/api/favorite", {
                method : "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: activityId }),
            });
            
            // Check if response is OK before parsing JSON
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Favorites data:", data);
            return data.favorited;
            
        } catch (error) {
            this.errors = { 
                message: error.message || "Failed to fetch favorites" 
            };
            console.error("Fetch error:", error);
            return null;
        } finally {
            
        }
    },

        async deleteFavoritesActivity(activity) {
        const token = localStorage.getItem("token");
        if (!token) return this.router.push({ name: "Profile" });
        
        this.errors = {};

        try {
            const res = await fetch(`/api/favorite/${activity.id}`, {
                method : "delete",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            });
            
            // Check if response is OK before parsing JSON
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Favorites data:", data);
            return data
            
        } catch (error) {
            this.errors = { 
                message: error.message || "Failed to fetch favorites" 
            };
            console.error("Fetch error:", error);
            return null;
        } finally {
            
        }
    },

    async checkIfFavorite(activityId) {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`/api/isFavorite/${activityId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            const data = await res.json();
            return data;
        } catch (err) {
            console.error('Error checking favorite:', err)
        }
    }




        
        



   
    },
});*/

export const useActivityStore = defineStore("activitiesStore", {
  state: () => ({
    mode: StorageManager.getMode(),
    activities: [],
    upcoming: { days: [], nights: [] },
    carousel: { days: [], nights: [] },
    user: null,
    activity: null,
    categories: [],
    isLoading: false,

    filters: {
      daytime: null,
      type: "",
      season: "",
      title: "",
    },

    errors: {},
  }),

  getters: {
    upcomingItems(state) {
      return state.mode === true ? state.upcoming.days : state.upcoming.nights;
    },

    carouselItems(state) {
      return state.mode === true ? state.carousel.days : state.carousel.nights;
    },

    currentActivities(state) {
      return state.activities;
    },
  },

  actions: {
    // -----------------------------------
    // TOGGLE MODE (DAY ⇄ NIGHT)
    // -----------------------------------
    toggleMode() {
      this.mode = !this.mode; // Just flip boolean
      StorageManager.setMode(this.mode);
    },

    // -----------------------------------
    // GET ACTIVITIES (FILTERS)
    // -----------------------------------
    async getActivities(parametres = null) {
      this.isLoading = true;
      this.errors = {};

      let query = "";

      if (typeof parametres === "string") {
        query = parametres && `?${parametres}`;
      } else if (parametres) {
        query = buildQueryString(parametres);
      } else {
        query = buildQueryString(this.filters);
      }

      try {
        const data = await apiRequest(`/api/activite/filtrer${query || ""}`);
        this.activities = data;
      } catch (err) {
        this.errors = err.errors || { message: "Failed to load activities" };
      } finally {
        this.isLoading = false;
      }
    },

    // -----------------------------------
    // UP COMING EVENTS
    // -----------------------------------
    async getUpcomingEvents() {
      try {
        const data = await apiRequest("/api/activite/test");

        this.upcoming.days = data.days || [];
        this.upcoming.nights = data.nights || [];
        console.log(this.upcoming.days, "list event");
      } catch (err) {
        this.errors = { upcoming: err.message };
      }
    },

    // -----------------------------------
    // CAROUSEL BEST RATED
    // -----------------------------------
    async getHigherRateEvent() {
      this.isLoading = true;

      try {
        const data = await apiRequest("/api/likedActivities");

        this.carousel.days = data.days || [];
        this.carousel.nights = data.nights || [];
      } catch (err) {
        this.errors = { carousel: err.message };
      } finally {
        this.isLoading = false;
      }
    },

    // -----------------------------------
    // USER ACTIVITIES
    // -----------------------------------
    async getUserActivities() {
      this.isLoading = true;
      try {
        this.user = await apiRequest("/api/user/activite");
        return this.user;
      } catch (err) {
        this.errors = err;
      } finally {
        this.isLoading = false;
      }
    },

    // -----------------------------------
    // ACTIVITY BY ID
    // -----------------------------------
    async getActivityById(id) {
      this.isLoading = true;
      try {
        const data = await apiRequest(`/api/activity/${id}/comments`);
        this.activity = data;
        return data;
      } catch (err) {
        this.errors = err;
      } finally {
        this.isLoading = false;
      }
    },

    // -----------------------------------
    // OTHER USER ACTIVITIES
    // -----------------------------------
    async getActivitiesByOtherUserId(id) {
      try {
        return await apiRequest(`/api/user/activite/${id}`);
      } catch (err) {
        this.errors = err;
      }
    },

    // -----------------------------------
    // ADD COMMENT
    // -----------------------------------
    async addCommentToEvent(formData, activityId) {
      try {
        return await apiRequest(`/api/activity/${activityId}/comments`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
      } catch (err) {
        this.errors = err;
      }
    },

    // -----------------------------------
    // ADD EVENT
    // -----------------------------------
    async addEvent(formData) {
      console.log(formData, "test");
      try {
        return await apiRequest("http://127.0.0.1:8000/api/user/activite", {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        this.errors = err;
      }
    },

    // -----------------------------------
    // UPDATE EVENT
    // -----------------------------------
    async updateEvent(activity, formData) {
      const auth = useAuthStore();
      if (auth.user?.id !== this.activity?.creator?.id) return;

      try {
        return await apiRequest(`/api/activite/${activity.id}`, {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        this.errors = err;
      }
    },

    // -----------------------------------
    // DELETE EVENT
    // -----------------------------------
    async deleteEvent(activity) {
      const auth = useAuthStore();
      if (auth.user?.id !== this.activity?.creator?.id) return;

      try {
        return await apiRequest(`/api/activite/${activity.id}`, {
          method: "DELETE",
        });
      } catch (err) {
        this.errors = err;
      }
    },

    // -----------------------------------
    // CATEGORIES
    // -----------------------------------
    async getCategories() {
      try {
        if (this.categories.length) return;
        const data = await apiRequest("/api/categories");
        this.categories = data;
      } catch (err) {
        this.errors = err;
      }
    },

    // -----------------------------------
    // FAVORITES
    // -----------------------------------
    async getFavoritesActivities() {
      try {
        const data = await apiRequest("/api/favorite");
        return data.favoris || [];
      } catch {
        return [];
      }
    },

    async addFavoritesActivities(activityId) {
      try {
        const data = await apiRequest("/api/favorite", {
          method: "POST",
          body: JSON.stringify({ id: activityId }),
        });
        return data.favorited;
      } catch (err) {
        this.errors = err;
      }
    },

    async deleteFavoritesActivity(activity) {
      try {
        return await apiRequest(`/api/favorite/${activity.id}`, {
          method: "DELETE",
        });
      } catch (err) {
        this.errors = err;
      }
    },

    async checkIfFavorite(id) {
      try {
        return await apiRequest(`/api/isFavorite/${id}`);
      } catch (err) {
        this.errors = err;
      }
    },
  },
});
