import FullJasmin from 'components/Admin/FullJasmin';
import dynamic from 'next/dynamic';
const Model = dynamic(() => import('../components/Model'), { ssr: false });
export default function index() {
  return <Model />;
}
export async function getServerSideProps() {
  return {
    props: { hello: 'world' },
  };
}
