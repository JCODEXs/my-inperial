import { useRef, useEffect } from 'react';
const sb = require('scrollbooster').default;
export const useScrollBooster = ({ active = true }) => {
    const viewport = useRef();
    const content = useRef();
    const scroller = useRef();
    const loadSB = () => {
        if (viewport.current && content.current) {
            scroller.current = new sb({
                viewport: viewport.current,
                content: content.current,
                scrollMode: 'native',
                direction: 'vertical',
                emulateScroll: true,
                // bounceForce: 0,
                bounce:false,
                //   textSelection: false,
                // friction: 0.005,
                // shouldScroll: (state, event) => {
                //     return true;
                // },
                //  shouldScroll:false
            });
            const resizeObserver = new ResizeObserver((entries) => {
                scroller.current.updateMetrics();
            });
            resizeObserver.observe(content.current);
        }
    };
    const unloadSB = () => {
        if (scroller.current) {
            scroller.current = null;
        }
    };
    useEffect(() => {
        active && loadSB();
    }, []);
    useEffect(() => {
        if (active) {
            loadSB();
        } else {
            unloadSB();
        }
    }, [active]);
    return { scroller: scroller.current, viewport, content };
};
