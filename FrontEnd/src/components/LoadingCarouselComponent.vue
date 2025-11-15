<template>
    <div id="carouselComponent" :class="theme">
        <!-- Main Carousel Shimmer -->
        <div class="list">
            <div class="item">
                <div class="imgContainer">
                    <div class="overlayGrad"></div>
                    <div class="shimmer-image"></div>
                </div>
                <div class="content">
                    <div class="titlee shimmer-title"></div>
                    <div class="buttons">
                        <div class="btn shimmer-button shimmer-button-1"></div>
                        <div class="btn shimmer-button shimmer-button-2"></div>
                    </div>
                    <div class="desc">
                        <div class="shimmer-desc-line shimmer-desc-1"></div>
                        <div class="shimmer-desc-line shimmer-desc-2"></div>
                        <div class="shimmer-desc-line shimmer-desc-3"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Thumbnail Shimmer -->
        <div class="thumbnail">
            <div v-for="n in 4" :key="n" class="item">
                <div class="shimmer-thumbnail-image roundBorderSmall"></div>
                <div class="content">
                    <div class="title shimmer-thumbnail-title"></div>
                </div>
            </div>
        </div>

        <!-- Arrows -->
        <div class="arrows">
            <button class="shimmer-arrow"><</button>
            <button class="shimmer-arrow">></button>
        </div>

        <!-- Time running -->
        <div class="time shimmer-time"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    theme: {
        type: String,
        default: 'light'
    }
});
</script>

<style scoped>
#carouselComponent {
    height: 80svh;
    width: 100%;
    margin: auto;
    overflow: hidden;
    position: relative;
}

/* Main Image Shimmer */
.imgContainer {
    width: 100%;
    height: 80svh;
    position: relative;
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

.overlayGrad {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
}

/* Content Shimmer */
.content {
    position: absolute;
    top: 10%;
    width: 30%;
    left: 12.4%;
    box-sizing: border-box;
    text-shadow: 0 5px 10px #0004;
    height: 78%;
}

.shimmer-title {
    width: 80%;
    height: 60px;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    margin-bottom: 20px;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 5%;
    margin-top: 20px;
}

.shimmer-button {
    padding: 2% 4%;
    border-radius: 47% 53% 70% 30% / 40% 37% 63% 60%;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.shimmer-button-1 {
    width: 180px;
    height: 45px;
    border-radius: 47% 53% 44% 56% / 55% 32% 68% 45%;
}

.shimmer-button-2 {
    width: 250px;
    height: 45px;
}

.desc {
    margin-top: 5%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
}

.shimmer-desc-line {
    height: 16px;
    border-radius: 6px;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.shimmer-desc-1 { width: 90%; }
.shimmer-desc-2 { width: 80%; }
.shimmer-desc-3 { width: 70%; }

/* Thumbnail Shimmer */
.thumbnail {
    position: absolute;
    bottom: 12%;
    right: 16.5%;
    width: max-content;
    z-index: 1000;
    gap: 20px;
    display: flex;
    flex-direction: row;
}

.thumbnail .item {
    width: 120px;
    height: 170px;
    flex-shrink: 0;
    position: relative;
}

.shimmer-thumbnail-image {
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

.shimmer-thumbnail-title {
    width: 80px;
    height: 16px;
    margin-top: 8px;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

/* Arrows */
.arrows {
    position: absolute;
    top: 70%;
    right: 12%;
    z-index: 100;
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.shimmer-arrow {
    width: 40px;
    height: 40px;
    border-radius: 0%;
    border: none;
    font-family: monospace;
    font-weight: bold;
    font-size: 3rem;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Time running */
.shimmer-time {
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 3px;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    left: 0;
    top: 0;
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
#carouselComponent.light .overlayGrad {
    background: linear-gradient(180deg, rgba(9, 30, 24, 0.3) 0%, rgba(9, 30, 24, 0.3) 60%, #efefef 95%);
}

#carouselComponent.light .shimmer-image,
#carouselComponent.light .shimmer-title,
#carouselComponent.light .shimmer-button,
#carouselComponent.light .shimmer-desc-line,
#carouselComponent.light .shimmer-thumbnail-image,
#carouselComponent.light .shimmer-thumbnail-title,
#carouselComponent.light .shimmer-arrow,
#carouselComponent.light .shimmer-time {
    background: linear-gradient(
        90deg,
        rgba(128, 128, 128, 0.2) 25%,
        rgba(169, 169, 169, 0.4) 50%,
        rgba(128, 128, 128, 0.2) 75%
    );
}

/* Dark Theme */
#carouselComponent.dark .overlayGrad {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(153,153,152, 0.3) 60%, #ccc 95%);
}

#carouselComponent.dark .shimmer-image,
#carouselComponent.dark .shimmer-title,
#carouselComponent.dark .shimmer-button,
#carouselComponent.dark .shimmer-desc-line,
#carouselComponent.dark .shimmer-thumbnail-image,
#carouselComponent.dark .shimmer-thumbnail-title,
#carouselComponent.dark .shimmer-arrow,
#carouselComponent.dark .shimmer-time {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 75%
    );
}

/* Responsive */
@media screen and (max-width: 1025px) {
    #carouselComponent {
        display: none;
    }
}

@media screen and (min-width: 1026px) {
    #carouselComponent {
        display: block;
    }
}
</style>