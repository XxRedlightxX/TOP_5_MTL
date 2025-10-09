<template>
    <div id="ListUserMessage">
        <SearchBarComponent/>
        
        <div class="UserList">
            <div class="UserCard" v-for="user in userList" :key="user.id">
                <div class="user-content">
                    <div class="user-avatar-image">
                        <img src='/src/assets/p1.jpg' :alt="user.username" />
                    </div>
                    <div class="user-info">
                        <strong>{{ user.username }}</strong>
                        <p>{{ user.name }}</p>
                    </div>
                </div>
                <div class="time">
                    {{ user.time }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import SearchBarComponent from '../SearchBarComponent.vue';
import { onMounted, ref, onUnmounted } from 'vue'; 
import LocalStorageManager from "@/JS/LocalStaorageManager"

const userList = [
    {
        id: 1,
        username: "John",
        name: "Nolan",
        time: "5:00pm"
    },
    {
        id: 2,
        username: "Sarah",
        name: "Johnson",
        time: "3:30pm"
    },
    {
        id: 3,
        username: "Mike",
        name: "Chen",
        time: "1:15pm"
    }
];


</script>


<style src="../../styles/MessageStyle/MessageSections/ListUserMessageStyles.scss"></style>