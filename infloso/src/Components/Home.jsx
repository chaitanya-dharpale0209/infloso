import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Our Platform</h1>
      <p>Your own music platform provided by InflosoAI.</p>
     
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    textDecoration: "none",
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default Home;
