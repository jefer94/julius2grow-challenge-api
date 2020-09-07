import { Request, Response } from 'express'
import Post from '../models/Post'

/**
 * Fetch posts by user.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export async function fetchPostsByUser(req: Request, res: Response): Promise<void> {
  const limit = 10
  const offset = +req.params.offset || 0
  res.json({
    data: await Post.find({ user: req.params.id })
      .populate({ path: 'user', model: 'User', select: 'username' })
      .limit(limit)
      .skip(offset * limit)
      .sort('createdAt')
      .lean()
  })
}
