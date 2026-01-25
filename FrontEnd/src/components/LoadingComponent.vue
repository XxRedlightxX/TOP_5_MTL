<template>
    <div class="shimmer-loading">
        <!-- Shimmer comment skeletons -->
        <div class="shimmer-comment" v-for="n in 2" :key="n">
            <div class="shimmer-glas">
                <div class="section">
                    <div class="shimmer-avatar"></div>
                    <div class="shimmer-user-info">
                        <div class="shimmer-line shimmer-name"></div>
                        <div class="shimmer-line shimmer-date"></div>
                    </div>
                </div>
                <div class="commen shimmer-content">
                    <div class="shimmer-line shimmer-text"></div>
                    <div class="shimmer-line shimmer-text"></div>
                    <div class="shimmer-line shimmer-text shimmer-text--short"></div>
                    <div class="shimmer-line shimmer-rating"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shimmer-loading {
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
}

.shimmer-comment {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.shimmer-glas {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    margin-bottom: 2%;
    padding-bottom: 1%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 8px;
    padding: 16px;
}

.section {
    display: flex;
    padding: 10px;
    gap: 1em;
}

.shimmer-avatar {
    width: 40px;
    height: 40px;
    border-radius: 30px;
    background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0.6) 25%,
        rgba(224, 224, 224, 0.8) 50%,
        rgba(240, 240, 240, 0.6) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    flex-shrink: 0;
}

.shimmer-user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.shimmer-content {
    padding-top: 10px;
    padding-left: 60px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.shimmer-line {
    height: 12px;
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

.shimmer-name {
    width: 120px;
    height: 14px;
}

.shimmer-date {
    width: 80px;
    height: 10px;
}

.shimmer-text {
    width: 90%;
    height: 10px;
}

.shimmer-text--short {
    width: 60%;
}

.shimmer-rating {
    width: 100px;
    height: 16px;
    margin-top: 4px;
    border-radius: 8px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>