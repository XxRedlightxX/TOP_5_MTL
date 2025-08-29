import { ref } from "vue";
const FakeDataBase = {
  getCarousellEvent() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const currentSlider = [
      {
        image: "https://picsum.photos/1895/795",
        image2: "https://picsum.photos/286/425",
        title: "Mont-Royal",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1891/791",
        image2: "https://picsum.photos/287/426",
        title: "Vieux-Port",
        desc: text,
        rating: 3,
      },
      {
        image: "https://picsum.photos/1892/792",
        image2: "https://picsum.photos/288/427",
        title: "Laronde",
        desc: text,
        rating: 5,
      },
      {
        image: "https://picsum.photos/1894/794",
        image2: "https://picsum.photos/289/428",
        title: "Jardin Botanique",
        desc: text,
        rating: 4,
      },
    ];

    const currentSliderNuit = [
      {
        image: "https://picsum.photos/1896/796",
        image2: "https://picsum.photos/286/424",
        title: "Pont Jacque Cartier",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1897/797",
        image2: "https://picsum.photos/287/426",
        title: "Bateau Mouche de nuit",
        desc: text,
        rating: 4,
      },
      {
        image: "https://picsum.photos/1898/798",
        image2: "https://picsum.photos/288/427",
        title: "Casino",
        desc: text,
        rating: 2,
      },
      {
        image: "https://picsum.photos/1899/799",
        image2: "https://picsum.photos/289/428",
        title: "La Voute",
        desc: text,
        rating: 3.5,
      },
    ];
    const newEvent = { eventJour: currentSlider, eventNuit: currentSliderNuit };
    return newEvent;
  },
  getNewEvents() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";

    const newEventJours = [
      {
        image: "https://picsum.photos/1895/795",
        image2: "https://picsum.photos/286/425",
        title: "Mont-Royal",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 3,
      },
      {
        image: "https://picsum.photos/1895/794",
        image2: "https://picsum.photos/287/428",
        title: "Vieux-Port",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 5,
      },
      {
        image: "https://picsum.photos/1894/793",
        image2: "https://picsum.photos/288/427",
        title: "Laronde",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1895/796",
        image2: "https://picsum.photos/287/427",
        title: "Jardin Botanique",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 2.5,
      },
      {
        image: "https://picsum.photos/1893/795",
        image2: "https://picsum.photos/286/426",
        title: "Vieux-Port",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 3,
      },
      {
        image: "https://picsum.photos/1896/795",
        image2: "https://picsum.photos/288/427",
        title: "Laronde",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 4,
      },
      {
        image: "https://picsum.photos/1898/793",
        image2: "https://picsum.photos/286/425",
        title: "Mont-Royal",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 3.5,
      },
      {
        image: "https://picsum.photos/1893/795",
        image2: "https://picsum.photos/289/428",
        title: "Jardin Botanique",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 1.5,
      },
      {
        image: "https://picsum.photos/1895/794",
        image2: "https://picsum.photos/287/426",
        title: "Vieux-Port",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 4.5,
      },
    ];

    const newEventNuit = [
      {
        image: "https://picsum.photos/1895/795",
        image2: "https://picsum.photos/286/424",
        title: "Bateau Mouche de nuit",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 4,
      },
      {
        image: "https://picsum.photos/1894/795",
        image2: "https://picsum.photos/287/426",
        title: "Pont Jacque Cartier",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1893/795",
        image2: "https://picsum.photos/288/427",
        title: "La Voute",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 3.5,
      },
      {
        image: "https://picsum.photos/1892/795",
        image2: "https://picsum.photos/289/428",
        title: "Casino",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 2,
      },
      {
        image: "https://picsum.photos/1896/795",
        image2: "https://picsum.photos/287/426",
        title: "Pont Jacque Cartier",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1895/794",
        image2: "https://picsum.photos/288/427",
        title: "La Voute",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 3.5,
      },
      {
        image: "https://picsum.photos/1895/793",
        image2: "https://picsum.photos/287/426",
        title: "Pont Jacque Cartier",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1895/792",
        image2: "https://picsum.photos/289/428",
        title: "Casino",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 2,
      },
      {
        image: "https://picsum.photos/1895/796",
        image2: "https://picsum.photos/288/425",
        title: "La Voute",
        lieu: "Montreal, Vieux-port",
        date: "11 Octobre 16h00",
        desc: text,
        rating: 3.5,
      },
    ];
    const newEvent = { eventJour: newEventJours, eventNuit: newEventNuit };
    return newEvent;
  },
  getOneEvent() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const oneEvent = {
      image: "https://picsum.photos/1895/795",
      image2: "https://picsum.photos/286/425",
      title: "Mont-Royal",
      lieu: "Montreal, Vieux-port",
      date: "11 Octobre 16h00",
      desc: text,
      rating: 3,
    };
    return oneEvent;
  },
  getIntroText() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias labore quasi," +
      "voluptatibus nostrum aliquid soluta deleniti distinctio aspernatur numquam laborum necessitatibus" +
      " laboriosam temporibus ratione commodi optio atque inventore. Neque, quo.";

    return text;
  },
  getEventsTag() {
    const eventFilters = ref([
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-menu" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-menu" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-menu" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
      { Title: "Nature", icon: "mdi-nature" },
    ]);
    return eventFilters;
  },

  getEvents() {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const Event = [
      {
        image: "https://picsum.photos/1895/795",
        image2: "https://picsum.photos/286/425",
        title: "Mont-Royal",
        desc: text,
        rating: 1,
      },
      {
        image: "https://picsum.photos/1891/791",
        image2: "https://picsum.photos/287/426",
        title: "Vieux-Port",
        desc: text,
        rating: 3,
      },
      {
        image: "https://picsum.photos/1892/792",
        image2: "https://picsum.photos/288/427",
        title: "Laronde",
        desc: text,
        rating: 5,
      },
      {
        image: "https://picsum.photos/1894/794",
        image2: "https://picsum.photos/289/428",
        title: "Jardin Botanique",
        desc: text,
        rating: 4,
      },
      {
        image: "https://picsum.photos/1892/790",
        image2: "https://picsum.photos/288/430",
        title: "truc 1",
        desc: text,
        rating: 3,
      },
      {
        image: "https://picsum.photos/1890/794",
        image2: "https://picsum.photos/288/428",
        title: "truc 2",
        desc: text,
        rating: 1,
      },
    ];

    return Event;
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

export default FakeDataBase;
