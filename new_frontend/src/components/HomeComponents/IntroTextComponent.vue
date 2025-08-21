<template>
  <div id="introTextComponent">
    <p>{{ text }}</p>
    <hr>
  </div>
</template>

<script setup>
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase';
  const text = FakeDataBase.getIntroText();
</script>

<style lang="scss">
    #introTextComponent {
        background: transparent;
        border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
        text-align: center;
    }

    .light {
        #introTextComponent {
            box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
            p {
                color: var(--graphite06);
            }
            hr {
                display: none;
            }
        }
    }

    .dark {
        #introTextComponent {
            p {
                color: var(--light-text);
            }
            hr {
                display: block;
                width: 80%;
                margin: 1% auto 2% auto;

                height: 5px;
                color: var(--light);
                border-color: var(--light);
                background-color: var(--light);
                animation: neonGlowBox 0.5s ease-in-out infinite alternate;
            }
        }
    }
    @media screen and (min-width: 1026px){
        #introTextComponent {
            width: 75%;
            margin: auto;

            p {
                font-size: 1.6rem;
                margin: 3% 3%;
                padding: 8% 2%;
            }
        }
    }
    @media screen and (max-width: 1025px){
        #introTextComponent {
            width: 90%;
            margin: 5% auto 10% auto;

            p {
                font-size: 1rem;
                margin: 0% 3%;
                padding: 18% 12%;
            }
        }
    }
</style>