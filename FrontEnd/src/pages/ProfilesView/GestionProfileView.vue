<template>
    <div id="gestionProfileView">
        <h3> Gestion profile View</h3>
        <div class="photo-profile">
            <div class="test">
            <img src="../../assets/bob.jpg">
            <div class="overlay">My Name is John</div>
        </div>
        </div>


        <form action="">
    <div>
        <label for="fname">Full name:</label>
        <input type="text" id="fname" name="fname" value="John">
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" value="Doe">
    </div>
    <div>
        <label for="number">Number:</label>
        <input type="text" id="number" name="number" value="Doe">
    </div>
    <div>
        <label for="city">City:</label>
        <input type="text" id="city" name="city" value="Doe">
    </div>
    <div class="row_input">
        <div >
            <label for="region">Region:</label>
            <input type="text" id="region" name="region" value="Doe">
        </div>
        <div>
            <label for="postal-code">Postal Code:</label>
            <input type="text" id="postal-code" name="postal-code" value="Doe">
        </div>
    </div>

   <div class="button_confirmer">
    
        <input type="submit" value="Cancel">

        <input type="submit" value="Submit">
    </div>
</form>


    </div>
</template>

<script setup></script>


<style src="../../styles/ProfilesStyles/GestionProfileViewStyle.scss"></style>