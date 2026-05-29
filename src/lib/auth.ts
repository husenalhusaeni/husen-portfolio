import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default-portfolio-jwt-secret-key";

export async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return false;

    const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin?: boolean };
    return !!decoded.isAdmin;
  } catch (error) {
    return false;
  }
}
