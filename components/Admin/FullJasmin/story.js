// import { memo } from "preact/compat";
import Image from "next/image";
import { useUi } from "vStore/ui";
export default function Story({ story, action }) {
  const { blurred } = useUi();
  return (
    <div>
      <div
        style="
border-left:1px solid rgba(200,200,200,0.6);
border-right:1px solid rgba(200,200,200,0.6);
		      background:rgba(10,10,10,0.2);padding:5px;border-radius:0px 0px 0px 0px;
		      position:sticky;
		      left:0px;
		      top:0px;
		      text-align:center;
		      "
      >
        {`$${story.price} ${story.status}`}
      </div>
      <div style="display:flex;max-width:100%;overflow-x:auto;">
        {story.items.length == 0 && (
          <div style="border:1px solid rgba(200,200,200,0.6);padding:5px;">
            {"EN PROCESO APROBATIVO"}
          </div>
        )}
        {story.items.map((item) => (
          <div key={item.id} style="border:1px solid rgba(200,200,200,0.6);">
            <div
              style={`display:flex;padding:3px;
font-size:80%;
background:${
                item.privacy == "premium"
                  ? "rgba(184,134,11,0.2);"
                  : "rgba(0,60,160,0.2)"
              }
			    `}
            >
              <div style={`flex:1;`}>{item.privacy == "premium" && "🔒"}</div>
              <div> {item.type == "video" ? "📹" : "📸"}</div>
            </div>
            <div style="display:flex;overflow:hidden;">
              {item.media?.map((media) => (
                <div
                  key={media.id}
                  style={`
                  box-shadow: inset 0 0 0 0.2em rgba(100,100,100,0.2);
                  background-image:url('footerCorona.png');
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 50px auto;
                  overflow:hidden;
                  min-width:max-content;
                  border:solid -2px rgba(200,200,200,0.1);
                  ${blurred && "filter:blur(15px);"}`}
                  onClick={(e) => action(e, media.contentUri)}
                >
                  {media.contentUri.split(".").pop() == "mp4" ? (
                    <video src={media.contentUri} height="120" width="90" />
                  ) : (
                    <Image
                      objectFit="cover"
                      // onLoadingComplete={(e) => {
                      //   gsap.to(e.currentTarget, {
                      //     opacity: 1,
                      //     duration: 0.4,
                      //   });
                      // }}
                      // class="modelPic"
                      quality={50}
                      height={120}
                      width={90}
                      priority={false}
                      // style="opacity:0;object-fit:cover;"
                      src={media.contentUri}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
