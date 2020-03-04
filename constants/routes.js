/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: '/ingreso',
  ARTICLES: '/article/list',
  HOME: '/',
  ABOUT: '/acerca-de'
};

const privateRoutes = {
  PRIVATE: '/privada',
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;
