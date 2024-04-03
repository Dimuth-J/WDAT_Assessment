import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    taskName: string;
    message: string;
    status: boolean;
    date: string;
}

const TaskSchema: Schema = new Schema({
    taskName: { type: String },
    message: { type: String },
    status: { type: Boolean },
    date: { type: String },
});

export default mongoose.model<ITask>('Task', TaskSchema);
