<template>
    <div class="events shimmer-events" :class="theme">
        <div class="events_card shimmer-card" v-for="n in eventCount" :key="n">
            <div class="event_card_photo shimmer-photo">
                <div class="shimmer-heart"></div>
                <div class="shimmer-image"></div>
            </div>
            
            <div class="desc shimmer-desc">
                <div class="shimmer-line shimmer-title"></div>
                <div class="shimmer-line shimmer-location">
                    <div class="shimmer-icon"></div>
                </div>
                <div class="shimmer-line shimmer-date">
                    <div class="shimmer-icon"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    eventCount: {
        type: Number,
        default: 6
    },
    theme: {
        type: String,
        default: 'light'
    }
});
</script>

<style scoped>
.shimmer-events {
    display: grid;
    align-items: center;
    gap: 5%;
    width: 96%;
    margin: 5% auto 3% auto;
}

.shimmer-card {
    border-radius: 20px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.shimmer-photo {
    position: relative;
    max-width: 100%;
    height: 300px;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.shimmer-heart {
    position: absolute;
    top: 1%;
    right: 1%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    z-index: 2;
}

.shimmer-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.shimmer-desc {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.shimmer-line {
    height: 16px;
    border-radius: 8px;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.shimmer-title {
    width: 80%;
    height: 20px;
    margin-bottom: 4px;
}

.shimmer-location,
.shimmer-date {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 70%;
}

.shimmer-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

/* Light Theme */
.shimmer-events.light .shimmer-card {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.shimmer-events.light .shimmer-heart,
.shimmer-events.light .shimmer-image,
.shimmer-events.light .shimmer-line,
.shimmer-events.light .shimmer-icon {
    background: linear-gradient(
        90deg,
        rgba(128, 128, 128, 0.2) 25%,
        rgba(169, 169, 169, 0.4) 50%,
        rgba(128, 128, 128, 0.2) 75%
    );
}

/* Dark Theme */
.shimmer-events.dark .shimmer-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.shimmer-events.dark .shimmer-heart,
.shimmer-events.dark .shimmer-image,
.shimmer-events.dark .shimmer-line,
.shimmer-events.dark .shimmer-icon {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 75%
    );
}

/* Responsive Grid */
@media screen and (min-width: 1025.1px) {
    .shimmer-events {
        grid-template-columns: auto auto auto;
    }
}

@media screen and (max-width: 1025px) {
    .shimmer-events {
        grid-template-columns: auto auto;
        margin: 10% auto 10% auto;
    }
}

@media screen and (max-width: 600px) {
    .shimmer-events {
        grid-template-columns: auto;
        margin: 30% auto 30% auto;
    }
}
</style>