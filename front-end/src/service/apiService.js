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


const getProducts = () => {
    try {
        const response = axios.get('/products');
        return response;
    } catch (error) {
        return error;
    }
};

const getDetailProducts = (id) => {
    try {
        const response = axios.get(`/products/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};


const postLogin = async (data) => {
    try {
        const response = await axios.post(
            '/auth/sign_in',
            data,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return error.response;
    }
};

const postSignup = (data) => {
    try {
        const response = axios.post(`/auth/sign_up`, data);
        return response;
    } catch (error) {
        return error;
    }
}

const getLogOut = (data) => {
    try {
        const response = axios.get(`/auth/logout`);
        return response;
    } catch (error) {
        return error;
    }
}

const postComment = (data) => {
    try {
        const response = axios.post(`/comments`, data);
        return response;
    } catch (error) {
        return error;
    }
}

const postCart = (data) => {
    try {
        const response = axios.post(
            '/cart',
            data,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.error("Error during post cart:", error);
        return error.response;
    }
};

const getCart = () => {
    try {
        const response = axios.get('/cart');
        return response;
    } catch (error) {
        console.error("Error during get cart:", error);
        return error.response;
    }
}

const putCart = (data) => {
    try {
        const response = axios.put(
            '/cart',
            data,
        );
        return response;
    } catch (error) {
        console.error("Error during put cart:", error);
        return error.response;
    }
}

const deleteCart = (data) => {
    try {
        const response = axios.delete(
            '/cart',
            { data: data },
        );
        return response;
    } catch (error) {
        console.error("Error during delete cart:", error);
        return error.response;
    }
}

const postProduct = (data) => {
    try {
        const response = axios.post(
            '/products',
            data,
        );
        return response;
    } catch (error) {
        console.error("Error during post product:", error);
        return error.response;
    }
}

const deleteProduct = (data) => {
    try {
        const response = axios.delete(
            '/products',
            { data: data },
        );
        return response;
    } catch (error) {
        console.error("Error during post product:", error);
        return error.response;
    }
}

const getPromocode = (data) => {
    try {
        const response = axios.get(
            '/promo',
        );
        return response;
    } catch (error) {
        console.error("Error during get promocode:", error);
        return error.response;
    }
}

const putPromocode = (data) => {
    try {
        const response = axios.put(
            '/promo',
            data
        );
        return response;
    } catch (error) {
        console.error("Error during get promocode:", error);
        return error.response;
    }
}

const postPromocode = (data) => {
    try {
        const response = axios.post(
            '/promo',
            data
        );
        return response;
    } catch (error) {
        console.error("Error during post promocode:", error);
        return error.response;
    }
}


const deletePromocode = (data) => {
    try {
        const response = axios.delete(
            '/promo',
            { data: data }
        );
        return response;
    } catch (error) {
        console.error("Error during post promocode:", error);
        return error.response;
    }
}

const postCreateOrder = (data) => {
    try {
        const response = axios.post(
            '/orders',
            data
        );
        return response;
    } catch (error) {
        console.error("Error during post promocode:", error);
        return error.response;
    }
}

const getOrder = () => {
    try {
        const response = axios.get(
            '/orders',
        );
        return response;
    } catch (error) {
        console.error("Error during get order:", error);
        return error.response;
    }
}

const postUsePromo = (data) => {
    try {
        const response = axios.post(
            '/orders/promo', data
        );
        return response;
    } catch (error) {
        console.error("Error during use promocode:", error);
        return error.response;
    }
}

export {
    getAddressByCoord, getCoordByAddress,
    getProducts, getDetailProducts, postLogin, getLogOut,
    postComment, postSignup, postCart, getCart, putCart,
    deleteCart, postProduct, deleteProduct,
    getPromocode, putPromocode, postPromocode, deletePromocode,
    postCreateOrder, getOrder, postUsePromo
}