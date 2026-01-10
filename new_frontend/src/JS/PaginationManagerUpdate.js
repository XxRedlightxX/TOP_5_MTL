import LocalStorageManager from "./LocalStorageManager";
import { useActivityStore } from "@/stores/activity";
import { onMounted, onUnmounted, ref } from "vue";

const PaginationManagerUpdate = {
  async paginationSetup(value) {
    PaginationManager.paginationLenghtSetup();
    PaginationManager.paginationNumberSetup(value);

    return LocalStorageManager.getPaginationTotalNumber();
  },

  async paginationLenghtSetup() {
    let paginationLenght = ref(LocalStorageManager.getPaginationTotalNumber());

    if (paginationLenght.value == null || paginationLenght.value <= 0) {
      //const apiData = await  fetchFunction.call(activitiesStore);
      paginationLenght.value = {jour:[5], nuit:[4]};
      LocalStorageManager.setPaginationTotalNumber(paginationLenght.value);
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

    if (paginationNumber.value == null) {
      PaginationManager.gestionPaginationNumber(value);
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

  async gestionPaginationNumber(value) {
    let paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    let page = PaginationManager.getActualPageNumber(value);
    let parameter = value;

    if (paginationLenght == null) {
      PaginationManager.paginationLenghtSetup();
      paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    }

    const actualPaginationEvent = await PaginationManager.getPaginationsEvent(
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
};

export default PaginationManagerUpdate;
