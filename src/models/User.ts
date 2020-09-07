import { Document, Schema, model } from 'mongoose'

export type UserFields = {
  username: string
  email: string
  password: string
}

export type UserDocument = Document & UserFields

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true })

function transform(): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
}

schema.method('transform', transform)

export default model<UserDocument>('User', schema)
