import { Schema, model } from 'mongoose';

export interface Database {
  adminId: string;
  dbName: string;
  deleted_at: boolean;
};

const DatabaseSchema = new Schema<Database>({
  adminId: { 
    type: String, 
    required: true 
  },
  dbName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  deleted_at: {
    type: Boolean,
    default: false
  }
},{ timestamps: true });

export default model<Database>('Database', DatabaseSchema);