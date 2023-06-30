import { useState } from 'react'

const PokemonQueryer = (props) => {
    const [query, changeQuery] = useState('')

    const changeEvent = () => {
        props.changePokemon(query);
    }

    const keyUpEvent = (e) => {
        if (e.key === 'Enter') {
            changeEvent();
        }
    }

    return (
        <div className="query-wrapper">
            <label className="query-label">Species Name</label>
            <input
                className="query-input"
                type="text"
                value={query}
                onChange={(event) => changeQuery(event.target.value)}
                onKeyUp={keyUpEvent}
            ></input>
            <button className="query-button" onClick={changeEvent}>Submit</button>
        </div>
    );
}

export default PokemonQueryer;