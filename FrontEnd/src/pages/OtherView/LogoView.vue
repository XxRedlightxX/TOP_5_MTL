<template>
    <div id="Logo">
        <!-- <Logo  :size="3"/> -->
        <Heart  :size="3"/>
    </div>
</template>

<script setup>
    import Logo from "../../components/Logos/Logo3Component.vue"
    import Heart from "../../components/EventComponents/ListOfEventsComponents/heartIcon.vue"
</script>


<style lang="scss">
    #heartIcon {
        //padding: 5% 0% 8% 0%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #Logo, #heartIcon {
        padding: 5% 0% 8% 0%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        #text3dComponent{
            position: absolute;
            bottom: 30%;
                .text{
                    font-size: 2rem;
                    font-weight: 700;
                }
        }
        #logo3Component{
            width: 400px;
            height: 400px;

            #text3dComponent {
                width: 100%;
                padding: 3% 10%;
                height: 60%;
                .text{
                    font-size: 7rem;
                    font-weight: 500;
                }
            }
        }
    }
    .light {
        #Logo {
            #logo3Component{
                .wave {
                    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
    .dark {
        #Logo {
            #logo3Component{
                .wave {
                    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
</style>