import React from "react";

export const LabeledDiagram = ({ children }) => {
  if (!children || children.type !== "img") {
    return children;
  }

  const src = children.props.src;
  const fileName = src.split("/").pop() ?? "";
  const label = fileName.replace(/\.[^/.]+$/, "");

  return (
    <div style={{ marginBottom: "12px", textAlign: "right" }}>
      {children}
      <span style={{ fontSize: "0.7em", fontStyle: "italic" }}>{label}</span>
    </div>
  );
};
