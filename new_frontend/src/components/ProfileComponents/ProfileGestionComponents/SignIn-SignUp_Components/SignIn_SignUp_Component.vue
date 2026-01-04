<template>
  <div id="signIp_signUp">
    <SignIn_SignUpComponentGrandEcrant />
    <SignIn_SignUpComponentPhone />
  </div>
</template>

<script setup>
  import SignIn_SignUpComponentGrandEcrant from './SignIn_SignUpComponentGrandEcrant.vue';
  import SignIn_SignUpComponentPhone from './SignIn_SignUpComponentPhone.vue';
</script>

<style lang="scss">
    #signIp_signUp {
        height: 100%;
        margin: auto;
    }
@media screen and (min-width: 1025.1px) {
    #signIp_signUp {
        width: 75%;
        z-index: 2;
        #in_up_Grand {
            display: block;
        }
        #in_up_Phone {
            display: none;
        }
    }
}
@media screen and (max-width: 1025px) {
    #signIp_signUp {
        width: 90%;
        z-index: 2;
        #in_up_Grand {
            display: none;
        }
        #in_up_Phone {
            display: block;
        }
    }
}
</style>
