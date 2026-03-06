import LocalStorageManager from "./LocalStorageManager";
import { useActivityStore } from "@/stores/activity";
import { onMounted, onUnmounted, ref } from "vue";

const PaginationManager = {
  async paginationSetup(value) {
    await PaginationManager.paginationLenghtSetup(value);
    await PaginationManager.paginationNumberSetup(value);

    return LocalStorageManager.getPaginationTotalNumber();
  },

  async paginationLenghtSetup(value, filter = null) {
    let paginationLenght = ref(LocalStorageManager.getPaginationTotalNumber());
    const activitiesStore = useActivityStore();
    //console.log("storage pagination lenght : " + paginationLenght.value);

    if (paginationLenght.value == null || paginationLenght.value <= 0) {
      let param = PaginationManager.changePageNumber(value, 1);
      param = filter != null ? param + "?" + filter : param;
      console.log("param icit : " + param);
      const apiData = await activitiesStore.getPaginationLenght(param);
      //console.log("retur lenght : " + apiData);
      const tempPaginationLenght = {
        days: apiData.nbPagination.jour,
        night: apiData.nbPagination.nuit,
        all: apiData.nbPagination.all,
      };
      paginationLenght.value = tempPaginationLenght;
      LocalStorageManager.setPaginationTotalNumber(tempPaginationLenght);
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

    //console.log("value send : ", value);
    //console.log("paginationNumber value : ", paginationNumber.value);
    if (paginationNumber.value == null) {
      await PaginationManager.gestionPaginationNumber(value);
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

  async gestionPaginationNumber(value, filter = null) {
    PaginationManager.paginationLenghtSetup();
    const paginationLenght = LocalStorageManager.getPaginationTotalNumber(
      value,
      filter,
    );
    let page = PaginationManager.getActualPageNumber(value);
    let parameter = value;

    let actualPaginationEvent = null;

    LocalStorageManager.setActualPaginationNumber(actualPaginationEvent);

    if (page == 1) {
      actualPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      parameter = PaginationManager.changePageNumber(value, page + 2);
      const prevPaginationFromFirstEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      parameter = PaginationManager.changePageNumber(value, page + 1);
      const nextPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      LocalStorageManager.setActualPaginationNumber(actualPaginationEvent);
      LocalStorageManager.setPrevPaginationNumberFromFisrt(
        prevPaginationFromFirstEvent,
      );
      LocalStorageManager.setNextPaginationNumber(nextPaginationEvent);
    } else if (page == paginationLenght) {
      actualPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      parameter = PaginationManager.changePageNumber(value, page - 1);
      const prevPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      parameter = PaginationManager.changePageNumber(value, page - 2);
      const nextPaginationFromLastEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      LocalStorageManager.setActualPaginationNumber(actualPaginationEvent);
      LocalStorageManager.setPrevPaginationNumber(prevPaginationEvent);
      LocalStorageManager.setNextPaginationNumberFromLast(
        nextPaginationFromLastEvent,
      );
    } else {
      actualPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );
      parameter = PaginationManager.changePageNumber(value, page - 1);
      const prevPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );
      parameter = PaginationManager.changePageNumber(value, page + 1);
      const nextPaginationEvent = await PaginationManager.getEvents(
        parameter,
        filter,
      );

      LocalStorageManager.setActualPaginationNumber(actualPaginationEvent);
      LocalStorageManager.setPrevPaginationNumber(prevPaginationEvent);
      LocalStorageManager.setNextPaginationNumber(nextPaginationEvent);
    }
  },

  async getPaginationEvents(parameter, filter = null) {
    const value = PaginationManager.getActualPageNumber(parameter);
    //console.log("parameter send : " + parameter);
    //console.log("value get : " + value);

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
    // if (value == null || actualPagination == null || filter == null) {
    //   //console.log("pagination invalide");
    //   return;
    // }

    /** --------------------------
     * ACTUAL PAGINATION
     * -------------------------- */
    if (
      actualPagination?.number != null &&
      value === actualPagination.number &&
      filter == null
    ) {
      //console.log("actual pagination number, no change");
    } else if (
      /** --------------------------
       * NEXT PAGINATION
       * -------------------------- */
      nextPagination?.number != null &&
      value === nextPagination.number &&
      filter == null
    ) {
      temp = prevPagination;
      LocalStorageManager.setPrevPaginationNumber(actualPagination);
      LocalStorageManager.setActualPaginationNumber(nextPagination);

      // 2 3 (4) [5] -> nextFromLast = 3
      if (value + 1 > paginationLenght) {
        LocalStorageManager.setNextPaginationNumberFromLast(temp);
      } else {
        // (1) [2] 3 4 -> next = 3
        if (value + 1 == prevPaginationFromFirst.number) {
          LocalStorageManager.setNextPaginationNumber(prevPaginationFromFirst);
        }
        // 1 (2) [3] 4 -> next = 4
        else {
          const param = PaginationManager.changePageNumber(
            parameter,
            value + 1,
          );
          temp = await PaginationManager.getEvents(param);
          LocalStorageManager.setNextPaginationNumber(temp);
        }
      }
    } else if (
      /** --------------------------
       * PREV PAGINATION
       * -------------------------- */
      prevPagination?.number != null &&
      value === prevPagination.number &&
      filter == null
    ) {
      temp = nextPagination;
      LocalStorageManager.setNextPaginationNumber(actualPagination);
      LocalStorageManager.setActualPaginationNumber(prevPagination);

      // [1] (2) 3 4 -> prevFromForst = 3
      if (value - 1 <= 0) {
        LocalStorageManager.setPrevPaginationNumberFromFisrt(temp);
      } else {
        // 1 2 [3] (4) -> prev = 2
        if (value - 1 == nextPaginationFromLast.number) {
          LocalStorageManager.setPrevPaginationNumber(nextPaginationFromLast);
        }
        // 1 [2] (3) 4 -> prev = 1
        else {
          const param = PaginationManager.changePageNumber(
            parameter,
            value - 1,
          );
          temp = await PaginationManager.getEvents(param);
          LocalStorageManager.setPrevPaginationNumber(temp);
        }
      }
    } else if (
      /** --------------------------
       * NEXT FROM LAST
       * -------------------------- */
      nextPaginationFromLast?.number != null &&
      value === nextPaginationFromLast.number &&
      filter == null
    ) {
      temp = actualPagination;
      LocalStorageManager.setNextPaginationNumber(prevPagination);
      LocalStorageManager.setActualPaginationNumber(nextPaginationFromLast);

      // [1] 2 (3) -> prevFromLast = 3
      if (value - 1 <= 0) {
        LocalStorageManager.setPrevPaginationNumberFromFisrt(temp);
      }
      // 1 [2] 3 (4) -> prev = 1
      else {
        const param = PaginationManager.changePageNumber(parameter, value - 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setPrevPaginationNumber(temp);
      }
    } else if (
      /** --------------------------
       * PREV FROM FIRST
       * -------------------------- */
      prevPaginationFromFirst?.number != null &&
      value === prevPaginationFromFirst.number &&
      filter == null
    ) {
      temp = actualPagination;
      LocalStorageManager.setPrevPaginationNumber(nextPagination);
      LocalStorageManager.setActualPaginationNumber(prevPaginationFromFirst);

      // (1) 2 [3] -> nextFromLast = 1
      if (value + 1 > paginationLenght) {
        LocalStorageManager.setNextPaginationNumberFromLast(temp);
      }
      // (1) 2 [3] 4 -> next = 4
      else {
        const param = PaginationManager.changePageNumber(parameter, value + 1);
        temp = await PaginationManager.getEvents(param);
        LocalStorageManager.setNextPaginationNumber(temp);
      }

      /** --------------------------
       * DEFAULT
       * -------------------------- */
    } else {
      //console.log("not actual pagination number, change to wathever");
      if (filter == null) {
        console.log("nullllllllllllllllllllllllllllllllllllllllllll");
        PaginationManager.gestionPaginationNumber(parameter);
      } else {
        console.log("non nullllllllllllllllllllllllllllllllllllllllllll");
        PaginationManager.gestionPaginationNumber(parameter, filter);
      }
    }

    PaginationManager.paginationStatus();
  },

  async getEvents(value, filter = null) {
    const activitiesStore = useActivityStore();
    console.log("value send : " + value + "?" + filter);
    const data = await activitiesStore.getActivities(value, filter);
    //console.log("data get : ", data);
    return PaginationManager.setPaginationEventData(value, data);
  },

  setPaginationEventData(value, data) {
    let page = PaginationManager.getActualPageNumber(value);
    let donnee = { number: page, days: data.jours, nights: data.nuit };
    console.log("donnee get : ", donnee);
    return donnee;
  },

  getActualPageNumber(value) {
    const query = value;
    const params = new URLSearchParams(query);
    const page = Number(params.get("page"));
    return page;
  },

  changePageNumber(value, newValuePage) {
    //console.log("value reçu :", value);

    const query = value;
    const params = new URLSearchParams(query);
    const per_page = Number(params.get("per_page"));
    //console.log("per page get :" + per_page); // per page get :0
    const page = "per_page=" + per_page + "&page=" + newValuePage;
    //("new value :" + page); // new value :per_page=0&page=undefined
    return page;
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
    if (value != null && boolean) {
      donnee = value.number;
    } else if (value != null && !boolean) {
      donnee =
        "days -> " +
        value.days +
        " nights -> " +
        value.night +
        " all -> " +
        value.all;
    } else {
      donnee = null;
    }
    console.log("" + message + " " + donnee);
  },
};

export default PaginationManager;
