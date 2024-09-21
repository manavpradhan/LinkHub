export const sendToken = (user, status, res, type) => {
  const token = user.getJwtToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(status)
    .cookie("jwtToken", token, options)
    .json({
      success: true,
      message: type === "register" ? "registered" : "logged in",
      user,
      token,
    });
};
