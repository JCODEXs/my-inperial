import dynamic from 'next/dynamic';
const FullJasmin = dynamic(() => import('components/Admin/FullJasmin'), {
  ssr: false,
});
import { setSelected, setSection, useSelected } from 'vStore/selected';
import { useLayoutEffect } from 'preact/hooks';
export default function Model() {
  const { selected } = useSelected();
  useLayoutEffect(() => {
    // setSelected('MartinaRuiz');
    // Vgc;
  }, []);
  return (
    <div>
      VISTA DE MODELO
      <FullJasmin model={selected} selected={'MartinaRuiz'} />
    </div>
  );
}
