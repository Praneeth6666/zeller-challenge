import "./App.css";
import { ListZellerCustomers } from "./queries";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import styled from "styled-components";
import awsconfig from "./aws-exports";
import { useState } from "react";
Amplify.configure(awsconfig);

const {
  data: {
    listZellerCustomers: { items: items },
  },
} = await API.graphql(graphqlOperation(ListZellerCustomers));

const userTypes = [
  { name: "ADMIN", id: "ADMIN", value: "ADMIN", label: "Admin" },
  { name: "MANAGER", id: "MANAGER", value: "MANAGER", label: "Manager" },
];

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

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
  const handlechange = (e) => {
    const { name } = e.target;
    setSelectState(name);
  };

  const UserTypeSelect = ({ name, value, label }) => (
    <UserTypeLabel
      name={name}
      style={selectState !== name ? { backgroundColor: "white" } : {}}
    >
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handlechange}
        checked={value === selectState}
      />
      <span style={{ paddingLeft: "4px" }}>{label}</span>
    </UserTypeLabel>
  );

  const UserListItem = ({ name, role }) => (
    <>
      <UserListWrap>
        <UserListAlpha>{name[0]}</UserListAlpha>
        <UserListLabel>
          <div style={{ paddingBottom: "10px" }}> {name}</div>
          <div>{role}</div>
        </UserListLabel>
      </UserListWrap>
    </>
  );

  return (
    <div className="App">
      <h2>User Types</h2>
      {userTypes.map(({ name, id, value, label }) => (
        <UserTypeSelect name={name} value={value} label={label} key={id} />
      ))}
      <h2>{titleCase(selectState)} Users</h2>
      {items.map(({ id, name, role }) => {
        return (
          <div key={id}>
            {selectState == role ? (
              <UserListItem name={name} role={role} />
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
