import React from "react";

export default function Not({ tip }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <span>
        <span style={{fontSize:42}}>404.</span> Không tìm thấy trang!
      </span>
      <span>{tip}</span>
    </div>
  );
}
