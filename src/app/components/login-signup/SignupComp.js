"use client";
import React, { useState } from "react";
import "./LoginSignupComp.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import SpinnerComp from "../SpinnerComp";
import { useRouter } from "next/navigation";

export default function SignupComp() {
  const router = useRouter();
  const [SignupObject, setSignupObject] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignupObject = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      SignupObject.username === "" ||
      SignupObject.email === "" ||
      SignupObject.password === "" ||
      SignupObject.confirmPassword === ""
    ) {
      toast.dismiss();
      toast.error("Please fill all the fields!");
      return;
    } else if (SignupObject.password.length < 6) {
      toast.dismiss();
      toast.error("Password must be atleast 6 characters!");
      return;
    } else if (SignupObject.password !== SignupObject.confirmPassword) {
      toast.dismiss();
      toast.error("Passwords do not match!");
      return;
    } else if (!emailRegex.test(SignupObject.email)) {
      toast.dismiss();
      toast.error("Invalid Email!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: SignupObject.name,
          username: SignupObject.username,
          email: SignupObject.email,
          password: SignupObject.password,
        }),
      });

      if (response.status === 200) {
        toast.dismiss();
        toast.success("User Successfully Registered!");
        router.push("/login");
      } else if (response.status === 400) {
        const errorMessage = await response.text();
        let errorToDisplay;
        const errorMessages = {
          "auth/email-already-in-use": "Email already in use!",
          "auth/weak-password": "Password is too weak!",
          "auth/invalid-email": "Invalid Email!",
        };
        if (errorMessages[errorMessage]) {
          errorToDisplay = errorMessages[errorMessage];
        }

        toast.dismiss();
        toast.error(errorToDisplay || errorMessage || "Something went wrong!");
      }
    } catch (error) {
      console.log(error.message);
      toast.dismiss();
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
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
          Sign-up to access your chats, <br />
          groups and contacts.
        </p>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={SignupObject.name}
          onChange={(e) =>
            setSignupObject({ ...SignupObject, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={SignupObject.username}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.includes(" ")) {
              toast.dismiss();
              toast.error("Username cannot contain spaces!");
              return;
            } else if (/[^a-zA-Z0-9]/.test(inputValue)) {
              toast.dismiss();
              toast.error("Special characters aren't allowed!");
              return;
            } else {
              setSignupObject({ ...SignupObject, username: inputValue });
            }
          }}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={SignupObject.email}
          onChange={(e) =>
            setSignupObject({ ...SignupObject, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={SignupObject.password}
          onChange={(e) =>
            setSignupObject({ ...SignupObject, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Confirm password"
          name="confirmPassword"
          value={SignupObject.confirmPassword}
          onChange={(e) =>
            setSignupObject({
              ...SignupObject,
              confirmPassword: e.target.value,
            })
          }
        />
        <button onClick={handleSignupObject} disabled={loading}>
          {loading ? "Loading..." : "Signup 🥳"}
        </button>
        <p className="signupOffer">
          Already have an account?
          <span className="signupOfferText">
            <Link href={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </>
  );
}
