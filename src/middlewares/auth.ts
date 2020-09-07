import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const invalidToken = { errors: ['Invalid token'] }
const missingToken = { errors: ['Missing token'] }

/**
 * Get user.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export default async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authorization = req.headers['authorization']
  if (!authorization) {
    res.status(401)
    res.json(missingToken)
    return
  }
  const token = req.headers['authorization'].replace(/^Bearer (.+)$/, '$1')

  if (!token) {
    res.status(401)
    res.send(invalidToken)
    return
  }

  try {
    const obj: { id?: string } | string = jwt.verify(token, process.env.SECRET)
    if (typeof obj === 'string') {
      res.status(401)
      res.json(invalidToken)
      return
    }

    req.params.id = obj.id

    next()
  }
  catch {
    res.status(401)
    res.send(invalidToken)
    return
  }
}
