// import { useEffect } from "react";

const UserCard = ({
  user,
  deleteUser,
  setUserEdit,
  handleOpenForm,
}: {
  user: any;
  deleteUser: any;
  setUserEdit: any;
  handleOpenForm: any;
}) => {
  const handleDelete = () => {
    confirm(`Do you really wanna delete it?, to ${user.first_name} ${user.last_name}`) ? (
      deleteUser("/users/", user.id)
    ) : (
      <></>
    );
  };

  const handleEdit = () => {
    setUserEdit(user);
    handleOpenForm();
  };

  return (
    <article className="relative basis-72 flex-shrink h-72 bg-gray-300 px-5 rounded-lg shadow-md shadow-black">
      <header>
        <h2 className="text-center font-bold py-2 text-lg">
          {user.first_name} {user.last_name}
        </h2>
        <div className="h-32 bg-gray-700">
          <img
            className="object-cover h-full mx-auto"
            src={
              `${user.image_url}`.startsWith("https://")
                ? user.image_url
                : "/unknown-user.jpg"
            }
            alt={`${user.first_name} photo`}
          />
        </div>
      </header>
      <section>
        <ul>
          <li className="flex flex-col">
            <span className="block text-gray-500">Email: </span>
            <span className="block">{user.email}</span>
          </li>
          <li className="flex flex-col">
            <span className="block text-gray-500">Birthday: </span>
            <span className="block">🎁 {user.birthday}</span>
          </li>
        </ul>
      </section>
      <footer className="absolute right-3 bottom-3 w-20 flex justify-evenly">
        <button className="bg-red-600 p-1 rounded" onClick={handleDelete}>
          🗑️
        </button>
        <button className="bg-blue-500 p-1 rounded-md" onClick={handleEdit}>
          ✒️
        </button>
      </footer>
    </article>
  );
};

export default UserCard;
