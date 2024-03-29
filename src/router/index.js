import BoardsList from '../views/BoardsList.vue';
import BoardsNew from '../views/BoardsNew.vue';
import BoardsShow from '../views/BoardsShow.vue';
import CardsNew from '../views/CardsNew.vue';
import PageNotFound from '../views/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/boards',
  },
  {
    path: '/boards',
    name: 'boards_list',
    component: BoardsList,
  },
  {
    path: '/boards/new',
    name: 'boards_new',
    component: BoardsNew,
  },
  {
    path: '/boards',
    name: 'boards_create',
    component: BoardsNew,
  },
  {
    path:'/boards/:id',
    name: 'boards_show',
    component: BoardsShow,
  },
  {
    path:'/boards/:id/:listId/cards/new',
    name: 'cards_new',
    component: CardsNew,
  },
  {
    path:'/boards/:id/:listId/cards',
    name: 'cards_create',
    component: CardsNew,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

export default routes;
