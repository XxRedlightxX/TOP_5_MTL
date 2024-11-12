<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div id="eventFilterComponent">
        <div class="categories">
            <div class="categories_horizontal"  style=" padding: 20px; ">
                <div style="width: 50%; ">
                    
                </div>
                <div style="width: 50%;  ;  ">
                    <div class="search-container"  >
                        <button type="submit" class="search-icon">
                            <i class="fa fa-search"></i>
                        </button>
                        <input type="text" placeholder="Search..." class="search-bar">
                    </div>
                </div>
            </div>
            <div id="container">
                <div id="slider-container">
                    <!-- Change onclick to @click -->
                    <span @click="slideRight" class="btn inactive"></span>
                    <div id="slider" class="listeCategories">
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/gaming-gamepad-icon.svg" class="filter-green"> Gaming
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/music-icon.svg"> Music
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/art.svg"> Arts
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/biking-svgrepo-com.svg"> Biking
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/concert.svg"> Hiking
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/business.svg"> Internship
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/shirts.svg"> Fashion
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/gaming-gamepad-icon.svg"> Internship
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/party-horn-svgrepo-com.svg"> Internship
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/Logo-Gem.svg"> Internship
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/Logo-Gem.svg"> Internship
                        </div>
                        <div class="slide listeCategories_objet">
                            <img src="/src/assets/Logo-Gem.svg"> Internships
                        </div>
                        
                    </div>
                    <!-- Change onclick to @click -->
                    <span @click="slideLeft" class="btn"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let currentPosition = ref(0);
let currentMargin = ref();
let slidesPerPage = ref(4); // Start with default value
let slidesCount = ref(2);

let container, slider, buttons;
let startX = ref(0);  // Used for both touch and mouse events
let endX = ref(0);    // Used for both touch and mouse events

onMounted(() => {
    container = document.getElementById('container');
    slider = document.getElementById('slider');
    buttons = document.getElementsByClassName('btn');
    slidesCount.value = document.getElementsByClassName('slide').length - slidesPerPage.value;

    checkWidth();
    window.addEventListener('resize', checkWidth);

  
    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);
    slider.addEventListener('touchend', handleTouchEnd, false);

  
    slider.addEventListener('mousedown', handleMouseDown, false);
    slider.addEventListener('mousemove', handleMouseMove, false);
    slider.addEventListener('mouseup', handleMouseUp, false);
    slider.addEventListener('mouseleave', handleMouseUp, false);  // Handles when mouse leaves the slider while dragging
});

onUnmounted(() => {
  
    window.removeEventListener('resize', checkWidth);
    slider.removeEventListener('touchstart', handleTouchStart);
    slider.removeEventListener('touchmove', handleTouchMove);
    slider.removeEventListener('touchend', handleTouchEnd);

    slider.removeEventListener('mousedown', handleMouseDown);
    slider.removeEventListener('mousemove', handleMouseMove);
    slider.removeEventListener('mouseup', handleMouseUp);
    slider.removeEventListener('mouseleave', handleMouseUp);
});


function handleTouchStart(e) {
    startX.value = e.touches[0].clientX;
}

function handleTouchMove(e) {
    endX.value = e.touches[0].clientX;
}

function handleTouchEnd() {
    handleSwipe();
}


function handleMouseDown(e) {
    startX.value = e.clientX; 
    slider.style.cursor = 'pointer'; 
}

function handleMouseMove(e) {
    if (startX.value !== 0) {
        endX.value = e.clientX; 
    }
}

function handleMouseUp() {
    if (startX.value !== 0) {
        slider.style.cursor = 'pointer'; 
        handleSwipe(); 
        startX.value = 0; 
        endX.value = 0;
    }
}

function handleSwipe() {
    if (endX.value < startX.value) {
       
        slideLeft();
    } else if (endX.value > startX.value) {
        
        slideRight();
    }
}

function checkWidth() {
    let containerWidth = container.offsetWidth;
    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        slidesPerPage.value = 1;
    } else if (w < 901) {
        slidesPerPage.value = 2;
    } else if (w < 1101) {
        slidesPerPage.value = 3;
    } else {
        slidesPerPage.value = 7;
    }

    slidesCount.value = document.getElementsByClassName('slide').length - slidesPerPage.value;

    if (currentPosition.value > slidesCount.value) {
        currentPosition.value = slidesCount.value;
    }

    currentMargin.value = -currentPosition.value * (100 / slidesPerPage.value);
    slider.style.marginLeft = currentMargin.value + '%';

    updateButtons();
}

function updateButtons() {
    if (currentPosition.value === 0) {
        buttons[0].classList.add('inactive');
    } else {
        buttons[0].classList.remove('inactive');
    }

    if (currentPosition.value >= slidesCount.value) {
        buttons[1].classList.add('inactive');
    } else {
        buttons[1].classList.remove('inactive');
    }
}

function slideRight() {
    if (!buttons[0].classList.contains('inactive')) {
        currentPosition.value--;
        currentMargin.value += 100 / slidesPerPage.value;
        slider.style.marginLeft = currentMargin.value + '%';
        updateButtons();
    }
}

function slideLeft() {
    if (!buttons[1].classList.contains('inactive')) {
        currentPosition.value++;
        currentMargin.value -= 100 / slidesPerPage.value;
        slider.style.marginLeft = currentMargin.value + '%';
        updateButtons();
    }
}

</script>


<style src="../../../styles/EventsStyles/EventFilterComponentStyle.scss"></style>