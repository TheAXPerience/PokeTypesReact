import React from 'react';
import { useState } from 'react'
import PokemonCard from './PokemonCard.js'

const touchSensitivity = 4;

const Carousel = (props) => {
    const [current, setCurrent] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);

    if (props.error === 1) {
        return (
            <h1 className="error-message">
                THE POKEMON COULD NOT BE FOUND.
            </h1>
        );
    } else if (props.error === 2) {
        return (
            <h1 className="error-message">
                THERE WAS AN ERROR PROCESSING THE REQUEST.
            </h1>
        );
    }

    if (props.pokemon.length > 0 && current >= props.pokemon.length) {
        setCurrent(0);
    }

    const nextCard = () => {
        setCurrent(curr => (curr + 1) % props.pokemon.length)
    }

    const prevCard = () => {
        setCurrent(curr => (curr - 1 + props.pokemon.length) % props.pokemon.length)
    }

    const toCard = (idx) => {
        setCurrent(idx)
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;
        if (touchDown === null) return;

        const currTouch = e.touches[0].clientX;
        const diff = touchDown - currTouch;

        if (diff > touchSensitivity) nextCard()
        else if (diff < -touchSensitivity) prevCard()
        setTouchPosition(null);
    }

    return (
        <div className="carousel-wrapper">
            {props.pokemon.length > 1 && <button className="left-arrow" onClick={prevCard}>{"<"}</button>}
            <div className="carousel-content">
                { props.pokemon.map((pokemon, idx) => {
                    var align_class = "right-hide";
                    if (idx === current) {
                        align_class = "center-show";
                    } else if (idx === current - 1) {
                        align_class = "left-show";
                    } else if (idx === current + 1) {
                        align_class = "right-show";
                    } else if (idx < current) {
                        align_class = "left-hide";
                    }
                    return (
                        <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                            <PokemonCard pokemon={pokemon} alignment={align_class}>
                                {pokemon}
                                {/* replace with PokemonCard when that gets made */}
                            </PokemonCard>
                        </div>
                    );
                })}
            </div>
            <div className="indicator-wrapper">
               { props.pokemon.map((pokemon, idx) => {
                    return (
                        <img
                            src="/images/pokeball.png"
                            alt="indicator"
                            className={"indicator" + (idx === current ? " indicator-idx" : "")}
                            onClick={() => toCard(idx)}
                        />
                    );
                })}
            </div>
            {props.pokemon.length > 1 && <button className="right-arrow" onClick={nextCard}>{">"}</button>}
        </div>
    );
}

export default Carousel;