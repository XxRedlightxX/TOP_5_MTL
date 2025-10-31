import { defineStore } from "pinia";
import { toRaw } from "vue";
import { useAuthStore } from "./auth";

export const useActivityStore = defineStore("activitiesStore", {
  state: () => {
    return {
      activities: [],
      user: null,
      activity: null,
      categories: [],
      loading: false,
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
    async getActivities() {
      const params = new URLSearchParams();

      const token = localStorage.getItem("token");
      for (const [key, value] of Object.entries(this.filters)) {
        if (value) {
          params.append(key, value);
        }
      }

      const res = await fetch(`/api/activite/filtrer?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      }
    },

    async getHigherRateEvent() {
      //const token = localStorage.getItem("token");

      const res = await fetch("/api/likedActivities", {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        this.activities = data;

        return this.activities;
      } else if (data.errors) {
        this.errors = data.errors;
        console.log(data.errors);
      }
    },

    async getUpcomingEvents() {
      const token = localStorage.getItem("token");

      // if (!token) return;

      try {
        const res = await fetch("/api/activite/test", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Erreur API: ${res.status}`);
        }

        const data = await res.json();

        this.activities = data || [];

        console.log("Upcoming events:", this.activities);
        this.errors = {};
        return this.activities;
      } catch (error) {
        console.error("getUpcomingEvents failed:", error);
        this.errors = { upcoming: error.message };
        return [];
      }
    },

    async getActivityById(activityId) {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/activity/${activityId}/comments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    },

    async addCommentToEvent(formData, activityId) {
      const token = localStorage.getItem("token");
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
    },

    async addEvent(formData) {
      const token = localStorage.getItem("token");

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
      const token = localStorage.getItem("token");

      if (token) {
        const res = await fetch("/api/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          this.categories = data;
          console.log(this.categories);
          return this.categories;
        } else if (data.errors) {
          this.errors = data.errors;
          console.log(data.errors);
        }
      }
    },

    /* async getActivitiesFilter(dayTime) {

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

        }, */

    // Register
  },
});
