import ValidationInput from "components/validationInput";
import {
  useNewProduct,
  validateName,
  validatePrice,
  validateStock,
  add,
  edit,
} from "vStore/newProd";
import { useOverlays } from "vStore/overlays";
import { useAssets } from "vStore/assets";
const NewProduct = ({ onSuccess = () => {} }) => {
  const { disabled, prodId, validationStates, info } = useNewProduct();
  const { shop } = useAssets();
  const prod = shop?.find((prod) => prod._id == prodId);
  const { neo } = useOverlays();
  return (
    <div style="padding:10px;">
      <b style="margin-bottom:40px;">
        <h2> {prodId ? "Editar producto" : "Crear nuevo producto"}</h2>
      </b>
      <ValidationInput
        value={info.name}
        type="text"
        label={"NOMBRE"}
        state={validationStates["name"]}
        onChange={validateName}
        placeholder="Jugo"
      />
      <ValidationInput
        value={info.price}
        type="number"
        label={"PRECIO"}
        state={validationStates["price"]}
        onChange={validatePrice}
        step="100"
        placeholder="3500"
      />
      {/* <ValidationInput */}
      {/*   type="numeric" */}
      {/*   label={'STOCK'} */}
      {/*   state={validationStates['stock']} */}
      {/*   onChange={validateStock} */}
      {/*   placeholder="10" */}
      {/* /> */}
      <button
        style="margin-top:20px;"
        disabled={disabled}
        class={disabled && "disabled"}
        onClick={async () => {
          neo.ref.current.close();
          prodId ? await edit() : await add();
          // onSuccess();
        }}
      >
        {prodId ? "EDITAR" : "CREAR"}
      </button>
    </div>
  );
};
export default NewProduct;
