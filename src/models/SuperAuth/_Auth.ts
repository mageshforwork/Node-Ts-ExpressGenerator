import mongoose, { Schema, model, Document } from 'mongoose';

export interface IAuth {
  name?: string;
  email: string;
  pwdHash?: string;
  password?: string;
};

interface AuthModel extends Document {
  name: string;
  email: unknown;
  pwdHash: string;
  role: string;
  profile: string;
  deleted_at: boolean;
};

const AuthSchema = new Schema<AuthModel>({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: {
      value: true,
      message: 'Email already exists.'
    },
  },
  pwdHash: { 
    type: String, 
    required: true
  },
  role: { 
    type: String, 
    default: 'admin'
  },
  profile: { type: String },
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

const Auth = model<AuthModel>('Admin', AuthSchema);

export default Auth;