import React from "react";
import Logo from '../images/logo.svg';

export default function Header () {
    return (
    <header> 
        <img className="header__logo" src={Logo} alt="Логотип сайта" />
        <div className="header__line" /> 
    </header>
    )
}