import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { apiRequest, buildQueryString } from "../api/api";

export const useActivityStore = defineStore("activitiesStore", {
  state: () => ({
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
    // upcomingItems(state) {
    //   return state.mode === true ? state.upcoming.days : state.upcoming.nights;
    // },
    // carouselItems(state) {
    //   return state.mode === true ? state.carousel.days : state.carousel.nights;
    // },
    // currentActivities(state) {
    //   return state.activities;
    // },
  },

  actions: {
    // -----------------------------------
    // TOGGLE MODE (DAY ⇄ NIGHT)
    // -----------------------------------
    toggleMode() {
      this.mode = !this.mode; // Just flip boolean
      StorageManager.setMode(this.mode);
    },

    async getPaginationLenght() {
      ///
      //return -> data { jour:[9]; nuit:[7] }
    },

    // -----------------------------------
    // GET ACTIVITIES (FILTERS)
    // -----------------------------------
    async getActivities(parametres = null) {
      //this.isLoading = true;
      this.errors = {};

      let query = "";

      if (typeof parametres === "string") {
        query = parametres; // && `?${parametres}`;
      } else if (parametres) {
        query = buildQueryString(parametres);
      }
      // else {
      //   query = buildQueryString(this.filters);
      // }

      try {
        //const data = await apiRequest(`/api/activite/filtrer${query || ""}`);
        const data = await apiRequest(`/api/activite?${query || ""}`);
        //this.activities = data;
        console.log("data get : ", data.data  );
        return data.data;
      } catch (err) {
        this.errors = err.errors || { message: "Failed to load activities" };
        console.log("error get : ", this.errors);
      }
      //finally {this.isLoading = false;}
    },

    // -----------------------------------
    // GET ACTIVITIES GENERICS
    // -----------------------------------
    async getEventGeneric(apiUrl) {
      try {
        //this.isLoading = true; // A quoi ca sert ???
        const res = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          this.errors = {}; // Clear errors on success
          //console.log("data :", data);
          return data;
        } else if (data.errors) {
          this.errors = data.errors;
          console.log("API errors:", data.errors);
          throw new Error(data.errors.message || "API returned errors");
        }
      } catch (error) {
        console.error("getHigherRateEvent failed:", error);
        this.errors = { higherRate: error.message };
      }
      //finally {this.isLoading = false;}
    },

    // -----------------------------------
    // GET ACTIVITIES BEST RATED
    // -----------------------------------
    async getHigherRateEvent() {
      return this.getEventGeneric("/api/likedActivities");
    },

    // -----------------------------------
    // GET ACTIVITIES UP COMING
    // -----------------------------------
    async getUpcomingEvents() {
      return this.getEventGeneric("/api/activite/test");
    },

    // -----------------------------------
    // GET ACTIVITIES NEWEST
    // -----------------------------------
    async getNewestEvent() {
      return this.getEventGeneric("/api/activite/latest");
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
      const res = await fetch("/api/categories", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        this.categories = data;
        //console.log(this.categories);
        return data;
      } else if (data.errors) {
        this.errors = data.errors;
        console.log(data.errors);
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
