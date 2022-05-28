import BoardsList from '../views/BoardsList.vue';
import BoardsNew from '../views/BoardsNew.vue';
import PageNotFound from '../views/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/boards',
  },
  {
    path: '/boards',
    name: 'boards',
    component: BoardsList,
  },
  {
    path: '/boards/new',
    name: 'boards_new',
    component: BoardsNew,
  },
  // {
  //   path:'/:id',
  //   name: 'boards_show',
  //   component: BoardsShow,
  // },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

export default routes;
