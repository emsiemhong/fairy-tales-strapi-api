export default {
  routes: [
    {
      method: 'POST',
      path: '/favorites',
      handler: 'favorite.favorite',
      create: {
        auth: { scope: ['authenticated'] },
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/favorites',
      handler: 'favorite.getFavorites',
      create: {
        auth: { scope: ['authenticated'] },
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/unfavorites',
      handler: 'favorite.unfavorite',
      create: {
        auth: { scope: ['authenticated'] },
        middlewares: [],
      },
    },
  ]
}
