import mongoose, { Document, Model, Schema } from "mongoose";

export type ActivityType =
  | "login"
  | "logout"
  | "download"
  | "preview"
  | "failed_login"
  | "page_view"
  | "password_reset"
  | "account_created"
  | "account_disabled"
  | "account_enabled";

export interface IActivity extends Document {
  _id:          mongoose.Types.ObjectId;
  employeeId:   string;         // string id (or "unknown" for failed logins)
  employeeName: string;
  type:         ActivityType;
  detail:       string;         // human-readable description
  resourceId:   string | null;  // for download/preview events
  ip:           string;
  device:       string;
  browser:      string;
  os:           string;
  sessionId:    string;
  createdAt:    Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    employeeId:   { type: String, required: true, index: true },
    employeeName: { type: String, required: true },
    type:         { type: String, required: true, index: true },
    detail:       { type: String, required: true },
    resourceId:   { type: String, default: null },
    ip:           { type: String, default: "unknown" },
    device:       { type: String, default: "unknown" },
    browser:      { type: String, default: "unknown" },
    os:           { type: String, default: "unknown" },
    sessionId:    { type: String, default: "" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // audit events are immutable
  }
);

// TTL: auto-delete events older than 90 days
ActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 7_776_000 });

export const Activity: Model<IActivity> =
  mongoose.models.Activity ?? mongoose.model<IActivity>("Activity", ActivitySchema);
