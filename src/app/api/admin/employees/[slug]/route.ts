import { connectToDB } from "../../../../../../utils/database";
import { NextResponse } from "next/server";
import Employee from "../../../../../../models/employee";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await connectToDB();
  try {
    console.log("params", params);
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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await connectToDB();
  try {
    console.log("params", params);
    if (!params.slug) {
      return new NextResponse("Employee Id is required", { status: 400 });
    }
    const employee = await Employee.findById(params.slug);
    return NextResponse.json(
      {
        message: "Employees fetched successfully",
        employee,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in fetching employee by id", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!params.slug) {
      return new NextResponse("Employee Id is required", { status: 400 });
    }
    const employeeById = await Employee.findById(params.slug);
    if (!employeeById) {
      return new NextResponse("Employee Not Found", { status: 403 });
    }

    const employee = await Employee.deleteMany({
      id: params.slug,
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.log("Error in deleting employee", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
