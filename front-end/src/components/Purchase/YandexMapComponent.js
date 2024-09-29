import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { getAddressByCoord, getCoordByAddress } from '../../service/apiService';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


const YandexMapComponent = (props) => {
    const [coordinates, setCoordinates] = useState([55.75, 37.57]);
    const { address, setAddress } = props;
    const [ymapsInstance, setYmapsInstance] = useState(null);
    const [placemark, setPlacemark] = useState(null);
    const [mapCenter, setMapCenter] = useState([55.75, 37.57]);
    const [zoom, setZoom] = useState(9);

    const handleMapClick = async (e) => {
        const clickedCoords = e.get('coords');

        setCoordinates(clickedCoords);
        setPlacemark({
            geometry: clickedCoords,
            properties: {
                balloonContent: `Coordinates: ${clickedCoords[0]}, ${clickedCoords[1]}`,
            },
        });
        setCoordinates(clickedCoords);

        const res = await getAddressByCoord([clickedCoords[1], clickedCoords[0]]);
        const data = res?.data?.response?.GeoObjectCollection?.featureMember;
        if (res && res.status === 200 && data && data.length > 0) {
            setAddress(data[0].GeoObject.name + ', ' + data[0].GeoObject.description);
        }

    };

    const handleSearchSubmit = async (event) => {
        if (event.key === 'Enter') {
            const res = await getCoordByAddress(address);
            const data = res?.data?.response?.GeoObjectCollection?.featureMember;
            if (res.status === 200 && res.data && data && data.length > 0) {
                let lowerCorner = data[0]?.GeoObject?.Point.pos.split(' ').map(Number);
                lowerCorner = [lowerCorner[1], lowerCorner[0]]
                setMapCenter(lowerCorner);
                setZoom(15);
                setPlacemark({
                    geometry: lowerCorner,
                    properties: {
                        balloonContent: `Coordinates: ${lowerCorner[0]}, ${lowerCorner[1]}`,
                    },
                });

            }
        }
    }

    const handleSearchChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSearchClick = async (e) => {
        let objEvent = { key: 'Enter' }
        await handleSearchSubmit(objEvent);
    }

    return (
        <YMaps
            query={{ load: "package.full", apikey: '1d89ceef-3bdf-4e95-9ad8-cb9169d831cf' }}
            onLoad={(ymaps) => setYmapsInstance(ymaps)}
        >
            <div className='map-container'>
                <Map
                    state={{ center: mapCenter, zoom: zoom }}
                    width={"100%"}
                    onClick={handleMapClick}
                    height={"50vh"}
                >
                    {placemark && (
                        <Placemark
                            geometry={placemark.geometry}
                            properties={placemark.properties}
                            options={{
                                preset: 'islands#icon',
                                iconColor: '#0095b6',
                            }}
                        />
                    )}
                </Map>
            </div>
            <div style={{ width: "50%" }}>
                <h4>Address:</h4>
                <TextField
                    id="standard-basic"
                    label="Search address"
                    variant="standard"
                    value={address}
                    style={{ width: "100%" }}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                style={{ cursor: 'pointer' }}
                                position="end"
                                onClick={(event) => handleSearchClick(event)} >
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </YMaps >
    );
};
export default YandexMapComponent;
