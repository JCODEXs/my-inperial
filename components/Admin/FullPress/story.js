// import Image from "next/future/image";
export default function Story({ media, action }) {
  return (
    <div
      class="outterThing"
      style="
      border:1px solid rgba(160,160,160,0.6);
      "
    >
      <div style={`padding:3px;font-size:80%;background:black;`}>
        {media.type.split("/")[0] == "video" ? "📹" : "📸"}
      </div>
      <div
        style={`
                  box-shadow: inset 0 0 0 0.2em rgba(100,100,100,0.2);
                  background-image:url('footerCorona.png');
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 50px auto;
                  overflow:hidden;
                  min-width:max-content;
                  border:solid -2px rgba(200,200,200,0.1);
                `}
        onClick={(e) => action(e, media)}
      >
        {media.type.split("/")[0] == "video" ? (
          <video
            src={media.uri}
            style="min-heigth:120px;height:120px;
     min-width:140px;
            "
          />
        ) : (
          <img
            class="thing"
            src={media.uri}
            style="min-heigth:120px;height:120px;
     min-width:100px;
              object-fit:cover;
              "
          />
        )}
      </div>
    </div>
  );
}
// <Image
//   objectFit="cover"
//   // onLoadingComplete={(e) => {
//   //   gsap.to(e.currentTarget, {
//   //     opacity: 1,
//   //     duration: 0.4,
//   //   });
//   // }}
//   // class="modelPic"
//   quality={50}
//   layout="fill"
//   priority={true}
//   // style="opacity:0;object-fit:cover;"
//   src={media.uri}
// />
