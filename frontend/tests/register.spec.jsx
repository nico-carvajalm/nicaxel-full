
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Register from "../src/pages/register";

describe("Register", () => {
  function renderWithRouter() {
    return render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  }

  it("muestra error si las contraseñas no coinciden", async () => {
    renderWithRouter();

    await userEvent.type(screen.getByLabelText(/correo electrónico\*/i), "nico@test.com");
    await userEvent.type(screen.getByLabelText(/^contraseña\*$/i), "abc12345");
    await userEvent.type(screen.getByLabelText(/^repetir contraseña\*$/i), "abc12346");
    await userEvent.click(screen.getByRole("button", { name: /registrar/i }));
    expect(screen.getByText(/no coinciden/i)).toBeInTheDocument();
  });
});
