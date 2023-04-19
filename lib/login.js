import { withIronSessionSsr } from 'iron-session/next';
import { sessionConfig } from 'lib/session';

import dynamic from 'next/dynamic';
const Login = dynamic(() => import('../components/Login'), { ssr: false });
export default function admin({}) {
  // useEffect(() => {
  //   setUser(initialUser);
  // }, [initialUser]);
  return <Login />;
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    // const wss = wss new WebSocketServer({ port: 1234 });
    // wss.on('connection', function connection(ws) {
    //   ws.on('message', function message(data) {
    //     console.log('received: %s');
    //   });
    //   // ws.send('something');
    // });
    return {
      props: {},
    };
  },
  sessionConfig
);
//https://blog.littledata.io/2019/06/14/6-essential-benchmarks-for-shopify-stores/
