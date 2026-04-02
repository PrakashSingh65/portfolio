import { model, models, Schema } from "mongoose";

export interface IIntro{
    _id?: string;
    name: string;
    description: string;
    techStack: string[];
    image: string;
    file: string;
    imagePublicId?: string;
    filePublicId?: string;
    
}

const userSchema= new Schema<IIntro>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    techStack:{
        type: [String],
        required: true,
        trim: true
    },
    image:{
        type: String,
        required: true,
        trim: true
    },
    file:{
        type: String,
        required: true,
        trim: true
    },
    imagePublicId:{
        type: String,
        trim: true
    },
    filePublicId:{
        type: String,
        trim: true
    },
   
},{timestamps:true})

const Intro = models.Intro || model<IIntro>("Intro", userSchema);

export default Intro;
