import {defineStore} from "pinia";

export const useMessageStore = defineStore('messageStore', {
    state: () => {
        return {
            recentUsers: [],
            errors: {},
            isLoading : false,
            userFriend : null,
           
        }
    },

    getters : {},

    actions : {

         setUserFriend(user) {
            this.userFriend = user;
            console.log("User set", this.userFriend);
        },

       addUser(user) {
           const exists = this.recentUsers.some((u) => u.id === user.id);
            if (!exists) {
                this.recentUsers.push(user);
            }

            // ✅ return updated list (optional)
            return this.recentUsers;
        },
        async getConversationsFromUser(pFriendUser) {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await fetch (`/api/messages/${pFriendUser.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            });
            const data = await res.json();

         
            if (data.errors) {
                this.errors = data.errors;
                console.log("Error fetching messages for", pFriendUser.id, data.errors);
                return []; // return empty array instead of errors
            } 

            this.errors = {};
            console.log("Fetched messages:", data);
            return data; // assuming data is an array of messages
            },

        async addMessageFromUser(pFriendUser, pContent) {
            const token = localStorage.getItem("token");
            if(!token) return;
            
            const res = await fetch (`/api/messages/${pFriendUser.id}`, {
                method : "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify(pContent)

            });

            const data = await res.json();

            if (data.errors) {
                this.errors = data.errors;
                console.log(data+"Add Message is not working")
                return data.errors
            } else {
                this.errors = {};
                console.log(data+"Add Message is working")
                return data;
            }

        }




     
    }
});