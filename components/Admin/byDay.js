import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
import { useAssets } from 'vStore/assets';
import { useState, useEffect, useLayoutEffect } from 'preact/hooks';
import UserInfo from './userInfo';
import StayInfo from './stayInfo';
import AssetDisplay from './assetDisplay';
import { useTime } from 'vStore/time';
import { useOverlays, setDay, setRoom } from 'vStore/overlays';
export default function ByDay() {
  const [selected, setSelected] = useState(undefined);
  const {
    byDay: { day, room },
  } = useOverlays();
  const { rooms, users } = useAssets();
  const fromToday = moment(day).fromNow();
  const { time } = useTime();
  const daysFromToday = moment(day).diff(time.format('YYYY-MM-DD'), 'days');
  return (
    <div style="overflow-y:hidden;height:100%; display:flex;flex-direction:column;">
      <div style="z-index:1000;border-bottom:2px solid rgb(40,40,40);padding:5px;">
        <div style="display:flex;font-size:120%;gap:5px;">
          <button
            onClick={() => {
              setDay(moment(day).add(-1, 'days').format('YYYY-MM-DD'));
            }}
          >
            {'<'}
          </button>
          <input
            style="width:98%;"
            value={moment(day)?.format('YYYY-MM-DD')}
            onChange={(e) => {
              setDay(e.target.value);
            }}
            type="date"
          />
          <button
            onClick={() => {
              setDay(moment(day).add(1, 'days').format('YYYY-MM-DD'));
            }}
          >
            {'>'}
          </button>
        </div>
        <div style="display:flex;margin-top:10px;">
          <div style={`color:${daysFromToday == 0 && 'limegreen'};flex:1;`}>
            <b>
              {daysFromToday == 0
                ? 'HOY'
                : daysFromToday == 1
                ? 'MAÑANA'
                : daysFromToday == 2
                ? 'PASADO MAÑANA'
                : daysFromToday == -1
                ? 'AYER'
                : daysFromToday == -2
                ? 'ANTEAYER'
                : ''}
            </b>
            {` ${moment(day).format('dddd').toUpperCase()} (${fromToday})`}
          </div>
          <button
            onClick={() => {
              setDay(moment().format('YYYY-MM-DD'));
            }}
          >
            IR A HOY
          </button>
        </div>
        <div style="padding:5px;">
          {/* <div>HABITACION</div> */}
          <select
            value={room}
            onChange={(e) => {
              // alert(JSON.stringify(e.target.value));
              setRoom(e.target.value);
            }}
          >
            <option value={'all'}>{'TODAS LAS HABITACIONES'}</option>
            {rooms?.map((room) => (
              <option value={room._id}>{`HABITACION ${room.info.name}`}</option>
            ))}
          </select>
        </div>
      </div>
      <div style="flex:1;padding:0px;overflow-y:auto;">
        {rooms
          ?.filter((r) => room == 'all' || r._id == room)
          .map((r) => {
            const grouped = [];
            r.stays?.forEach((stay) => {
              const fromStart = moment(stay.range[0]).diff(day, 'days');
              const toEnd = moment(stay.range[1]).diff(day, 'days');
              if (fromStart <= 0 && toEnd >= 0) {
                var group = grouped.find((group) => stay.user == group.user);
                !group &&
                  (() => {
                    group = { user: stay.user, stay: [] };
                    grouped.push(group);
                  })();
                group.stay.push(stay);
              }
            });
            // if (room.info.locations - users.length > 0) {
            return (
              grouped.length > 0 && (
                <div style="border-bottom:2px solid rgb(60,60,60);">
                  <div style="z-index:1000;background:rgb(10,10,10);position:sticky;top:0px;padding:5px;flex:1;border-bottom:2px solid rgba(120,120,120,0.6);">
                    <b>{`🚪 HABITACION  ${r.info?.name?.toUpperCase()}`}</b>
                  </div>
                  <div style="padding:5px;display:flex;">
                    <div style="flex:1">
                      {r.info.isPrivate ? 'Privada' : 'Compartida'}
                    </div>
                    <div style={'flex:1'}>{`${grouped?.length} huespedes`}</div>
                    <div style={'flex:1'}>{`${
                      r.info.locations - grouped.length
                    } disponibles`}</div>
                  </div>
                  <br />
                  <div
                    class="group"
                    style="display:flex;flex-direction:column;margin:5px;"
                  >
                    {grouped?.length > 0 ? (
                      grouped.map((group) => {
                        const user = users.find(
                          (user) => group.user == user._id
                        );
                        // .sort((a, b) => (b.range[0] < a.range[0] ? -1 : 1))
                        return (
                          group.stay.length > 0 && (
                            <div
                              style="gap:5px;display:flex;flex-direction:column;background:black;padding:5px;border-bottom:solid 2px rgb(20,20,20);"
                              onClick={() => {
                                setSelected((prev) =>
                                  prev == user._id ? undefined : user._id
                                );
                              }}
                            >
                              {/* {JSON.stringify(user?.userInfo.name)} */}
                              <div>
                                <UserInfo user={user} see={true} />
                                {/* <button>{'VER USUARIO'}</button> */}
                              </div>
                              <div class="group">
                                {group.stay
                                  .sort((a, b) =>
                                    b.range[0] < a.range[0] ? -1 : 1
                                  )
                                  .map((stay) => {
                                    return (
                                      <AssetDisplay
                                        asset={stay}
                                        section={'stay'}
                                        controls={false}
                                      >
                                        <StayInfo
                                          stay={stay}
                                          resumed={selected != stay.user}
                                        />
                                      </AssetDisplay>
                                    );
                                  })}
                              </div>
                              {/* {stay.user} */}
                              {/* {user.userInfo} */}
                              {/* <pre> STAY {JSON.stringify(stay, null, 2)}</pre> */}
                            </div>
                          )
                        );
                      })
                    ) : (
                      <div style="padding:5px;">Habitacion vacia</div>
                    )}
                  </div>
                </div>
              )
            );
            // }
          })}
      </div>
    </div>
  );
}
