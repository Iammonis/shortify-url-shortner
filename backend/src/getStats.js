import { Storage } from "./data/Storage.js";

export const getStats = (req, res) => {
    let code = req.url.replace(/\//, "");
    code = code.split('/')[1]

  if( Storage.data.links[code] ){
    let obj = {
      browser:{}, 
      platform:{},
      os:{}
    };

    for( let i = 0; i < Storage.data.links[code].userData.length; i++ ){
      if( Storage.data.links[code].userData.browser in obj.browser ) {
        obj.browser[Storage.data.links[code].userData.browser]++;
      }
      else {
        obj.browser[Storage.data.links[code].userData.browser] = 1
      }

      if( Storage.data.links[code].userData.platform in obj.platform ) {
        obj.platform[Storage.data.links[code].userData.platform]++;
      }
      else {
        obj.platform[Storage.data.links[code].userData.platform] = 1
      }

      if( Storage.data.links[code].userData.os in obj.os ) {
        obj.os[Storage.data.links[code].userData.os]++;
      }
      else {
        obj.os[Storage.data.links[code].userData.os] = 1
      }
    }

    res.status(200).send({userData: obj, views: Storage.data.links[code].views} );
  }
  else res.redirect('http://localhost:3000/404');
}