import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  user: mongoose.Types.ObjectId;
  key: string;
  url: string;
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  key: { type: String, required: true },
  url: { type: String, required: true }
});

export default mongoose.model<ISong>('Song', SongSchema);
