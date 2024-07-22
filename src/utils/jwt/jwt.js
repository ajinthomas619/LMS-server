import jwt from 'jsonwebtoken'


  export const createAccessToken = (user, AccessTokensecretkey, Expiration) => {
    const token = jwt.sign({ user }, AccessTokensecretkey, {
      expiresIn: Expiration,
    });
    console.log("the token is",token)
    return token;
  };
 export const createRefreshToken = (user, RefreshTokensecretkey, Expiration) => {
    return jwt.sign({ user }, RefreshTokensecretkey, { expiresIn: Expiration });
  };

  export const clearAccessTokenFromCookie = (cookieName, res) => {
    res.cookie(cookieName, {
      httpOnly: false,
      secure: false,
      signed: false,
    });
  };

  export const decodeRefreshToken = (token) => {
    const refreshSecret = process.env.REFRESH_SECRET_KEY;
    let playload;
    return jwt.verify(token, refreshSecret, (err, decode) => {
      if (err) {
        console.log(err, Error);
        return { status: false, message: "error in jwt sign" };
      } else {
        playload = decode;
        console.log(playload, "decode playload");
        return {
          status: true,
          message: "refresh token decoded",
          data: playload,
        };
      }
    });
  };

  export const decodeAccessToken = (token) => {
    const accessSecret = process.env.ACCESS_SECRET_KEY;
    let playload;
    return jwt.verify(token, accessSecret, (err, decode) => {
      if (err) {
        return { status: false, message: `${err} error in jwt` };
      } else {
        playload = decode;
        return {
          status: true,
          message: "access token decoded",
          data: playload,
        };
      }
    });
  };

