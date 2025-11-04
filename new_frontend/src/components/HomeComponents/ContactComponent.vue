<template>
  <div id="contactComponent">
    <div class="header">
      <h3> {{ actualLang ? 'Contact Us' : 'Contacter nous' }} </h3>

      <p>{{  actualLang ? textEng : textFr  }}</p>
    </div>

    <div class="content">
      <div class="left">

        <!-- <div>
          <h4>{{ actualLang ? 'Address' : 'Adresse' }}</h4>
          <div class="iconContainer">
            <v-icon class="icon" icon="mdi-map-marker" />
          </div>

          <div>
            <h4>{{ actualLang ? 'Address' : 'Adresse' }}</h4>
            <p>0000 rue Montreal, A0A 0A0, Qc, CA</p>
          </div>
        </div> -->

        <div>
          <h4>{{ actualLang ? 'Phone' : 'Telephone' }}</h4>
          <div class="iconContainer">
            <v-icon class="icon" icon="mdi-phone" />
          </div>
          <div>
            <h4>{{ actualLang ? 'Phone' : 'Telephone' }}</h4>
            <p>(000) 000 0000</p>
          </div>
        </div>

        <div>
          <h4>Email</h4>
          <div class="iconContainer">
            <v-icon class="icon" icon="mdi-email" />
          </div>
          <div>
            <h4>Email</h4>
            <p class="em">Email@Email.Email</p>
          </div>
        </div>

      </div>
      
      <div class="right">

        <form action="#" method="post">
          <h3>{{ actualLang ? 'Send Message' : 'Votre message' }}</h3>

          <v-text-field
            v-model="objectData"
            clearable
            hide-details="auto"
            hint="this field is mendatory"
            :label="actualLang ? 'Object' : 'Sujet'"
            persistent-clear
            :rules="Name"
            type="input"
          ></v-text-field>

          <!-- <v-text-field
            clearable
            hide-details="auto"
            hint="this field is mendatory"
            :label="actualLang ? 'Email' : 'Email'"
            persistent-clear
            :rules="Email"
            type="input"
          ></v-text-field> -->

          <v-textarea v-model="messageData" :label="actualLang ? 'Type your Message' : 'Entrez votre message'"></v-textarea>

          <waterButton class="btn" :text="actualLang ? 'Send' : 'Envoyer'" :type="true" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref} from 'vue';
  import Setup from '@/JS/Setup';
  import waterButton from '../StaticComponents/WaterButtonComponent.vue';

  const textFr = 'Une question, une suggestion ou l’envie de collaborer ?'
    + 'L’équipe de Montréal’s Drop est toujours ravie d’échanger avec vous !'
    + 'Que ce soit pour proposer un événement, signaler une erreur ou simplement partager votre expérience, n’hésitez pas à nous écrire.'
    + 'Ensemble, faisons découvrir le meilleur de Montréal, de jour comme de nuit.';

  const textEng = 'Have a question, a suggestion, or want to collaborate?'
    + 'The Montréal’s Drop team is always happy to hear from you!'
    + 'Whether you’d like to promote an event, report an issue, or share your experience, feel free to reach out.'
    + 'Together, let’s showcase the best of Montreal — day and night.';

  let actualLang = Setup.languageSetup();

  const email = "email@email.com";
  let objectData = ref(null);
  let messageData = ref(null);

  const sendEmail = () => {
    if (!objectData.value || !messageData.value) {
      alert("Please fill out the subject and message.");
      return;
    }

    const subject = encodeURIComponent(objectData.value);
    const body = encodeURIComponent(messageData.value);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

</script>

<style src="../../styles/ComponentsStyles/HomeStyles/ContactStyle.scss"></style>
<style src="../../styles/ComponentsStyles/HomeStyles/ContactStyleColor.scss"></style>