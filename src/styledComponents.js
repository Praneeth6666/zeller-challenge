import styled from "styled-components";

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

export { Wrapper, UserTypeLabel, UserListAlpha, UserListLabel, UserListWrap };