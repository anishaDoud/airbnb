const Home = require('../Models/home');
const favourite = require('../Models/favourite');

exports.getHomes = (req, res, next) => {
  res.render('host/register-home');
};

exports.postHomes = async (req, res, next) => {
  try {
    const {
      homeName,
      price = 0,
      location = '',
      rating = 0,
      photourl = ''
    } = req.body;

    const newHome = new Home(
      homeName,
      Number(price),
      location,
      Number(rating),
      photourl
    );

    await newHome.save();
    res.render('host/register-success', { newHome });
  } catch (err) {
    next(err);
  }
};

exports.getHomePage = async (req, res, next) => {
  try {
    const homes = await Home.fetchAll();
    res.render('store/home-list', { homes });
  } catch (err) {
    next(err);
  }
};

exports.getFavourites = async (req, res, next) => {
  try {
    const homes = await Home.fetchAll();

    favourite.getFavourites((favoriteIndexes) => {
      const savedIndexes = Array.isArray(favoriteIndexes) ? favoriteIndexes.map(String) : [];
      const favouriteHomes = homes
        .map((home, index) => ({ ...home, index }))
        .filter((home) => savedIndexes.includes(String(home.index)));

      res.render('store/favourites', { homes: favouriteHomes });
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.query.id ?? req.query.add ?? 0;

  favourite.addToFavourite(homeId, (err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/users/store/favourites');
    }
  });
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const homes = await Home.fetchAll();
    const selectedIndex = Number(req.params.id ?? req.query.home ?? req.query.id ?? 0);
    const home = homes[selectedIndex] || homes[0] || null;

    if (home) {
      home.index = selectedIndex;
    }

    res.render('store/home-details', { home });
  } catch (err) {
    next(err);
  }
};