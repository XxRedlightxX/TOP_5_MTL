import { ref } from "vue";
import defaultImage1 from "@/assets/imgNotFound.png";
//import defaultImage1 from "@/assets/imgNotFound2.svg";
const AsyncData = {
  getOneEvent() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const oneEvent = {
      image: "https://picsum.photos/1895/795",
      image2: "https://picsum.photos/286/425",
      nom: "Mont-Royal",
      lieu: "Montreal, Vieux-port",
      date: "11 Octobre 16h00",
      desc: text,
      rating: 3,
    };
    return oneEvent;
  },

  getEventsTag() {
    const eventTags = ref([
      { nom: "tag", image_data: "mdi-tag" },
      { nom: "tag", image_data: "mdi-tag" },
      { nom: "tag", image_data: "mdi-tag" },
      { nom: "tag", image_data: "mdi-tag" },
      { nom: "tag", image_data: "mdi-tag" },
      { nom: "tag", image_data: "mdi-tag" },
      { nom: "tag", image_data: "mdi-tag" },
    ]);
    return eventTags.value;
  },

  getEvents(nb) {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";

    const Event = [
      {
        id: -1,
        image: defaultImage1,
        image2: defaultImage1,
        title: "Title",
        desc: text,
        rating: 0,
        lieu: "Place",
        date_debut: "2000-00-00 00:00:00",
        date_fin: "2000-00-00 00:00:00",
        statut_journee: -1,
        utilisateur_id: -1,
        type_id: -1,
        saison_id: -1,
      },
      {
        id: -1,
        image: defaultImage1,
        image2: defaultImage1,
        title: "Title",
        desc: text,
        rating: 0,
        lieu: "Place",
        date_debut: "2000-00-00 00:00:00",
        date_fin: "2000-00-00 00:00:00",
        statut_journee: -1,
        utilisateur_id: -1,
        type_id: -1,
        saison_id: -1,
      },
      {
        id: -1,
        image: defaultImage1,
        image2: defaultImage1,
        title: "Title",
        desc: text,
        rating: 0,
        lieu: "Place",
        date_debut: "2000-00-00 00:00:00",
        date_fin: "2000-00-00 00:00:00",
        statut_journee: -1,
        utilisateur_id: -1,
        type_id: -1,
        saison_id: -1,
      },
      {
        id: -1,
        image: defaultImage1,
        image2: defaultImage1,
        title: "Title",
        desc: text,
        rating: 0,
        lieu: "Place",
        date_debut: "2000-00-00 00:00:00",
        date_fin: "2000-00-00 00:00:00",
        statut_journee: -1,
        utilisateur_id: -1,
        type_id: -1,
        saison_id: -1,
      },
      {
        id: -1,
        image: defaultImage1,
        image2: defaultImage1,
        title: "Title",
        desc: text,
        rating: 0,
        lieu: "Place",
        date_debut: "2000-00-00 00:00:00",
        date_fin: "2000-00-00 00:00:00",
        statut_journee: -1,
        utilisateur_id: -1,
        type_id: -1,
        saison_id: -1,
      },
      {
        id: -1,
        image: defaultImage1,
        image2: defaultImage1,
        title: "Title",
        desc: text,
        rating: 0,
        lieu: "Place",
        date_debut: "2000-00-00 00:00:00",
        date_fin: "2000-00-00 00:00:00",
        statut_journee: -1,
        utilisateur_id: -1,
        type_id: -1,
        saison_id: -1,
      },
    ];

    return Event.slice(0, nb);
  },

  getUser() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias labore quasi, " +
      "voluptatibus nostrum aliquid soluta deleniti distinctio aspernatur numquam laborum necessitatibus " +
      "laboriosam temporibus ratione commodi optio atque inventore. Neque, quo.";

    let user = {
      avatar: "https://picsum.photos/id/64/200/300",
      username: "Utilisateur inconnu",
      name: "Wakanda",
      firstName: "Dede", // corrigé
      email: "inconnu@email.com",
      phoneNumber: "1122222222", // plus clair
      desc: text,
      listEvent: FakeDataBase.getEvents(), // évite problème de `this`
    };

    return user;
  },
};

export default AsyncData;
