import { NextResponse } from "next/server";
import Employee from "../../../../../models/employee";
import { connectToDB } from "../../../../../utils/database";

export async function GET(req: Request) {
  await connectToDB();
  try {
    const employees = await Employee.find();
    console.log("hit");
    return NextResponse.json(
      {
        message: "Employees fetched successfully",
        employees,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in get all employees", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
