"use client";
import React, { useContext, useCallback, useEffect } from "react";
import { GlobalContext } from "../../../../../../../providers/GlobalProvider";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";
import Dropdown from "@/app/components/Dropdown";
import { useForm } from "react-hook-form";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./index.module.scss";
import { Button } from "@/app/components/Button";
import MultiAutocomplete from "@/app/components/MultiAutocomplete";
import {
  countryOptions,
  departmentOptions,
  ethnicityOptions,
  genderOptions,
  yesOrNoOptions,
} from "./constants";
import { inRangeValidator } from "../../../../../../../utils";

type EmployeeFormProps = {
  task: string;
};

type EmployeeDetailFormData = {
  firstName: string;
  lastName: string;
  ethnicity: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  country: string;
  department: string;
  monthlyCompensation: number;
  inManagement: boolean;
  hiredOn: string;
  terminatedOn: string;
};

const Options = [
  {
    label: "shreya",
    id: "shree",
    name: "shreya",
  },
  {
    label: "akshi",
    id: "aks",
    name: "akshi",
  },
  {
    label: "vibhu",
    id: "vib",
    name: "vibhu",
  },
  {
    label: "nidhi",
    id: "nids",
    name: "sisds",
  },
  {
    label: "anu",
    id: "arc",
    name: "archu",
  },
  {
    label: "sanjay",
    id: "san",
    name: "shan",
  },
];

const EmployeeForm = ({ task }: EmployeeFormProps) => {
  const {
    employeeDetail,
    setEmployeeDetail,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const employeeDetailSchema = z.object({
    firstName: z.string().min(6, { message: "First Name is required" }),
    lastName: z.string().min(6, { message: "Last Name is required" }),
    email: z
      .string()
      .min(9, { message: "Email is required" })
      .email("Invalid email address"),
    ethnicity: z.string().min(3, { message: "Ethnicity is required" }),
    age: z.number().int().refine(inRangeValidator(21, 65), {
      message: "Age must be a number between 21 and 65",
    }),
    gender: z.string().min(3, { message: "Gender is required" }),
    address: z.string().min(10, { message: "Address is required" }),
    country: z.string().min(3, { message: "Country is required" }),
    fixedCtc: z.number().int(),
    variableCtc: z.number().int(),
    department: z
      .string()
      .min(5, { message: "Employee's Department is required" }),
    monthlyCompensation: z.number().int(),
    role: z.string().min(5, { message: "Role is required" }),
    inManagement: z.boolean({
      required_error: "inManagement is required",
      invalid_type_error: "inManagement must be a boolean",
    }),
    hiredOn: z.string().min(5, { message: "Hiring date is required" }),
    terminatedOn: z.string(),
    trainingCost: z.number().int(),
    trainingHrs: z.number().int().refine(inRangeValidator(0, 60), {
      message: "Training hours must be a number between 0 and 60",
    }),
    rating: z.number().int().refine(inRangeValidator(1, 5), {
      message: "Rating must be a number between 1 to 5",
    }),
    tenure: z.number().int(),
    satisfactionScore: z.number().int().refine(inRangeValidator(1, 5), {
      message: "Satisfaction score must be a number between 1 to 5",
    }),
    trainingCompleted: z.boolean({
      invalid_type_error: "training completed must be a boolean",
    }),
    trainingPrograms: z.string().array(),
  });

  type ValidationEmployeeDetailSchema = z.infer<typeof employeeDetailSchema>;
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isLoading },
  } = useForm<ValidationEmployeeDetailSchema>({
    resolver: zodResolver(employeeDetailSchema),
  });

  console.log("form state", employeeDetail);

  const onSubmit = useCallback(async (data: EmployeeDetailFormData) => {
    console.log("data", data);
    setComponentLevelLoader({ loading: true, id: "" });
    try {
      //   const { data, status } = await axios.post(
      //     "/api/admin/employees/add",
      //     employeeDetail
      //   );
      //   console.log("response", data, status);
      //   if (status === 200) {
      //     router.push(`/admin`);
      //     setComponentLevelLoader({ loading: false, id: "" });
      //   }
    } catch (error) {
      console.log(error);
    } finally {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }, []);

  useEffect(() => {
    if (task === "edit") {
      setValue("firstName", "tashu upadhyaya");
      setEmployeeDetail({
        firstName: "",
        lastName: "",
        email: "",
        variableCtc: 0,
        fixedCtc: 0,
        gender: "",
        hiredOn: "",
        terminatedOn: "",
        address: "",
        country: "",
        monthlyCompensation: 0,
        trainingCompleted: false,
        trainingCost: 0,
        trainingHrs: 0,
        trainingPrograms: [""],
        department: "",
        age: 0,
        role: "",
        satisfactionScore: 0,
        ethnicity: "",
        inManagement: false,
        tenure: 0,
        rating: 0,
      });
    }
  }, []);

  return (
    <div className={styles.employeeDetailFormContainer}>
      <h3 className={styles.employeeFormHeading}>
        {task.toUpperCase()} EMPLOYEE DETAIL
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.details}>
          <div className={styles.detailsContainer}>
            <div className={styles.detailsWrapper}>
              <Input
                name="firstName"
                label="First Name"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  console.log("target", target.value);
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    firstName: target.value,
                  }));
                }}
                value={employeeDetail.firstName}
                required
                register={register}
                error={errors.firstName}
                minLength={5}
                type="text"
              />
              <Input
                name="lastName"
                label="Last Name"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    lastName: target.value,
                  }));
                }}
                value={employeeDetail.lastName}
                required
                register={register}
                error={errors.lastName}
                minLength={5}
                type="text"
              />
              <Input
                name="email"
                label="Email"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    email: target.value,
                  }));
                }}
                value={employeeDetail.email}
                required
                register={register}
                error={errors.email}
                minLength={10}
                type="text"
              />
              <div>
                <Dropdown
                  selected={employeeDetail.ethnicity}
                  freeSolo={true}
                  label="ethnicity"
                  placeholder="Select the Ethnic Group"
                  items={ethnicityOptions.map(({ id, label, name }) => ({
                    id,
                    label,
                    name,
                  }))}
                  required={true}
                  setSelected={(eth) => {
                    setEmployeeDetail((prev) => ({ ...prev, ethnicity: eth }));
                  }}
                />
              </div>
              <Input
                name="age"
                label="Age"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    age: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.age}
                required
                register={register}
                error={errors.age}
                minLength={5}
                type="number"
              />
              <div>
                <Dropdown
                  selected={employeeDetail.gender}
                  label="gender"
                  items={genderOptions}
                  required={true}
                  placeholder="Select Gender"
                  setSelected={(gen) => {
                    setEmployeeDetail((prev) => ({ ...prev, gender: gen }));
                  }}
                />
              </div>
              <Input
                name="address"
                label="Address"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    address: target.value,
                  }));
                }}
                value={employeeDetail.address}
                required
                register={register}
                error={errors.address}
                minLength={5}
                type="text"
              />
              <div>
                <Dropdown
                  selected={employeeDetail.country}
                  freeSolo={true}
                  label="country"
                  placeholder="Select the Country"
                  items={countryOptions.map((ele) => ({
                    id: ele,
                    label: ele,
                    name: ele,
                  }))}
                  required={true}
                  setSelected={(c) => {
                    setEmployeeDetail((prev) => ({ ...prev, country: c }));
                  }}
                />
              </div>
              <Input
                name="variableCtc"
                label="Variable CTC"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    variableCtc: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.variableCtc}
                required
                register={register}
                error={errors.variableCtc}
                type="number"
              />
              <Input
                name="fixedCtc"
                label="Fixed CTC"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    fixedCtc: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.fixedCtc}
                required
                register={register}
                error={errors.fixedCtc}
                type="number"
              />
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.detailsWrapper}>
              <div>
                <Dropdown
                  selected={employeeDetail.department}
                  freeSolo={true}
                  label="department"
                  placeholder="Select the Department"
                  items={departmentOptions.map((ele) => ({
                    id: ele,
                    label: ele,
                    name: ele,
                  }))}
                  required={true}
                  setSelected={(c) => {
                    setEmployeeDetail((prev) => ({ ...prev, department: c }));
                  }}
                />
              </div>
              <Input
                name="monthlyCompensation"
                label="Monthly Compensation"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    monthlyCompensation: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.monthlyCompensation}
                required
                register={register}
                error={errors.monthlyCompensation}
                type="number"
              />
              <Input
                name="role"
                label="Role"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    role: target.value,
                  }));
                }}
                value={employeeDetail.role}
                required
                register={register}
                error={errors.role}
                type="text"
              />
              <div>
                <Dropdown
                  selected={employeeDetail.inManagement ? "Yes" : "No"}
                  label="management"
                  placeholder="Select in Management or Not"
                  items={yesOrNoOptions}
                  required={true}
                  setSelected={(c) => {
                    console.log("in management", c === "Yes");
                    setEmployeeDetail((prev) => ({
                      ...prev,
                      inManagement: c === "Yes",
                    }));
                  }}
                />
              </div>
              <Input
                name="hiredOn"
                label="Hired On"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    hiredOn: target.value,
                  }));
                }}
                value={employeeDetail.hiredOn}
                required
                register={register}
                error={errors.hiredOn}
                type="date"
              />
              <Input
                name="terminatedOn"
                label="Terminated On"
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    terminatedOn: target.value,
                  }));
                }}
                value={employeeDetail.terminatedOn}
                required
                register={register}
                error={errors.terminatedOn}
                type="date"
              />
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.detailsWrapper}>
              <Input
                name="trainingCost"
                label="Training Cost"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    trainingCost: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.trainingCost}
                required
                register={register}
                error={errors.trainingCost}
                type="number"
              />
              <Input
                name="trainingHrs"
                label="Training Hours"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    trainingHrs: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.trainingHrs}
                required
                register={register}
                error={errors.trainingHrs}
                type="number"
              />
              <Input
                name="tenure"
                label="Tenure"
                placeholder="Tenure in months"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    tenure: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.tenure}
                required
                register={register}
                error={errors.tenure}
                type="number"
              />
              <Input
                name="rating"
                label="Rating"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    rating: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.rating}
                required
                register={register}
                error={errors.rating}
                type="number"
              />
              <Input
                name="satisfactionScore"
                label="Satisfaction Score"
                valueAsNumber={true}
                handleChange={(e) => {
                  const target = e.target as HTMLInputElement; //used assertions
                  setEmployeeDetail((prev) => ({
                    ...prev,
                    satisfactionScore: target.valueAsNumber,
                  }));
                }}
                value={employeeDetail.satisfactionScore}
                required
                register={register}
                error={errors.satisfactionScore}
                type="number"
              />
              <div>
                <Dropdown
                  selected={employeeDetail.trainingCompleted ? "Yes" : "No"}
                  label="Training Completed"
                  placeholder="Select Training completed or Not"
                  items={yesOrNoOptions}
                  required={true}
                  setSelected={(c) => {
                    setEmployeeDetail((prev) => ({
                      ...prev,
                      trainingCompleted: c === "Yes",
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.searchWrapper}>
            <MultiAutocomplete
              renderInput={(params: object) => (
                <input {...params} placeholder="Training" />
              )}
              options={Options}
            />
          </div>
        </div>
        <div className={styles.details}>
          <Button disabled={isLoading} type="submit" appearance="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
