import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate nihil alias, aspernatur impedit magni animi. Amet qui nemo non reprehenderit vitae alias suscipit quasi assumenda. Maiores exercitationem quaerat fugit corporis.</p>

      <Link to={"/about-us"}>
        <button>About us</button>
      </Link>
    </div>
  );
};

export default Home;
