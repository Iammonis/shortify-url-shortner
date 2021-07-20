import { Storage } from './data/Storage.js';

export const cutURL = (req, res) => {
  const urlRegex = /^(https?:\/\/)?[\d\w]+\.[\w]+(\/.*)*/;
  const bodyURL = req.body.url;

  console.log(urlRegex.test(bodyURL))

  if (bodyURL === undefined || !urlRegex.test(bodyURL))
    return res.status(400).send("Bad request");

  const code = "aaaaa".replace(/a/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );

  Storage.data.links[code] = {
    url: req.body.url,
    code: code,
    views: 0,
    userData: []
  };
  Storage.write();
  
  res.status(200).send({
    code: code,
  });
};
