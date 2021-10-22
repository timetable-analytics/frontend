import React from 'react';
import MyButton from "../MyButton/MyButton";
import classes from "./Card.module.css";

const Card = ({route, image, text, text1, ...style}) => {

    return (
            <button {...style} onClick={route} className={classes.card}>
                <img className={classes.picture} src={image} alt="Картинка аудиторий"/>
                <figcaption>
                    <div className={classes.text}>
                        {text}
                    </div>
                    <div className={classes.text1}>
                        {text1}
                    </div>
                </figcaption>
            </button>

    );
};

export default Card;