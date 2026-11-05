const fs = require("fs");
const path = require("path");

module.exports = class Home {
  constructor(homeName, price, location, rating, photourl) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photourl = photourl;
  }

  async save() {
    const id = Math.floor(Math.random() * 1000000);
    this.id = id;

    const registeredHomes = await Home.fetchAll();

    registeredHomes.push(this);

    const homeDataPath = path.join(__dirname, "..", "data", "homes.json");

    await fs.promises.writeFile(
      homeDataPath,
      JSON.stringify(registeredHomes, null, 2)
    );

    console.log("Home saved successfully!");
  }

  static async fetchAll() {
    const homeDataPath = path.join(__dirname, "..", "data", "homes.json");

    try {
      const data = await fs.promises.readFile(homeDataPath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }
      throw err;
    }
  }
};