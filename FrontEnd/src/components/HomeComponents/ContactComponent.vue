<template>
    <div id="contactComponent">
        <div class="header">
            <h3>Contact Us</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta facilis enim quas laboriosam consequuntur 
                itaque veritatis, officiis consequatur, quidem illum, ad saepe quos. Nobis, repudiandae molestiae! Obcaecati 
                nihil beatae veritatis?</p>
        </div>

        <div class="content">
            <div class="left">

                <div>
                    <v-icon icon="mdi-map-marker" class="icon glow"/>
                    <div>
                        <h4>Address</h4>
                        <p>0000 rue Montreal, A0A 0A0, Qc, CA</p>
                    </div>
                </div>

                <div>
                    <v-icon icon="mdi-phone" class="icon glow"/>
                    <div>
                        <h4>Phone</h4>
                        <p>(000) 000 0000</p>
                    </div>
                </div>

                <div>
                    <v-icon icon="mdi-email" class="icon glow"/>
                    <div>
                        <h4>Email</h4>
                        <p>Email@Email.Email</p>
                    </div>
                </div>

            </div>
            <div class="right">
                <form action="#" method="post">
                    <h3>Send Message</h3>

                    <v-text-field
                        :rules="Name"
                        hide-details="auto"
                        label="Full name"
                    ></v-text-field>

                    <v-text-field
                        :rules="Email"
                        hide-details="auto"
                        label="Email"
                    ></v-text-field>

                    <v-textarea label="Type your Message"></v-textarea>

                    <input type="button" value="Send">

                </form>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style src="../../styles/HomesStyles/ContactComponentStyle.scss"></style>