import { connectToDB } from "../../../../../utils/database";
import { NextResponse } from "next/server";
import Employee from "../../../../../models/employee";

export async function POST(request: Request) {
  await connectToDB();
  try {
    const body = await request.json();
    const { email } = body;
    // let's check if the user already exists, if that's case we don't want to create a duplicate user
    const user = await Employee.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const newEmployee = new Employee(body);

    const savedEmployee = await newEmployee.save();

    // hash the password, you don't want to save it as a plain text

    return NextResponse.json(
      {
        message: "Employee Detail added successfully",
        success: true,
        savedEmployee,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
