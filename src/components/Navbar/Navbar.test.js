import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar.js";
describe("Testing the navbar component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  test("Nav bar should be on page", () => {
    const linkNav = screen.getByRole("navigation");
    expect(linkNav).toBeInTheDocument();
  });
  test("Links should be on page", () => {
    const linkA = screen.getAllByRole("link");
    linkA.forEach((link) => expect(link).toBeInTheDocument());
  });
  test("Svg logo should be on page", () => {
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });
});
