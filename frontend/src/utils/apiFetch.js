export async function apiFetch(url, options = {}) {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
  const token = usuario?.token;

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  // Agrega token si existe
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  // Si se venció/invalidó el token, cierra sesión
  if (res.status === 401) {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("usuarioLogueado"));
  }

  return res;
}
