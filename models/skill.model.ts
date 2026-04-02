import{model, models,Schema} from "mongoose";

export interface ISkill{
    _id?: string;
    skillCategory: string;
   skillName:string;
   image:string;
   imagePublicId?:string;
   priority:number;
}

const skillSchema = new Schema<ISkill>({
    skillCategory: {
        type: String,
        required: true,
        trim: true
    },
    skillName: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    imagePublicId: {
        type: String,
        trim: true
    },
    priority: {
        type: Number,
        required: true,
        trim: true
    },
},{timestamps:true})

const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export default Skill;

