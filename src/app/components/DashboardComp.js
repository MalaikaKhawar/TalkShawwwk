"use client";
import React, { useEffect, useState } from "react";
import "./styles/DashboardComp.css";
import { deliveredDoubleTick, search } from "../../../assets/index.js";
import Image from "next/image";
import MessagesComp from "./MessagesComp";
import InputComp from "./InputComp";
import { app, firestore, auth } from "../../../lib/firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../stores/userStore";

export default function DashboardComp() {
  const router = useRouter();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  useEffect(() => {
    if (currentUser?.id) {
      const unSub = onSnapshot(
        doc(firestore, "chats", currentUser.id),
        async (res) => {
          const items = res.data().chats;

          const promises = items.map(async (item) => {
            const userDocRef = doc(firestore, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();

            return { ...item, user };
          });

          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      );

      return () => {
        unSub();
      };
    }
  }, [currentUser?.id]);

  console.log(currentUser);

  if (isLoading) return <div className="text-4xl">Loading...</div>;

  return (
    <>
      {currentUser && (
        <div className="main_container">
          <div className="left_side_bar">
            <div className="profile_section">
              <div
                className="logoutcircle"
                onClick={() => {
                  auth.signOut().then(() => {
                    router.push("/login");
                  });
                }}
                title="Logout"
              ></div>
              <div className="profile_section_image">
                <img
                  src="https://media.licdn.com/dms/image/D4D03AQHLyMkFLcX38g/profile-displayphoto-shrink_400_400/0/1707164867049?e=1720051200&v=beta&t=glxUoP6fI9-gkdPssp4KTiZ1JIf5eaIesICLIvOLn4M"
                  alt="profile_image"
                />
              </div>
              <div className="profile_section_info">
                <div className="profile_section_name" title={currentUser.name}>
                  {currentUser.name}
                </div>
                <div
                  className="profile_section_email"
                  title={currentUser.email}
                >
                  {currentUser.email}
                </div>
              </div>
            </div>

            <div className="contacts_section">
              <div className="contacts_section_titles">
                <p>Chats</p>
                <p>Online</p>
                <p>All</p>
              </div>

              {/* <!-- Contacts Search Section --> */}
              <div className="contacts_section_search">
                <input
                  type="text"
                  placeholder="Search"
                  className="contacts_section_search_text"
                />
                <button className="search_button">
                  <Image src={search} width={30} alt={search} />
                </button>
              </div>

              {/* <!-- Contacts List Section --> */}
              <div className="contacts_section_list">
                <div className="contacts_section_list_item">
                  {chats?.map((chat, index) => (
                    <div className="profile_section chat_card" key={index}>
                      <div className="profile_section_image">
                        <img
                          src="https://media.licdn.com/dms/image/D5603AQGJweHw4_EdLA/profile-displayphoto-shrink_800_800/0/1670074903293?e=1720051200&v=beta&t=4nCXYGM5qV2s9KX6eESotDsNAHRevM_tYtJERlTbqxQ"
                          alt="profile_image"
                        />
                      </div>
                      <div className="profile_section_info">
                        <div className="profile_section_name">
                          {chat.user?.name}
                        </div>
                        <div className="profile_section_email message">
                          {chat.messages[chat.messages.length - 1].content}
                        </div>

                        <span className="date_time">
                          {chat.updatedAt.toDate().toLocaleTimeString()}
                          <span className="is_seen">
                            <Image
                              src={chat.isDelivered ? deliveredDoubleTick : ""}
                              width="15"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Message Bar --> */}
          <div className="message_bar">
            {/* <!-- Chat Area --> */}
            <div className="message_bar_chat_area">
              {/* <!-- Message Bar Top section --> */}
              <div className="message_bar_chat_area_top_section">
                <div className="message_bar_chat_area_top_section_image">
                  <img
                    src="https://media.licdn.com/dms/image/D5603AQGJweHw4_EdLA/profile-displayphoto-shrink_800_800/0/1670074903293?e=1720051200&v=beta&t=4nCXYGM5qV2s9KX6eESotDsNAHRevM_tYtJERlTbqxQ"
                    alt=""
                  />
                </div>

                <div className="message_bar_chat_area_top_section_info">
                  <p className="message_bar_chat_area_top_section_info_name">
                    Muhammad Arhum
                  </p>
                  <p className="message_bar_chat_area_top_section_info_last_online">
                    Last online 6 hours ago
                  </p>
                </div>
              </div>

              {/* <!-- Message Bar Messages section --> */}
              <MessagesComp />
            </div>

            {/* <!-- Message Input Area --> */}
            <InputComp />
          </div>
        </div>
      )}
    </>
  );
}
