/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  ARTICLES: '/articles',
  HOME: '/',
  ABOUT: '/acerca-de',
  ANTD: '/antd'
};

const privateRoutes = {
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  ARTICLES_ID: '/articles/[id]'
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;
