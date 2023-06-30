import React from 'react';
import axios from 'axios';
import Header from './Header.js'
import PokemonQueryer from './PokemonQueryer.js'
import Carousel from './Carousel.js';
import Footer from './Footer.js'

const BASE_URL = "http://localhost:8000/"
async function spring_fetch(query) {
    const url = BASE_URL + query;
    const response = await axios.get(url);
    return response.data;
}

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: "",
            pokelist: [],
            error_code: 0
        }
    }

    changePokemon = (pokemon) => {
        pokemon = pokemon.trim().replaceAll(' ', '-').replaceAll('.', '').replaceAll(':', '').toLowerCase();
        if (pokemon === this.state.pokemon) {
            return;
        }

        spring_fetch(pokemon).then(result => {
            this.setState({
                pokemon: pokemon,
                pokelist: result,
                error_code: 0
            });
        }).catch(error => {
            this.setState({
                pokemon: "",
                pokelist: [],
                error_code: error.response ? 1 : 2
            })
        });
    }

    render() {
        return (
            <div class="main-page">
                <Header></Header>
                <div class="wrapper">
                    <PokemonQueryer changePokemon={this.changePokemon}></PokemonQueryer>
                    <Carousel pokemon={this.state.pokelist} error={this.state.error_code}></Carousel>
                </div>
                <Footer></Footer>
            </div>
            
        );
    }
}

export default Page;