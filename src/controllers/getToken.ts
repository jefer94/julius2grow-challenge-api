import { Request, Response } from 'express'
import { decrypt } from '@chocolab/password'
import jwt from 'jsonwebtoken'
import User from '../models/User'

/**
 * Get token.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export async function getToken(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findOne({ username: req.body.username }).lean()
    const payload = { id: user._id, email: user.email }
    if (!user._id) throw 'username not exist'
    if (!await decrypt(req.body.password, user.password)) throw 'incorrect password'
    const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: 3600
    });
    
		res.json({ token })
  }
  catch(e) {
    console.log(e)
    res.json({ errors: [e] })
  }
}
