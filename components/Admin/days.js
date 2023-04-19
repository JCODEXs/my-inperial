import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
import { useAssets } from 'vStore/assets';
import { useOverlays, setDay, setRoom, setDayRoom } from 'vStore/overlays';
import { useRef, useState } from 'preact/hooks';
export default function Days({ showDay = () => {} }) {
  const { rooms } = useAssets();
  var stays = [];
  rooms?.forEach((room) => {
    room.stays && stays.push(...room.stays);
  });
  const minDay = moment.min(...stays.map((stay) => moment(stay.range[0])));
  const maxDay = moment.max(...stays.map((stay) => moment(stay.range[1])));
  return (
    <div style="display:flex;flex-direction:column;overflow-y:hidden;max-height:100%;">
      <div
        style="padding:5px;background:rgb(15,15,15);
border-bottom:2px solid rgb(60,60,60);
  filter: drop-shadow(0 0 0.4rem rgba(5,5,5,0.95));
	      z-index:1;
	      "
      >
        <b style="padding:5px;">{'📅 CALENDARIO'}</b>
        <div
          style="padding:5px;
padding-right:25px;
	      display:flex;position:sticky;top:0px;z-index:1000;"
        >
          <b style="flex:1;">{'DIA'}</b>
          <b style="flex:1;">{'CAMAS DISPONIBLES'}</b>
        </div>
      </div>
      <div style="overflow-y:auto;">
        {[...Array(maxDay.diff(minDay, 'days') + 1).keys()]
          .reverse()
          .map((diff) => {
            var totalShared = 0;
            var totalPrivate = 0;
            var totalPrivatePartial = 0;
            const day = moment(minDay).add(diff, 'days').format('YYYY-MM-DD');
            const fromToday = moment(day).fromNow();
            const daysFromToday = moment(day).diff(
              moment().format('YYYY-MM-DD'),
              'days'
            );
            var checkins = 0;
            var checkouts = 0;

            var p_checkins = 0;
            var p_checkouts = 0;
            rooms?.map((room) => {
              const thing = [];
              room.stays?.forEach((stay) => {
                const fromStart = moment(stay.range[0]).diff(day, 'days');
                const toEnd = moment(stay.range[1]).diff(day, 'days');
                if (fromStart < 0 && toEnd > 0) {
                  thing.push(stay);
                } else {
                  fromStart == 0 && checkins++;
                  toEnd == 0 && checkouts++;

                  fromStart == 0 && !stay.checkin && p_checkins++;
                  toEnd == 0 && !stay.checkout && p_checkouts++;
                }
              });
              const availableLocations = room.info.locations - thing.length;
              // console.log('avail', availableLocations);
              if (availableLocations > 0) {
                !room.info.isPrivate
                  ? (totalShared += availableLocations)
                  : availableLocations == room.info.locations
                  ? (totalPrivate += availableLocations)
                  : (totalPrivatePartial += availableLocations);
              }
            });
            return (
              <div
                style={`${
                  daysFromToday == 0
                    ? 'background:rgb(62,180,137);color:black;position:sticky;top:0px;bottom:0px;'
                    : ''
                };padding:0px;border-bottom:solid 2px rgba(100,100,100,0.6);"
			`}
                onClick={() => {
                  setDayRoom(day, 'all');
                  // overlayByDay.current.open();
                }}
              >
                <div style="padding:3px;background:rgba(50,50,50,0.1);display:flex;gap:10px;border-bottom:2px solid rgba(20,20,20,0.3);">
                  <div style="flex:1;">{`IN: ${checkins}`}</div>
                  <div style="flex:1;">{`OUT: ${checkouts}`}</div>
                  <div style="flex:1;">
                    {p_checkins > 0 &&
                      daysFromToday <= 0 &&
                      `⚠️ IN: ${p_checkins}`}
                  </div>
                  <div style="flex:1;">
                    {p_checkouts > 0 &&
                      daysFromToday <= 0 &&
                      `⚠️ OUT: ${p_checkouts}`}
                  </div>
                </div>
                <div style="padding:5px;display:flex;">
                  <div style="flex:1;">
                    {`${day} `}
                    <div>
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
                      {` ${moment(day).format('dddd').toUpperCase()}`}
                    </div>
                    <div>{`${fromToday}`}</div>
                  </div>
                  {true && (
                    <div style="flex:1;">
                      <div>{totalShared + ' compartidas'}</div>
                      <div> {totalPrivate + ' privadas'}</div>
                      <div>{totalPrivatePartial + ' privadas parciales'}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
