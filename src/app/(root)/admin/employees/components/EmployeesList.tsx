"use client";

import React from "react";
import { EmployeeDetail } from "../../../../../../providers/GlobalProvider";
import axios from "axios";

type EmployeeListProps = {
  initialData: EmployeeDetail[];
};

const EmployeesList = ({ initialData }: EmployeeListProps) => {
  console.log("data intially", Array.isArray(initialData));
  const fetchEmployeeById = async (id: string) => {
    try {
      const { data, status } = await axios.get(
        `http://localhost:3000/api/admin/employees/${id}`
      );
      if (status === 200) {
        console.log("data", data);
      }
    } catch (err) {
      console.log("error in employees list", err);
    }
  };

  const renderData = () => {
    let renderedData = initialData.map((emp: any) => (
      <div key={emp._id}>
        <div onClick={() => fetchEmployeeById(emp._id)}>{emp.firstName} </div>
      </div>
    ));
    return renderedData;
  };

  return <div>{renderData()}</div>;
};

export default EmployeesList;
