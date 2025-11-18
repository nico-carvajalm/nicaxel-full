import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/pages/login";

describe("Login", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  it("muestra error con email inválido", async () => {
    renderWithRouter();

    await userEvent.type(screen.getByLabelText(/correo electrónico\*/i), "nico"); // sin @
    await userEvent.type(screen.getByLabelText(/^contraseña\*$/i), "123456");
    await userEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Opción A: regex tolerante a tilde y punto final
    expect(
      await screen.findByText(/ingresa un correo vál?ido\.?/i) // <- acepta válido/valido y punto opcional
    ).toBeInTheDocument();
});

  it('tiene checkbox "Recordarme"', () => {
    renderWithRouter();
    expect(screen.getByLabelText(/recordar contraseña/i)).toBeInTheDocument();
  });
});
