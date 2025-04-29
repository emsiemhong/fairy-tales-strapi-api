import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::story.story', ({ strapi }) => ({
  async favorite(ctx) {
    const user = ctx.state.user;
    const { storyId } = ctx.request.body;

    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    if (!storyId) {
      return ctx.badRequest('Missing storyId');
    }

    const userData = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
      populate: { favorites: true },
    });

    const alreadyFavorited = (userData as any).favorites.some((story: any) => story.id === storyId);

    if (alreadyFavorited) {
      return ctx.badRequest('Story is already favorited.');
    }

    const updatedFavorites = [...(userData as any).favorites.map((story: any) => story.id), storyId];

    const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
      data: {
        favorites: updatedFavorites,
      } as any,
      populate: { favorites: true },
    });

    return ctx.send({
      message: 'Story favorited successfully!',
      favorites: (updatedUser as any).favorites,
    });
  },


  async unfavorite(ctx) {
    const user = ctx.state.user;
    const { storyId } = ctx.request.body;

    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    if (!storyId) {
      return ctx.badRequest('Missing storyId');
    }

    const userData = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
      populate: { favorites: true },
    });

    const updatedFavorites = (userData as any).favorites
      .filter((story: any) => story.id !== storyId)
      .map((story: any) => story.id);

    const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
      data: {
        favorites: updatedFavorites,
      },
      populate: { favorites: true },
    });

    return ctx.send({
      message: 'Story unfavorited successfully!',
      favorites: (updatedUser as any).favorites,
    });
  }
,

  async getFavorites(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    const userData = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
      populate: {
        favorites: {
          populate: ['cover_image']
        }
      },
    });

    return ctx.send({
      favorites: (userData as any)?.favorites || [],
    });
  }

}));