import request from 'supertest'
import { app } from './server'
import db from './db'

process.env.NODE_ENV = 'test'
process.env.SECRET = 'Konan'

beforeAll(() => {
  db()
})

const konan = {
  username: 'Konan',
  password: '123PassWor!',
  email: 'konan@naruto.io'
}
let konanToken: string
let konanPostId: string

test('GET / not fount', async () => {
  const { statusCode } = await request(app).get('/')

  expect(statusCode).toBe(404)
})

test('POST /users', async () => {
  const { text, statusCode } = await request(app)
    .post('/users')
    .send(konan)

  expect(statusCode).toBe(200)
  expect(/^\{"token":".+"\}$/.test(text)).toBeTruthy()
})

test('POST /token', async () => {
  const { text, statusCode } = await request(app)
    .post('/token')
    .send(konan)

  expect(statusCode).toBe(200)
  expect(/^\{"token":".+"\}$/.test(text)).toBeTruthy()

  const { token } = JSON.parse(text)
  konanToken = token
})

test('GET /users/me without token', async () => {
  const { text, statusCode } = await request(app)
    .get('/users/me')

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Missing token"]}')
})

test('GET /users/me bad token', async () => {
  const { text, statusCode } = await request(app)
    .get('/users/me')
    .set({ Authorization: 'Bad token' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Invalid token"]}')
})

test('GET /users/me', async () => {
  const { text, statusCode } = await request(app)
    .get('/users/me')
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)

  const obj = JSON.parse(text)
  const { _id, __v, createdAt, updatedAt, ...user } = obj.data

  expect(_id).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(user).toEqual({
    email: 'konan@naruto.io',
    username: 'Konan',
  }
)
})

test('GET /posts without token', async () => {
  const { text, statusCode } = await request(app)
    .get('/posts')

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Missing token"]}')
})

test('GET /posts bad token', async () => {
  const { text, statusCode } = await request(app)
    .get('/posts')
    .set({ Authorization: 'Bad token' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Invalid token"]}')
})

test('GET /posts', async () => {
  const { text, statusCode } = await request(app)
    .get('/posts')
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)
  expect(JSON.parse(text)).toEqual({ data: [] })
})

test('POST /posts without token', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts')
    .send({ image: '/image', title: 'Akatsuki', content: 'Description' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Missing token"]}')
})

test('POST /posts bad token', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts')
    .send({ image: '/image', title: 'Akatsuki', content: 'Description' })
    .set({ Authorization: 'Bad token' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Invalid token"]}')
})

test('POST /posts', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts')
    .send({ image: '/image', title: 'Akatsuki', content: 'Description' })
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)
  const { data } = JSON.parse(text)
  var { _id, __v, createdAt, updatedAt, user, ...obj } = data
  expect(_id).toBeTruthy()
  expect(Number.isInteger(__v)).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(obj).toEqual({ image: '/image', title: 'Akatsuki', content: 'Description' })
  var { _id, ...obj } = user
  expect(obj).toEqual({ username: 'Konan' })
})

test('GET /posts arr', async () => {
  const { text, statusCode } = await request(app)
    .get('/posts')
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)

  const { data } = JSON.parse(text)
  expect(data.length).toBe(1)

  const [post] = data
  var { _id, __v, user, createdAt, updatedAt, ...current } = post

  expect(_id).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(current).toEqual({
    content: 'Description',
    image: '/image',
    title: 'Akatsuki'
  })

  konanPostId = _id

  var { _id, ...obj } = user
  expect(obj).toEqual({ username: 'Konan' })

})

test('GET /posts arr with offset 0', async () => {
  const { text, statusCode } = await request(app)
    .get('/posts/0')
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)

  const { data } = JSON.parse(text)
  expect(data.length).toBe(1)

  const [post] = data
  var { _id, __v, user, createdAt, updatedAt, ...current } = post

  expect(_id).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(current).toEqual({
    content: 'Description',
    image: '/image',
    title: 'Akatsuki'
  })

  konanPostId = _id

  var { _id, ...obj } = user
  expect(obj).toEqual({ username: 'Konan' })
})

test('GET /posts with offset 1 length 0', async () => {
  const { text, statusCode } = await request(app)
    .get('/posts/1')
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)
  expect(text).toBe('{"data":[]}')
})

test('POST /posts/filter without token', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts/filter')
    .send({ title: 'Akatsuki', content: 'Description' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Missing token"]}')
})

test('POST /posts/filter bad token', async () => {
  const { text, statusCode } = await request(app)
    .post(`/posts/filter`)
    .send({ title: 'Akatsuki', content: 'Description' })
    .set({ Authorization: 'Bad token' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Invalid token"]}')
})

test('POST /posts/filter arr with 2 terms', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts/filter')
    .send({ title: 'Akatsuki', content: 'Description' })
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)

  const { data } = JSON.parse(text)

  expect(data.length).toBe(1)

  const [post] = data
  var { _id, __v, user, createdAt, updatedAt, ...current } = post

  expect(_id).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(current).toEqual({
    content: 'Description',
    image: '/image',
    title: 'Akatsuki'
  })

  konanPostId = _id

  var { _id, ...obj } = user
  expect(obj).toEqual({ username: 'Konan' })
})

test('POST /posts/filter arr with title', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts/filter')
    .send({ title: 'Akatsuki' })
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)

  const { data } = JSON.parse(text)

  expect(data.length).toBe(1)

  const [post] = data
  var { _id, __v, user, createdAt, updatedAt, ...current } = post

  expect(_id).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(current).toEqual({
    content: 'Description',
    image: '/image',
    title: 'Akatsuki'
  })

  konanPostId = _id

  var { _id, ...obj } = user
  expect(obj).toEqual({ username: 'Konan' })
})

test('POST /posts/filter arr with content', async () => {
  const { text, statusCode } = await request(app)
    .post('/posts/filter')
    .send({ content: 'Description' })
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)

  const { data } = JSON.parse(text)

  expect(data.length).toBe(1)

  const [post] = data
  var { _id, __v, user, createdAt, updatedAt, ...current } = post

  expect(_id).toBeTruthy()
  expect(createdAt).toBeTruthy()
  expect(updatedAt).toBeTruthy()
  expect(current).toEqual({
    content: 'Description',
    image: '/image',
    title: 'Akatsuki'
  })

  konanPostId = _id

  var { _id, ...obj } = user
  expect(obj).toEqual({ username: 'Konan' })
})

test('DELETE /posts/:postId bad post id', async () => {
  const { text, statusCode } = await request(app)
    .delete(`/posts/invalidValue`)
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)
  expect(JSON.parse(text)).toEqual({ errors: ['user id not exist'] })
})

test('DELETE /posts/:postId without token', async () => {
  const { text, statusCode } = await request(app)
    .delete(`/posts/${konanPostId}`)

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Missing token"]}')
})

test('DELETE /posts/:postId bad token', async () => {
  const { text, statusCode } = await request(app)
    .delete(`/posts/${konanPostId}`)
    .set({ Authorization: 'Bad token' })

  expect(statusCode).toBe(401)
  expect(text).toBe('{"errors":["Invalid token"]}')
})

test('DELETE /posts/:postId', async () => {
  const { text, statusCode } = await request(app)
    .delete(`/posts/${konanPostId}`)
    .set({ Authorization: konanToken })

  expect(statusCode).toBe(200)
  expect(JSON.parse(text)).toEqual({ data: {
    status: 'successful'
  } })
})

test('POST /images', async () => {
  const { text, statusCode } = await request(app)
    .post('/images')
    .set({ Authorization: konanToken })
    .attach('banner', 'images/unnamed.jpg')

  expect(statusCode).toBe(200)
  expect(/^\{\"data\":\"\/uploads\/.+\"\}$/.test(text)).toBeTruthy()
})