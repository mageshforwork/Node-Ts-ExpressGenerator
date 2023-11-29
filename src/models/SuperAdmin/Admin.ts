import { Schema, model, Document } from 'mongoose';

// export enum UserRoles { Standard, Admin };

export interface IAdmin {
  name: string;
  email: string;
};

interface AdminModel extends Document {
  name: string;
  email: string;
  pwdHash?: string;
  // role?: UserRoles;
  deleted_at: boolean;
};

const AdminSchema = new Schema<AdminModel>({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  pwdHash: { 
    type: String, 
    required: true
  },
  deleted_at: {
    type: Boolean,
    default: false
  }
},{ timestamps: true });

const Admin = model<AdminModel>('Admin', AdminSchema);

export default Admin;