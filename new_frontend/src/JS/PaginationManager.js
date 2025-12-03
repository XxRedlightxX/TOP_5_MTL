import LocalStorageManager from "./LocalStorageManager";
import { useActivityStore } from "@/stores/activity";
import { onMounted, onUnmounted, ref } from "vue";

const PaginationManager = {
  async paginationSetup() {
    PaginationManager.paginationLenghtSetup();
    PaginationManager.paginationNumberSetup();

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

  async paginationNumberSetup() {
    let paginationNumber = ref(LocalStorageManager.getActualPaginationNumber());
    console.log("storage pagination number : " + paginationNumber.value);

    if (paginationNumber.value == null || paginationLenght.value <= 0) {
      PaginationManager.gestionPaginationNumber(1);
      paginationNumber.value = 1;
      console.log("pagination number : " + paginationNumber.value);
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

  gestionPaginationNumber(value) {
    const paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    LocalStorageManager.setActualPaginationNumber(value);

    if (value == paginationLenght) {
      LocalStorageManager.setNextPaginationNumberFromLast(value - 2);
      LocalStorageManager.setNextPaginationNumber(null);
    } else {
      LocalStorageManager.setNextPaginationNumber(value + 1);
      LocalStorageManager.setNextPaginationNumberFromLast(null);
    }

    if (value == 1) {
      LocalStorageManager.setPrevPaginationNumberFromFisrt(value + 2);
      LocalStorageManager.setPrevPaginationNumber(null);
    } else {
      LocalStorageManager.setPrevPaginationNumber(value - 1);
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
    console.log("actual pagination number : " + actualPagination);
    console.log("next pagination number : " + nextPagination);
    console.log("prev pagination number : " + prevPagination);
    console.log("next from last pagination number : " + nextPaginationFromLast);
    console.log(
      "prev from first pagination number : " + prevPaginationFromFirst
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

    switch (value) {
      case actualPagination:
        console.log("actual pagination number, no change");
        PaginationManager.paginationStatus();
        break;
      case nextPagination:
        console.log("not actual pagination number, change");
        PaginationManager.gestionPaginationNumber(value);
        PaginationManager.paginationStatus();

        break;
      case prevPagination:
        console.log("not actual pagination number, change");
        PaginationManager.gestionPaginationNumber(value);
        PaginationManager.paginationStatus();
        break;
      case nextPaginationFromLast:
        console.log("not actual pagination number, change");
        PaginationManager.gestionPaginationNumber(value);
        PaginationManager.paginationStatus();
        break;
      case prevPaginationFromFirst:
        console.log("not actual pagination number, change");
        PaginationManager.gestionPaginationNumber(value);
        PaginationManager.paginationStatus();
        break;
      default:
        console.log("not actual pagination number, change");
        PaginationManager.gestionPaginationNumber(value);
        PaginationManager.paginationStatus();
    }
  },
};

export default PaginationManager;
