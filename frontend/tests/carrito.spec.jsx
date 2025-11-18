
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../src/pages/carrito";

describe("Carrito (smoke)", () => {
  it("renderiza sin explotar", () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );
    
  });
});
