import axios from "../utils/axiosCustomize";

const getAddressByCoord = (coordinates) => {
    return axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=1d89ceef-3bdf-4e95-9ad8-cb9169d831cf&geocode=${coordinates[0]},${coordinates[1]}&format=json`);
}

const getCoordByAddress = (address) => {
    try {
        const response = axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=1d89ceef-3bdf-4e95-9ad8-cb9169d831cf&geocode=${address}&format=json`);
        return response;
    } catch (error) {
        return error;
    }
};

export { getAddressByCoord, getCoordByAddress }