"use client";
import React, { useContext } from "react";
import { GlobalContext } from "../../../../../../providers/GlobalProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddEmployee = ({ params }: { params: { slug: string } }) => {
  const {
    employeeDetail,
    setEmployeeDetail,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();
  // firstName: "",
  // lastName: "",
  // email: "",
  // ctc: {
  //   variable: 0,
  //   fixed: 0,
  // },
  // gender: "",
  // hiredOn: new Date(),
  // terminatedOn: new Date(),
  // address: {
  //   street: "",
  //   city: "",
  //   state: "",
  //   pincode: 0,
  // },
  // country: "",
  // monthlyCompensation: 0,
  // trainingCompletion: false,
  // trainingCost: 0,
  // trainingHrs: 0,
  // trainingPrograms: [""],
  // department: "",
  // age: 0,
  // role: "",
  // satisfactionScore: 0,
  // ethnicity: "",
  // inManagement: false,
  // tenure: 0,
  // rating: 0,

  //submit button should be disabled till all data infields is validated
  const onSubmit = async (e: React.SyntheticEvent) => {
    setComponentLevelLoader({ loading: true, id: "" });
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "/api/admin/employees/add",
        employeeDetail
      );
      console.log("response", data, status);
      if (status === 200) {
        router.push(`/admin`);
        setComponentLevelLoader({ loading: false, id: "" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };
  console.log("slug on page", params);
  return (
    <div>
      <h1>ADD EMPLOYEE DETAIL</h1>
      <label htmlFor={"firstName"}>FirstName</label>
      <input
        type={"text"}
        id={""}
        placeholder={"FirstName"}
        value={employeeDetail.firstName}
        onChange={(e) =>
          setEmployeeDetail({ ...employeeDetail, firstName: e.target.value })
        }
      />
      <label htmlFor={"lastName"}>LastName</label>
      <input
        type={"text"}
        id={"lastName"}
        placeholder={"LastName"}
        value={employeeDetail.lastName}
        onChange={(e) =>
          setEmployeeDetail({ ...employeeDetail, lastName: e.target.value })
        }
      />
      <label htmlFor={"email"}>Email</label>
      <input
        type={"email"}
        id={"email"}
        placeholder={"Email"}
        value={employeeDetail.email}
        onChange={(e) =>
          setEmployeeDetail({ ...employeeDetail, email: e.target.value })
        }
      />
      <label htmlFor={"variableCTC"}>Variable CTC</label>
      <input
        type="number"
        id={"variableCTC"}
        placeholder={"Variable CTC"}
        value={employeeDetail.ctc.variable}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            ctc: { ...employeeDetail.ctc, variable: Number(e.target.value) },
          })
        }
      />
      <label htmlFor={"fixedCTC"}>Fixed CTC</label>
      <input
        type="number"
        id={"fixedCTC"}
        placeholder={"Fixed CTC"}
        value={employeeDetail.ctc.fixed}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            ctc: { ...employeeDetail.ctc, fixed: Number(e.target.value) },
          })
        }
      />
      <label htmlFor={"gender"}>Gender</label>
      <input
        type="text"
        id={"gender"}
        placeholder={"Gender"}
        value={employeeDetail.gender}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            gender: e.target.value,
          })
        }
      />
      <label htmlFor={"hierdOn"}>Hired On</label>
      <input
        type={"date"}
        id={"hiredOn"}
        placeholder={"hiredOn"}
        value={employeeDetail.hiredOn}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            hiredOn: e.target.value,
          })
        }
      />
      <label htmlFor={"terminatedOn"}>terminated On</label>
      <input
        type={"date"}
        id={"terminatedOn"}
        placeholder={"terminatedOn"}
        value={employeeDetail.terminatedOn}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            terminatedOn: e.target.value,
          })
        }
      />

      <div style={{ display: "flex" }}>
        <label htmlFor={"city"}>City</label>
        <input
          type={"text"}
          id={"city"}
          placeholder={"City"}
          value={employeeDetail.address.city}
          onChange={(e) =>
            setEmployeeDetail({
              ...employeeDetail,
              address: { ...employeeDetail.address, city: e.target.value },
            })
          }
        />
        <label htmlFor={"street"}>street</label>
        <input
          type={"text"}
          id={"street"}
          placeholder={"street"}
          value={employeeDetail.address.street}
          onChange={(e) =>
            setEmployeeDetail({
              ...employeeDetail,
              address: { ...employeeDetail.address, street: e.target.value },
            })
          }
        />
        <label htmlFor={"state"}>state</label>
        <input
          type={"text"}
          id={"state"}
          placeholder={"state"}
          value={employeeDetail.address.state}
          onChange={(e) =>
            setEmployeeDetail({
              ...employeeDetail,
              address: { ...employeeDetail.address, state: e.target.value },
            })
          }
        />
        <label htmlFor={"pincode"}>pincode</label>
        <input
          type={"number"}
          id={"pincode"}
          placeholder={"pincode"}
          value={employeeDetail.address.pincode}
          onChange={(e) =>
            setEmployeeDetail({
              ...employeeDetail,
              address: {
                ...employeeDetail.address,
                pincode: Number(e.target.value),
              },
            })
          }
        />
      </div>

      <label htmlFor={"country"}>country</label>
      <input
        type={"text"}
        id={"country"}
        placeholder={"country"}
        value={employeeDetail.country}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            country: e.target.value,
          })
        }
      />
      <label htmlFor={"ethnicity"}>ethnicity</label>
      <input
        type={"text"}
        id={"ethnicity"}
        placeholder={"ethnicity"}
        value={employeeDetail.ethnicity}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            ethnicity: e.target.value,
          })
        }
      />
      <label htmlFor={"role"}>role</label>
      <input
        type={"text"}
        id={"role"}
        placeholder={"role"}
        value={employeeDetail.role}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            role: e.target.value,
          })
        }
      />
      <label htmlFor={"department"}>department</label>
      <input
        type={"text"}
        id={"department"}
        placeholder={"department"}
        value={employeeDetail.department}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            department: e.target.value,
          })
        }
      />
      <label htmlFor={"age"}>age</label>
      <input
        type={"number"}
        id={"age"}
        placeholder={"age"}
        value={employeeDetail.age}
        onChange={(e) =>
          setEmployeeDetail({
            ...employeeDetail,
            age: Number(e.target.value),
          })
        }
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default AddEmployee;
