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
                        <v-icon icon="mdi-map-marker" class="icon"/>
                    </div>
                    
                    <div>
                        <h4>{{ actualLang ? 'Address' : 'Adresse' }}</h4>
                        <p>0000 rue Montreal, A0A 0A0, Qc, CA</p>
                    </div>
                </div>

                <div>
                    <h4>{{ actualLang ? 'Phone' : 'Telephone' }}</h4>
                    <div class="iconContainer">
                        <v-icon icon="mdi-phone" class="icon"/>
                    </div>
                    <div>
                        <h4>{{ actualLang ? 'Phone' : 'Telephone' }}</h4>
                        <p>(000) 000 0000</p>
                    </div>
                </div>

                <div>
                    <h4>Email</h4>
                    <div class="iconContainer">
                        <v-icon icon="mdi-email" class="icon"/>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p class="em">Email@Email. Email</p>
                    </div>
                </div>

            </div>
            <div class="right">
                
                <form action="#" method="post">
                    <h3>{{ actualLang ? 'Send Message' : 'Votre message' }}</h3>

                    <v-text-field
                        :rules="Name"
                        hide-details="auto"
                        :label="actualLang ? 'Full name' : 'Nom complet'"
                        
                        hint="this field is mendatory"
                        type="input"
                        clearable
                        persistent-clear 
                    ></v-text-field>

                    <v-text-field
                        :rules="Email"
                        hide-details="auto"
                        :label="actualLang ? 'Email' : 'Email'"
                        
                        hint="this field is mendatory"
                        type="input"
                        clearable
                        persistent-clear 
                    ></v-text-field>

                    <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"></v-textarea>

                    <!-- <input type="button" :value="actualLang ? 'Send' : 'Envoyer'"> -->
                    <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true" class="btn"/>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted} from "vue";
    import waterButton from "../WaterButtonComponent.vue"

    let actualLang = ref(storageManager.getLang());

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
    
</script>

<style src="../../styles/HomesStyles/ContactComponentStyle.scss"></style>