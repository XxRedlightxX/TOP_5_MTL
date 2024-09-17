<template>
    <div id="signUpComponent">
        <h1> SignUp Component</h1>

        <div class="info2">
            <h2>Register</h2>
            <form action="#">
                <div class="form">
                <div class="input_box">
                    <label for="fname">Username:</label>
                    <input type="text" id="fname" name="fname" placeholder="Enter Username"><br><br>
                </div>
                <div class="input_box">
                    <label for="lname">Password : </label>
                     <input type="text" id="lname" name="lname" placeholder="Enter Password"><br><br>
                </div>
                <div class="input_box">
                    <label for="lname"> Confirm Password : </label>
                    
                    <input type="text" id="lname" name="lname" placeholder="Retype Password"><br><br>
                </div>
                <div class="row">
                    <div >
                        <label for="email">Email : </label>
                        <input type="text" id="email" name="email">
                    </div>
                    <div >
                        <label for="phone">Phone Number : </label>
                        <input type="text" id="phone" name="phone">
                    </div>
                </div>
                <label for="lname"> Date : </label>
                <input type="date" id="lname" name="lname"><br><br>
            </div>
            <button type="submit">Log In</button>
            
          </form>
        </div>  
        
    

    </div>
</template>

<script setup></script>

<style src="../../styles/Login-SignUpStyles/SignUpComponentStyle.scss"></style>