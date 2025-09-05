<template>
  <div id="contactComponent">
    <div class="header">
      <h3> {{ actualLang ? 'Contact Us' : 'Contacter nous' }} </h3>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta facilis enim quas laboriosam consequuntur
        itaque veritatis, officiis consequatur, quidem illum, ad saepe quos. Nobis, repudiandae molestiae! Obcaecati
        nihil beatae veritatis?</p>
    </div>

    <div class="content">
      <div class="left">

        <div>
          <h4>{{ actualLang ? 'Address' : 'Adresse' }}</h4>
          <div class="iconContainer">
            <v-icon class="icon" icon="mdi-map-marker" />
          </div>

          <div>
            <h4>{{ actualLang ? 'Address' : 'Adresse' }}</h4>
            <p>0000 rue Montreal, A0A 0A0, Qc, CA</p>
          </div>
        </div>

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
            clearable
            hide-details="auto"
            hint="this field is mendatory"
            :label="actualLang ? 'Full name' : 'Nom complet'"
            persistent-clear
            :rules="Name"
            type="input"
          ></v-text-field>

          <v-text-field
            clearable
            hide-details="auto"
            hint="this field is mendatory"
            :label="actualLang ? 'Email' : 'Email'"
            persistent-clear
            :rules="Email"
            type="input"
          ></v-text-field>

          <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"></v-textarea>

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

  let actualLang = Setup.languageSetup();
</script>

<style src="../../styles/ComponentsStyles/HomeStyles/ContactStyle.scss"></style>
<style src="../../styles/ComponentsStyles/HomeStyles/ContactStyleColor.scss"></style>