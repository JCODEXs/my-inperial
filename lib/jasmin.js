//https://partner-api.modelcenter.jasmin.com/doc/index.html#/default
const moment = require("moment-timezone");
const axios = require("axios");
const fs = require("fs");
const jasminApi = "https://partner-api.modelcenter.jasmin.com";
const jk =
  "Bearer 0eb98a8d9f616b0d54b6ea575e4b9ae91a410c64b955f0b5b470cf11e9b16a4b";
const instance = axios.create({ baseURL: jasminApi });
instance.defaults.headers.common["Authorization"] = jk;
const tz = "Europe/Luxembourg";
const tz_co = "America/Bogota";
// let screenNames;
let activePerformers = [];
const saveAllStatsOnDB = async () => {
  const mongodb = require("./mongodb");
  const { db } = await mongodb.connectToDatabase();
  await db.collection("jasminReports").drop();
  var files = fs.readdirSync("jasminReports/");
  const documents = files.map((file) => {
    const path = `jasminReports/${file}`;
    const periodStats = JSON.parse(fs.readFileSync(path, "utf8"));
    return periodStats;
  });
  await db.collection("jasminReports").insertMany(documents);
  console.log("savedToDB");
};
async function downloadAllReports() {
  fs.rmSync("jasminReports", { recursive: true, force: true });
  fs.mkdirSync("jasminReports");
  const { findAssets } = require("./models/assets");
  const jasminReports = await findAssets("jasminReports");
  jasminReports.map((value) => {
    fs.writeFileSync(
      `jasminReports/jasminReports_${value.period}.json`,
      JSON.stringify(value)
    );
  });
}
async function getAndSaveDayStats(day) {
  const mongodb = require("./mongodb");
  const period = periodByDay(day);
  const result = await getPerformersReportsV2(day);
  const { db } = await mongodb.connectToDatabase();
  const doc = await db.collection("jasminReports").findOneAndUpdate(
    { period: period.period },
    { $set: { ...period, [`days.${day}`]: result } },
    {
      returnOriginal: false,
      upsert: true,
    }
  );
  fs.writeFileSync(
    `jasminReports/jasminReports_${period.period}.json`,
    JSON.stringify(doc.value)
  );
}
async function getAndSavePeriodStats(period) {
  const mongodb = require("./mongodb");
  const result = await getPerformersReportsV2(period.startDate, period.endDate);
  const { db } = await mongodb.connectToDatabase();
  const doc = await db.collection("jasminReports").findOneAndUpdate(
    { period: period.period },
    { $set: { ...period, global: result } },
    {
      returnOriginal: false,
      upsert: true,
    }
  );
  fs.writeFileSync(
    `jasminReports/jasminReports_${period.period}.json`,
    JSON.stringify(doc.value)
  );
}
const getDailyStatsFromFiles = async () => {
  let jasminReports = {};
  var files = fs.readdirSync("jasminReports/");
  await Promise.all(
    files.map((file) => {
      const path = `jasminReports/${file}`;
      const periodStats = JSON.parse(fs.readFileSync(path, "utf8"));
      delete periodStats.global;
      jasminReports[periodStats.period] = periodStats;
    })
  );
  return jasminReports;
};
const getGlobalStatsFromFiles = async () => {
  let jasminReports = {};
  var files = fs.readdirSync("jasminReports/");
  await Promise.all(
    files.map((file) => {
      const path = `jasminReports/${file}`;
      const periodStats = JSON.parse(fs.readFileSync(path, "utf8"));
      delete periodStats.days;
      jasminReports[periodStats.period] = periodStats;
    })
  );
  return jasminReports;
};
const getStories = async (screenNames) => {
  const n = screenNames.length;
  const batchSize = Math.ceil(screenNames.length / n);
  const responses = await Promise.all(
    [...new Array(n)].map(
      async (val, index) =>
        await new Promise((resolve, reject) =>
          setTimeout(async () => {
            var first = index * batchSize;
            var last = (index + 1) * batchSize;
            // console.log("first: ", first);
            last >= screenNames.length && (last = screenNames.length);
            // console.log("last: ", last);
            let res = {};
            const slice = screenNames.slice(first, last);
            // console.log("SLICE: ", slice);
            try {
              res = await instance.get(`/v1/my-stories`, {
                params: { screenNames: slice },
              });
              // console.log(
              //   "stories: ",
              //   res.data.data.map((data) => data.stories)
              // );
              resolve(res);
            } catch (e) {
              console.log("story error:", e);
              // reject(e);
            }
          }, index * 5000)
        )
    )
  );
  var stories = [];
  responses.forEach((res) => stories.push(...res.data.data));
  return stories;
};
const requestPeriods = async (
  fromDate,
  toDate = undefined,
  limit = 100,
  n = 10
) => {
  console.log("Getting Periods");
  var periods = [];
  for (var i = 0; i < n; i++) {
    const pd = await instance.get(`/v1/periods`, {
      params: {
        fromDate: moment(fromDate).tz(tz).format(),
        toDate: toDate ? moment(toDate).tz(tz).format() : undefined,
        limit,
        offset: i * limit,
      },
    });
    if (pd.data.data.length == 0) {
      break;
    } else {
      periods.push(...pd.data.data);
    }
  }
  periods.sort((a, b) => a.period - b.period);
  return periods;
};
const performersStateDiff = async (newState, lastState) => {
  const diff = [];
  lastState.performers.forEach(function (performer, i) {
    const found = newState.find(
      (state) => state.screenName == performer.screenName
    );
    if (found && performer.performerState) {
      if (found.state !== performer.performerState) {
        const live = { ...found, time: moment() };
        diff.push(live);
        this[i] = { ...live };
      }
    }
  }, lastState.live);
  return diff;
};
const getScreenNames = async () => {
  const performersRequest = instance.get("/v1/performers", {
    params: { offset: 0, limit: 1000 },
  });
  const performers = (await performersRequest).data;
  return {
    performers,
    screenNames: performers.items
      .map((performer) => performer.screenName)
      .filter((sn) => sn != "B78B37ED-1299-4D"),
  };
};
function getPeriods() {
  let jasminAssets;
  if (fs.existsSync("jasminAssets.json")) {
    jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
  }
  const periods = jasminAssets.periods;
  const actualPeriod = periods.find((period) =>
    moment().isBetween(moment(period.startDate), moment(period.endDate))
  );
  console.log("actual period: ", actualPeriod);
  return { periods, actualPeriod };
}
function periodByDay(day) {
  let jasminAssets;
  if (fs.existsSync("jasminAssets.json")) {
    jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
  }
  const periods = jasminAssets.periods;
  return periods.find((period) =>
    moment(day).isBetween(moment(period.startDate), moment(period.endDate))
  );
}
const reportsCache = async () => {
  const { periods, actualPeriod } = getPeriods();
  const actualIndex = periods.findIndex(
    (period) => period.period == actualPeriod.period
  );
  console.log("actualIndex: ", actualIndex);
  for (let p = actualIndex; p > actualIndex - 3000; p--) {
    let periodReport = {};
    const period = periods[p];
    const fileName = `jasminReports/jasminReports_${period.period}.json`;
    if (fs.existsSync(fileName)) {
      periodReport = JSON.parse(fs.readFileSync(fileName, "utf8"));
    }
    console.log("thePeriod: ", period.period);
    if (!periodReport?.global) {
      try {
        await getAndSavePeriodStats(period);
      } catch (e) {
        console.log(e);
        console.log("Global FAILED", period.period);
      }
    } else {
      console.log("Globals available already");
    }
    const totalDays = moment(period.endDate).diff(period.startDate, "days") + 1;
    var days = [...new Array(totalDays)].map((n, index) =>
      moment(period.startDate)
        .add(index + 1, "days")
        .format("YYYY-MM-DD")
    );
    let i;
    for (i = 0; i < days.length; i++) {
      if (!periodReport.days || !periodReport?.days[days[i]]) {
        console.log("day", days[i]);
        // const test = await new Promise((resolve) =>
        // setTimeout(
        //   async
        // () =>
        try {
          await getAndSaveDayStats(days[i]);
        } catch (e) {
          console.log("Day FAILED ", days[i], " err:", e);
        }
        // resolve(
        // await getModelsReportsV2(
        // statuses,
        // screenNames,
        //   days[i]
        // )
        // )
        //   2000
        // );
        // );
      } else {
        console.log("Day available already", days[i]);
      }
    }
  }
};
const getModelsReportsV2 = async (
  day1 = new Date(),
  day2 = undefined,
  performerState = undefined
) => {
  !day2 && (day2 = day1);
  if (moment().endOf("day").isBefore(day2)) {
    throw "No se puede obtener informacion del futuro";
  }
  const lx_fromDate = moment(day1).tz(tz).startOf("day").format();
  const lx_toDate = moment(day2).tz(tz).endOf("day").format();
  const co_fromDate = moment(day1).tz(tz_co).startOf("day").format();
  const co_toDate = moment(day2).tz(tz_co).endOf("day").format();
  let response = [];
  let lx_models = [];
  let co_models = [];
  const endpoint = "/v2/reports/performers";
  var i = 0;
  const limit = 100; //NO MODIFICAR!!!!
  while (true) {
    try {
      const res = await Promise.all([
        instance.get(endpoint, {
          params: {
            fromDate: lx_fromDate,
            toDate: lx_toDate,
            performerState,
            offset: i * limit,
            limit,
          },
        }),
        instance.get(endpoint, {
          params: {
            fromDate: co_fromDate,
            performerState,
            toDate: co_toDate,
            offset: i * limit,
            limit,
          },
        }),
      ]);
      console.log("lx len: ", res[0].data.data.length);
      console.log("co len: ", res[1].data.data.length);
      response.push({ lx: res[0].data, co: res[1].data });
      if (res[0].data.data.length < limit && res[1].data.data.length < limit) {
        break;
      }
      i++;
    } catch (e) {
      console.log("res err: ", e.response?.data?.errors);
      throw e;
    }
  }

  const condition = (performer) =>
    performer.total.earnings.value > 0 || performer.total.workTime.value > 0;
  response.forEach((res) => {
    res.lx.data &&
      (lx_models = [...lx_models, ...res.lx.data.filter(condition)]);
    res.co.data &&
      (co_models = [...co_models, ...res.co.data.filter(condition)]);
  });
  return {
    performerState,
    lx: lx_models,
    co: co_models,
  };
};
const getReports = async () => {
  const { models } = await getScreenNames();
  const performerStates = [
    // 'new',
    // 'pending',
    // 'rejected',
    "active",
    "inactive",
    // 'suspended',
    // 'closed',
  ];
  const performersByState = await Promise.all(
    performerStates.map((performerState) =>
      getPerformersReportsV2((performerState = performerState))
    )
  );
  activePerformers = performersByState[0].lx.map(
    (performer) => performer.screenName
  );
  performers.items.forEach((performer) =>
    performersByState.some((stateData) => {
      const lx_found = stateData.lx.find(
        (performer) =>
          performer.screenName == performer.screenName ||
          performer.displayName == performer.displayName
      );
      const co_found = stateData.co.find(
        (performer) =>
          performer.screenName == performer.screenName ||
          performer.displayName == performer.displayName
      );
      performer.reports = {
        performerState: stateData.performerState,
        lx: lx_found,
        co: co_found,
      };
      return lx_found || co_found;
    })
  );
  return { performers, activePerformers };
};
const updateStories = async () => {
  let jasminAssets = {};
  let stories;
  if (fs.existsSync("jasminAssets.json")) {
    jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
    stories = await getStories(jasminAssets.activeScreenNames);
    jasminAssets.stories = stories;
    fs.writeFileSync("jasminAssets.json", JSON.stringify(jasminAssets));
  }
  return stories;
};
const updateStats = async () => {
  let jasminAssets = {};
  let modelsData;
  if (fs.existsSync("jasminAssets.json")) {
    jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
    modelsData = await getReports();
    jasminAssets.models = modelsData.models;
    jasminAssets.activeScreenNames = activeScreenNames;
    fs.writeFileSync("jasminAssets.json", JSON.stringify(jasminAssets));
  }
  return modelsData?.models;
};
const updateData = async () => {
  console.log("UPDATING DATA");
  let jasminAssets = {};
  const { performers, activeScreenNames } = await getReports();
  const shouldRequestPeriods = !("periods" in jasminAssets);
  const combinePeriods = false;
  const jasminResults = await Promise.all([
    shouldRequestPeriods
      ? requestPeriods("2021-02-03", undefined, 100, 1)
      : async () => {
          return [];
        },
    // getTransactions(jasminAssets.lastCacheDate, undefined, 100, 1),
  ]);
  jasminAssets = {
    performers,
    activeScreenNames,
    periods: [
      ...new Set(
        !combinePeriods
          ? jasminResults[0].length > 0
            ? [...jasminResults[0]]
            : [...jasminAssets.periods]
          : [...jasminAssets.periods, ...jasminResults[0]]
      ),
    ],
    // transactions: [
    //   ...new Set([...jasminAssets.transactions, ...jasminResults[1]]),
    // ],
    // lastCacheDate: new Date(),
    // testTime: [startT, endT],
  };
  fs.writeFileSync("jasminAssets.json", JSON.stringify(jasminAssets));
  console.log("jasminAssets.json created");
  if (fs.existsSync("jasminAssets.json")) {
    jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
    jasminAssets.stories = await getStories(activeScreenNames);
  }
  console.log("DATA UPDATED");
  return jasminAssets;
};
const updatePerformers = async (lastPerformersState) => {
  const result = await instance.get(`/v1/performer-states`, {
    params: { screenNames: activePerformers, offset: 0, limit: 1000 },
  });
  if (lastPerformersState.performers.length == 0) {
    lastPerformersState.performers = result.data.data;
    console.log("EMPTY");
    return [];
  } else {
    const diff = performersStateDiff(result.data.data, lastPerformersState);
    return diff;
  }
};
const getTransactions = async (
  fromDate,
  toDate = undefined,
  limit = 100,
  n = 10
) => {
  // console.log('Getting Transactions');
  var transactions = [];
  const ts_responses = await Promise.all(
    [...new Array(n)].map((val, i) =>
      instance.get(`/v1/transactions`, {
        params: {
          // screenNames,
          fromDate: moment(fromDate).tz(tz).format(),
          toDate: toDate ? moment(toDate).tz(tz).format() : undefined,
          limit,
          offset: i * limit,
        },
      })
    )
  );
  ts_responses.forEach((res) => transactions.push(...res.data.items));
  return transactions;
};
module.exports = {
  updateData,
  updatePerformers,
  updateStories,
  updateStats,
  reportsCache,
  getDailyStatsFromFiles,
  getGlobalStatsFromFiles,
  saveAllStatsOnDB,
  getAndSaveDayStats,
  downloadAllReports,
};
