import { Storage } from "./data/Storage.js";

export const getStats = (req, res) => {
    let code = req.url.replace(/\//, "");
    code = code.split('/')[1]

  if( Storage.data.links[code] ){
    let obj = {
      browser: {}, 
      platform: {},
      os: {} 
    };

    function getColor() {
      return 'hsla(' + (Math.floor(Math.random()*360)) + ', 100%, 70%, 1)'
    }

    for( let i = 0; i < Storage.data.links[code].userData.length; i++ ){
      
      if( Storage.data.links[code].userData[i].browser in obj.browser ) {
        obj.browser[Storage.data.links[code].userData[i].browser].val++;
      }
      else {
        obj.browser[Storage.data.links[code].userData[i].browser] = {val: 1, color: `${getColor()}`}
      }

      if( Storage.data.links[code].userData[i].platform in obj.platform ) {
        obj.platform[Storage.data.links[code].userData[i].platform].val++;
      }
      else {
        obj.platform[Storage.data.links[code].userData[i].platform] = {val: 1, color: `${getColor()}`}
      }

      if( Storage.data.links[code].userData[i].os in obj.os ) {
        obj.os[Storage.data.links[code].userData[i].os].val++;
      }
      else {
        obj.os[Storage.data.links[code].userData[i].os] = {val: 1, color: `${getColor()}`}
      }
    }

    res.status(200).send({userData: obj, linkData: Storage.data.links[code]} );
  }
  else res.redirect('https://shortify-iammonis.vercel.app/404');
}