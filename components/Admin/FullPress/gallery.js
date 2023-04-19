import { memo } from "preact/compat";
import Story from "./story";
export default memo(function Gallery({ media, action = () => {} }) {
  // useEffect(()=>{},[])
  return (
    <div
      style="
	      background:rgba(10,10,10,0.3);
      overflow:hidden;
      width:100%;max-width:100%;display:flex;position:relative;border-radius:10px"
    >
      <div
        style="
        display:flex;
        max-width:100%;
        position:relative;
        overflow-x:auto;
        items-align:center;
        margin:auto;
               "
      >
        {media?.map((media, i) => (
          <Story key={media.location} media={media} action={action} />
        ))}
      </div>
    </div>
  );
});
