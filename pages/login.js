import { withIronSessionSsr } from "iron-session/next";
import { sessionConfig } from "lib/session";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../components/Login"), { ssr: false });
export default function admin({}) {
  return <Login />;
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;
    if (user) {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  },
  sessionConfig
);
