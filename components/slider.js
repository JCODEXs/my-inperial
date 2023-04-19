import { tns } from 'tiny-slider';
import { useLayoutEffect } from 'preact/hooks';
// import 'styles/slider.css';
// import { videos } from '/pages/media/media.js';
const N = 4;
const assets = [...Array(N).keys()];
export default function Slider() {
  useLayoutEffect(() => {
    const slider = tns({
      container: '.my-slider',
      loop: true,
      items: 1,
      // slideBy: 'page',
      controls: false,
      nav: false,
      autoplay: true,
      speed: 400,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      hasControls: false,
      // autoWidth: true,
      responsive: {
        700: {
          items: 2,
        },

        1200: {
          items: 3,
        },
        1600: { items: 4 },
      },
    });

    // autoWidth: true,
    // autoWidth: true,
    return () => slider?.destroy();
  }, []);
  return (
    <div style="overflow:hidden;" class="my-slider">
          <div></div>
      {assets.map((asset) => (
        <img
          style="height:300px;
		max-height:300px;
	      object-fit:cover;"
          src={`/slider${asset}.png`}
        />
      ))}
    </div>
  );
}
