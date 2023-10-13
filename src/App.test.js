import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";
import { API } from "aws-amplify";

jest.mock("aws-amplify");

const mockResponse = {
  data: {
    listZellerCustomers: {
      items: [
        {
          email: "lynn@gmail.com",
          id: "f47813cf-0482-4326-afc9-12f53218ed06",
          name: "Lynn Warr",
          role: "MANAGER",
        },
        {
          email: "david@gmail.com",
          id: "73bae2af-4fa4-4023-8829-1034604e7590",
          name: "David Miller",
          role: "ADMIN",
        },
        // Add more data items as needed
      ],
    },
  },
};

API.graphql.mockResolvedValue(mockResponse);


describe("App Component", () => {
  // Helper function to render the component
  const renderApp = () => render(<App />);

  it("renders User Types and Users", async () => {
    await act(async () => {
      render(<App />);
    });


    expect(screen.getByText("User Types")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();

    // You can write similar assertions for other user types

    // Assert that "Admin Users" and a sample user are present
    expect(screen.getByText("Admin Users")).toBeInTheDocument();
    expect(screen.findByText("Manager Users")).resolves.toBeInTheDocument();
    
    // You can write similar assertions for other user roles
  });

  it("selects a user type and displays the correct users", async () => {
    await act(async () => {
      render(<App />);
    });
  
    // Click on the "Manager" user type
    const managerRadioInput = screen.getByLabelText("Manager");
    fireEvent.click(managerRadioInput);
  
    // Assert that "Manager" is selected
    expect(managerRadioInput.checked).toBe(true);
  
    // Wait for "Manager Users" to appear
    expect(await screen.findByText("Manager Users")).toBeInTheDocument();
  
  });
});
