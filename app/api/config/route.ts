import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getConfig, saveConfig, SiteConfig } from "@/lib/config";

// No cachear: siempre devolver la config más reciente
export const dynamic = "force-dynamic";

const SESSION_TOKEN = "authenticated_session_token_navidad";

// GET público: cualquiera puede leer la configuración del sitio
export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

// POST protegido: solo el admin autenticado puede guardar
export async function POST(req: NextRequest) {
  const session = cookies().get("admin_session")?.value;
  if (session !== SESSION_TOKEN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Partial<SiteConfig>;
    const updated = await saveConfig(body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error al guardar la configuración" },
      { status: 500 }
    );
  }
}
