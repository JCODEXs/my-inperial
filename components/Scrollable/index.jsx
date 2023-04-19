import { useScrollBooster } from 'lib/useScrollBooster';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
import styles from './scrollable.module.css';
import Image from 'next/image';
const Scrollable = React.forwardRef(
  (
    {
      active = true,
      children,
      isDynamic = false,
      onScrollLimit = () => {},
      showBar = false
    },
    ref
  ) => {
    const { scroller, viewport, content } = useScrollBooster({
      active: active
    });
    const lastBottomCollision = useRef(false);
    const lastTopCollision = useRef(false);
    const tout = useRef();
    useEffect(() => {
      scroller?.updateOptions({
        onUpdate: (state) => {
       //   console.log('state ', state);
          onScrollLimit(state, scroller,content,viewport);
        }
      });
    }, [scroller]);
    useImperativeHandle(ref, () => ({
      scroller,
      scrollTop
    }));
    const scrollTop = () => {
      scroller?.setPosition({
        x: 0,
        y: 0
      });
    };
    const scrollBottom = () => {
      scroller?.setPosition({
        x: 0,
        y: content.current.offsetHeight - 400
      });
    };
    return (
      <div className={styles.scrollable}>
        <div className={styles.scrollable_viewport} ref={viewport}>
          <div className={styles.scrollable_content} ref={content}>
            {children}
            {isDynamic && (
              <div className={styles.loading}>
                <Image
                  priority={true}
                  width={62}
                  height={62}
                  objectFit="contain"
                  src="/loading.gif"
                />
                <b>LOADING MORE...</b>
              </div>
            )}
          </div>
        </div>
        {showBar && (
          <div className={styles.listToolbar}>
            <div className="hoverScale" onClick={scrollTop}>
              ⬆️
            </div>
            <div className="hoverScale" onClick={scrollBottom}>
              ⬇️
            </div>
          </div>
        )}
      </div>
    );
  }
);
export default Scrollable;
