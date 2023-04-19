import { useEffect, useRef } from 'react';
import { Sortable, MultiDrag, Swap } from 'sortablejs';
import funnelState, {
  useNewFunnel,
  initialAssign,
  getStageList,
  setStageList,
  setStages,
} from 'vStore/funnel';
const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};
const Stage = ({ stage, index }) => {
  const ref = useRef();
  const sortable = useRef();
  useEffect(() => {
    sortable.current = new Sortable(ref.current, {
      multiDrag: true, // Enable multi-drag
      scroll: true, // Enable the plugin. Can be HTMLElement.
      forceAutoscrollFallback: true, // force autoscroll plugin to enable even when native browser autoscroll is available
      scrollSensitivity: 100, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 20, // px, speed of the scrolling
      bubbleScroll: true, // apply autoscroll to all parent elements, allowing for easier movement
      group: {
        name: 'shared',
        //    pull: 'clone' // To clone: set pull to 'clone'
        // put:false
      },
      animation: 100,
      // easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
      ghostClass: 'sortable-ghost-funnel', // Class name for the drop placeholder
      chosenClass: 'sortable-chosen-funnel', // Class name for the chosen item
      dragClass: 'sortable-drag-funnel', // Class name for the dragging item
      selectedClass: 'sortable-selected-funnel',
      // removeCloneOnHide: false,
      onClone: function (/**Event*/ evt) {},
      onSort: (evt) => {
        console.log('onSort', evt);
        var order = sortable.current.toArray();
        console.log('order', order);
        setStageList(index, order);
      },
      setData: function (
        /** DataTransfer */ dataTransfer,
        /** HTMLElement*/ dragEl
      ) {
        dataTransfer.dropEffect = 'none';
        dataTransfer.effectAllowed = 'none';
      },
      onUpdate: (evt) => {
        console.log('yes', evt);
        // var order = ref.current.toArray();
        // setStageList(index, order);
      },
      onRemove: (evt) => {
        return false;
        console.log('remove', evt);
        funnelState.stages[index].users.splice(evt.oldIndex, 1);
      },
      onAdd: function (/**Event*/ evt) {
        console.log('onAdd', evt);
      },
      onEnd: function (/**Event*/ evt) {
        console.log('onEnd', evt);
      },
      store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get: (sortable) => {
          //   var order = getStageList(index);
          //   return order;
        },
        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set: (sortable) => {
          console.log('onStore', sortable);
          //   console.log(order);
          //   //   //   setStageList(index, []);
          //   cache.push({ index, order });
          // if (cache.length == 2) {
          //   // cached.forEach((value,index) => {
          //   // }); // const idsInOrder = evt.from.sortable("toArray");
          //   const newStages = [...stages];
          //   if (cache.length == 2) {
          //     setStageList(cache[0].index, cache[0].order);
          //     setStageList(cache[1].index, cache[1].order);
          //     // const idsInOrder = evt.from.sortable("toArray");
          //     // setStages(newStages);
          //   }
        },
      },
    });
    // sortable.current.dmin/Funnel/index.jsmount(new MultiDrag())
  }, []);
  useEffect(() => {
    removeChilds(ref.current);
    stage.users.forEach((value) => {
      let parr = document.createElement('div');
      // parr.setAttribute('class','message');
      parr.setAttribute('data-id', value._id);
      parr.className = 'sortable-user';
      parr.innerHTML = value.info?.name + ' ' + value.info?.surname;
      //  parr.innerHTML = JSON.stringify(value);
      ref.current.appendChild(parr);
    });
  }, [stage.users]);
  return (
    <div
      style="display:flex;flex-direction:column;background:rgba(20,20,20,0.8);
	    overflow:hidden;
	    border: 1px solid rgba(60,60,60,0.8);
          min-width: 250px;
          max-width: 250px;
	    "
    >
      <b style="padding:10px;background:silver;color:black;">{stage.title}</b>
      <div
        ref={ref}
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        key={index}
        idx={index}
      >
        {/* {users && (
        <ReactSortable group="groupName">
          {value.users.map((user) => {
            return <div data-id={value._id}>{JSON.stringify(user)}</div>;
          })}
        </ReactSortable>
      )} */}
      </div>
    </div>
  );
};
export default Stage;
