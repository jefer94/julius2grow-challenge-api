import { Request, Response } from 'express'

// interface Req {
//   file: {
//     path: string
//   }
//   json(a: Record<string, unknown>)
// }

export interface MulterRequest {
  file: {
    path: string
  }
}

/**
 * Get user.
 *
 * @param req - Express request.
 * @param req - Express response.
 */
export async function uploadImage(req: Request | MulterRequest, res: Response): Promise<void> {
  if (req.file) res.json({ data: req.file.path.replace('public', '') })
  else res.json({ errors: ['missing file'] })
}