import EmployeeForm from "../components/EmployeeDetailForm";

const EmployeeDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  console.log("slug on page", params);

  return <EmployeeForm task={params.slug} />;
};

export default EmployeeDetailsPage;
