import * as bcrypt from "bcrypt";
import * as cookie from "cookie";
import { p as prisma } from "../../../../chunks/prisma-d364973d.js";
import "@prisma/client";
const post = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  if (typeof username !== "string" || typeof password !== "string") {
    return {
      status: 400,
      body: {
        error: "Enter a valid username and password."
      }
    };
  }
  if (!username || !password) {
    return {
      status: 400,
      body: {
        error: "Username and password is required."
      }
    };
  }
  const user = await prisma.user.findUnique({
    where: { username }
  });
  const passwordMatch = user && await bcrypt.compare(password, user.hashed);
  if (!user || !passwordMatch) {
    return {
      status: 400,
      body: {
        error: "You entered the wrong credentials."
      }
    };
  }
  return {
    status: 200,
    body: {
      user: { username },
      success: "Success."
    },
    headers: {
      "Set-Cookie": cookie.serialize("session", user.id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30
      })
    }
  };
};
export { post };
