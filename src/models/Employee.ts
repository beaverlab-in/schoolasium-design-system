import mongoose, { Document, Model, Schema } from "mongoose";
import type { Role } from "@/lib/rbac";

export interface IEmployee extends Document {
  _id: mongoose.Types.ObjectId;
  name:         string;
  email:        string;
  passwordHash: string;
  role:         Role;
  department:   string;
  status:       "active" | "disabled";
  avatar:       string;         // initials e.g. "AK"
  createdBy:    string;         // employee id or "system"
  lastLogin:    Date | null;
  createdAt:    Date;
  updatedAt:    Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false }, // excluded from default queries
    role:         { type: String, enum: ["super_admin", "admin", "employee", "viewer"], required: true, default: "employee" },
    department:   { type: String, required: true, default: "Engineering" },
    status:       { type: String, enum: ["active", "disabled"], default: "active" },
    avatar:       { type: String, default: "" },   // initials
    createdBy:    { type: String, default: "system" },
    lastLogin:    { type: Date, default: null },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  }
);

// Derive avatar (initials) from name before saving
EmployeeSchema.pre("save", async function () {
  if (this.isModified("name") && !this.avatar) {
    const parts = (this.name as string).trim().split(/\s+/);
    this.avatar = (parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2)
    ).toUpperCase();
  }
});

// Safe public shape (no passwordHash)
EmployeeSchema.methods.toPublic = function () {
  return {
    id:         String(this._id),
    name:       this.name,
    email:      this.email,
    role:       this.role,
    department: this.department,
    status:     this.status,
    avatar:     this.avatar,
    createdBy:  this.createdBy,
    lastLogin:  this.lastLogin?.toISOString() ?? null,
    createdAt:  this.createdAt.toISOString(),
    updatedAt:  this.updatedAt.toISOString(),
  };
};

export const Employee: Model<IEmployee> =
  mongoose.models.Employee ?? mongoose.model<IEmployee>("Employee", EmployeeSchema);
