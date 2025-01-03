import mongoose, { Schema, model, Document } from 'mongoose';

export interface IAuth {
  name?: string;
  email: string;
  pwdHash?: string;
  password?: string;
  profile?: string;
  age?: string;
};

interface AuthModel extends Document {
  name: string;
  email: unknown;
  pwdHash: string;
  role: string;
  profile: string;
  deleted_at: boolean;
  deleteSoft(): Promise<void>;
};

const AuthSchema = new Schema<AuthModel>({
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
  role: { 
    type: String, 
    default: 'admin'
  },
  profile: {
    type: String,
    default: null
  },
  deleted_at: {
    type: Boolean,
    default: false
  }
},{ timestamps: true });

AuthSchema.pre('find', function () {
  this.where({deleted_at: false});
});

AuthSchema.pre('findOne', function () {
  this.where({deleted_at: false});
});

AuthSchema.pre(/exists/, function (this: any) {
  this.where({deleted_at: false});
});

AuthSchema.methods.deleteSoft = async function (): Promise<void> {
  this.deleted_at = true;
  await this.save();
};

const Auth = model<AuthModel>('Admin', AuthSchema);

export default Auth;