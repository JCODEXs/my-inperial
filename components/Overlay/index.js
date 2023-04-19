import React, { useImperativeHandle } from "react";
import { useRef } from "preact/hooks";
import styles from "./overlay.module.css";
import gsap from "gsap";
import { setMaximized, useOverlays } from "vStore/overlays";
import { useSelected } from "vStore/selected";
const Overlay = React.forwardRef(
  ({ oname, children, title, onClose = () => {} }, ref) => {
    const { maximized } = useOverlays();
    const { section } = useSelected();
    const overlay = useRef();
    useImperativeHandle(ref, () => ({
      open,
      close,
    }));
    const close = async () => {
      await gsap.to(overlay.current, {
        // filter: 'hue-rotate(120deg)',
        duration: 0.5,
        opacity: 0,
      });
      await gsap.set(overlay.current, { display: "none" });
    };
    const open = async () => {
      await gsap.set(overlay.current, { display: "flex" });
      gsap.to(overlay.current, {
        // filter: 'hue-rotate(0deg)',
        duration: 0.5,
        opacity: 1,
      });
    };

    // useEffect(() => {
    //   children?.onSuccess = () => close();
    // }, [children]);
    return (
      <div ref={overlay} class={styles.overlay} onClick={close}>
        <div
          style={`max-width: ${
            oname == "neo" && section == "news" && maximized
              ? "100%"
              : "min(1000px, 100%);"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span
            style="
            display:flex;
            border-bottom: solid 2px rgba(100,100,100);
background: rgb(0,40,20);
background: linear-gradient(90deg, rgba(0,5,10,0.5) 0%, rgba(0,10,30,0.5) 100%);
              top: 0px;
              padding: 5px;
            gap:10px;
              "
          >
            <div style="flex:1;">
              {typeof title === "function" ? title() : <b> {title}</b>}
            </div>
            {oname == "neo" && section == "news" && (
              <button
                class={maximized && "tab_selected"}
                onClick={async () => {
                  setMaximized(!maximized);
                }}
                style={{}}
              >
                {"MX"}
              </button>
            )}
            <button
              onClick={async () => {
                await close();
                onClose();
              }}
              style={{
                float: "right",
              }}
            >
              {"<"}
            </button>
          </span>
          <div style="overflow:hidden;flex:1;border-radius: 0px 0px 0px 0px;max-width:100%;">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
export default Overlay;
