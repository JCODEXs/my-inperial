import { memo } from "preact/compat";
import Story from "./story";
export default memo(function Gallery({ stories, action = () => {} }) {
  return (
    <>
      <div
        style="
	      background:rgba(10,10,10,0.3);overflow:hidden:width:100%;max-width:100%;display:flex;position:relative;	"
      >
        <div style="max-width:100%;position:relative;overflow:hidden;items-align:center;margin:auto;gap:10px;">
          {stories?.map((story) => (
            <Story key={story.id} story={story} action={action} />
          ))}
        </div>
      </div>
    </>
  );
});
