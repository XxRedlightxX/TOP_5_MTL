<template>
    <div id="test">
        <Logo :size="3"/>
    </div>
</template>

<script setup>
    import CarousellPhone from "@/components/HomeComponents/CarouselPhoneComponent.vue"
    import Logo from "@/components/Logos/Logo3Component.vue"
</script>


<style lang="scss">
    #test {
        //border: 2px solid red;
        margin-top: 3%;
        width: 45%;
        margin: auto;
        padding: 0px;
        position: relative;
        background-color: red;

        #logo3Component {
            //border: 2px solid red;
            position: fixed;
            top: 18%;
            left: 37%;

            #text3dComponent{
                //border: 2px solid red;
                margin-top: 8%;
            }
        }
    }
</style>