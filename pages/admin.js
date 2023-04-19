import { withIronSessionSsr } from "iron-session/next";
import { useLayoutEffect, useEffect } from "react";
import { sessionConfig } from "lib/session";
import dynamic from "next/dynamic";
const Admin = dynamic(() => import("../components/Admin"), { ssr: false });
import { getInitialAssets } from "lib/models/assets";
import { makeItReal, setAssets, destroyReal } from "vStore/assets";
import { setUser } from "vStore/login";
import {
  setPerformersStatus,
  setStories,
  setPerformers,
  setPeriods,
} from "vStore/jasmin";
import io from "socket.io-client";
import { setSection } from "vStore/selected";
import gsap from "gsap";
import { master } from "vStore/login";
import axios from "axios";
export default function admin({ initialAssets, initialUser, jasminAssets }) {
  useEffect(async () => {
    const socket = io();
    socket.on("refreshStats", async (performers) => {
      setPerformers(
        performers?.items?.filter((performer) =>
          initialUser.log.auth == "model"
            ? performer.screenName == initialUser.model.jasmin
            : true
        )
      );
      if (initialUser.log.auth == "admin") {
        await gsap.to("#generalLight", {
          duration: 0.6,
          background: "blue",
          filter: "drop-shadow(0 0 0.5rem blue)",
        });
        await gsap.to("#generalLight", {
          delay: 0.6,
          duration: 1.8,
          background: "rgba(20,20,30,0.8)",
          filter: "drop-shadow(0 0 0.5rem black)",
        });
      }
    });
    socket.on("refreshStories", setStories);
    socket.on("refreshPerformers", async (data) => {
      console.log("live");
      setPerformerStatus(
        data.filter((performer) => {
          initialUser.log.auth == "model"
            ? performer.screenName == initialUser.model.jasmin
            : true;
        })
      );
      if (initialUser.log.auth == "admin") {
        await gsap.to("#liveLight", {
          duration: 0.2,
          background: "lime",
          filter: "drop-shadow(0 0 0.5rem lime)",
        });
        await gsap.to("#liveLight", {
          delay: 0.2,
          duration: 0.6,
          background: "rgba(20,30,20,0.8)",
          filter: "drop-shadow(0 0 0.5rem black)",
        });
      }
    });
    return () => {};
  }, []);
  useLayoutEffect(async () => {
    // typeof window == "object" && makeItReal(initialUser, process.env.WS_PORT);
    const parsed = JSON.parse(initialAssets);
    setAssets(parsed.assets);
    setInterval(async () => {
      setAssets(JSON.parse((await axios.get("api/polling")).data));
    }, 3000);
    return () => {
      // destroyReal();
    };
  }, [initialAssets]);
  useLayoutEffect(() => {
    console.log("initialUser: ", initialUser);
    setUser(initialUser);
    setSection(master() ? "users" : "jasmin");
  }, [initialUser]);
  useLayoutEffect(() => {
    setPerformers(JSON.parse(jasminAssets).performers);
    setPeriods(JSON.parse(jasminAssets).periods);
    // console.log("initialModels: ", initialModels);
  }, [jasminAssets]);
  // return <SuperEditor />;
  return <Admin />;
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    // const wss = wss new WebSocketServer({ port: 1234 });
    const user = req.session.user;
    // wss.on('connection', function connection(ws) {
    //   ws.on('message', function message(data) {
    //     console.log('received: %s');
    //   });
    //   // ws.send('something');
    // });
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    let initialData = await getInitialAssets(user);
    const assets = {
      assets: {
        ...initialData,
      },
      // places: await findAssets('places'),
    };
    delete req.session.user.log.pass;
    const fs = require("fs");
    // var jasminAssets = {};
    // if (fs.existsSync("jasminAssets.json")) {
    //   jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
    // }
    let jasminAssets = {};
    // const user = req.session.user;
    if (fs.existsSync("jasminAssets.json")) {
      jasminAssets = JSON.parse(fs.readFileSync("jasminAssets.json", "utf8"));
      jasminAssets.lastPerformersState = req.lastPerformersState;
      if (user.log.auth == "model") {
        jasminAssets.performers.items = jasminAssetsperformers?.items.filter(
          (performer) => performer.screenName == user.model?.jasmin
        );
      }
    }
    // console.log("done: ", jasminAssets.models?.items);
    return {
      props: {
        initialAssets: JSON.stringify(assets),
        initialUser: req.session.user ? req.session.user : null,
        jasminAssets: JSON.stringify({
          performers: jasminAssets.performers?.items
            // .filter((model) => model.reports?.status == "active")
            .map((performer) => ({
              screenName: performer.screenName,
              displayName: performer.displayName,
              id: performer.id,
              stats: {
                status: performer.reports.performerState,
                co: {
                  total: performer.reports.co?.total,
                },
                lx: {
                  total: performer.reports.lx?.total,
                },
              },
            })),
          periods: jasminAssets.periods,
        }),
        // resumedStats,
      },
    };
  },
  sessionConfig
);
