<template>
    <div 
    id="heartIcon" 
        :class="{
            'mini': props.size === 0,
            'small': props.size === 1,
            'medium': props. size === 2,
            'large': props.size === 3
        }"
    >
        <div class="heart"></div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

    const props = defineProps({
        size: Number
    });
</script>


<style lang="scss">
    #heartIcon{
        //overflow: hidden;
        position: relative;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-top: 2%;
        .heart {
            position: absolute;
            aspect-ratio: 1;
            --_m: radial-gradient(#000 69%,#0000 70%) 84.5%/50%;
            -webkit-mask-box-image: var(--_m);
                        mask-border: var(--_m);
            clip-path: polygon(-41% 0,50% 91%, 141% 0);
            background: rgba(189,189,188,1);
            z-index: 10;
        }
        .heart:hover {
            background: rgba(189,189,188,0.7);
        }
        /* fallback until better support for mask-border */
        @supports not (-webkit-mask-box-image: var(--_m)) { 
            .heart {
                mask:
                radial-gradient(at 70% 31%,#000 29%,#0000 30%),
                radial-gradient(at 30% 31%,#000 29%,#0000 30%),
                linear-gradient(#000 0 0) bottom/100% 50% no-repeat;
            }
        }

        .heart:before, .heart:after {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            top: 10%;
            left: 50%;
            transform: translate(-50%, -75%);
            z-index: 110;
        }
        .heart:before {
            border-radius: 45%;
            animation: animate 5s linear infinite;
            background: var(--light-text)
        }
        
        .heart:before:hover {
            background: var(--light)
        }
        .heart:after{
            border-radius: 40%;
            animation: animate 10s linear infinite;
            background: var(--light-trans-2Shine);
        }
        .heart:after:hover{
            background: var(--light-text)
        }
        @keyframes animate {
            0%{
                transform: translate(-50%, -75%) rotate(0deg);
            }
            100%{
                transform: translate(-50%, -75%) rotate(360deg);
            }
        }
    }
    .mini {
        .heart {
            height: 40px;
        }
        .heart:hover {
            height: 45px;
        }
    }
    .small {
        .heart {
            height: 100px;
        }
        .heart:hover {
            height: 110px;
        }
    }
    .medium {
        .heart {
            height: 250px;
        }
        .heart:hover {
            height: 375px;
        }
        
    }
    .large {
        .heart {
            height: 400px;
        }
        .heart:hover {
            height: 405px;
        }
    }
</style>