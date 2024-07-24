import mongoose, { Document } from "mongoose";
const validator = require("validator");

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  ctc: {
    variable: number;
    fixed: number;
  };
  gender: string;
  hiredOn: string;

  terminatedOn: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: number;
  };
  country: string;
  monthlyCompensation: number;
  trainingCompletion: boolean;
  trainingCost: number;
  trainingHrs: number;
  trainingPrograms: string[];
  department: string;
  age: number;
  role: string;
  satisfactionScore: number;
  ethnicity: string;
  inManagement: boolean;
  tenure: number;
  rating: number;
}
const schemaDefinition: EmployeeSchemaDefinition = {
  firstName: {
    type: String,
    required: [true, "Please enter employee first name"],
    minlength: [3, "firstName must be at least 3 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter employee last name"],
    minlength: [3, "lastName must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter employee email"],
    unique: true,
    validate: [validator.isEmail, "Invalid email format!"],
  },
  ctc: {
    type: Map,
    of: Number,
    required: [true, "Please enter employee CTC"],
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: [true, "Please enter employee Gender"],
  },
  hiredOn: {
    type: String,
    required: true,
  },

  terminatedOn: {
    type: String,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
  },
  country: {
    type: String,
    required: [true, "Please enter country name"],
  },
  monthlyCompensation: {
    type: Number,
    required: [true, "Please enter monthly compensation"],
  },
  trainingCompletion: {
    type: Boolean,
    required: true,
  },
  trainingCost: {
    type: Number,
    required: true,
  },
  trainingHrs: {
    type: Number,
    required: true,
  },
  trainingPrograms: {
    type: [String],
    required: true,
  },
  department: {
    type: String,
    required: [true, "Please enter employee Department"],
  },
  age: {
    type: Number,
    required: true,
    min: 21,
    max: 65,
  },
  role: {
    type: String,
    required: true,
  },
  satisfactionScore: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
  ethnicity: {
    type: String,
    required: [true, "Please specify the ethnicity of employee"],
  },
  inManagement: {
    type: Boolean,
    required: true,
    default: false,
  },
  tenure: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },
};
type EmployeeSchemaDefinition = mongoose.SchemaDefinition<IEmployee>;

type EmployeeDocument = Document<IEmployee>;
type EmployeeModel = mongoose.Model<EmployeeDocument>;

const schema = new mongoose.Schema<EmployeeDocument, EmployeeModel>(
  schemaDefinition
);
const Employee =
  mongoose.models.Employee || mongoose.model<IEmployee>("Employee", schema);
export default Employee;
