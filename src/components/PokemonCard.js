const PokemonCard = (props) => {
    const keys = Object.keys(props.pokemon.weaknesses)
    return (
        <div className={"carousel-card " + props.alignment}>
            <div className="pokemon-bio">
                <img className="pokemon-sprite" src={props.pokemon.spriteUrl} alt={props.pokemon.name}></img>
                <div className="pokemon-types">
                    {props.pokemon.types.map(type => {
                        return (
                            <img className="type-label" src={"/images/" + type + "_label.png"} alt={type} />
                        );
                    })}
                </div>
            </div>
            <div className="pokemon-weaknesses">
                {
                    keys.map(key => {
                        let val = props.pokemon.weaknesses[key];

                        if (val === 0.5) {
                            val = "½"
                        } else if (val === 0.25) {
                            val = "¼"
                        }
                        return (
                            <div className="weakness">
                                <img className="weakness-icon" src={"/images/" + key + "_icon.png"} alt={key} />
                                <label>{"×" + val}</label>
                                <img className="weakness-label" src={"/images/" + key + "_label.png"} alt={key} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default PokemonCard;