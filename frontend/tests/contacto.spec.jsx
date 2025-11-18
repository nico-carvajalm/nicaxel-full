
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contacto from "../src/pages/contacto";

describe("Contacto", () => {
  it("actualiza el contador de caracteres al escribir", async () => {
    render(<Contacto />);

    const area = screen.getByRole("textbox", { name: /mensaje/i });
    await userEvent.type(area, "hola nico"); 

    expect(screen.getByText(/191\s*caracteres\s*restantes/i)).toBeInTheDocument();
  });

  it("muestra errores si se envía con campos vacíos", async () => {
    render(<Contacto />);

    const boton = screen.getByRole("button", { name: /enviar/i });
    await userEvent.click(boton);

    expect(
      screen.getByText(/Debes ingresar tu nombre y al menos un apellido\./i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Ingresa un correo válido\./i)).toBeInTheDocument();

    expect(screen.getByText(/El mensaje no puede estar vacío\./i)).toBeInTheDocument();
  });
});
