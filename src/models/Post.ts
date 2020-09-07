import { Document, Schema, model } from 'mongoose'

export type PostFields = {
  image: string
  title: string
  content: string
  user: string
}

export type PostDocument = Document & PostFields

const schema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { ref: 'Project', type: Schema.Types.ObjectId },
}, { timestamps: true })

function transform(): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
}

schema.method('transform', transform)

export default model<PostDocument>('Post', schema)
