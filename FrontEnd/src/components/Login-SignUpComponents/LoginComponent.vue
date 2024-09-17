<template>
    <div id="loginComponent">
        <h1> Login Component</h1>
        <div class="Conteneur_login">
       

       <div class="login_form">
          
           <form action="#">
             <h3>Log in with</h3>
             <div class="login_option">
             
               <div class="option">
                 <a href="#">
                    <img src="../../assets/google.jpg" alt="Google">
                   <span>Google</span>
                 </a>
               </div>
           
               
             </div>
          
             <p class="separator">
               <span>or</span>
             </p>
            
             <div class="input_box">
               <label for="email">Email</label>
               <input type="email" id="email" placeholder="Enter email address" required />
             </div>
             
             <div class="input_box">
               <div class="password_title">
                 <label for="password">Password</label>
                 <a href="#">Forgot Password?</a>
               </div>
               <input type="password" id="password" placeholder="Enter your password" required />
             </div>
             
             <button type="submit">Log In</button>
             <p class="sign_up">Don't have an account? <a href="#">Sign up</a></p>
           </form>
         </div>
    </div>
</div>
</template>

<script setup>
</script>

<style src="../../styles/Login-SignUpStyles/LoginComponentStyle.scss"></style>