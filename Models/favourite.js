const fs = require("fs");
const path = require("path");
const favouritesPath = path.join(__dirname, "..", "data", "favourites.json");
module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    const normalizedHomeId = String(homeId ?? 0);

    Favourite.getFavourites((favourites) => {
      const existing = Array.isArray(favourites) ? favourites.map(String) : [];

      if (existing.includes(normalizedHomeId)) {
        console.log("Home is already in favourites.");
        if (callback) callback(null);
      } else {
        const updated = Array.isArray(favourites) ? favourites : [];
        updated.push(homeId);

        fs.writeFile(favouritesPath, JSON.stringify(updated, null, 2), (err) => {
          if (callback) callback(err);
        });
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouritesPath, (err, data) => {
      if (err) {
        callback([]);
        return;
      }

      try {
        const parsed = JSON.parse(data);
        callback(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        callback([]);
      }
    });
  }
};
