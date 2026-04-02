import {model, models,Schema} from "mongoose";

export interface IAbout{
    _id?: string;
    description: string;
    
}

const aboutSchema = new Schema<IAbout>({

    description: {
        type: String,
        required: true,
        trim: true
    },
    
},{timestamps:true})

const About = models.About || model<IAbout>("About", aboutSchema);

export default About;
