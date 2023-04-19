import { useJasmin, onSearchInput, clearSearch } from "vStore/jasmin";
import styles from "./search.module.css";
import classNames from "classnames";
export default function Search() {
  const { search } = useJasmin();
  // const { actualMode, mosaicAvailable } = useUi();
  return (
    <div className={styles.main}>
      <div className={styles.search}>
        {/* <div>🔎</div> */}

        <img
          style="max-height:16px;width:20px;object-fit:contain"
          src="/assets/searchIcon.png"
        />
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={onSearchInput}
          defaultValue={search}
          placeholder="Buscar"
        />
        <button
          className={classNames("btn", { disabled: search == "" })}
          disabled={search == ""}
          onClick={clearSearch}
        >
          borrar
        </button>
      </div>
    </div>
  );
}
