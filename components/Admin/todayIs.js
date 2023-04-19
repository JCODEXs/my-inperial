import { useTime } from "vStore/time";
export default function TodayIs() {
  const { time, timeLx } = useTime();
  return (
    <b style="font-size:85%;">
      <div style="">{`🇨🇴 ${time}`}</div>
      <div styke="">{`🇱🇺  ${timeLx}`}</div>
    </b>
  );
}
