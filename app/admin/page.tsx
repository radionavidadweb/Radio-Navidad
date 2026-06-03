import { cookies } from "next/headers";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";

export const metadata = {
  title: "Panel Administrativo",
  description: "Acceso exclusivo para administradores de Radio Navidad.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  
  // Validamos si la cookie de sesión corresponde al token establecido en la API de login
  const isAuthenticated = sessionToken === "authenticated_session_token_navidad";

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return <AdminLogin />;
}
