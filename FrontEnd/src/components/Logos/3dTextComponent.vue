<template>
    <div id="text3dComponent" 
        :class="{
            'miniText': size === 0,
            'smallText': size === 1,
            'mediumText': size === 2,
            'largeText': size === 3
        }">
        <span :class="['text', props.shadow ? 'shadow' : '']">{{ props.text }}</span>
    </div>
</template>

<script setup>
    import { defineProps} from "vue";

    const props = defineProps({
        text: String,
        shadow: Boolean,
        size: Number
    });
</script>

<style lang="scss">
    #text3dComponent{
        z-index: 1000;

        .text{
            text-transform: uppercase;
        }
    }

    .light {

        .miniText {
            .text{
                color: rgba(189,189,188,1);
                text-shadow: 1px 1px 1px #919191,
                        1px 2px 1px #919191,
                        1px 3px 1px #919191;
            }
            .shadow {
                text-shadow: 0.25px 1.5px 1.5px rgba(16, 16, 16, 0.4),
                            0.25px 2px 1.5px rgba(16, 16, 16, 0.2);
            }


        }
        .smallText, .mediumText, .largeText {
            .text{
                color: rgba(189,189,188,1);
                text-shadow: 1px 1px 1px #919191,
                        1px 2px 1px #919191,
                        1px 3px 1px #919191;
            }
            .shadow {
                text-shadow: 1px 6px 6px rgba(16, 16, 16, 0.4),
                1px 8px 6px rgba(16, 16, 16, 0.2);;
            }
        }
    }
    .dark {
        #text3dComponent{
            .text{
                color: var(--light);
                animation: neonGlow 0.5s ease-in-out infinite alternate;
            }
            .shadow {
                text-shadow: 1px 6px 6px rgba(222, 222, 222, 0.4),
                1px 8px 6px rgba(222, 222, 222, 0.2);;
            }
        }
    }
</style>