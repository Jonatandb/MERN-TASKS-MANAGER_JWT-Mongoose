import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js"

export default function authRequired (req, res, next) {

  const { token } = req.cookies

  if(!token)
    return res.status(401).json({ message: 'No token, authorization required' })

  jwt.verify(token, TOKEN_SECRET, (err, decodedTokenData) => {
    if(err)
      return res.status(403).json({ message: 'Invalid token'})

    req.user = decodedTokenData;
    next()
  })

}
