"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { app, firestore } from "../../lib/firebase/firebase.js";
import toast from "react-hot-toast";
import DashboardComp from "./components/DashboardComp.js";
import "./page.css";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const [selectedChat, setSelectedChat] = useState(null);

  // useEffect(() => {
  //   const auth = getAuth(app);
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const docRef = doc(firestore, "users", user.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         const data = { id: docSnap.id, ...docSnap.data() };
  //         setUser(data);
  //       } else {
  //         toast.dismiss();
  //         toast.error("User data not found!");
  //       }
  //     } else {
  //       router.push("/login");
  //     }
  //   });
  // }, [auth, router]);
  return (
    <>
      <DashboardComp />
    </>
  );
}
