import { auth } from "../../../../lib/firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      return new Response("User Successfully Logged In!", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(error.message, {
      status: 400,
    });
  }
}
