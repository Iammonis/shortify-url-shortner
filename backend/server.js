import express from "express";
import cors from "cors";
import useragent from "express-useragent";
import { Storage } from "./src/data/Storage.js";
import { cutURL } from "./src/cutURL.js";
import { redirect } from "./src/redirect.js";
import { getStats } from "./src/getStats.js";

const app = express();

const PORT = process.env.PORT || 1234;

if (Storage && !Storage.data.links) {
  Storage.data.links = {};
  Storage.write();
}

app.use(cors());

app.use(express.json());

app.use(useragent.express())

app.post("/cut", cutURL);

app.get("/stats/:code", getStats);

app.get("/:code", redirect);

app.listen(PORT, () => {
  console.log("listening on "+ PORT);
});
