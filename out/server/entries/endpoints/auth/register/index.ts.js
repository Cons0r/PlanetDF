import * as bcrypt from "bcrypt";
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
        error: "Something went horribly wrong."
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
  try {
    await prisma.user.create({
      data: {
        username,
        hashed: await bcrypt.hash(password, 10)
      }
    });
    return {
      status: 200,
      body: { success: "Next Step is to Login and Link your Minecaft account!" }
    };
  } catch (error) {
    return {
      status: 400,
      body: {
        error: "User already exists."
      }
    };
  }
};
export { post };
