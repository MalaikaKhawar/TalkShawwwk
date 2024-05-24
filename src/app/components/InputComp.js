"use client";
import React from "react";
import { sendPlane } from "../../../assets/index.js";
import Image from "next/image";

export default function InputComp() {
  return (
    <>
      <div className="message_bar_input_area">
        <div className="message_bar_input_content">
          <input
            type="text"
            placeholder="Message"
            className="message_bar_input_content_text"
          />
          <button className="message_bar_input_content_button">
            {/* <Image
              src={sendPlane}
              width={30}
              style={{ border: "1px solid white" }}
            /> */}
            Send
          </button>
        </div>
      </div>
    </>
  );
}
