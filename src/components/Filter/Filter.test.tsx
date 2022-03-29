import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Filter from "./Filter";

it("onChange", () => {
  render(<Filter query="" sortDate={() => {}} />);
  const input = screen.getByTitle("check") as HTMLSelectElement;
  fireEvent.change(input, { target: { value: "asc" } });
  expect(input.value).toBe("asc");
});

it("should correctly display the correct number of options", () => {
  render(<Filter query="" sortDate={() => {}} />);
  expect(screen.getAllByRole("option").length).toBe(2);
});
