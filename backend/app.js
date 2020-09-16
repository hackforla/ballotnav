const express = require("express");
const app = express();
const router = express.Router();

const port = 8080;

router.use(function (req, res) {
  console.log("/" + req.method);
 res.sendStatus(200);
});


router.get(function (req, res) {
    console.log("/" + req.method);
   res.send("👋Hi Developers!");
  });
  
  
router.get("/status", (req, res) =>{
    res.send("Operating");
});


app.use("/", router);

app.listen(port, function () {
  console.log("App listening on port 8080!");
});
