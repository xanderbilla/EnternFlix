import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export default async function handler(request) {
  try {
    if (request.method !== "POST") {
      return new NextResponse("Method not allowed", {
        status: 405,
      });
    }

    const { email, password, username } = await request.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists", {
        status: 422,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Increased the cost factor

    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        username,
        image,
        emailVerified: new Date(),
      },
    });

    return new NextResponse("User has been created", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
