import mongoose, { Schema, Document } from 'mongoose';

interface ITrashTask extends Document {
    taskName: string;
    message: string;
    status: boolean;
    date: string;
    archivedDate: String;
}

const TrashTaskSchema: Schema = new Schema({
    taskName: { type: String },
    message: { type: String },
    status: { type: Boolean },
    date: { type: String },
    archivedDate: { type: String },
});

export default mongoose.model<ITrashTask>('TrashTask', TrashTaskSchema);
