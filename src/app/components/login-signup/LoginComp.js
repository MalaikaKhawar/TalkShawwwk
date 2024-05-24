"use client";
import React, { useEffect, useState } from "react";
import "./LoginSignupComp.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auth } from "../../../../lib/firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      router.push("/");
    }
  }, []);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all the fields!");
      return;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      if (user) {
        toast.success("User Successfully Logged In!");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="box">
        <h1>
          TalkShawwwk <span className="welEmoji">👋</span>
        </h1>
        <p className="loginDesc">
          Sign-in to access your chats, <br />
          groups and contacts.
        </p>
        <input
          type="text"
          placeholder="Email or Username"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {/* <p className="forgetText">
          <a href="#">Forget password?</a>
        </p> */}
        <button onClick={handleLogin}>Login 🥳</button>
        <p className="signupOffer">
          Don&apos;t have an account?
          <span className="signupOfferText">
            <Link href={"/register"}>Signup</Link>
          </span>
        </p>
      </div>
    </>
  );
}
