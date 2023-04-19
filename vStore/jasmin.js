import { proxy, useSnapshot, subscribe, ref } from "valtio";
import { derive, subscribeKey, watch } from "valtio/utils";
import axios from "axios";
import { toast } from "react-toastify";
import Fuse from "fuse.js";
import moment from "moment";
let fuse, fuse2;
// let visible;
const initialState = {
  activePerformers: [],
  lastPerformersState: [],
  performers: [],
  transactions: [],
  searchResult: [],
  searchTrans: [],
  timezone: "co",
  statsSection: 0,
  stats: {},
  resumedStats: undefined,
};
export const statsSections = [
  { name: "workingTime", icon: "⏳" },
  { name: "messengerDetails", icon: "💬" },
  { name: "vipShowKpi", icon: "🏆" },
  { name: "earnings", icon: "💵" },
];
export const requestJasmin = async () => {
  const result = await axios.get("api/jasminAssets");
  const jasminAssets = result.data;
  console.log(jasminAssets.stories);
  setJasminAssets(jasminAssets);
};
export const setJasminAssets = (jasminAssets) => {
  setStories(jasminAssets.stories);
  // setTransactions(parsed.transactions);
  setPerformers(jasminAssets.models?.items);
  setPeriods(jasminAssets.periods);
  setLastPerformersState(jasminAssets.lastPerformersState);
};
export const toggleStatsSection = () => {
  state.statsSection = (state.statsSection + 1) % statsSections.length;
};
export const setTimezone = (tz) => {
  state.timezone = tz;
};
export const setStats = (stats) => {
  state.stats = stats;
};
export const setResumedStats = (resumedStats) => {
  state.resumedStats = resumedStats;
};
export const setPerformersState = async (data) => {
  state.lastPerformersState?.forEach((model, i) => {
    const found = data.find((lv) => lv.screenName == model.screenName);
    if (found) {
      if (!document.hidden && model.state) {
        if (found.state == "private" && model.state !== "private") {
          toast.success(`${model.displayName} ha entrado a privado`, {
            theme: "dark",
            pauseOnFocusLoss: false,
          });
        } else if (found.state !== "private" && model.state == "private") {
          toast.success(`${model.displayName} ha salido de privado`, {
            theme: "dark",
            pauseOnFocusLoss: false,
          });
        } else if (found.state !== "offline" && model.state == "offline") {
          toast.success(`${model.displayName} se ha conectado`, {
            theme: "dark",
            pauseOnFocusLoss: false,
          });
        } else if (found.state == "offline" && model.state !== "offline") {
          toast.success(`${model.displayName} se ha desconectado`, {
            theme: "dark",
            pauseOnFocusLoss: false,
          });
        }
      }
      model.state = found.state;
      model.time = found.time;
    }
  });
};
export const requestStats = async (period) => {
  if (!state.stats || !state.stats[period]) {
    console.log("getting");
    const result = await axios.get("api/stats", { params: { period } });
    console.log("stats:", result.data);
    !state.stats && (state.stats = {});
    state.stats[period] = result.data[period];
    state.availableStats = result.data.availableStats;
  }
};
export const requestTemplateStats = async (period, models) => {
  console.log("getting");
  const result = await axios.get("api/templateStats", {
    params: { period, models },
  });
  console.log("Templatestats:", result.data);
  !state.templateStats && (state.templateStats = {});
  state.templateStats[period] = result.data[period];
};
export const requestGlobal = async (year) => {
  if (!state.resumedStats || !state.resumedStats[year]) {
    const result = await axios.get("api/globalStats", { params: { year } });
    !state.resumedStats && (state.resumedStats = {});
    state.resumedStats[year] = result.data[year];
  }
};
export const setLastPerformersState = (state) => {
  state.lastPerformersState = state;
};
export const setPerformers = (live) => {
  // console.log("The live");
  state.live = live;
  // state.live[5].state = 'online';
  fuse = new Fuse(state.live, {
    keys: ["screenName", "displayName"],
    includeScore: true,
    shouldSort: true,
  });
  fuse2 = new Fuse(state.transactions, {
    keys: ["screenName"],
    includeScore: true,
    // shouldSort: true,
  });
  state.performers?.map((res) => {
    const performerStories = state.stories?.find(
      (story) => story?.screenName == res?.screenName
    )?.stories;
    res.stories = performerStories;
    let mediaAmount = 0;
    performerStories?.forEach((story) =>
      story.items.forEach((item) =>
        item.media?.forEach(() => {
          mediaAmount++;
        })
      )
    );
    res && (res.mediaAmount = mediaAmount);
  });
  state.activePerformers = state.performers
    ?.filter((model) => model?.reports?.performerState == "active")
    .map((item) => ({
      screenName: item.screenName,
      displayName: item.displayName,
    }));
  state.allModels = state.performers?.map((item) => ({
    screenName: item.screenName,
    displayName: item.displayName,
  }));
  // evalSearch();
};
export const setStories = (stories) => {
  state.stories = stories;
};
export const setPeriods = (periods) => {
  state.periods = periods?.filter((pd) =>
    moment(pd.startDate).isBefore(moment())
  );
};
export const setSearch = (search) => {
  state.search = search;
  state.batch = 10;
  state.batchTrans = 100;
};
export const setTransactions = (transactions) => {
  state.transactions = transactions;
};
var state = proxy(initialState);
export const evalSearch = () => {
  if (!fuse || !fuse2 || state.search == "") {
    state.searchResult = state.live.map((val) => ({
      item: val,
      matches: [],
      score: 1,
    }));
    // state.searchTrans = state.transactions.map((val) => ({
    //   item: val,
    //   matches: [],
    //   score: 1,
    // }));
  } else {
    const result = fuse.search(state.search);
    console.log("FuzzResult: ", result);
    state.searchResult = result.filter((fuzzResult) => fuzzResult.score <= 0.2);
    const result2 = fuse2.search(state.search);
    console.log("FuzzResult3: ", result2);
    state.searchTrans = result2.filter((fuzzResult) => fuzzResult.score <= 0.2);
  }
};
subscribeKey(state, "search", evalSearch);
let searchTout;
export const onSearchInput = (e) => {
  clearTimeout(searchTout);
  const value = e.target.value;
  searchTout = setTimeout(async () => {
    state.search = value;
  }, 500);
};
export const clearSearch = () => {
  state.search = "";
  // searchAssets();
};
export default state;
export const useJasmin = () => useSnapshot(state);
