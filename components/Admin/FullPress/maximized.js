import gsap from "gsap";
import { useRef } from "preact/hooks";
import Gallery from "./gallery";
export default function Maximized({ pic, setPic, media }) {
  const imgRef = useRef();
  const vidRef = useRef();
  return (
    <div
      style="margin:0px;backdrop-filter:blur(8px);
		    overflow:hidden;
		    z-index:9;
		    position:fixed;
		    top:0px;
		    left:0;
		    max-width:100%;
		      max-height:100%;
		      min-height:100%;
		      min-width:100%;
		    display:flex;
		    flex-direction:column;
		    align-items:center;
		    justify-content:center;
		    background:rgba(10,10,10,0.8);
                "
      onCLick={() => {
        pic.type.split("/")[0] !== "video" && setPic(null);
      }}
    >
      <div
        style={`
                  background-image:url('footerCorona.png');
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 50px auto;
display:flex;flex:1;overflow:hidden;
              `}
      >
        {pic.type.split("/")[0] == "video" ? (
          <video
            // ref={vidRef}
            src={pic.uri}
            style="
                      max-height:100%;
            opacity:1;
                      max-width:100%;"
            controls
          />
        ) : (
          <img
            ref={imgRef}
            onLoad={(e) => {
              console.log(e);
              gsap.to(imgRef.current, {
                opacity: 1,
                duration: 0.4,
              });
            }}
            style="opacity:0;
                        max-height:100%;
			  max-width:100%;
			  object-fit:contain;
		    border-radius:5px;
		    filter: drop-shadow(0 0 0.5rem : rgba(10,0,10,0.8));
		  "
            src={pic.uri}
          />
        )}
        <button
          style="position:absolute;top:5px;right:5px;"
          onCLick={() => {
            setPic(null);
          }}
        >
          X
        </button>
      </div>
      <div
        style="width:100%;
border-top:3px solid rgb(40,40,40);
                  "
      >
        <Gallery
          media={media}
          action={async (e, newPic) => {
            e.preventDefault();
            e.stopPropagation();
            if (newPic !== pic) {
              imgRef.current &&
                (await gsap.to(imgRef.current, {
                  opacity: 0,
                  duration: 0.1,
                }));
              vidRef.current &&
                (await gsap.to(vidRef.current, {
                  opacity: 1,
                  duration: 0.1,
                }));
              setPic(newPic);
            }
          }}
        />
      </div>
    </div>
  );
}
