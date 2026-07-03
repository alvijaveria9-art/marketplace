import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "data", "users.json");
    let users = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    if (users.some((u: any) => u.email === email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
