import { ListZellerCustomers } from "./queries";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import styled from "styled-components";
import awsconfig from "./aws-exports";
import { useState, useEffect } from "react";
Amplify.configure(awsconfig);

const userRoles = [
  { name: "ADMIN", id: "ADMIN", value: "ADMIN", label: "Admin" },
  { name: "MANAGER", id: "MANAGER", value: "MANAGER", label: "Manager" },
];

function formatTitleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const Wrapper = styled.div`
  margin-left: 10%;
  font-family: sans-serif;
`;

const UserTypeLabel = styled.label`
  display: inline-block;
  margin: 2px;
  padding: 0.7em 1em;
  background-color: #f0f8ff;
  border-radius: 5px;
  width: 80%;
`;

const UserListAlpha = styled.div`
  padding: 15px 20px 15px 20px;
  background-color: #f0f8ff;
  color: #1e90ff;
  border-radius: 5px;
`;

const UserListLabel = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  padding-left: 1%;
`;

const UserListWrap = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  padding: 7px;
`;

function App() {
  const [selectState, setSelectState] = useState("ADMIN");
  const [users, setUsers] = useState([]);

  const handleUserRoleChange = (e) => {
    const { name } = e.target;
    setSelectState(name);
  };

  useEffect(() => {
    fetchZellerCustomers();
  }, []);

  async function fetchZellerCustomers() {
    try {
      const {
        data: {
          listZellerCustomers: { items: fetchedUsers },
        },
      } = await API.graphql(graphqlOperation(ListZellerCustomers));
      setUsers(fetchedUsers);
    } catch (err) {
      console.log("error fetching ListZellerCustomers");
    }
  }

  const UserRoleSelect = ({ name, value, label }) => (
    <UserTypeLabel
      name={name}
      style={selectState !== name ? { backgroundColor: "white" } : {}}
    >
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleUserRoleChange}
        checked={value === selectState}
      />
      <span style={{ paddingLeft: "4px" }}>{label}</span>
    </UserTypeLabel>
  );

  const UserListItem = ({ name, role }) => (
    <>
      {selectState == role ? (
        <UserListWrap>
          <UserListAlpha>{name[0]}</UserListAlpha>
          <UserListLabel>
            <div style={{ paddingBottom: "10px" }}> {name}</div>
            <div>{role}</div>
          </UserListLabel>
        </UserListWrap>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <Wrapper className="App">
      <h2>User Types</h2>
      {userRoles.map(({ name, id, value, label }) => (
        <UserRoleSelect name={name} value={value} label={label} key={id} />
      ))}
      <h2>{formatTitleCase(selectState)} Users</h2>
      {users.map(({ id, name, role }) => (
        <UserListItem name={name} role={role} key={id} />
      ))}
    </Wrapper>
  );
}

export default App;
