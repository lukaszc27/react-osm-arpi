import React, { ChangeEvent } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { setPosition } from './Map';

import Label from './Label'


const Wrapper = styled.header`
    background-color: #e6e6e6;
    text-align: center;
    padding: 1em 2em;
`;

const Input = styled.input`
    text-align: center;
`;

const Container = styled.section`
    display: flex;
    flex-wrap: wrap;
`;


export interface OSMResponse {
    boundingbox: Array<number>;
    class: string;
    display_name: string;
    icon: string;
    importance: number;
    lat: number;
    licence: string;
    lon: number;
    osm_id: number;
    osm_type: string;
    place_id: number;
    type: string;
}

interface SearchBarProps {}
interface SearchBarState {
    pattern: string;
    response: Array<OSMResponse>
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    state = {
        pattern : '',
        response : []
    }

    inputChangeHandle = (e : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            pattern: e.target.value
        });
    }

    buttonHandle = () => {
        // https://nominatim.openstreetmap.org/search?q='.$validated['q'].' &format=json
        if (this.state.pattern.length > 0) {
            axios.get(`https://nominatim.openstreetmap.org/search?q=${this.state.pattern} &format=json`)
            .then(response => {
                this.setState({
                    response: response.data
                })
            })
            .catch(error => {
                console.error(error.data);
            })
        }
    }

    labelClickHandle = (item : OSMResponse) => {
        console.log(item);
        setPosition(item.lon, item.lat);
    }

    render = () => {
        return (
            <Wrapper className="jumbotron">
                <h1 className="display-4">OpenStreetMap</h1>
                <p className="lead">Wpisz nazwę miejscowości której poszukujesz</p>

                <Input type="text" className="form-control mb-2" onChange={this.inputChangeHandle} value={this.state.pattern} />
                <button className="btn btn-success" onClick={this.buttonHandle}>Szukaj</button>

                <Container>
                    {
                        this.state.response.map((item : OSMResponse) => (
                            <Label key={item.osm_id} onClick={() => this.labelClickHandle(item)}>{item.display_name}</Label>
                        ))
                    }
                </Container>
            </Wrapper>
        );
    }
}
export default SearchBar;