<template>
    <router-link to="/Logo"  id="logo3Component"  >
        <Text :text="text" :shadow="false"/>
        <div class="wave"></div>
    </router-link>
</template>

<script setup>
    import Text from "./3dTextComponent.vue"
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
            animation: animate 5s linear infinite;
        }
        .wave:after{
            border-radius: 40%;
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
    .light {
        #logo3Component{
            border: 2px solid var(--light-text);
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
            border: 2px solid rgba(189,189,188,1);
            //box-shadow: 0 0 0 5px var(--light-text);

            .wave {
                background: var(--light-text);
                box-shadow: inset 0 0 2nepx rgba(0, 0, 0, 0.5);
            }
            .wave:before {
                background: rgba(189,189,188,1);
            }
            .wave:after{
                background: rgba(189,189,188,0.5);
            }
        }
    }
</style>