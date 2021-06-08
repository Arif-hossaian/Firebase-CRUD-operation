import React from "react";

const Avatar = ({ url, width = "200px", height = "300px" }) => {
  return (
    <div style={{ width, height, margin: "auto" }}>
      <img src={url} alt="user" />
    </div>
  );
};

export default Avatar;
