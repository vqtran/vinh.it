var index = exports = module.exports = {};

index.routes = {
   get: { action: "get", path: "/" }
};

index.get = function (req, res) {
   res.render("index");
};
