<template>
    
   <div id="MessagePage">
        <h1>Chat</h1>
        <div class="MessageSection">

            <ListUserMessage/>
            <Message/>
            <ProfileUserMessage/>
            
        </div>

   </div>
   
</template>


<script setup>
import MapComponent from '@/components/MapComponent.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import ListUserMessage from '@/components/MessagingComponents/ListUserMessageComponent.vue';
import Message from '@/components/MessagingComponents/MessageComponent.vue';
import ProfileUserMessage from '@/components/MessagingComponents/ProfileUserMessageComponent.vue';
</script>

<style src="../../styles/MessageStyle/MessageStyle.scss"></style>