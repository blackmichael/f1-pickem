import React from "react";
import { render, screen } from "@testing-library/react";
import ThemedApp from "./App";

test("renders learn react link", () => {
  render(<ThemedApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
