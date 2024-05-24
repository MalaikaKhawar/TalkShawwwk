import { auth, firestore } from "../../../../lib/firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req, res) {
  const body = await req.json();
  const { name, username, email, password } = body;

  console.log(
    `name: ${name} - username: ${username} - email: ${email} - password: ${password}`
  );

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userRef = doc(firestore, "users", user.uid);
    const chatRef = doc(firestore, "chats", user.uid);

    await setDoc(userRef, {
      name,
      username,
      email,
      password,
      id: user.uid,
    });

    await setDoc(chatRef, {
      chats: [],
    });

    return new Response("User Successfully Registered!", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
}
