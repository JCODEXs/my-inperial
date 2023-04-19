import moment from 'moment';
import { useAssets, deleteElement, hasCheckout } from 'vStore/assets';
import { sections } from 'vStore/sections';
const assetDisplayHeader = (section, asset) => {
  const { users } = useAssets();
  const creator = users.find((user) => user._id == asset.creation.by);
  return (
    <div style="z-index:999990000;items-align:center;padding:3px; padding-left:5px; display:flex;align-items:center;gap:10px;background:rgba(5,5,5,0.2);border-bottom:1px solid rgba(40,40,40,0.6);">
      <div style="width:100px;">
        {sections[section].label.replace(/S([^S]*)$/, '$1')}
      </div>
      <div style=" font-size:75%;flex:1;">
        {`${moment(asset.creation.utc).format('YYYY-MM-DD')}`} <br />{' '}
        {`${moment(asset.creation.utc).fromNow()}`}
      </div>
      {creator && (
        <div style="font-size:80%;">{`${creator.info.name} ${creator.info.surname}`}</div>
      )}
      {/* {true && ( */}
      {/* <div style="display:flex;gap:3px;"> */}
      {/* <button */}
      {/*   style="float:right;" */}
      {/*   onClick={() => { */}
      {/*     overlayEdit.current.open(); */}
      {/*     // alert('Estas seguro de querer eliminar?'); */}
      {/*     // deleteElement(section, asset.user, asset._id); */}
      {/*   }} */}
      {/* > */}
      {/*   <div style="mix-blend-mode:normal;">✏️</div> */}
      {/* </button> */}
      <button
        // style="float:right;"
        onClick={() => deleteElement(section, asset.user, asset._id)}
      >
        🗑️
      </button>
      {/* </div> */}
      {/* )} */}
    </div>
  );
};
export default function AssetDisplay({
  children,
  asset,
  section,
  background = 'red',
  controls = true,
}) {
  background = sections[section].background;
  // const overlayEdit = useRef();
  // const user = users.find((user) => user._id == asset.user);
  // if (section !== 'stay') {
  //   const stay = user.stay?.find(
  //     (stay) =>
  //       stay.range[0] < asset.creation.utc && stay.range[1] > asset.creation.utc
  //   );
  //   hasCheckout(stay) && (controls = false);
  // }
  return (
    <div
      style={` position:relative;padding-bottom:${
        section == 'stay' ? '20' : '5'
      }px ;background:${background};border-bottom:2px solid rgba(30,30,30,0.6);`}
    >
      {assetDisplayHeader(section, asset)}
      <div style="padding:5px;">
        {!children ? sections[section].elem(asset) : children}
      </div>
    </div>
  );
}
// {false && controls && (
//   <Overlay ref={overlayEdit} title="EDITAR">
//     <div style="padding:10px;">
//       <UserInfo user={user} />
//     </div>
//     <AssetDisplay
//       asset={asset}
//       section={section}
//       sections={sections}
//       background={background}
//       controls={false}
//     >
//       <div style="padding:5px;">ANTES DE EDITAR</div>
//       {sections[section].elem(asset)}
//       <div style="padding:5px;">DESPUES DE EDITAR</div>
//       {sections[section].elem(asset, true)}
//     </AssetDisplay>
//     <div style="padding:10px;">
//       <button style="float:right;">ACTUALIZAR</button>
//     </div>
//   </Overlay>
// )}
