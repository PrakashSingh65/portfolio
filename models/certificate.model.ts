import { model, models, Schema } from "mongoose";

export interface ICertificate {
  _id?: string;
  priority: number;
  imageUrl: string;
  imageUrlPublicId: string;
  image?: string;
  title?: string;
  issuer?: string;
  date?: string;
}

const certificateSchema = new Schema<ICertificate>(
  {
    priority: {
      type: Number,
      default: 0,
    },

    imageUrl: {
      type: String,
    },

    imageUrlPublicId: {
      type: String,
    },

    image: {
      type: String,
    },

    title: {
      type: String,
    },

    issuer: {
      type: String,
    },

    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Certificate =
  models.Certificate || model<ICertificate>("Certificate", certificateSchema);

export default Certificate;