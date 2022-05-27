import BoardsList from '../views/BoardsList.vue';
// import BoardsShow from '../views/BoardsShow.vue';
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
