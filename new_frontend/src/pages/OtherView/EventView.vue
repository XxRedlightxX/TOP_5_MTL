<template>
  <div id="event">
    <div class="viewContent">
      <EventDetail :activityDesc="event.desc" :activityImg="event.image" :activityTitle="event.title" />
      <div class="suite">
        <div class="sub">
          <EventOverview :Rating="event.rating" :hostName="Didier" :place="'Normandie, France'" />
          <EventCommentSelf />
        </div>
        <EventComment />
      </div>
    </div>
    <EventMap />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import EventComment from '@/components/EventComponents/SingleEventComponents/EventCommentComponent.vue';
  import EventCommentSelf from '@/components/EventComponents/SingleEventComponents/EventCommentSelfComponent.vue';
  import EventDetail from '@/components/EventComponents/SingleEventComponents/EventDetailComponent.vue';
  import EventMap from '@/components/EventComponents/SingleEventComponents/EventMapComponent.vue';
  import EventOverview from '@/components/EventComponents/SingleEventComponents/EventOverviewComponent.vue';
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase';

  const event = ref(LocalStorageManager.getEvent());
  if (event.value == null) {
    event.value = FakeDataBase.getOneEvent();
  }

</script>

<style lang="scss">
#event {
    .viewContent {
        display: flex;
        flex-direction: column;
        border-radius: 16px;

        #eventView {
            margin-bottom: 5%;
        }
        // .suite {
        //     display: flex;
        //     flex-direction: row;
        //     //height: 100%;
        //     .sub {
        //         width: 40%;
        //         height: 100%;
        //         //margin: auto;
        //         display: flex;
        //         flex-direction: column;
        //         justify-content: flex-start;
        //         align-items: center;
        //         gap: 5%;
        //         #EventOverview {
        //             align-self: center;
        //             //border: 2px solid red;
        //         }
        //         #eventCommentSelfComponent{
        //             margin-top: 8%;
        //         }
        //     }
        //     // #eventCommentSelfComponent {
        //     //     width: 100%;
        //     //     margin: 2% auto 0% auto;
        //     // }
        //     #EventComment {
        //         width: 60%;
        //     }
        // }

    }

    #EventMap {
        margin: 2% auto;
        padding: 0px;
    }
}
@media screen and (min-width: 1025.1px) {
    .viewContent {
        width: 75%;
        margin: 0% auto 0% auto;
        padding: 0% 1%;

        .suite {
            display: flex;
            flex-direction: row;
            //height: 100%;
            .sub {
                width: 40%;
                height: 100%;
                //margin: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                gap: 5%;
                #EventOverview {
                    align-self: center;
                    //border: 2px solid red;
                }
                #eventCommentSelfComponent{
                    display: block;
                    margin-top: 8%;
                }
            }
            // #eventCommentSelfComponent {
            //     width: 100%;
            //     margin: 2% auto 0% auto;
            // }
            #EventComment {
                width: 60%;
            }
            #eventCommentSelfComponent{
                display: none;
            }
        }
    }
    #EventMap {
        width: 75%;
    }
}
@media screen and (max-width: 1025px) {
    .viewContent {
        width: 100%;
        padding: 0% 4%;
        margin: 15% auto 0% auto;

        .suite {
            display: flex;
            flex-direction: column;
            align-items: center;
            //height: 100%;
            .sub {
                width: 100%;
                //height: 100%;
                //margin: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                gap: 5%;
                #EventOverview {
                    align-self: center;
                    //border: 2px solid red;
                }
                #eventCommentSelfComponent{
                    display: none;
                }
            }
            // #eventCommentSelfComponent {
            //     width: 100%;
            //     margin: 2% auto 0% auto;
            // }
            #EventComment {
                width: 100%;
                margin-top: 10%;
            }

            #eventCommentSelfComponent{
                width: 100%;
                margin: 5% auto;
                display: block;
            }
        }
    }
    #EventMap {
        width: 94%;
    }
}
</style>