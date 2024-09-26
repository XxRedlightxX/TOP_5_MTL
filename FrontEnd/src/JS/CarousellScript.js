const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque."
//import { from } from "core-js/core/array"
//import mont-royal-img from "../assets/HomeCarousel/Mont-royal.jpg";

const currentSlider = [
    {image : "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text},
    {image : "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text},
    {image : "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text},
    {image : "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text},
]

export default {
    name: "GameCarousel", // Nom du composant Vue.js
    data() {
      return {
        // Tableau pour stocker les éléments du carrousel
        carouselItems: currentSlider,
        // Temps avant que l'animation de transition ne se termine (en millisecondes)
        timeRunning: 3000,
        // Temps avant de passer automatiquement à l'élément suivant (en millisecondes)
        timeAutoNext: 5000,
        // Stocke l'ID du timeout pour réinitialiser le slider
        runTimeOut: null,
        // Stocke l'ID du timeout pour passer automatiquement à l'élément suivant
        runNextAuto: null,
      };
    },
    methods: {
      // Fonction pour afficher l'élément suivant ou précédent du carrousel
      showSlider(direction) {
        // Si la direction est "next", déplace le premier élément à la fin du tableau
        if (direction === "next") {
          this.carouselItems.push(this.carouselItems.shift());
        } else { // Sinon, déplace le dernier élément au début du tableau
          this.carouselItems.unshift(this.carouselItems.pop());
        }
        // Réinitialise le slider après l'animation
        this.resetSlider();
      },
      // Réinitialise le slider en supprimant les classes CSS et réinitialise les timers
      resetSlider() {
        clearTimeout(this.runTimeOut); // Annule tout timeout existant pour l'animation
        this.runTimeOut = setTimeout(() => {
          // Supprime les classes CSS 'next' et 'prev' après l'animation
          this.$el.classList.remove("next", "prev");
        }, this.timeRunning);
  
        clearTimeout(this.runNextAuto); // Annule tout timeout pour l'automatisation suivante
        this.setNextAuto(); // Redéfinit le timeout pour passer à l'élément suivant
      },
      // Définir un timeout pour passer automatiquement à l'élément suivant
      setNextAuto() {
        this.runNextAuto = setTimeout(() => {
          this.showSlider("next"); // Passe à l'élément suivant automatiquement
        }, this.timeAutoNext);
      },


      // Fonction asynchrone pour récupérer les images des a partir de la dataBase
      /*  a remettre quand les donner seront dans la dataBase
      async fetchGameImages(games) {
        try {
          // Utilise la méthode 'map' pour récupérer l'URL de chaque image de jeu
          const imageFetchPromises = games.map(async (game) => {
            const files = game.id || `defaultName.jpg`; // Utilise l'ID du jeu comme nom de fichier
            const imagePath = `Games/${files}/media/${files}_0.png`; // Définit le chemin de l'image
  
            const imageRef = ref(storage, imagePath); // Référence l'image dans le stockage Firebase
  
            try {
              const url = await getDownloadURL(imageRef); // Récupère l'URL de l'image
              return { ...game, image: url }; // Retourne l'objet jeu avec l'URL de l'image
            } catch (error) {
              // En cas d'erreur, utilise une image par défaut
              console.error(`Error fetching image for ${game.title}:`, error);
              return { ...game, image: "../assets/imageJeuxLogo/Mario.png" }; // Image de secours
            }
          });
  
          return Promise.all(imageFetchPromises); // Attend que toutes les images soient récupérées
        } catch (error) {
          console.error("Error fetching game images:", error);
          return []; // Retourne un tableau vide en cas d'erreur
        }
      },*/
    },
    // Quand le composant est monté, il récupère les données des jeux et démarre le carrousel
    /*async mounted() {
      try {
        const filters = { ratingAverage: { gte:0 } }; // Filtre pour récupérer les jeux avec une note moyenne >= 0
        const sorting = { id: true }; // Tri par ID
        const includedColumns = ["id", "developerID", "title", "files"]; // Colonnes à inclure dans la requête
  
        getAllMatching("games", filters, includedColumns, sorting) // Récupère les jeux correspondants à ces critères
        .then((data) => {
          if (!Array.isArray(data)) {
            throw new Error("Fetched data is not an array"); // Lève une erreur si les données ne sont pas un tableau
          }
          return this.fetchGameImages(data.slice(0, 4)); // Récupère les images des 4 premiers jeux
        })
        .then((carouselItemsWithImages) => {
          this.carouselItems = carouselItemsWithImages; // Met à jour les éléments du carrousel avec les images
          this.runNextAuto = setTimeout(() => {
            this.showSlider("next"); // Démarre le carrousel automatique
          }, this.timeAutoNext);
        })
        .catch((error) => {
          console.error("Error:", error); // Affiche une erreur si quelque chose ne va pas
        });
      } catch (error) {
        console.error("Error fetching game images:", error); // Gestion des erreurs supplémentaires
      }
    }*/
  }
  