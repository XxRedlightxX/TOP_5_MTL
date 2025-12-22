import LocalStorageManager from "./LocalStorageManager";
import { useActivityStore } from "@/stores/activity";
import { onMounted, onUnmounted, ref } from "vue";

const PaginationManager = {
  async paginationSetup(value) {
    PaginationManager.paginationLenghtSetup();
    PaginationManager.paginationNumberSetup(value);

    return LocalStorageManager.getPaginationTotalNumber();
  },

  async paginationLenghtSetup() {
    let paginationLenght = ref(LocalStorageManager.getPaginationTotalNumber());
    console.log("storage pagination lenght : " + paginationLenght.value);

    if (paginationLenght.value == null || paginationLenght.value <= 0) {
      //const apiData = await  fetchFunction.call(activitiesStore);
      paginationLenght.value = 5;
      LocalStorageManager.setPaginationTotalNumber(5);
      console.log("DB pagination lenght : " + paginationLenght.value);
    }

    /**
     * Synchronisation réactive :
     * Met à jour les données locales lorsqu’un CustomEvent est émis ailleurs.
     */
    const handleStorageChange = (event) => {
      paginationLenght.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener(
        "PaginationTotalNumber-changed",
        handleStorageChange
      );
    });

    onUnmounted(() => {
      window.removeEventListener(
        "PaginationTotalNumber-changed",
        handleStorageChange
      );
    });
  },

  async paginationNumberSetup(value) {
    let paginationNumber = ref(LocalStorageManager.getActualPaginationNumber());
    //console.log("storage pagination number : " + paginationNumber.value.number);

    if (paginationNumber.value == null) {
      PaginationManager.gestionPaginationNumber(value);
      //paginationNumber.value = 1; ///
      //console.log("pagination number : " + paginationNumber.value);
    }

    /**
     * Synchronisation réactive :
     * Met à jour les données locales lorsqu’un CustomEvent est émis ailleurs.
     */
    const handleStorageChange = (event) => {
      paginationLenght.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener(
        "ActualPaginationNumber-changed",
        handleStorageChange
      );
    });

    onUnmounted(() => {
      window.removeEventListener(
        "ActualPaginationNumber-changed",
        handleStorageChange
      );
    });
  },

  async getPaginationsEvent(value) {
    const activitiesStore = useActivityStore();
    const data = await activitiesStore.getActivities(value);
    console.log("data get : ", data);
    return PaginationManager.setPaginationEventData(value, data);
  },

  setPaginationEventData(value, data) {
    let page = PaginationManager.getActualPageNumber(value);
    //let donnee = { number: page, days: data.days, nights: data.nights };
    let donnee = { number: page, days: data, nights: data };
    console.log("donnee get : ", donnee);
    return donnee;
  },

  getActualPageNumber(value) {
    const query = value;
    const params = new URLSearchParams(query);
    const page = Number(params.get("page"));
    return page;
  },

  changePageNumber(value, newPageNumber) {
    const params = new URLSearchParams(value);
    // Met à jour (ou crée) le paramètre page
    params.set("page", newPageNumber);
    return params.toString();
  },

  async gestionPaginationNumber(value) {
    let paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    let page = PaginationManager.getActualPageNumber(value);
    let parameter = value;

    if (paginationLenght == null) {
      PaginationManager.paginationLenghtSetup();
      paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    }
    const actualPaginationEvent = await PaginationManager.getPaginationEvents(
      value
    );

    LocalStorageManager.setActualPaginationNumber(actualPaginationEvent);

    if (page == paginationLenght) {
      parameter = PaginationManager.changePageNumber(value, value - 2);
      const nextPaginationFromLastEvent =
        PaginationManager.getPaginationEvents(parameter);

      LocalStorageManager.setNextPaginationNumberFromLast(
        nextPaginationFromLastEvent
      );
      LocalStorageManager.setNextPaginationNumber(null);
    } else {
      parameter = PaginationManager.changePageNumber(value, value + 1);
      const nextPaginationEvent =
        PaginationManager.getPaginationEvents(parameter);

      LocalStorageManager.setNextPaginationNumber(nextPaginationEvent);
      LocalStorageManager.setNextPaginationNumberFromLast(null);
    }

    if (page == 1) {
      parameter = PaginationManager.changePageNumber(value, value + 2);
      const prevPaginationFromFirstEvent =
        PaginationManager.getPaginationEvents(parameter);

      LocalStorageManager.setPrevPaginationNumberFromFisrt(
        prevPaginationFromFirstEvent
      );
      LocalStorageManager.setPrevPaginationNumber(null);
    } else {
      parameter = PaginationManager.changePageNumber(value, value - 1);
      const prevPaginationEvent =
        PaginationManager.getPaginationEvents(parameter);

      LocalStorageManager.setPrevPaginationNumber(prevPaginationEvent);
      LocalStorageManager.setPrevPaginationNumberFromFisrt(null);
    }
  },

  paginationStatus() {
    const paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    const actualPagination = LocalStorageManager.getActualPaginationNumber();
    const nextPagination = LocalStorageManager.getNextPaginationNumber();
    const prevPagination = LocalStorageManager.getPrevPaginationNumber();
    const nextPaginationFromLast =
      LocalStorageManager.getNextPaginationNumberFromLast();
    const prevPaginationFromFirst =
      LocalStorageManager.getPrevPaginationNumberFromFisrt();

    console.log("----------------");
    console.log("pagination lenght : " + paginationLenght);
    console.log("actual pagination number : " + actualPagination.number);
    console.log("next pagination number : " + nextPagination.number);
    console.log("prev pagination number : " + prevPagination.number);
    console.log(
      "next from last pagination number : " + nextPaginationFromLast.number
    );
    console.log(
      "prev from first pagination number : " + prevPaginationFromFirst.number
    );
    console.log("---------------\n");
  },

  async getPaginationEvents(value) {
    const actualPagination = LocalStorageManager.getActualPaginationNumber();
    const nextPagination = LocalStorageManager.getNextPaginationNumber();
    const prevPagination = LocalStorageManager.getPrevPaginationNumber();
    const nextPaginationFromLast =
      LocalStorageManager.getNextPaginationNumberFromLast();
    const prevPaginationFromFirst =
      LocalStorageManager.getPrevPaginationNumberFromFisrt();

    // switch (value) {
    //   case actualPagination.number:
    //     console.log("actual pagination number, no change");
    //     //PaginationManager.paginationStatus();
    //     break;
    //   case nextPagination.number:
    //     console.log("not actual pagination number, change");
    //     //PaginationManager.gestionPaginationNumber(value);
    //     //PaginationManager.paginationStatus();

    //     break;
    //   case prevPagination.number:
    //     console.log("not actual pagination number, change");
    //     //PaginationManager.gestionPaginationNumber(value);
    //     //PaginationManager.paginationStatus();
    //     break;
    //   case nextPaginationFromLast.number:
    //     console.log("not actual pagination number, change");
    //     //PaginationManager.gestionPaginationNumber(value);
    //     //PaginationManager.paginationStatus();
    //     break;
    //   case prevPaginationFromFirst.number:
    //     console.log("not actual pagination number, change");
    //     //PaginationManager.gestionPaginationNumber(value);
    //     //PaginationManager.paginationStatus();
    //     break;
    //   default:
    //     console.log("not actual pagination number, change");
    //   //PaginationManager.gestionPaginationNumber(value);
    //   //PaginationManager.paginationStatus();
    // }
  },
};

export default PaginationManager;
