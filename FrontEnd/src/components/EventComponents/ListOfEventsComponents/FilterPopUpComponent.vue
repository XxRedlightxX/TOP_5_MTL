<template>
    <div v-if="showCalendarPopup" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
        <h3>Select a Date</h3>

        <h3>Search by Season</h3>

        <!-- Season Tags -->
        <div class="season-tags">
            <span class="tag spring">Spring</span>
            <span class="tag summer">Summer</span>
            <span class="tag fall">Fall</span>
            <span class="tag winter">Winter</span>
        </div>

            <!-- Close Button -->
        <button @click="closePopup">Close</button>
        </div>
    </div>
 </template>
 
<script setup >
    import { defineProps, ref } from "vue";

    const props = defineProps({
        show: Boolean
    });
    const showCalendarPopup = ref(props.show)
const closePopup = () => {
     showCalendarPopup.value = false
   } 
</script>
 
<style lang="scss">

$button-color: #c5a743;
$hover-color: #725e34;
$shadow-color: rgba(24, 26, 20, 0.6);

$overlay-bg-color: rgba(0, 0, 0, 0.5);
$content-bg-color: #fff;
$padding: 20px;
$border-radius: 8px;
$shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
$popup-width: 300px;
$max-width: 90%;
$z-index-overlay: 1000;
    /* SCSS Variables */
$overlay-bg-color: rgba(0, 0, 0, 0.5);
$content-bg-color: #fff;
$button-bg-color: #2e3031;
$padding: 20px;
$border-radius: 8px;
$shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
$tag-padding: 5px 10px;
$tag-radius: 12px;
$popup-width: 300px;
$max-width: 90%;
$z-index-overlay: 1000;

  /* Popup Overlay */
.popup-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
z-index: $z-index-overlay;

/* Popup Content */
.popup-content {
    padding: $padding;
    border-radius: $border-radius;
    box-shadow: $shadow;
    width: $popup-width;
    max-width: $max-width;
    text-align: center;

    h3 {
        margin-top: 0;
    }

    /* Season Tags */
    .season-tags {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin: 10px 0;
        
        .tag {
            padding: $tag-padding;
            border-radius: $tag-radius;
            color: black;
            border-color: #2e3031;
            background-color:#ff9900;
            font-size: 0.85rem;
            font-weight: bold;
            text-transform: uppercase;
        }
    }

    button {
    margin-top: $padding;
    padding: 10px;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    }
}
} 

.light {
    /* Popup Overlay */
    .popup-overlay {
      background: $overlay-bg-color;
  
      /* Popup Content */
      .popup-content {
        background: $content-bg-color;
  
  
        /* Season Tags */
        .season-tags {
        
          .tag {
            color: black;
            border-color: #2e3031;
            background-color:#ff9900;
        
            &.spring { 
            }
        
            &.summer {
              background-color: transparent;
            }
        
            &.fall {
              background-color: transparent;
            }
        
            &.winter {
              background-color: transparent;
            }
          }
        }
  
        button {
          background-color: $button-bg-color;
          color: #fff;
          transition: background-color 0.3s ease;
      
          &:hover {
            background-color: darken($button-bg-color, 10%);
          }
        }
      }
    }
}

.dark {
    /* Popup Overlay */
    .popup-overlay {
        background: $overlay-bg-color;

        /* Popup Content */
        .popup-content {
            background: $content-bg-color;

            /* Season Tags */
            .season-tags {
                .tag {
                    color: black;
                    border-color: #2e3031;
                    background-color:#ff9900;
                
                    &.spring { 
                    }
                
                    &.summer {
                        background-color: transparent;
                    }
                
                    &.fall {
                        background-color: transparent;
                    }
                
                    &.winter {
                        background-color: transparent;
                    }
                }
            }

            button {
                background-color: $button-bg-color;
                color: #fff;
                transition: background-color 0.3s ease;
            
                &:hover {
                    background-color: darken($button-bg-color, 10%);
                }
            }
        }
    }  
}
</style>