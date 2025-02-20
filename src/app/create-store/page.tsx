import CreateStoreForm from "./CreateStore";
export const metadata = {
  title: "Create Your Own Store",
  description: "Browse through our amazing products and find what you love!",
};
const CreateStorePage = () => {
  return (
    <>
      <CreateStoreForm />
    </>
  );
};

export default CreateStorePage;
