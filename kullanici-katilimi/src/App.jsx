import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [users, setUsers] = useState([]);
  const addUser = (user) => {
    setUsers([...users, user]);
  };
  return (
    <>
      <div className="user-container">Üye Sayfası</div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.first_name}
            {user.email}
          </li>
        ))}{" "}
      </ul>
      <div></div>
      <Form addUser={addUser} />
    </>
  );
}

export default App;
