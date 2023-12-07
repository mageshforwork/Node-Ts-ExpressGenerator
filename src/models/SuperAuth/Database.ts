import mongoose, { Schema, model, Document } from 'mongoose';

export interface DatabaseModel extends Document {
  adminId: mongoose.Schema.Types.ObjectId;
  dbName: object;
  deleted_at: boolean;
};

const DatabaseSchema = new Schema<DatabaseModel>({
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin', 
    required: true 
  },
  dbName: { 
    type: String, 
    required: true, 
    unique: {
      value: true,
      message: 'Database name already exists.'
    },
  },
  deleted_at: {
    type: Boolean,
    default: false
  }
},{ timestamps: true });

const Database = model<DatabaseModel>('Database', DatabaseSchema);

export default Database;