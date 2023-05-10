exports.isUser = async (req, res, next) => {
  console.log(req.user.role + " middle");
  const user = await req.user.role;
  if (user == "true") {
    next();
  } else {
    return res.status(401).send("unauthorize");
  }
};

exports.isAdmin = async (req, res, next) => {
  const admin = await req.user.role;
  if (admin == "false") {
    next();
  } else {
    return res.status(401).send("unauthorized");
  }
};
