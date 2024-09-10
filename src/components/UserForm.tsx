import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({
  createUser,
  userEdit,
  updateUser,
  setUserEdit,
  isCloseForm,
  setIsCloseForm,
}: {
  createUser: any;
  userEdit: any;
  updateUser: any;
  setUserEdit: any;
  isCloseForm: boolean;
  setIsCloseForm: any;
}) => {
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    reset(userEdit);
  }, [userEdit]);

  const submit = (data: any) => {
    if (userEdit) {
      console.log(data);
      updateUser("/users/", userEdit.id, {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        birthday: data.birthday,
        image_url:
          data.image_url ||
          "https://th.bing.com/th/id/OIP.Q89Ip1VWQmYrQ5k7jevA9wHaDV?w=1000&h=450&rs=1&pid=ImgDetMain",
      });
      setUserEdit();
    } else {
      createUser("/users/", {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        birthday: data.birthday,
        image_url:
          data.image_url ||
          "https://th.bing.com/th/id/OIP.Q89Ip1VWQmYrQ5k7jevA9wHaDV?w=1000&h=450&rs=1&pid=ImgDetMain",
      });
    }
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      image_url: "",
    });
    setIsCloseForm(true);
  };
  const handleCloseForm = () => {
    setIsCloseForm(true);
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      image_url: "",
    });
    setUserEdit();
  };
  return (
    <div
      className={`fixed top-0 left-0 w-screen min-h-screen  flex flex-col gap-2 place-content-center backdrop-blur-sm transition-all z-20 ${
        isCloseForm && "scale-0"
      }`}
    >
      <form
        className="max-w-96 w-3/5 min-w-40 mx-auto bg-gray-400 rounded-lg px-8 py-4 relative"
        onSubmit={handleSubmit(submit)}
      >
        <h2 className="text-center font-medium text-3xl">Create User</h2>
        <div
          onClick={handleCloseForm}
          className="absolute top-3 right-4 text-3xl text-gray-400 font-extrabold rounded-full bg-red-500 opacity-80 w-12 h-12 p-2 grid place-content-center text-center pb-4 cursor-pointer hover:brightness-125"
        >
          x
        </div>
        <label className="  flex flex-col gap-2 m-2 font-medium">
          <span className="pl-4">Email: </span>
          <input
            {...register("email")}
            className="p-1 border-1 rounded-md focus:outline-1 focus:outline-blue-100 border-black font-normal px-4"
            type="email"
            placeholder="..."
            required
          />
        </label>
        <label className="  flex flex-col gap-2 m-2 font-medium">
          <span className="pl-4">Password: </span>
          <input
            {...register("password")}
            className="p-1 border-1 rounded-md focus:outline-1 focus:outline-blue-100 border-black font-normal px-4"
            type="password"
            placeholder="..."
            required
          />
        </label>
        <label className="  flex flex-col gap-2 m-2 font-medium">
          <span className="pl-4">First Name:</span>
          <input
            {...register("first_name")}
            className="p-1 border-1 rounded-md focus:outline-1 focus:outline-blue-100 border-black font-normal px-4"
            type="text"
            placeholder="..."
            required
          />
        </label>
        <label className="  flex flex-col gap-2 m-2 font-medium">
          <span className="pl-4">Last Name:</span>
          <input
            {...register("last_name")}
            className="p-1 border-1 rounded-md focus:outline-1 focus:outline-blue-100 border-black font-normal px-4"
            type="text"
            placeholder="..."
            required
          />
        </label>
        <label className="  flex flex-col gap-2 m-2 font-medium">
          <span className="pl-4">Birthday:</span>
          <input
            {...register("birthday")}
            className="p-1 border-1 rounded-md focus:outline-1 focus:outline-blue-100 border-black text-blue-950 px-4 "
            type="date"
            required
          />
        </label>
        <label className="  flex flex-col gap-2 m-2 font-medium">
          <span className="pl-4">Image url:</span>
          <input
            {...register("image_url")}
            className="p-1 border-1 rounded-md focus:outline-1 focus:outline-blue-100 border-black font-normal px-4"
            type="text"
            min={200}
            placeholder="..."
          />
        </label>
        <button className="bg-blue-700 block w-2/3 mx-auto mt-4 rounded-lg hover:brightness-125 p-2 font-extrabold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
