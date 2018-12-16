const fetch = require("node-fetch");
const generateWebAppURL = require("server/utils").generateWebAppURL;

module.exports = app => {
  let zipcode;

  app.post("/search-location", (req, res) => {
    zipcode = req.body.zipcode;
    if (!zipcode || zipcode.length < 5 || zipcode.length > 5) {
      res.redirect("/error");
    } else {
      res.redirect("/current-weather");
    }
  });

  app.get("/search-location-weather", (req, res) => {
    //build api URL with user zip
    const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
    //ENTER YOUR API KEY HERE (make sure to no include < >)
    const apiId = "&appid=da7e909781b2dc477e5c92f6ad1977e0&units=imperial";

    const userLocation = (url1, url2, zipcode) => {
      let newUrl = url1 + zipcode + url2;
      return newUrl;
    };

    const apiUrl = userLocation(baseUrl, apiId, zipcode);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect("/error");
      });
  });

  app.post("/search-location-weather", (req, res) => {
    const requestBody = req.body;
    const apiUrl = generateWebAppURL(
      requestBody.locationType,
      requestBody.locationData
    );

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect("/error");
      });
  });
};
