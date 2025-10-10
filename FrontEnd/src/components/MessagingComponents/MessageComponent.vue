<template>
    <div id="Message">
        <div class="messagelist">
            <div v-for="message in messages" :key="message.id" 
                 :class="message.isMine ? 'myUserMessage' : 'otherUserMessage'">
                
                <div v-if="!message.isMine" class="avatar-other">
                    <img :src="message.avatar" :alt="message.senderName" />
                </div>
                
                <div :class="message.isMine ? 'avatar-info-me' : 'avatar-info'">
                    <div :class="message.isMine ? 'message-me' : 'message'">
                        <p>{{ message.content }}</p>
                    </div>
                    <span class="timestamp">{{ message.timestamp }}</span>
                </div>
                
                <div v-if="message.isMine" class="avatar-me">
                    <img :src="message.avatar" :alt="message.senderName" />
                </div>
            </div>
        </div>

        <!-- Input and Send Button -->
        <div class="message-input-container">
            <v-text-field
                v-model="newMessage"
                :label="actualLang ? 'Type a message...' : 'Tapez un message...'"
                variant="outlined"
                hide-details
                class="message-input"
                @keyup.enter="sendMessage"
                ref="messageInput"
            >
                <template v-slot:append>
                    <v-btn
                        icon
                       
                        @click="sendMessage"
                        :disabled="!newMessage.trim()"
                        class="send-button"
                    >
                         <v-icon icon="mdi-send" :class="['icon', {'justGlow' : !actualMode}]"/>
                      
                    </v-btn>
                </template>
            </v-text-field>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const messages = ref([]);
const newMessage = ref('');
const messageInput = ref(null);

// Sample message data
const sampleMessages = [
    {
        id: 1,
        senderName: "Sarah Chen",
        content: "Hey! How's your day going? 😊",
        timestamp: "2:30pm",
        isMine: false,
        avatar: "/src/assets/p1.jpg"
    },
    {
        id: 2,
        senderName: "Me",
        content: "Hey! My day is going well, thanks for asking! Just finished my morning meetings. How about you?",
        timestamp: "2:31pm",
        isMine: true,
        avatar: "/src/assets/p2.jpg"
    },
    {
        id: 3,
        senderName: "Sarah Chen",
        content: "I was wondering if you've had a chance to look at the project documentation I sent you last week? There are some important updates about the new API endpoints.",
        timestamp: "2:32pm",
        isMine: false,
        avatar: "/src/assets/p1.jpg"
    },
    {
        id: 4,
        senderName: "Me",
        content: "Yes, I reviewed the documentation yesterday. The new OAuth 2.0 flow looks solid, but I noticed we might need to handle token refresh differently for offline scenarios.",
        timestamp: "2:35pm",
        isMine: true,
        avatar: "/src/assets/p2.jpg"
    },
    {
        id: 5,
        senderName: "Sarah Chen",
        content: "That's a great point! I actually discussed this with the security team and they suggested implementing a retry mechanism with exponential backoff.",
        timestamp: "2:37pm",
        isMine: false,
        avatar: "/src/assets/p1.jpg"
    },
    {
        id: 6,
        senderName: "Sarah Chen",
        content: "Also, don't forget about the team meeting tomorrow at 10 AM to discuss the Q3 roadmap! 🚀",
        timestamp: "2:38pm",
        isMine: false,
        avatar: "/src/assets/p1.jpg"
    },
    {
        id: 7,
        senderName: "Me",
        content: "Perfect! The caching strategy makes sense. I'll start implementing the authentication module today. Looking forward to the meeting tomorrow! 👍",
        timestamp: "2:40pm",
        isMine: true,
        avatar: "/src/assets/p2.jpg"
    },
    {
        id: 8,
        senderName: "Me",
        content: "By the way, did you see the new design mockups for the dashboard? The dark mode looks amazing! 🌙",
        timestamp: "2:41pm",
        isMine: true,
        avatar: "/src/assets/p2.jpg"
    }
];

// Simulate loading messages
onMounted(() => {
    messages.value = sampleMessages;
});

// Send new message
const sendMessage = () => {
    if (!newMessage.value.trim()) return;

    const message = {
        id: messages.value.length + 1,
        senderName: "Me",
        content: newMessage.value.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        avatar: "/src/assets/p2.jpg"
    };
    
    messages.value.push(message);
    newMessage.value = '';
    
    // Clear input and focus
    nextTick(() => {
        if (messageInput.value) {
            messageInput.value.focus();
        }
    });

    // Simulate reply after a delay
    setTimeout(() => {
        simulateIncomingMessage();
    }, 1000 + Math.random() * 2000);
};

// Function to add new messages
const addNewMessage = (content, isMine = false) => {
    const newMessage = {
        id: messages.value.length + 1,
        senderName: isMine ? "Me" : "Sarah Chen",
        content: content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: isMine,
        avatar: isMine ? "/src/assets/p2.jpg" : "/src/assets/p1.jpg"
    };
    
    messages.value.push(newMessage);
};

// Function to simulate receiving a message
const simulateIncomingMessage = () => {
    const responses = [
        "That sounds good! Let me know if you need any help with the implementation.",
        "I just checked the mockups and they look fantastic! The UX team did a great job.",
        "Can you share your progress on the authentication module by end of day?",
        "The backend team just deployed the new endpoints to the staging environment.",
        "Thanks for the update! Looking forward to seeing the progress.",
        "That's exactly what we needed. Great work!",
        "I'll review it and get back to you with feedback.",
        "Perfect timing! The client just asked about this feature."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addNewMessage(randomResponse, false);
};

// Expose functions if needed
defineExpose({
    addNewMessage,
    simulateIncomingMessage
});
</script>

<style src="../../styles/MessageStyle/MessageSections/MessageStyle.scss"></style>