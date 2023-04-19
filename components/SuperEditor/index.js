import dynamic from "next/dynamic";
// const CodeMirror = dynamic(() => import("./CodeMirror"), {
//   loading: () => <p>An editor is loading</p>,
//   ssr: false,
// });
// import CodeMirror from './CodeMirror';
import styles from "./superEditor.module.css";
import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
// import Scrollable from 'components/Scrollable';
// import rehypeRaw from "rehype-raw";
import ProseMirror from "./ProseMirror";
// import Sortable from "sortablejs";
// import Grapes from 'components/Grapes/indx';
// import Submit from 'components/Submit';
import { addNew, useAssets } from "vStore/assets";
import UploadFiles from "components/Submit/UploadFiles";
import FullPress from "components/Admin/FullPress";
import { useOverlays } from "vStore/overlays";
import { useSubmit } from "vStore/submit";
import { useJasmin } from "vStore/jasmin";
import { useLogin } from "vStore/login";
import FilesLoading from "components/Submit/FilesLoading";
function disablePointer(e) {
  document.querySelectorAll("#swappable>div").forEach((el) =>
    el.addEventListener("drag", (e) => {
      e.dataTransfer.eventAllowed = "none";
      e.stopImmediatePropagation();
    })
  );
  // e.target.style.pointerEvents = 'none'
  //  e.related.addEventListener('dragstart', (e) => e.preventDefault())
}
function enablePointer(e) {
  // e.target.style.pointerEvents = 'auto'
  // document
  //   .querySelectorAll('#swappable>div')
  //   .forEach((el) => (
  //     el.addEventListener('mouseup', (e) => e.preventDefault())
  //     ));
}
const SuperEditor = () => {
  const { user: actualUser } = useLogin();
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState("");
  const [toShare, setToShare] = useState([actualUser._id]);
  const tout = useRef();
  const { neo } = useOverlays();
  const { newSubmission, loading } = useSubmit();
  const { users } = useAssets();
  const { activePerformers } = useJasmin();
  useEffect(() => {
    // document.querySelectorAll('#swappable>div').forEach((el) => {
    //   el.addEventListener('dragstart', (e) => {
    //     e.dataTransfer.eventAllowed = 'none';
    //     // alert('sip');
    //     dataTransfer.dropEffect = 'none';
    //     e.stopImmediatePropagation();
    //   });
    // });
    var el = document.getElementById("swappable");
    // var sortable = Sortable.create(el, {
    //   animation: 300,
    //   delay: 300,
    //   touchStartThreshold: 100,
    //   // easing: 'cubic-bezier(1, 0, 0, 1)',
    //   draggable: '#swappable>div',
    //   // onChange: function (/**Event*/ evt) {
    //   //   disablePointer(evt);
    //   //   // function handler(e) {
    //   //   //   e.stopPropagation();
    //   //   //   e.preventDefault();
    //   //   // }
    //   // },
    //   setData: function (
    //     /** DataTransfer */ dataTransfer,
    //     /** HTMLElement*/ dragEl
    //   ) {
    //     // dataTransfer.setData('', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
    //     dataTransfer.eventAllowed = 'none';
    //     // dataTransfer.dropEffect = 'none';
    //   },
    //   // onMove: function (/**Event*/ evt) {
    //   //   // disablePointer(evt);
    //   // },
    //   // onEnd: function (/**Event*/ evt) {
    //   //   enablePointer(evt);
    //   // },
    //   //       	// Changed sorting within list
    //   // onUpdate: function (/**Event*/evt) {
    //   // 	// same properties as onEnd
    //   //   evt.stopPropagation();
    //   //         evt.preventDefault();
    //   // },
    //   // draggOverBubble:true,
    //   // swapThreshold:1.2
    // });
    // const swappable = new Swappable(document.querySelector('#swappable'), {
    //   draggable: '#swappable>div',
    //   // delay:
    //   // {
    //   //   mouse: 1000,
    //   //   drag: 200,
    //   //   touch: 100,
    //   // }
    //   // handle:''
    //   // sortAnimation: {
    //   //   duration: 200,
    //   //   easingFunction: 'ease-in-out'
    //   // },
    //   // plugins: [Plugins.SortAnimation] // Or [SortAnimation]
    // });
    // swappable.on('swappable:start', () => console.log('swappable:start'));
    // swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
    // swappable.on('swappable:stop', () => console.log('swappable:stop'));
    return () => {};
  }, []);
  const isDisabled = title.length < 6 || doc.length < 10;
  return loading ? (
    <FilesLoading />
  ) : (
    <div
      className={styles.wrapper}
      style="display:flex;max-width:100%;height:100%;overflow-x:hidden;"
    >
      <div
        style="padding:10px;
          display:flex;
          flex-direction:column;
          gap:10px;
          border-bottom:2px solid rgb(60,60,60);"
      >
        TITULO
        <input
          placeholder="TITULO"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div
        id="swappable"
        className={styles.main}
        style="overflow-x:hidden;
        overflow-y: auto;
        display:flex;
        flex:1;
        flex-wrap:wrap;
        max-width:100%;"
      >
        <div
          style={`${"top:0px;"};display:flex;flex-direction:column;gap:10px;`}
        >
          <UploadFiles />
        </div>
        <div style="top:0px;">
          <ProseMirror
            doc={doc}
            onDocChange={(doc) => {
              clearTimeout(tout.current);
              // tout.current = setTimeout(async () => {
              //  const mdxSource = await serialize(doc);
              // alert('hey');
              // if (!doc) {
              //   doc = "";
              // }
              setDoc(doc);
              // }, 0);
            }}
          />
        </div>
        <div style="top:0px;min-height:200px;">
          <FullPress
            data={{
              title,
              press: doc,
              media: newSubmission.map((sub) => ({
                type: sub.file.type,
                uri: sub.preview,
              })),
            }}
          />
        </div>
        {/* <CodeMirror */}
        {/*   doc={doc} */}
        {/*   onDocChange={(doc) => { */}
        {/*     clearTimeout(tout.current); */}
        {/*     // tout.current = setTimeout(async () => { */}
        {/*     //      if(!doc){ */}
        {/*     //   doc=''; */}
        {/*     // } */}
        {/*     //  const mdxSource = await serialize(doc); */}
        {/*     setDoc(doc); */}
        {/*     // }, 0); */}
        {/*   }} */}
        {/* /> */}
        {/* <pre>{description}</pre> */}
        <div style="display:flex;flex-direction:column;gap:10px;">
          <b style="padding:5px;">👥 COMPARTIR CON</b>
          <div
            style="
              margin:5px;
		    background:rgba(5,60,40,0.3);
		    padding:10px;
		    border-radius:10px;
		    border:2px solid rgba(10,220,160,0.6);
		    "
          >
            <b style="padding:10px;">SELECCIONADOS</b>
            <div
              style="
                padding:5px;
		      display:flex;
		      flex-wrap:wrap;
		      justify-content:center;
		      gap:10px;
		      "
            >
              {users
                .filter((user) => toShare.some((shared) => shared == user._id))
                .map((user) => {
                  const isLocked = user._id == actualUser._id;
                  return (
                    <button
                      style={`${
                        isLocked && "opacity:0.8;pointer-events:none;"
                      }`}
                      key={user._id}
                      onClick={(e) => {
                        if (!isLocked) {
                          e.target.style.pointerEvents = "none";
                          e.target.style.opacity = 0.3;
                          setToShare((prev) =>
                            prev.filter((shared) => shared !== user._id)
                          );
                          // addModel2Template(template._id, model.screenName);
                        }
                      }}
                    >
                      {user.model
                        ? `💃 ${
                            activeModels.find(
                              (model) => user.model.jasmin == model.screenName
                            )?.displayName
                          }`
                        : `🕴️ ${user.info?.name}  ${user.info?.surname} ${
                            user._id == actualUser._id ? "[TU]" : ""
                          }`}
                    </button>
                  );
                })}
            </div>
          </div>
          <div
            style="

              margin:5px;
              padding:10px;
		    border-radius:10px;
		    border:2px solid rgba(100,100,100,0.6);
		    "
          >
            <b style="padding:10px;">DISPONIBLES</b>
            <div
              style="
                padding:5px;
		      display:flex;
		      flex-wrap:wrap;
		      justify-content:center;
		      gap:10px;
		      "
            >
              {users
                .filter(
                  (user) =>
                    user._id !== actualUser._id &&
                    !toShare.some((shared) => user._id == shared) &&
                    (!user.model ||
                      activeModels.find(
                        (model) => user.model.jasmin == model.screenName
                      ))
                )
                .map((user) => {
                  const isLocked = false;
                  //               samePeriodTemplates.some((tmp) =>
                  //   tmp.models?.some(
                  //     (mdl) => mdl.screenName == model.screenName
                  //   )
                  // );
                  return (
                    <button
                      style={`${
                        isLocked && "opacity:0.2;pointer-events:none;"
                      }`}
                      key={user._id}
                      onClick={(e) => {
                        if (!isLocked) {
                          e.target.style.pointerEvents = "none";
                          e.target.style.opacity = 0.3;
                          setToShare((prev) => [...prev, user._id]);
                          // addModel2Template(template._id, model.screenName);
                        }
                      }}
                      // class="modelSelect"
                    >
                      {user.model
                        ? `💃 ${
                            activePerformers.find(
                              (model) => user.model.jasmin == model.screenName
                            )?.displayName
                          }`
                        : `🕴️ ${user.info.name}  ${user.info.surname}`}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        {/* <pre>{doc}</pre> */}
        {/* <Grapes/> */}
      </div>
      {/* {doc} */}
      <div style="border-top:solid 2px rgba(40,40,40);padding:10px;">
        <button
          style="float:right;"
          disabled={isDisabled}
          class={isDisabled && "disabled"}
          onClick={async () => {
            await addNew(title, doc, toShare);
            neo.ref.current.close();
          }}
        >
          CREAR NOTICIA
        </button>
      </div>
    </div>
  );
};
export default SuperEditor;
