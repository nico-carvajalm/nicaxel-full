
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/pages/Home";

describe("Home (smoke)", () => {
  it("renderiza sin explotar", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
});
