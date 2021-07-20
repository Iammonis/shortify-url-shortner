import { Storage } from "./data/Storage.js";

export const redirect = (req, res) => {
  const code = req.url.replace(/\//, "");

  if( Storage.data.links[code] ){
    Storage.data.links[code].views++;
    Storage.data.links[code].userData.push(req.useragent)
    Storage.write();
    res.redirect(Storage.data.links[code].url);
  }
  else res.redirect('http://localhost:3000/404');
};
