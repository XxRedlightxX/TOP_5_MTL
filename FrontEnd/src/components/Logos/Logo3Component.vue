<template>
    <router-link 
        to="/" 
        id="logo3Component" 
        :class="{
            'mmm': props.size === -1,
            'mini': props.size === 0,
            'small': props.size === 1,
            'medium': props.size === 2,
            'large': props.size === 3
        }"
    >
        <Text :text="text" :shadow="false" :size="props.size"/>
        <div class="wave"></div>
    </router-link>
</template>

<script setup>
import Text from "./3dTextComponent.vue"
import { defineProps } from "vue";

const props = defineProps({
    size: Number
});
const text = "Drop";
</script>


<style lang="scss">
    #logo3Component{
        position: absolute;
        border-radius: 50%;
        overflow: hidden;

        #text3dComponent {
            position: absolute;
            z-index: 1000;
        }
        .wave {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            z-index: 100;
        }
        .wave:before, .wave:after {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: 10%;
            left: 50%;
            transform: translate(-50%, -75%);
            z-index: 110;
        }
        .wave:before {
            border-radius: 45%;
            //transform: translate(-40%, -70%);
            animation: animate 5s linear infinite;
        }
        .wave:after{
            border-radius: 40%;
            //transform: translate(-50%, -70%);
            animation: animate 10s linear infinite;
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
        width: 55px;
        height: 55px;

        #text3dComponent {
            width: 100%;
            padding: 5% 10%;
            //height: 60%;
            .text{
                font-size: 14px;
                font-weight: 300;
            }
        }
    }
    .small {
        width: 100px;
        height: 100px;

        #text3dComponent {
            width: 100%;
            padding: 5% 10%;
            //height: 60%;
            .text{
                font-size: 20px;
                font-weight: 200;
            }
        }
    }
    .medium {
        width: 200px;
        height: 200px;
        #text3dComponent {
            width: 100%;
            padding: 15% 10%;
            //height: 60%;
            .text{
                font-size: 3rem;
                font-weight: 400;
            }
        }
    }
    .large {
        width: 400px;
        height: 400px;

        #text3dComponent {
            width: 100%;
            padding: 3% 10%;
            //height: 60%;
            .text{
                font-size: 7rem;
                font-weight: 500;
            }
        }
    }
    @media screen and (max-width: 1025px) {
        .mmm {
            width: 70%;
            height: auto;
            aspect-ratio: 1/1;
            //padding: 100% auto;

            #text3dComponent {
                width: 100%;
                padding: 4% 10% 0% 10%;
                //border: 2px solid red;
                .text{
                    font-size: 3vw;
                    font-weight: 50;
                }
            }
        }
        .mini {
            width: 65%;
            height: auto;
            aspect-ratio: 1/1;
            //padding: 100% auto;

            #text3dComponent {
                width: 100%;
                padding: 15% 10% 0% 10%;
                //border: 2px solid red;
                .text{
                    font-size: 18vw;
                    font-weight: 300;
                }
            }
        }
    }
    .light {
        #logo3Component{
            border: 2px solid rgba(189,189,188,1); // var(--light-text);
            //box-shadow: 0 0 0 5px rgba(189,189,188,1) ;

            .wave {
                background: rgba(189,189,188,1);
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            }
            .wave:before {
                background: var(--light-text);
            }
            .wave:after{
                background: var(--light-trans-2Shine);
            }
        }
    }
    .dark {
        #logo3Component{
            border: 2px solid rgba(255, 255, 255, 0.7);
            //box-shadow: 0 0 0 5px var(--light-text);

            .wave {
                background: var(--light-text);
                box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
            }
            .wave:before {
                background: rgb(29, 30, 24, 0.6);
            }
            .wave:after{
                background: rgb(29, 30, 24, 0.15);
            }
        }
    }
</style>