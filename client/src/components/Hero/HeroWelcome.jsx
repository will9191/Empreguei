import React from "react";
import "./hero.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import welcome from "../../assets/bemVindo.png";

const HeroWelcome = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <section className="hero-banner">
      <div className="hero-banner-left">
        <img src={welcome} className="banner-img" />
      </div>
      <div className="hero-banner-right">
        <h1>
          Seja bem-vindo(a), <br /> {currentUser.firstName} {currentUser.name} !
        </h1>
      </div>
    </section>
  );
};

export default HeroWelcome;