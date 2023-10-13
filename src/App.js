import { ListZellerCustomers } from "./queries";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { useState, useEffect } from "react"
import { Wrapper, UserTypeLabel, UserListAlpha, UserListLabel, UserListWrap } from './styledComponents'
Amplify.configure(awsconfig);

const userRoles = [
  { name: "ADMIN", id: "ADMIN", value: "ADMIN", label: "Admin" },
  { name: "MANAGER", id: "MANAGER", value: "MANAGER", label: "Manager" },
];

function formatTitleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

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
