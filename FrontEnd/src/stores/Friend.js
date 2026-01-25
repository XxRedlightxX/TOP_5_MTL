import { defineStore } from "pinia";


export const useFriendStore = defineStore("friendStore", {
  state: () => ({
    followers: [],
    followings: new Set(), 
    errors: {},
    validationErrors: {},
    isLoading: false,
  }),

  getters: {
    followersCount: (state) => state.followers.length,
    followingCount: (state) => state.followings.size,
  },

  actions: {

    // ✅ Fetch followers or followings
    async getListUserFollowers(apiRoute = "followers") {
      const token = localStorage.getItem("token");
      if (!token) return [];

      this.isLoading = true;
      try {
          const res = await fetch(`/api/${apiRoute}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message || "Failed to fetch");

          // if apiRoute === "followers", store followers
          if (apiRoute.includes("followers")) this.followers = data;
          // if apiRoute === "followings", store followings
          if (apiRoute.includes("followings"))
            this.followings = new Set(data.map((u) => u.id));

          return data;
      } catch (err) {
        console.error("Fetch error:", err);
        this.errors = { message: err.message };
        return [];
      } finally {
        this.isLoading = false;
      }
    },

    // Toggle between add and delete follow
   async addUserFollowings(formData) {
    const token = localStorage.getItem("token");
    if (!token) return { message: "No token" };

    this.isLoading = true;

    try {
      const res = await fetch(`/api/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.message === "Vous avez follow") {
        this.followings.add(formData);
      } else if (res.ok && data.message === "Unfollowed successfully.") {
        this.followings.delete(formData);
      }

      return data;
    } catch (error) {
      console.error("Error in addUserFollowings:", error);
      return { message: "Request failed", error };
    } finally {
      this.isLoading = false;
    }
  },

    // Unfollow User
  async deleteUserFollowing(userId) {
    const token = localStorage.getItem("token");
    if (!token) return { message: "No token" };

    try {
      const res = await fetch(`/api/follow/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        this.followings.delete(userId);
      }

    

      return data;
    } catch (err) {
      console.error("deleteUserFollowing error:", err);
      return { message: "Error", err };
    }
  },

    getFollowingsAsArray() {
      const myArray =[...this.followings];
      console.log(myArray);
      return myArray
    },

  
    isFollowing(userId) {
      return this.followings.has(userId);
    },
  },
});
