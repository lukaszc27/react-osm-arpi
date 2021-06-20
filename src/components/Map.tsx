import React from 'react';
import styled from 'styled-components';
import 'ol/ol.css';
import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


const Wrapper = styled.section`
    display: flex;
    justify-content: center;
`;

const MapWrapper = styled.div`
    width: 800px;
    height: 600px;
    margin: 2em 0;
    box-shadow: 0px 0px 24px silver;
`;

const ControlContainer = styled.section`
    text-align: center;
`;


let map: Map;
export const setPosition = (lon: number, lat: number, zoom: number = 16): void => {
    const view = map.getView();
    view.setCenter(fromLonLat([lon, lat]));
    view.setZoom(zoom);
}

class MyMap extends React.Component {
    componentDidMount = () => {
        map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),

                // new VectorLayer({
                //     source: new VectorSource({
                //         url: 'data/geojson/countries.geojson',
                //         format: new GeoJSON()
                //     }),
                //     opacity: 0.5
                // })
            ],

            view: new View({
                center: fromLonLat([19.134, 52.215]),   // Położenie Polski
                zoom: 6.4
            })
        });

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setPosition(position.coords.longitude, position.coords.latitude);
            });
        }
        else {
            // w razie gdy geolokalizacja będzie nie dostępna
            // przedstawia mapę Polski
            setPosition(19.134, 52.215, 6);
        }
    }

    exportToImageHandle = () => {
        map.once('rendercomplete', () => {
            const mapCavans = document.createElement('canvas');
            const mapSize = map.getSize();

            if (mapSize !== undefined) {
                mapCavans.width = mapSize[0];
                mapCavans.height = mapSize[1];
            }

            let mapContext = mapCavans.getContext('2d');
            Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function (cavans) {
                if (cavans.width > 0) {
                    const opacity = cavans.parentNode.style.opacity;
                    if (mapContext != null)
                        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);

                    const transform = cavans.style.transform;
                    var matrix = transform
                        .match(/^matrix\(([^\(]*)\)$/)[1]
                        .split(',')
                        .map(Number);

                    CanvasRenderingContext2D.prototype.setTransform.apply(
                        mapContext,
                        matrix
                    );
                    mapContext?.drawImage(cavans, 0, 0);
                }
            }); // array.prototype
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(mapCavans.toBlob, 'map.png');
            }
            else {
                let link: HTMLAnchorElement = document.createElement('a');
                link.href = mapCavans.toDataURL();
                link.target = '_blank';
                link.click();
            }
        }); // map.once
        map.renderSync();
    }

    render = () => {
        return (
            <>
                <div className="row">
                    <Wrapper className="col">
                        <MapWrapper id="map" />
                    </Wrapper>
                </div>

                <div className="row">
                    <ControlContainer className="col">
                        <button className="btn btn-outline-primary" onClick={this.exportToImageHandle}>Eksport do PNG</button>
                    </ControlContainer>
                </div>
            </>
        );
    }
}
export default MyMap;