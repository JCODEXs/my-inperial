import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionConfig } from 'lib/session';
export default withIronSessionApiRoute(function logoutRoute(req, res, session) {
  req.session.destroy();
  res.send({ ok: true });
}, sessionConfig);
