import React, { useEffect, useRef } from "react";
import "./styles/DashboardComp.css";
import Image from "next/image";
import {
  seenDoubleTick,
  deliveredDoubleTick,
  singleTick,
} from "../../../assets/index.js";

export default function MessagesComp() {
  // const endRef = useRef(null);

  // useEffect(() => {
  //   endRef.current.scrollIntoView({ behavior: "smooth" });
  // }, []);

  return (
    <>
      <div className="message_bar_chat_area_messages_section">
        {messages?.map((object, index) => {
          return (
            <div
              className="message_bar_chat_area_messages_section_day_set"
              key={index}
            >
              <div className="message_bar_chat_area_messages_section_day_set_data">
                {object.day}
              </div>
              {object.messages.map((message, index) => {
                return (
                  <p
                    key={index}
                    style={{
                      alignSelf: message.isMine ? "end" : "start",
                      backgroundColor: message.isMine ? "#DAF0EE" : "#f2fdff",
                    }}
                  >
                    {message.message}
                    <span className="message_time">
                      {message.time}
                      {message.isMine ? (
                        <span className="is_seen">
                          <Image
                            src={
                              message.isDelivered
                                ? message.isSeen
                                  ? seenDoubleTick
                                  : deliveredDoubleTick
                                : singleTick
                            }
                            alt="double_tick"
                            style={{
                              fill: message.isDelivered ? "#40BCD8" : "black",
                            }}
                          />
                        </span>
                      ) : null}
                    </span>
                  </p>
                );
              })}
            </div>
          );
        })}
        {/* <div className="div" ref={endRef}></div> */}
      </div>
    </>
  );
}

const messages = [
  {
    day: "30th April, 2024",
    messages: [
      {
        message: "Have sweet dreams. 😴",
        time: "3:00am",
        isSeen: false,
        isMine: false,
        isDelivered: false,
      },
    ],
  },
  {
    day: "1st May, 2024",
    messages: [
      {
        message: "Good Morning! 🔆",
        time: "6:00am",
        isSeen: true,
        isMine: true,
        isDelivered: true,
      },
      {
        message: "How are you feeling now?",
        time: "6:00am",
        isSeen: true,
        isMine: true,
        isDelivered: true,
      },
      {
        message: "Let me know when you're available.",
        time: "6:00am",
        isSeen: true,
        isMine: true,
        isDelivered: false,
      },
    ],
  },
];
