import Button from "@/app/components/Button";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div>
      <Link href="/admin/employees/add">Add</Link>
      <hr />
      <Link href="/admin/employees">Show Employees</Link>
    </div>
  );
};

export default AdminPage;
