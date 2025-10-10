<template>
  <div class="search-container">
    <v-text-field
      v-model="searchQuery"
      :label="actualLang ? 'Search users...' : 'Rechercher des utilisateurs...'"
      @input="handleSearch"
      @focus="showResults = true"
      @blur="onBlur"
      clearable
      hide-details
      ref="searchInput"
    />

    <div
      v-if="showResults && searchResults.length > 0"
      class="search-results-dropdown"
    >
      <div
        v-for="user in searchResults"
        :key="user.id"
        class="user-card"
        @mousedown.prevent="selectUser(user)"
      >
        <div class="user-avatar">
          <img
            :src="user.image_data || '/default-avatar.png'"
            :alt="user.username"
          />
        </div>

        <div class="user-info">
          <strong>{{ user.username }}</strong>
          <p>{{ user.name }}</p>
        </div>

        <v-icon
          @click="toggleFollow(user)"
          :color="user.is_followed ? 'red' : 'green'"
          class="cursor-pointer"
        >
          {{ user.is_followed ? 'mdi-account-minus' : 'mdi-account-plus' }}
        </v-icon>
      </div>
    </div>

    <div
      v-else-if="showResults && searchQuery && !isSearching"
      class="no-results"
    >
      {{ actualLang ? 'No users found' : 'Aucun utilisateur trouvé' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useFriendStore } from "@/stores/Friend";

const userStore = useUserStore();
const { addUserFollowings } = useFriendStore();

const searchQuery = ref("");
const searchResults = ref([]);
const isSearching = ref(false);
const showResults = ref(false);
const searchInput = ref(null);

let searchTimeout = null;

const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performSearch, 500);
};

const performSearch = async () => {
  const query = searchQuery.value.trim();
  if (!query) {
    searchResults.value = [];
    showResults.value = false;
    return;
  }

  isSearching.value = true;
  try {
    const results = await userStore.searchUsers(query);
    searchResults.value = results.map((user) => ({
      ...user,
      is_followed: user.is_followed ?? false,
    }));
    showResults.value = true;
  } catch (error) {
    console.error("Search failed:", error);
    searchResults.value = [];
  } finally {
    isSearching.value = false;
  }
};

const onBlur = () => {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
};

const toggleFollow = async (user) => {
  try {
    const res = await addUserFollowings({ follower_id: user.id });
    console.log("Follow/Unfollow response:", res);

    if (res?.message === "Vous avez follow") {
      user.is_followed = true;
    } else if (res?.message === "Unfollowed successfully.") {
      user.is_followed = false;
    }
  } catch (error) {
    console.error("Follow/Unfollow error:", error);
  }
};

const selectUser = (user) => {
  console.log("Selected user:", user);
};
</script>

<style scoped>
.search-container {
    position: relative;
    height: 20%;
    
}

/* Dropdown */
.search-results-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    background: var(--background-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
   
}


.user-card {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.user-card:last-child {
    border-bottom: none;
}

/* Light Mode */
.light .user-card {
    background: white;
}

.light .user-card:hover {
    background-color: #f5f5f5;
}

.light .user-card .user-info strong {
    color: var(--graphite06);
}

/* Dark Mode */
.dark .search-results-dropdown {
    background: var(--dark-background, #1e1e1e);
}

.dark .user-card {
    background: var(--dark-background, #1e1e1e);
}

.dark .user-card:hover {
    background-color: #2a2a2a;
}

.dark .user-card .user-info strong {
    color: var(--light-text);
}

.dark .user-card {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* User Avatar */
.user-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
}

/* User Info */
.user-info {
    flex: 1;
}

.user-info strong {
    display: block;
    font-size: 1em;
    margin-bottom: 2px;
}

.user-info p {
    margin: 0;
    color: #666;
    font-size: 0.85em;
}

.dark .user-info p {
    color: #aaa;
}



.user-card .v-icon:hover {
    color: #7c3aed;
}

/* No Results */
.no-results {
    position: absolute;
    
    left: 0;
    right: 0;
    color: #999;
    padding: 16px;
    text-align: center;
    font-style: italic;
    background: var(--background-color, white);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

.dark .no-results {
    background: var(--dark-background, #1e1e1e);
    color: #aaa;
}

/* Loading */
.loading {
    color: #666;
    font-style: italic;
    padding: 20px;
    text-align: center;
}

/* Scrollbar styling */
.search-results-dropdown::-webkit-scrollbar {
    width: 6px;
}

.search-results-dropdown::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0 8px 8px 0;
}

.dark .search-results-dropdown::-webkit-scrollbar-track {
    background: #2a2a2a;
}

.search-results-dropdown::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.dark .search-results-dropdown::-webkit-scrollbar-thumb {
    background: #555;
}

.search-results-dropdown::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

.dark .search-results-dropdown::-webkit-scrollbar-thumb:hover {
    background: #777;
}
</style>