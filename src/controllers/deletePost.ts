import { Request, Response } from 'express'
import Post from '../models/Post'

/**
 * Delete post.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export async function deletePost(req: Request, res: Response): Promise<void> {
  const { deletedCount } = await Post.deleteOne({ _id: req.params.postId, user: req.params.id })
  res.json(deletedCount ? { data: { status: 'successful' } } : { errors: ['user id not exist'] })
}
