import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Normalizar la extensión
    const originalName = (file as any).name || "image.png";
    const ext = path.extname(originalName) || ".png";
    const filename = `slide_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    // Seguridad: Evitar Directory Traversal restringiendo la carpeta
    if (!url.startsWith("/uploads/")) {
      return NextResponse.json({ error: "Ruta no autorizada" }, { status: 403 });
    }

    const filename = path.basename(url);
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    
    try {
      await fs.unlink(filePath);
      return NextResponse.json({ success: true, message: "Archivo eliminado correctamente" });
    } catch (err: any) {
      if (err.code === "ENOENT") {
        return NextResponse.json({ success: true, message: "El archivo no existía en el servidor" });
      }
      throw err;
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
