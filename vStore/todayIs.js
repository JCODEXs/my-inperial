import { useUi, openChart } from 'vStore/ui';
import { useTime } from 'vStore/time';
export default function TodayIs() {
  const { time } = useTime();
  const { chart, actualMode, mosaicAvailable } = useUi();
  return (
    <>
      {' '}
      {!chart && (
        <b
          onClick={(e) => {
            e.stopPropagation();
            openChart();
          }}
          style="padding:5px;
		background:
linear-gradient(0deg, rgba(0,88,56,1) 0%, rgba(9,121,87,1) 62%, rgba(0,100,102,1) 100%);
		color:black;padding-left:10px;"
        >
          {'📅 CALENDARIO'}
          <br />
          {`HOY ES ${time}`}
        </b>
      )}
    </>
  );
}
