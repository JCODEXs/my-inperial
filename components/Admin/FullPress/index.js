import { useSelected } from "vStore/selected";
import { useState, useLayoutEffect, useEffect, useRef } from "preact/hooks";
import Gallery from "./gallery";
import Maximized from "./maximized";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
export default function FullPress({ data }) {
  const [pic, setPic] = useState(undefined);
  const { selected } = useSelected();
  useEffect(async () => {
    setPic(undefined);
  }, [selected]);
  useEffect(async () => {}, [pic]);
  return (
    data && (
      <div
        style="
        max-width:100%;
        position:relative;
        display:flex;
        flex-direction:column;
        min-height:100%;
        max-height:100%;
        overflow:hidden;
        "
      >
        {pic && <Maximized pic={pic} setPic={setPic} media={data.media} />}
        <b
          style={`
          background:rgba(30,30,30,0.2);
          padding:10px;font-size:162%;
          border-bottom:1px solid rgba(20,20,20,0.8);
          filter:drop-shadow(0 0 0.3rem black);
          ${!data.title && "color:rgb(60,20,20);"}
          `}
        >
          {data.title ? data.title : "Se debe agregar un titulo"}
        </b>
        {data.media.length > 0 && (
          <div
            style="
              min-height:max-content;
            "
          >
            <Gallery
              media={data.media}
              action={(e, pic) => {
                e.preventDefault();
                e.stopPropagation();
                setPic(pic);
              }}
            />
          </div>
        )}
        <div
          style="
          border-top:1px solid rgba(20,20,20,0.8);
              padding:20px;
              "
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]} children={data?.press} />
        </div>
      </div>
    )
  );
}
