import LocalStorageManager from "./LocalStorageManager";
import { useActivityStore } from "@/stores/activity";
import { onMounted, onUnmounted, ref } from "vue";

const PaginationManager = {
  async paginationSetup(value) {
    await PaginationManager.paginationLenghtSetup();
    await PaginationManager.paginationNumberSetup(value);

    return LocalStorageManager.getPaginationTotalNumber();
  },

  async paginationLenghtSetup(value) {
    let paginationLenght = ref(LocalStorageManager.getPaginationTotalNumber());
    //console.log("storage pagination lenght : " + paginationLenght.value);

    if (paginationLenght.value == null || paginationLenght.value <= 0) {
      //const apiData = await await activitiesStore.getPaginationLenght(value);
      //console.log("retur lenght : ", apiData);
      paginationLenght.value = 5;
      LocalStorageManager.setPaginationTotalNumber(5);
      //console.log("DB pagination lenght : " + paginationLenght.value);
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
        handleStorageChange,
      );
    });

    onUnmounted(() => {
      window.removeEventListener(
        "PaginationTotalNumber-changed",
        handleStorageChange,
      );
    });
  },

  async paginationNumberSetup(value) {
    let paginationNumber = ref(LocalStorageManager.getActualPaginationNumber());
    //console.log("storage pagination number : " + paginationNumber.value.number);

    console.log("value send : ", value);
    //console.log("paginationNumber value : ", paginationNumber.value);
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
        handleStorageChange,
      );
    });

    onUnmounted(() => {
      window.removeEventListener(
        "ActualPaginationNumber-changed",
        handleStorageChange,
      );
    });
  },

  async gestionPaginationNumber(value) {
    let paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    let page = PaginationManager.getActualPageNumber(value);
    let parameter = value;
    //console.log("page send : " + page);

    if (paginationLenght == null) {
      PaginationManager.paginationLenghtSetup();
      paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    }

    const actualPaginationEvent = await PaginationManager.getEvents(value);

    LocalStorageManager.setActualPaginationNumber(actualPaginationEvent);

    if (page == paginationLenght) {
      parameter = PaginationManager.changePageNumber(value, page - 2);
      //console.log("parametre send : " + parameter);
      const nextPaginationFromLastEvent =
        await PaginationManager.getEvents(parameter);

      LocalStorageManager.setNextPaginationNumberFromLast(
        nextPaginationFromLastEvent,
      );
      LocalStorageManager.setNextPaginationNumber(null);
    } else {
      parameter = PaginationManager.changePageNumber(value, page + 1);
      //console.log("parametre send : " + parameter);
      const nextPaginationEvent = await PaginationManager.getEvents(parameter);

      LocalStorageManager.setNextPaginationNumber(nextPaginationEvent);
      LocalStorageManager.setNextPaginationNumberFromLast(null);
    }

    if (page == 1) {
      parameter = PaginationManager.changePageNumber(value, page + 2);
      //console.log("parametre send : " + parameter);
      const prevPaginationFromFirstEvent =
        await PaginationManager.getEvents(parameter);

      LocalStorageManager.setPrevPaginationNumberFromFisrt(
        prevPaginationFromFirstEvent,
      );
      LocalStorageManager.setPrevPaginationNumber(null);
    } else {
      parameter = PaginationManager.changePageNumber(value, page - 1);
      //console.log("parametre send : " + parameter);
      const prevPaginationEvent = await PaginationManager.getEvents(parameter);

      LocalStorageManager.setPrevPaginationNumber(prevPaginationEvent);
      LocalStorageManager.setPrevPaginationNumberFromFisrt(null);
    }
  },

  async getPaginationEvents(parameter) {
    const value = PaginationManager.getActualPageNumber(parameter);
    //console.log("parameter send : " + parameter);

    const paginationLenght = LocalStorageManager.getPaginationTotalNumber();
    const actualPagination = LocalStorageManager.getActualPaginationNumber();
    const nextPagination = LocalStorageManager.getNextPaginationNumber();
    const prevPagination = LocalStorageManager.getPrevPaginationNumber();
    const nextPaginationFromLast =
      LocalStorageManager.getNextPaginationNumberFromLast();
    const prevPaginationFromFirst =
      LocalStorageManager.getPrevPaginationNumberFromFisrt();

    let temp = null;

    // sécurité minimale
    if (value == null || actualPagination == null) {
      console.log("pagination invalide");
      return;
    }

    /** --------------------------
     * ACTUAL PAGINATION
     * -------------------------- */
    if (actualPagination?.number != null && value === actualPagination.number) {
      //console.log("actual pagination number, no change");
      /** --------------------------
       * NEXT PAGINATION
       * -------------------------- */
    } else if (
      nextPagination?.number != null &&
      value === nextPagination.number
    ) {
      //console.log("not actual pagination number, change to next");

      LocalStorageManager.setPrevPaginationNumber(actualPagination);
      LocalStorageManager.setActualPaginationNumber(nextPagination);

      if (value + 1 > paginationLenght) {
        const param = PaginationManager.changePageNumber(value - 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setNextPaginationNumberFromLast(temp);
      } else {
        const param = PaginationManager.changePageNumber(value + 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setNextPaginationNumber(temp);
      }

      /** --------------------------
       * PREV PAGINATION
       * -------------------------- */
    } else if (
      prevPagination?.number != null &&
      value === prevPagination.number
    ) {
      //console.log("not actual pagination number, change to prev");

      LocalStorageManager.setNextPaginationNumber(actualPagination);
      LocalStorageManager.setActualPaginationNumber(prevPagination);

      if (value - 1 < 0) {
        const param = PaginationManager.changePageNumber(value + 2);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setPrevPaginationNumberFromFisrt(temp);
      } else {
        const param = PaginationManager.changePageNumber(value - 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setPrevPaginationNumber(temp);
      }

      /** --------------------------
       * NEXT FROM LAST
       * -------------------------- */
    } else if (
      nextPaginationFromLast?.number != null &&
      value === nextPaginationFromLast.number
    ) {
      //console.log("not actual pagination number, change to next from last");

      LocalStorageManager.setNextPaginationNumber(prevPagination);
      LocalStorageManager.setActualPaginationNumber(nextPaginationFromLast);

      if (value - 1 < 0) {
        const param = PaginationManager.changePageNumber(value + 2);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setPrevPaginationNumberFromFisrt(temp);
      } else {
        const param = PaginationManager.changePageNumber(value - 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setPrevPaginationNumber(temp);
      }

      /** --------------------------
       * PREV FROM FIRST
       * -------------------------- */
    } else if (
      prevPaginationFromFirst?.number != null &&
      value === prevPaginationFromFirst.number
    ) {
      //console.log("not actual pagination number, change to prev from first");

      LocalStorageManager.setPrevPaginationNumber(nextPagination);
      LocalStorageManager.setActualPaginationNumber(prevPaginationFromFirst);

      if (value - 1 < 0) {
        const param = PaginationManager.changePageNumber(value - 2);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setNextPaginationNumberFromLast(temp);
      } else {
        const param = PaginationManager.changePageNumber(value + 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setNextPaginationNumber(temp);
      }

      /** --------------------------
       * DEFAULT
       * -------------------------- */
    } else {
      //console.log("not actual pagination number, change to wathever");
      PaginationManager.gestionPaginationNumber(parameter);
    }

    //PaginationManager.paginationStatus();
  },

  async getEvents(value) {
    const activitiesStore = useActivityStore();
    //console.log("value send : ", value);
    const data = await activitiesStore.getActivities(value);
    //console.log("data get : ", data);
    return PaginationManager.setPaginationEventData(value, data);
  },

  setPaginationEventData(value, data) {
    let page = PaginationManager.getActualPageNumber(value);
    //let donnee = { number: page, days: data.days, nights: data.nights };
    let reverseData = data.toReversed();
    let donnee = { number: page, days: data, nights: reverseData };
    //console.log("donnee get : ", donnee);
    return donnee;
  },

  getActualPageNumber(value) {
    const query = value;
    const params = new URLSearchParams(query);
    const page = Number(params.get("page"));
    return page;
  },

  changePageNumber(value, newValuePage) {
    // console.log(
    //   "actual value : " + value + " new value page : " + newValuePage
    // );
    const params = new URLSearchParams(value);
    // Met à jour (ou crée) le paramètre page
    params.set("page", newValuePage);
    //console.log("updated value : " + params);
    //console.log("updated value 2 : " + params.toString());
    return params.toString();
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
    PaginationManager.afficherStatus(
      "pagination lenght : ",
      paginationLenght,
      false,
    );
    PaginationManager.afficherStatus(
      "actual pagination number : ",
      actualPagination,
      true,
    );
    PaginationManager.afficherStatus(
      "next pagination number : ",
      nextPagination,
      true,
    );
    PaginationManager.afficherStatus(
      "prev pagination number : ",
      prevPagination,
      true,
    );
    PaginationManager.afficherStatus(
      "next from last pagination number : ",
      nextPaginationFromLast,
      true,
    );
    PaginationManager.afficherStatus(
      "prev from first pagination number : ",
      prevPaginationFromFirst,
      true,
    );
    console.log("---------------\n");
  },

  afficherStatus(message, value, boolean) {
    let donnee = null;
    donnee = value != null ? (boolean ? value.number : value) : null;
    console.log("" + message + " : " + donnee);
  },
};

export default PaginationManager;
