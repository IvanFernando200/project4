import { useEffect, useState } from "react";
import "./App.css";
import useCrud from "./hooks/useCrud";
import UserForm from "./components/UserForm";
import UserCard from "./components/UserCard";

function App() {
  const [userEdit, setUserEdit] = useState();
  const [isCloseForm, setIsCloseForm] = useState(true);

  const [
    users,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    hasError,
    isLoading,
  ] = useCrud("https://entregable2-user-crud-back.onrender.com");

  useEffect(() => {
    getUsers("/users/");
  }, []);

  const handleOpenForm = () => {
    setIsCloseForm(false);
  };

  return (
    <div className="mb-4">
      <h1 className="h-20 text-center font-extrabold text-4xl my-4 md:text-5xl">
        Users Crud
      </h1>
      <button
        onClick={handleOpenForm}
        className="bg-blue-600 opacity-80 py-2 px-6 rounded-md  font-medium hover:brightness-110 text-lg fixed right-6 top-16 pl-9 z-10"
      >
        <span className="font-extrabold text-3xl absolute left-3 bottom-2">
          +
        </span>
        Create new User
      </button>
      {hasError === true ? (
        <h2 className="fixed text-3xl text-gray-100 font-extrabold z-30 right-8 top-3 bg-red-900 p-1 rounded-md px-3">
          Error 🚫
        </h2>
      ) : (
        <></>
      )}
      {hasError === false ? (
        <h2 className="fixed text-3xl text-gray-100 font-extrabold z-30 right-10 top-3 bg-green-900 p-1 rounded-md px-3">
          Success✅
        </h2>
      ) : (
        <></>
      )}
      <UserForm
        createUser={createUser}
        userEdit={userEdit}
        updateUser={updateUser}
        setUserEdit={setUserEdit}
        isCloseForm={isCloseForm}
        setIsCloseForm={setIsCloseForm}
      />
      <div className="flex flex-wrap justify-evenly gap-8 mx-7 mt-0">
        {isLoading ? (
          <div className="mt-4">
            <img src="/loading.gif" alt="loading-gif" />
          </div>
        ) : (
          users?.map((user: any) => (
            <UserCard
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setUserEdit={setUserEdit}
              handleOpenForm={handleOpenForm}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
