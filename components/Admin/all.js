import moment from "moment";
import AssetDisplay from "./assetDisplay";
import { sections } from "vStore/sections";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import { useAssets } from "vStore/assets";
import currency from "currency.js";
export default function All({ user, section, detailed }) {
  // const [tUser, setUser] = useState(user);
  const [tRanges, setRanges] = useState([]);
  // const [tSection, setSection] = useState(section);
  // const [tDetailed, setDetailed] = useState(detailed);
  const { shop } = useAssets();
  // useLayoutEffect(() => {
  //   setDetailed(detailed);
  // }, [detailed]);
  // useLayoutEffect(() => {
  //   setSection(section);
  // }, [section]);
  // useLayoutEffect(() => {
  //   setUser(user);
  // }, [user]);
  useLayoutEffect(() => {
    const ranges = [];
    user.stay?.length > 0 &&
      ranges.push({
        range: [undefined, user.stay[0].range[0]],
        elem: [],
      });
    user.stay?.forEach((a, index) => {
      ranges.push({ ...a, elem: [] });
      user.stay[index + 1] &&
        moment(a.range[1]).diff(user.stay[index + 1].range[0]) != 0 &&
        ranges.push({
          range: [a.range[1], user.stay[index + 1].range[0]],
          elem: [],
        });
    });
    ranges.push({
      range: [user.stay ? user.stay.at(-1)?.range[1] : undefined, undefined],
      elem: [],
    });
    const manageElement = (elem, type) => {
      if (user.stay?.length > 0) {
        const found = ranges.find((r) => {
          const fromStart = moment(r.range[0]).diff(
            moment(elem.creation.utc).format("YYYY-MM-DD"),
            "days"
          );
          const toEnd = moment(r.range[1]).diff(
            moment(elem.creation.utc).format("YYYY-MM-DD"),
            "days"
          );
          return (fromStart <= 0 || !r.range[0]) && (toEnd >= 0 || !r.range[1]);
        });
        found.elem.push({ ...elem, type });
      } else {
        ranges[0].elem.push({ ...elem, type });
      }
    };
    const all = section == "all" || !detailed;
    if (section == "pay" || all) {
      user.pay?.forEach((elem) => {
        manageElement(elem, "pay");
      });
    }
    if (section == "adq" || all) {
      user.adq?.forEach((elem) => {
        manageElement(elem, "adq");
      });
    }
    if (section == "notes" || all) {
      user.notes?.forEach((elem) => {
        manageElement(elem, "notes");
      });
    }
    setRanges(ranges);
  }, [user, section, detailed]);
  console.log("calc");
  return (
    <div style="display:flex;flex-direction:column;overflow:none;height:100%;max-height:100%;">
      <div style="flex:1;">
        {tRanges
          .sort((a, b) => (b.range[0] < a.range[0] ? -1 : b.range[0] ? 1 : -1))
          .map((a) => {
            console.log("About to reduce");
            const resume = a.elem.reduce((acc, value) => {
              // Group initialization
              if (!acc[value.type]) {
                acc[value.type] = [];
              }
              console.log(value);
              // Grouping
              acc[value.type].push(value);
              return acc;
              // return acc[value.type].reduce((acc2, value2) => {
              //   if (!acc2[value2.ref]) {
              //     acc2[value2.ref] = [];
              //   }
              //   console.log(value2);
              //   // Grouping
              //   acc2[value2.ref].push(value2);
              //   return acc2;
              // }, {});
            }, {});
            const resume2 = {};
            Object.entries(resume).forEach(([key, value]) => {
              if (key == "adq" || key == "pay" || key == "stay") {
                resume2[key] = value.reduce((acc, value) => {
                  if (!acc[value.ref]) {
                    acc[value.ref] = [];
                  }
                  acc[value.ref].push(value);
                  return acc;
                }, {});
              }
            });
            console.log("Resumed: ", resume);
            console.log("Resumed2: ", resume2);
            var localTotal = 0;
            const thing = (
              <>
                {!detailed ? (
                  <div style="display:flex;flex-wrap:wrap;">
                    {Object.entries(resume2).map(([type, value]) => {
                      var total = 0;
                      return (
                        <div
                          style={`min-width:250px;display:flex;flex-direction:column;flex:1;border-bottom:solid 2px rgba(200,200,200,0.6);background:${sections[type].background}`}
                        >
                          <div style="position:sticky;top:0px;padding:5px;background:rgba(100,100,100,0.3);border-bottom:solid 2px rgba(120,120,120,0.6);">
                            <b>
                              {type == "adq"
                                ? "COMPRAS"
                                : type == "pay"
                                ? "PAGOS"
                                : type == "stay"
                                ? "ESTADIA"
                                : "OTRO"}
                            </b>
                          </div>
                          <div style="height:100%;padding:5px;display:flex; flex-direction:column;  ">
                            <div style="flex:1;">
                              {Object.entries(value).map(([ref, value]) => {
                                const prod = shop?.find(
                                  (prod) => prod._id == ref
                                );
                                var price = 0;
                                var qty = 0;
                                value.forEach((item) => {
                                  qty += item.qty;
                                  price += item.qty
                                    ? item.qty * item.info.price
                                    : 1 * item.value;
                                });
                                qty = isNaN(qty) ? 1 : qty;
                                total += price;
                                localTotal += type == "pay" ? -price : price;
                                return (
                                  <>
                                    <div style="display:flex;gap:10px;">
                                      <div style="flex:1;">
                                        {prod
                                          ? prod.info.name
                                          : value[0].info.name}
                                      </div>
                                      {`${qty}`}
                                      <div style="width:80px;text-align:right;">
                                        {currency(price, {
                                          precision: 0,
                                        }).format()}
                                      </div>
                                    </div>
                                    {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
                                  </>
                                );
                              })}
                            </div>
                            <b style="display:flex; padding-top:20px; ">
                              <div style="flex:1;"> {"SUBTOTAL"}</div>
                              <div>
                                {currency(total, { precision: 0 }).format()}
                              </div>
                            </b>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  a.elem
                    .sort((a, b) => (b.creation.utc < a.creation.utc ? -1 : 1))
                    .map((elem) => (
                      <AssetDisplay
                        asset={elem}
                        section={elem.type}
                        background={sections[elem.type].background}
                      >
                        {sections[elem.type].elem(elem)}
                      </AssetDisplay>
                    ))
                )}
                {!detailed && (
                  <b style="position:sticky;bottom:0px;display:flex;padding:10px;gap:40px;">
                    <div style="flex:1;"> TOTAL</div>
                    <div style="">
                      {localTotal < 0
                        ? "A FAVOR"
                        : localTotal == 0
                        ? "OK"
                        : "DEBE"}
                    </div>
                    <div>
                      {currency(Math.abs(localTotal), {
                        precision: 0,
                      }).format()}
                    </div>
                  </b>
                )}
              </>
            );
            return a.info ? (
              <AssetDisplay
                asset={a}
                section={"stay"}
                background={sections.stay.background}
              >
                {a.info && sections.stay.elem(a)}
                {a.elem.length > 0 && <div class="group">{thing}</div>}
              </AssetDisplay>
            ) : (
              a.elem.length > 0 && (
                <>
                  <div style="z-index:999990000;backdrop-filter:blur(6px);position:sticky;top:0;items-align:center;padding:3px; padding-left:5px; display:flex;align-items:center;gap:10px;background:rgba(5,5,5,0.2);border-bottom:1px solid rgba(40,40,40,0.6);">
                    ACTIVIDAD FUERA DE ESTADIA
                  </div>
                  <div style="margin:5px;" class="group">
                    {/* {`${a.range[0]} ${a.range[1]}`} */}
                    {thing}
                  </div>
                </>
              )
            );
          })}
      </div>
    </div>
  );
}
