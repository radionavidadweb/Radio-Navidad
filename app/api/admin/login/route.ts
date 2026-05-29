import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USER;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUser || !expectedPassword) {
      return NextResponse.json(
        { error: "Servidor no configurado. Faltan variables de entorno." },
        { status: 500 }
      );
    }

    if (username === expectedUser && password === expectedPassword) {
      const response = NextResponse.json({ success: true });
      
      // Guardar cookie segura HttpOnly
      response.cookies.set("admin_session", "authenticated_session_token_navidad", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 día de sesión
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Credenciales incorrectas. Verificá los datos ingresados." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ocurrió un error al procesar el inicio de sesión." },
      { status: 500 }
    );
  }
}
