const Router = require("express").Router;
const router = new Router();

const example = require("./model/example/router");
const account = require("./model/account/router");

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to backend API!" });
});

router.use("/account", account);
router.use("/example", example);

module.exports = router;
