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
      // this.mode = !this.mode; // Just flip boolean
      // StorageManager.setMode(this.mode);
    },

    // -----------------------------------
    // GET ACTIVITIES GENERICS
    // -----------------------------------
    async getEventGeneric(apiUrl, parametres = null) {
      this.errors = {};
      let query = "";

      if (parametres) {
        query =
          typeof parametres === "string"
            ? parametres
            : buildQueryString(parametres);
      }

      if (query) {
        apiUrl += `?${query}`;
      }

      try {
        console.log("apiURL :", apiUrl);

        const res = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json(); // ✅ OBLIGATOIRE avec fetch

        if (!res.ok) {
          this.errors = data.errors || { message: "Failed to load activities" };
          throw new Error(this.errors.message);
        }

        return data; // ✅ retourne les vraies données
      } catch (err) {
        console.error("error get :", err);
        this.errors = { message: err.message };
      }
    },

    // -----------------------------------
    // GET PAGINATION LENGHT (FILTERS)
    // -----------------------------------
    async getPaginationLenght(parametres) {
      return this.getEventGeneric(
        "/api/activite/pagination/" + parametres,
        null,
      );
    },

    // -----------------------------------
    // GET ACTIVITIES (FILTERS)
    // -----------------------------------
    async getActivities(parametres) {
      return this.getEventGeneric("/api/activite/filtrer/" + parametres, null);
    },

    // -----------------------------------
    // GET ACTIVITIES BEST RATED
    // -----------------------------------
    async getHigherRateEvent() {
      return this.getEventGeneric(`/api/likedActivities`);
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
      return this.getEventGeneric("/api/user/activite");
    },

    // -----------------------------------
    // ACTIVITY BY ID
    // -----------------------------------
    async getActivityById(id) {
      return this.getEventGeneric(`/api/activity/${id}/comments`);
    },

    // -----------------------------------
    // OTHER USER ACTIVITIES
    // -----------------------------------
    async getActivitiesByOtherUserId(id) {
      return this.getEventGeneric(`/api/user/activite/${id}`);
    },

    // -----------------------------------
    // CATEGORIES
    // -----------------------------------
    async getCategories() {
      return this.getEventGeneric("/api/categories");
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
