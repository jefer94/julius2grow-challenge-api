import { Request, Response } from 'express'
import Post from '../models/Post'

/**
 * Fetch posts by user.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export async function filterPostsByUser(req: Request, res: Response): Promise<void> {
  const limit = 10
  const offset = +req.body.offset || 0

  res.json({ data: await Post.find({ $or: [{ user: req.params.id, title: new RegExp(req.body.title) },
                                           { user: req.params.id, content: new RegExp(req.body.content) }] })
    .populate({ path: 'user', model: 'User', select: 'username' })
    .limit(limit)
    .skip(offset * limit)
    .sort('createdAt')
    .lean() })
}
