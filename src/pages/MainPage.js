import React, {useEffect} from "react";
const axios = require("axios").default;

function MainPage() {
  useEffect(() => {
    axios.get("/user").then((res) => {
      console.info("User:", res);
    }).catch((err) => {
      console.error("Get user error: ", err);
    });
  });
  return (
    <h1>Main</h1>
  );
}

export default MainPage;