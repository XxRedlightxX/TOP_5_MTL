<template>
    <div id="waterButtonComponent"  >
        <div :class="['water-drop', props.type ? 'type1' : 'type2']">
            {{props.text}}
        </div>
    </div>


</template>

<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        text: String,
        type: Boolean,
    });</script>

<style lang="scss">
    #waterButtonComponent {
        height: 75px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;

        .water-drop {
            width: 90%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;

            color: var(--graphite);
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            transition: all 0.3s;
        }
        .type1 {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% ;
        }
        .type2 {
            border-radius: 47% 53% 28% 72% / 77% 20% 80% 23%  ;
        }

        .type1::before {
            content: "";
            position: absolute;
            height: 5px;
            width: 13px;
            border-radius: 50%;
            left: 10%;
            top: 25%;
            transform: rotate(-40deg);
        }
        .type2::before {
            content: "";
            position: absolute;
            height: 5px;
            width: 13px;
            border-radius: 50%;
            right: 8%;
            top: 35%;
            transform: rotate(-48deg);
        }

        .water-drop:hover {
            width: 100%;
            height: 90%;
            font-size: 1.6rem;
            cursor: pointer;
        }
        .type1:hover {
            border-radius: 47% 53% 70% 30% / 40% 37% 63% 60% ;
        }
        .type2:hover {
            border-radius: 47% 53% 44% 56% / 55% 32% 68% 45% ;
        }
    }

    .light {
        #waterButtonComponent {
            .water-drop {
                box-shadow: 5px 5px 10px #0008,
                10px 6px 15px #0008 inset,
                -5px -5px 8px #f5f5ff inset,
                10px 6px 15px #0004 inset;

                color: var(--graphite);
                text-shadow: 2px 2px 5px #0008;
            }

            .water-drop::before {
                background: #fff8;
            }
            .water-drop::before:hover {
                background: #fff8;
            }

            .water-drop:hover {
            }
        }
    }

    .dark {
        #waterButtonComponent {
            .water-drop {
                box-shadow: 5px 5px 10px #0008,
                10px 6px 15px #0008 inset,
                -5px -5px 8px #f5f5ff inset,
                10px 6px 15px #0004 inset;

                color: var(--graphite);
                text-shadow: 2px 2px 5px #0008;
            }

            .water-drop::before {
                background: #fff8;
            }
            .water-drop::before:hover {
                background: #fff8;
            }

            .water-drop:hover {
            }
        }
    }
</style>