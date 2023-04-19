import { useState } from "react";
import { useJasmin } from "vStore/jasmin";
import { useAssets } from "vStore/assets";
import { useLogin } from "vStore/login";
export default ModelSesionHistory = (data) => {
  const { user } = useLogin;
  const [historyBook, setHistoryBook] = useState(data.book);
  const [modelHistory, setModelHistory] = useState([
    user.SessionHistory.period,
  ]);

  return (
    <>
      <div style={grid2X4}>
        <div>
          <div> Period </div>
          <div> Model </div>
          <div> Day </div>
        </div>
      </div>
    </>
  );
};
