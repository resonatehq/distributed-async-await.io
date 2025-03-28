import React from "react";

export const DAACallOut = ({ title, children }) => (
  <div
    style={{
      borderColor: "#3cc9a7",
      borderWidth: "0 0 0 4px",
      padding: "8px 8px 8px 16px",
      margin: "8px 0",
      borderStyle: "solid",
      // backgroundColor: "#f0f8f7",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
      <svg
        height="20"
        width="20"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        style={{ marginRight: "8px" }}
      >
        <path d="m256 0c-141.484375 0-256 114.496094-256 256 0 141.484375 114.496094 256 256 256 141.484375 0 256-114.496094 256-256 0-141.484375-114.496094-256-256-256zm0 472c-119.378906 0-216-96.609375-216-216 0-119.378906 96.609375-216 216-216 119.378906 0 216 96.609375 216 216 0 119.378906-96.609375 216-216 216zm59.332031-98c0 11.046875-8.953125 20-20 20h-78.664062c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h19.332031v-117.332031h-19.332031c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h39.332031c11.046875 0 20 8.953125 20 20v137.332031h19.332031c11.046875 0 20 8.953125 20 20zm-84.332031-250.332031c0-13.808594 11.191406-25 25-25s25 11.191406 25 25c0 13.804687-11.191406 25-25 25s-25-11.195313-25-25zm0 0"></path>
      </svg>
      {title && <strong>{title}</strong>}
    </div>
    <div>{children}</div>
  </div>
);
