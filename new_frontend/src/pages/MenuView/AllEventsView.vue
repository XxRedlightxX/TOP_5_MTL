<template>
  <div id="allEvent">
    <EventsTag />
    <div class="comingEvent">
      <h3>{{ actualLang ? 'Up coming events' : 'Evenement en approche'}}</h3>
      <UpComingEvent />
    </div>
    <AllEvents />
  </div>
</template>
<script setup>
  import AllEvents from '@/components/EventComponents/ListOfEventsComponents/AllEventsComponent.vue';
  import EventsTag from '@/components/EventComponents/ListOfEventsComponents/EventsTagComponent.vue';
  import UpComingEvent from '@/components/EventComponents/ListOfEventsComponents/UpComingEventComponent.vue';
  import Setup from '@/JS/Setup';

  let actualLang = Setup.languageSetup();
</script>

<style lang="scss">
#allEvent {
    padding-top: 2%;
    .eventFilter {
        margin: 0% auto 2% auto;
        width: 75%;
    }
    .comingEvent {
        margin: auto;
        h3 {
            text-align: left;
            width: 100%;
        }
        .upComingEvent{
            width: 100%;
        }
    }

    #AllEventComponent {
        margin: auto;
        width: 75%;
        padding-bottom: 2%;
    }
}
.light {
    #allEvent {
        .comingEvent {
            h3 {
                color: var(--graphite);
            }
        }
    }
}
.dark {
    #allEvent {
        .comingEvent {
            h3 {
                color: var(--light075);
            }
        }
    }
}
@media screen and (min-width: 1025.1px){
    #allEvent {
        width: 100%;
        //border: 2px solid red;
        .eventFilter {
            margin: 0% auto;
            width: 75%;
        }
        .comingEvent {
            width: 75%;
            h3 {
                font-size: 2.5rem;
                margin-top: 3%;
                padding-left: 4.2%;
            }
            .upComingEvent{
                margin: auto;
            }
        }
        #AllEventComponent {
            margin: auto;
            width: 75%;
            padding-bottom: 2%;
        }
    }
}
@media screen and (max-width: 1025px){
    #allEvent {
        width: 100%;
        //border: 2px solid red;
        height: fit-content;
        margin-top: -3%;
        .eventFilter {
            margin: 0% auto 2% auto;
            width: 95%;
        }
        .comingEvent {
            width: 95%;
            h3 {
                font-size: 3rem;
                margin-top: 6%;
            }
            .upComingEvent{
                margin: 1% auto 0% auto;
            }
        }
        #AllEventComponent {
            margin: 5% auto 0% auto;
            width: 98%;
            padding-bottom: 2%;
        }
    }
}
@media screen and (max-width: 600px){
    #allEvent {
        width: 100%;
        //border: 2px solid red;
        height: fit-content;
        margin-top: 1%;
        .eventFilter {
            margin: 0% auto 2% auto;
            width: 95%;
        }
        .comingEvent {
            width: 95%;
            h3 {
                font-size: 2rem;
                margin-top: 10%;
            }
            .upComingEvent{
                margin: 1% auto 0% auto;
            }
        }
        #AllEventComponent {
            margin: 10% auto 0% auto;
            width: 98%;
            padding-bottom: 2%;
        }
    }
}
</style>