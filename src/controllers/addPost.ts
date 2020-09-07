import { Request, Response } from 'express'
import Post from '../models/Post'

/**
 * Add post.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export async function addPost(req: Request, res: Response): Promise<void> {
  try {
    const post = new Post({ ...req.body, user: req.params.id })
    await post.save()
    res.json({ data: await Post.populate(post, { path: 'user', model: 'User', select: 'username' }) })
  }
  catch(e) {
    res.json({ errors: [e] })
  }
}
