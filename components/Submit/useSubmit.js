import { useState, useEffect } from "react";
// import * as slotsActions from 'rdx/Slots/actions';
// import { useScrollBooster } from 'lib/useScrollBooster';
export const useSubmit = () => {
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [thumbs, setThumbs] = useState([]);
  const [totalprice, setTotalprice] = useState(0);
  // const { scroller, viewport, content } = useScrollBooster({});f
  const onDrop = (aditional, rejected) => {
    // checkNSFW(acepted[0].preview)
    console.log(aditional);
    var update = {};
    aditional.map((file) => {
      // if (file.name.endsWith('.fset')) {
      //   update.fset = file;
      // } else if (file.name.endsWith('.fset3')) {
      //   update.fset3 = file;
      // } else if (file.name.endsWith('.iset')) {
      //   update.iset = file;
      //} else
      if (file["type"].split("/")[0] === "image") {
        update.img = file;
      } else {
      }

      // Object.assign(file, {
      //   preview: URL.createObjectURL(file)
      // });
    });
    setAccepted(accepted);
    // var newThumbs = [];
    // aditional.map((file) => {
    //   acepted.push(file);
    //   newThumbs.push(
    //     {
    //       file: file,
    //       value: 2,
    //       confirmed: false,
    //       valid: false,
    //       url: '',
    //       tittle: '',
    //       description: ''
    //     }
    //   );
    // });
    // setThumbs((previous) => [...previous, ...newThumbs]);
    // setAcepted(acepted);
  };
  const removeThumb = (idx) => {
    //  setTotalprice((previous) => previous - thumbs[idx].value);
    setThumbs((previous) => previous.splice(idx, 1));
    setAcepted((previous) => previous.splice(idx, 1));
  };
  const handleUploadImage = () => {
    thumbs.forEach((thumb, index) => {
      // alert(JSON.stringify(thumb, null, 3));
      if (thumb.confirmed) {
        // slotsActions.postSlot(
        //   thumb.file,
        //   {
        //     tittle: thumb.tittle,
        //     description: thumb.description,
        //     url: thumb.url,
        //     value: thumb.value,
        //     submissionDate: new Date(),
        //     active: true,
        //     stats: {
        //       likes: 0,
        //       views: 0,
        //       advantage: 0,
        //       rank: null,
        //     }
        //   });
      }
    });
  };
  const calculateValue = (newThumbs) => {
    var total = 0;
    newThumbs.forEach((thumb) => {
      thumb.confirmed && (total += thumb.value - 1);
    });
    setTotalprice(total);
  };
  const updateThumbConfirmation = (index, newData) => {
    // alert('updating: '+index)
    setThumbs((previous) => {
      Object.assign(previous[index], newData);
      // alert(previous);
      calculateValue(previous);
      return previous;
    });
  };
  return {
    accepted,
    rejected,
    thumbs,
    setThumbs,
    onDrop,
    totalprice,
    handleUploadImage,
    // scroller,
    // viewport,
    // content,
    removeThumb,
    updateThumbConfirmation,
  };
};
