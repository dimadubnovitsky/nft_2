import Home from '../Home';
import ConnectPage from '../ConnectPage';
import Block from '../Block';
import NotFound from '../NotFound';

const appRoutes = [
  {
    id: 'home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    id: 'connect',
    path: '/connect',
    component: ConnectPage,
    exact: true,
  },
  {
    id: 'block',
    path: '/block/:blockID',
    component: Block,
    exact: true,
  },
  {
    id: 'notFound',
    path: '*',
    component: NotFound,
    exact: true,
    breadcrumbsTitle: 'Not Found',
  },
];

export default appRoutes;
