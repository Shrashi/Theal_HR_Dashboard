import { connectToDB } from "../../../../../utils/database";
import EmployeesList from "./components/EmployeesList";
import axios from "axios";

const EmployeesPage = async () => {
  let data;
  try {
    const resp = await axios.get("http://localhost:3000/api/admin/employees");
    if (resp.status === 200) {
      console.log("fetched");
      data = resp.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log("data", data.employees);
  return (
    <div>
      <div>
        <EmployeesList initialData={data.employees} />
      </div>
    </div>
  );
};
export default EmployeesPage;
