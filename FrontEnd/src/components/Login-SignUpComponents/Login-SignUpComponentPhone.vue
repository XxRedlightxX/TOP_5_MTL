<template>
    <div class="wrapper">
        <div class="form-container">
            <div class="slide-controls">
                <input type="radio" name="slide" id="login" checked>
                <input type="radio" name="slide" id="signup">

                <label for="login" class="slide login" @click="showLogin()">Login</label>
                <label for="signup" class="slide signup" @click="showSignUp()">Signup</label>

                <div class="slider-tab"></div>
            </div>

            <div class="form-inner">

                <SignIn class="login"/>

                <SignUp class="signup"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import SignIn from "./SignInComponent.vue";
    import SignUp from "./SignUpComponent.vue";

    const showSignUp = () => {
        document.querySelector("form.login").style.marginLeft = "-50%";
    };

    const showLogin = () => {
        document.querySelector("form.login").style.marginLeft = "0%";
    };
</script>

<style src="../../styles/Login-SignUpStyles/Login-SignUpComponentPhoneStyle.scss"></style>