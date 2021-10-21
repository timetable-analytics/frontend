import React from 'react';
import MyButton from "../MyButton/MyButton";
import classes from "./Card.module.css";

const Card = ({route, image, text, ...style}) => {

    return (
            <button {...style} onClick={route} className={classes.card}>
                <img className={classes.picture} src={image} alt="Картинка аудиторий"/>
                <div className={classes.text}>
                    {text}
                </div>
            </button>
    );
};

export default Card;