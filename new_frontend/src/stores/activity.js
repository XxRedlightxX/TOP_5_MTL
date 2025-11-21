import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import StorageManager from "@/JS/LocalStorageManager";

export const useActivityStore = defineStore("activitiesStore", {
  state: () => {
    return {
      activities: [],
      carouselactivities: [],
      upcomingactivities: [],
      user: null,
      activity: null,
      days: [],
      nights: [],
      carouseldays: [],
      carouselnights: [],
      upcomingdays: [],
      upcomingnights: [],
      mode: StorageManager.getMode() || "days",
      categories: [],
      isLoading: false,
      filters: {
        daytime: "" ?? null,
        type: "",
        season: "",
        title: "",
      },
      errors: {},
    };
  },
  getters: {},
  actions: {
    /*toggleMode() {
        this.mode = this.mode === 'day' ? 'nights' : 'days'
        localStorage.setItem('activityMode', this.mode)
    },*/
    // toggleMode() {
    //   // Toggle between 'days' and 'nights'
    //   this.mode = this.mode === "days" ? "nights" : "days";
    //   StorageManager.setMode(this.mode);

    //   // Update derived data
    //   this.activities = this.mode === "days" ? this.days : this.nights;
    //   this.carouselactivities =
    //     this.mode === "days" ? this.carouseldays : this.carouselnights;
    //   this.upcomingactivities =
    //     this.mode === "days" ? this.upcomingdays : this.upcomingnights;
    // },

    async getUpcomingEvents() {
      try {
        const res = await fetch("/api/activite/test", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Erreur API: ${res.status}`);
        }

        const data = await res.json();
        // this.upcomingnights = data.nights || [];
        // this.upcomingdays = data.days || [];

        // this.upcomingactivities =
        //   this.mode === "days" ? this.upcomingdays : this.upcomingdays;
        console.log("data gett : ", data);
        this.errors = {};
        return data;
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
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          this.activities = data;
          return this.activities;
        } else if (data.errors) {
          this.errors = data.errors;
          console.log(data.errors);
        } else {
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
      const token = localStorage.getItem("token");

      if (token) {
        const res = await fetch("/api/user/activite", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          this.user = data;
          console.log(this.user);
          return this.user;
        } else if (data.errors) {
          this.errors = data.errors;
          console.log(data.errors);
        }

        if (res.ok) {
          this.user = data;
          console.log(this.user);
          return this.user;
        } else if (data.errors) {
          this.errors = data.errors;
          console.log(data.errors);
        }
      }
    },

    async getHigherRateEvent() {
      try {
        this.isLoading = true;
        const res = await fetch("/api/likedActivities", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          // this.carouselnights = data.nights || [];
          // this.carouseldays = data.days || [];
          // this.carouselactivities =
          //   this.mode === "days" ? this.carouseldays : this.carouselnights;

          // console.log("Days:", this.carouseldays);
          // console.log("Nights:", this.carouselnights);
          // console.log("Activities to display:", this.carouselactivities);

          this.errors = {}; // Clear errors on success
          return data;
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

    async getNewestEvent() {
      try {
        this.isLoading = true;
        const res = await fetch("/api/activite/latest", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          this.carouselnights = data.nights || [];
          this.carouseldays = data.days || [];
          this.carouselactivities =
            this.mode === "days" ? this.carouseldays : this.carouselnights;

          // console.log("Days:", this.carouseldays);
          // console.log("Nights:", this.carouselnights);
          // console.log("Activities to display:", this.carouselactivities);

          this.errors = {}; // Clear errors on success
          return data;
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

    async getEventUserInfo(eventId) {
      try {
        this.isLoading = true;
        const res = await fetch(`api/user/activite/${eventId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          // this.carouselnights = data.nights || [];
          // this.carouseldays = data.days || [];
          // this.carouselactivities =
          //   this.mode === "days" ? this.carouseldays : this.carouselnights;

          // console.log("Days:", this.carouseldays);
          // console.log("Nights:", this.carouselnights);
          // console.log("Activities to display:", this.carouselactivities);

          this.errors = {}; // Clear errors on success
          return data;
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
      console.log("id set3 : ", activityId);
      try {
        this.isLoading = true;
        const res = await fetch(`/api/activity/${activityId}/comments`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          this.activity = data;
          console.log(this.activity);
          return data;
        } else if (data.errors) {
          this.errors = data.errors;
          console.log(data.errors);
        }
      } catch ($error) {
        return $error;
      } finally {
        this.isLoading = false;
      }
    },

    async addCommentToEvent(formData, activityId) {
      const token = localStorage.getItem("token");
      if (!token) return this.router.push({ name: "Profile" });
      try {
        this.isLoading = true;

        const res = await fetch(`/api/activity/${activityId}/comments`, {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.error) {
          this.error = data.error;
          console.log(this.error);

          return data.error;
        } else {
          this.errors = {};
          console.log(data);

          return data;
        }
      } catch ($error) {
      } finally {
        this.isLoading = false;
      }
    },

    async addEvent(formData) {
      const token = localStorage.getItem("token");
      if (!token) return this.router.push({ name: "Profile" });
      const res = await fetch(`http://127.0.0.1:8000/api/user/activite`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
        return data.errors;
      } else {
        this.errors = {};
        console.log(data + "dadsadsa");
        return data;
      }
    },

    async updateEvent(activity, formData) {
      const authStore = useAuthStore();

      if (authStore.user.id === this.activity.creator.id) {
        const res = await fetch(
          `http://127.0.0.1:8000/api/activite/${activity.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        const data = await res.json();

        if (data.errors) {
          this.errors = data.errors;
          console.log(data.errors);
        } else {
          this.errors = {};
          console.log(data + "s");
          return data;
        }
      }
    },

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

        if (data.errors) {
          this.errors = data.errors;
          return data.errors;
        } else {
          this.errors = {};
          console.log(data);
          return data;
        }
      } else {
        console.log("Not Allowed");
      }
    },

    async getCategories() {
      const res = await fetch("/api/categories", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        this.categories = data;
        console.log(this.categories);
        return data;
      } else if (data.errors) {
        this.errors = data.errors;
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          message: error.message || "Failed to fetch favorites",
        };
        console.error("Fetch error:", error);
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async getFavoritesActivities() {
      const token = localStorage.getItem("token");
      if (!token) return [];

      try {
        const res = await fetch("/api/favorite", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return [];

        const data = await res.json();

        if (!data?.favoris) return [];

        return data.favoris; // array of fav objects
      } catch (err) {
        console.error(err);
        return [];
      }
    },

    async addFavoritesActivities(activityId) {
      const token = localStorage.getItem("token");
      if (!token) return this.router.push({ name: "Profile" });

      this.errors = {};

      try {
        const res = await fetch("/api/favorite", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          message: error.message || "Failed to fetch favorites",
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
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          message: error.message || "Failed to fetch favorites",
        };
        console.error("Fetch error:", error);
        return null;
      } finally {
      }
    },

    async checkIfFavorite(activityId) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/isFavorite/${activityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error checking favorite:", err);
      }
    },
  },
});
