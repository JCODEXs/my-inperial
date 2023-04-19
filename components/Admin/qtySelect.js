import { useState, useEffect, useLayoutEffect } from 'preact/hooks';
export default function QtySelect({
  isFloat = false,
  defaultValue = 1,
  onChange,
}) {
  const [qty, setQty] = useState(defaultValue);
  useEffect(() => {
    onChange && onChange(qty);
  }, [qty]);
  useLayoutEffect(() => {
    setQty(1);
  }, [isFloat]);
  return (
    <div style="display:flex;gap:5px;">
      <button
        style="max-width:30px;"
        onClick={() => {
          setQty(
            (prev) =>
              Math.round(Math.max(1, prev - (isFloat ? 0.2 : 1)) * 100) / 100
          );
        }}
      >
        -
      </button>
      <input
        type="number"
        value={qty}
        min="0"
        onChange={(e) => {
          setQty(parseInt(e.target.value));
        }}
        step={isFloat ? 0.2 : 1}
        style="max-width:60px;"
      ></input>
      <button
        style="max-width:30px;"
        onClick={() => {
          setQty(
            (prev) => Math.round((prev + (isFloat ? 0.2 : 1)) * 100) / 100
          );
        }}
      >
        +
      </button>
    </div>
  );
}
