import FollowInfo from "./followInfo";
import { useJasmin } from "vStore/jasmin";
export default function RoomsSessions({ data }) {
  const { allModels } = useJasmin();
  const model = allModels?.find((model) => model.screenName == data.model);
  const actualStatus = data.status && data.status[data.status.length - 1];
  // const createdBy = users.find((user) => user._id == data.creation.by)?.info;
  return (
    <div>
      <FollowInfo follow={data} />
      {actualStatus && (
        <div style="justify-content:center;display:flex;margin:10px;flex-direction:column">
          <div style="display:flex; flex-direction:row ;flex-wrap:wrap">
            {actualStatus?.key == "reviewFinish" && (
              <div style="display:flex; flex-direction:column">
                <div style="display:flex; margin:4px">{model?.displayName}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
