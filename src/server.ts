import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import multer  from 'multer'
import authMiddleware from './middlewares/auth'
import { getToken, addUser, getUser, fetchPostsByUser, filterPostsByUser, addPost, deletePost, uploadImage } from './controllers'

export const app = express()
app.use(express.static('public'));

var upload = multer({ dest: 'public/uploads/' })
const port = process.env.PORT || 9000

app
  .use(morgan('short'))
  .use(helmet())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(methodOverride())

app.post('/token',  getToken)
app.post('/users', addUser)
app.get('/users/me', authMiddleware, getUser)
app.get('/posts/:offset?', authMiddleware, fetchPostsByUser)
app.post('/posts', authMiddleware, addPost)
app.delete('/posts/:postId', authMiddleware, deletePost)
app.post('/posts/filter', authMiddleware, filterPostsByUser)
app.post('/images', authMiddleware, upload.single('banner'), uploadImage)

export function listen() {
  console.log(`Server ready in localhost:${port}`)
  app.listen(port)
}
