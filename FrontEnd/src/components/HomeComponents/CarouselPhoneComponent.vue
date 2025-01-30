<template>
    <div id="carousellPhoneComponent">
        <CarouselSwipper/>

        <div class="reste">
            <div class="carousellPhoneSwipperInfos">
                <h3>Title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                     aperiam nisi dicta dolorem maiores? Ab at totam aut veritatis
                      nobis officiis quod quis voluptates dignissimos praesentium
                      fugiat, perferendis soluta aliquam.</p>
            </div>
            <div class="carousellPhoneSwipperBtn">
                <button>learn more</button>
                <button>Organisator</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import CarouselSwipper from "./CarousellPhoneSwipper.vue";
</script>
<style lang="scss">
  #carousellPhoneComponent {
    //border: 2px solid rgb(251, 255, 0);
    height: 80svh;
    width: 100%;
    padding-top: 65px;
    margin-bottom: 65px;
    background: linear-gradient(to bottom, rgba(32,31,31,255) 9%, rgba(29, 30, 24, 0.23) 10%);
    //background-color: rgba(29, 30, 24, 0.23);
    #carousellPhoneSwiper {
        height: 40%;
    }
    .reste {
        //border: 2px solid rgb(0, 0, 0);
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .carousellPhoneSwipperInfos{
            //border: 2px solid rgb(193, 24, 156);
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 96%;
            margin: auto;
            h3 {
                font-size: 3rem;
            }
            p {
                font-size: 1.2rem;
            }

        }
        .carousellPhoneSwipperBtn {
            //border: 2px solid rgb(39, 85, 191);
            display: flex;
            flex-direction: column;
            width: 96%;
            margin: auto;

            button {
                //border: 2px solid red;
                width: 100%;
                margin: 2% auto;
                font-size: 1.5rem;
                background-color: #ccc;
            }
        }
    }

  }
  @media screen and (max-width: 1025px){
        #carousellPhoneComponent {
            display: block;
        }
    }
    @media screen and (min-width: 1026px){
        #carousellPhoneComponent {
            display: none;
        }
    }
</style>