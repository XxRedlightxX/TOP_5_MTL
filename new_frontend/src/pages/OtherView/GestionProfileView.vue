<template>
  <div id="gestionProfileView">
    <AvatarUploader :user="theUser" />

    <form action="#" class="forms">
      <div class="leftForm">
        <h2 class="titles">{{ actualLang ? "Account informations" : "Informations sur le compte" }}</h2>
        <div class="sub">
          <v-text-field
            :rules="Name"
            :label="`${actualLang ? 'Name' : 'Nom'} : ${theUser?.name || ''}`"
            type="input"
            clearable
            persistent-clear
            hide-details="auto"
          />

          <v-text-field
            :rules="Name"
            :label="`${actualLang ? 'First name' : 'Prenom'} : ${theUser?.fistname || ''}`"

            type="input"
            clearable
            persistent-clear
            hide-details="auto"
          ></v-text-field>
        </div>

        <v-text-field
          :rules="Name"
          :label="`${actualLang ? 'Username' : 'Nom d\'utilisateur'} : ${theUser?.username || ''}`"

          type="input"
          clearable
          persistent-clear
          hide-details="auto"
        ></v-text-field>

        <div class="sub">
          <v-text-field
            :rules="Email"
            hint="this field is mendatory"
            :label="`${actualLang ? 'Email*' : 'Email*'} : ${theUser?.email || ''}`"

            type="input"
            clearable
            persistent-clear
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            :rules="Number"
            hint="this field is not mendatory"
            :label="`${actualLang ? 'Phone' : 'Telephone'} : ${theUser?.num || ''}`"

            type="input"
            clearable
            persistent-clear
            hide-details="auto"
          ></v-text-field>
        </div>

        <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'" >{{ theUser.desc }}</v-textarea>
      </div>

      <div class="rightForm">
        <h2 class="titles">{{ actualLang ? "Login informations" : "Informations de connection" }}</h2>
        <v-text-field
          :rules="Email"
          :value="actualLang ? 'Email/Username ' : 'Email/Nom d\'utilisateur'"
          type="input"
          readonly="true"
          hide-details="auto"
        ></v-text-field>

        <v-text-field
          :rules="Password"
          :label="actualLang ? 'Password' : 'Mot de passe'"
          type="input"
          clearable
          persistent-clear
          hide-details="auto"
        ></v-text-field>

        <v-text-field
          :rules="Password"
          :label="actualLang ? 'Confirm password' : 'Confirmer le mot de passe'"
          type="input"
          clearable
          persistent-clear
          hide-details="auto"
        ></v-text-field>

      </div>
    </form>
    <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true" class="btn" @click="updateUser()"/>
    <div class="backProfile" :title="actualLang ? 'Back to Profile Page' : 'Retourner a la page Profile'" @click="back()">
      <v-icon icon="mdi-arrow-left-bold-box" class="icon"/>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'
  import AvatarUploader from '../../components/ProfileComponents/ProfileGestionComponents/UserGestionComponents/AvatarComponent.vue'
  import waterButton from '../../components/StaticComponents/WaterButtonComponent.vue'

  const router = useRouter()

  // Initial setup
  const actualMode = Setup.modeSetup()
  const actualLang = Setup.languageSetup()
  let isLogged = Setup.loginSetup()
  let theUser = ref(null)

  const back = () => {
    router.go(-1)
  }

  onMounted(() => {
    if (isLogged.value === true) {
      theUser.value = LocalStorageManager.getLogUser()
      if (theUser.value === null) {
        // sécurité si jamais LocalStorage est vide
        router.push('/profile')
      }
    } else {
      // redirect direct si pas loggé
      router.push('/profile')
    }
  })
</script>

<style lang="scss">

#gestionProfileView {
    //border: 2px solid red;
    position: relative;
    .backProfile {
        position: absolute;
        //width: 10%;
        height: fit-content;
        //border: 2px solid red;
        display: flex;
        justify-content: center;
        text-decoration: none;
        cursor: pointer;
    }
}
.light {
    #gestionProfileView {
        .titles{
            color: var(--graphite);
        }
        .forms {
            .leftForm {
                color: var(--graphite08);
            }
            .rightForm {
                color: var(--graphite08);
            }
        }
        .backProfile {
            .icon {
                color: var(--graphite06);
            }
            .icon:hover {
                color: var(--graphite02);
            }
        }
    }
}
.dark {
    #gestionProfileView {
        .titles{
            color: var(--light);
        }
        .forms {
            .leftForm {
                color: var(--light075);
            }
            .rightForm {
                color: var(--light075);
            }
        }
        .backProfile {
            .icon {
                color: var(--light075);
            }
            .icon:hover {
                color: var(--light04);
                animation: neonGlowLess 0.5s ease-in-out infinite alternate;
            }
        }
    }
}

@media screen and (min-width: 1025.1px) {
    #gestionProfileView {
        width: 75%;
        margin: 4% auto 4% auto;
        padding: 3% 1% 0% 1%;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titles{
            font-size: 2rem;
            margin-bottom: 3%;
        }

        #avatarUploader {
            width: 15%;
        }
        .forms {
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 5%;
            margin-top: 3%;

            .leftForm {
                padding: 5% 0%;
                width: 50%;

                .sub {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    gap: 5%;
                    .v-text-field {
                        width: 50%;
                    }
                }

                .v-text-field {
                    margin-bottom: 3%;
                }
            }
            .rightForm {
                padding: 5% 0%;
                width: 50%;

                .v-text-field {
                    margin-bottom: 3%;
                }
            }
        }
        #waterButtonComponent {
            width: 17%;
        }
        .backProfile {
            top: 0%;
            left: 0%;
            .icon {
                font-size: 3rem;
                margin: 1%;
            }
        }
    }
}

@media screen and (max-width: 1025px) {
    #gestionProfileView {
        width: 98%;
        margin: 4% auto 4% auto;
        padding: 3% 1% 0% 1%;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titles{
            font-size: 2rem;
            margin-bottom: 3%;
        }

        #avatarUploader {
            width: 100%;
        }
        .forms {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 5%;

            h2 {
                font-size: 6vw;
            }
            .leftForm {
                width: 100%;

                .sub {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    gap: 5%;
                    .v-text-field {
                        width: 50%;
                    }
                }

                .v-text-field {
                    margin-bottom: 3%;
                }
            }
            .rightForm {
                padding: 5% 0%;
                width: 100%;

                .v-text-field {
                    margin-bottom: 3%;
                }
            }
        }
        #waterButtonComponent {
            width: 30%;
        }
        .backProfile {
            top: 0%;
            left: 0%;
            .icon {
                font-size: 3rem;
                margin: 1%;
            }
        }
    }
}
</style>