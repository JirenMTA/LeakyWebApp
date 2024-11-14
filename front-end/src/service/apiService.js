import { instance as axios } from "../utils/axiosCustomize";
//import axios from "../utils/axiosCustomize";

const getAddressByCoord = async (coordinates) => {
    return await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=1d89ceef-3bdf-4e95-9ad8-cb9169d831cf&geocode=${coordinates[0]},${coordinates[1]}&format=json`);
}

const getCoordByAddress = async (address) => {
    try {
        const response = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=1d89ceef-3bdf-4e95-9ad8-cb9169d831cf&geocode=${address}&format=json`);
        return response;
    } catch (error) {
        return error;
    }
};


const getProducts = async () => {
    try {
        const response = await axios.get('/products');
        return response;
    } catch (error) {
        return error;
    }
};

const getDetailProducts = async (id) => {
    try {
        const response = await axios.get(`/products/${id}`);
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
        );
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return error.response;
    }
};

const postSignup = async (data) => {
    try {
        const response = await axios.post(`/auth/sign_up`, data);
        return response;
    } catch (error) {
        return error;
    }
}

const getLogOut = async (data) => {
    try {
        const response = await axios.get(`/auth/logout`);
        return response;
    } catch (error) {
        return error;
    }
}

const postComment = async (data) => {
    try {
        const response = await axios.post(`/comments`, data);
        return response;
    } catch (error) {
        return error;
    }
}

const postCart = async (data) => {
    try {
        const response = await axios.post(
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

const getCart = async () => {
    try {
        const response = await axios.get('/cart');
        return response;
    } catch (error) {
        console.error("Error during get cart:", error);
        return error.response;
    }
}

const putCart = async (data) => {
    try {
        const response = await axios.put(
            '/cart',
            data,
        );
        return response;
    } catch (error) {
        console.error("Error during put cart:", error);
        return error.response;
    }
}

const deleteCart = async (data) => {
    try {
        const response = await axios.delete(
            '/cart',
            { data: data },
        );
        return response;
    } catch (error) {
        console.error("Error during delete cart:", error);
        return error.response;
    }
}

const postProduct = async (data) => {
    try {
        const response = await axios.post(
            '/products',
            data,
        );
        return response;
    } catch (error) {
        console.error("Error during post product:", error);
        return error.response;
    }
}

const deleteProduct = async (data) => {
    try {
        const response = await axios.delete(
            '/products',
            { data: data },
        );
        return response;
    } catch (error) {
        console.error("Error during post product:", error);
        return error.response;
    }
}

const getPromocode = async (data) => {
    try {
        const response = await axios.get(
            '/promo',
        );
        return response;
    } catch (error) {
        console.error("Error during get promocode:", error);
        return error.response;
    }
}

const putPromocode = async (data) => {
    try {
        const response = await axios.put(
            '/promo',
            data
        );
        return response;
    } catch (error) {
        console.error("Error during get promocode:", error);
        return error.response;
    }
}

const postPromocode = async (data) => {
    try {
        const response = await axios.post(
            '/promo',
            data
        );
        return response;
    } catch (error) {
        console.error("Error during post promocode:", error);
        return error.response;
    }
}


const deletePromocode = async (data) => {
    try {
        const response = await axios.delete(
            '/promo',
            { data: data }
        );
        return response;
    } catch (error) {
        console.error("Error during post promocode:", error);
        return error.response;
    }
}

const postCreateOrder = async (data) => {
    try {
        const response = await axios.post(
            '/orders',
            data
        );
        return response;
    } catch (error) {
        console.error("Error during post promocode:", error);
        return error.response;
    }
}

const getOrder = async () => {
    try {
        const response = await axios.get(
            '/orders',
        );
        return response;
    } catch (error) {
        console.error("Error during get order:", error);
        return error.response;
    }
}

const postUsePromo = async (data) => {
    try {
        const response = await axios.post(
            '/orders/promo', data
        );
        return response;
    } catch (error) {
        console.error("Error during use promocode:", error);
        return error.response;
    }
}


const getUserById = async (id) => {
    try {
        const response = await axios.get(
            `/users/${id}`
        );
        return response;
    } catch (error) {
        console.error("Error during use promocode:", error);
        return error.response;
    }
}

const getImageByName = (img_name, type) => {
    return `${axios.getUri()}/static/${type}/${img_name}`;
}

const postUploadAvartar = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(
            '/images/upload_avatar/'
            , formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error during use promocode:", error);
        return error.response;
    }
}

const postUploadProductImage = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(
            `/images/upload_product_img/${id}`
            , formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error during use promocode:", error);
        return error.response;
    }
}

const postPayforOrder = async (order_id) => {
    try {
        const response = await axios.post(
            `/orders/pay`, { order_id, amount: 0 }
        );
        return response;
    } catch (error) {
        console.error("Error during use promocode:", error);
        return error.response;
    }
}

const dangerousGetFindProduct = async (param) => {
    try {
        const response = await axios.get(
            `/products/find`, {
            params: {
                param: param,
            },
        });
        return response;
    } catch (error) {
        console.error("Error during get products:", error);
        return error.response;
    }
}

const get_qr_code = async () => {
    try {
        const response = await axios.get(`/users/qr_generator`, {
            responseType: 'blob',
            headers: {
                'Accept': 'image/png',
            },
        })
        return response;
    } catch (error) {
        console.error("Error during get qr code:", error);
        return error.response;
    }
}

const post_qr_code_setup = async () => {
    try {
        const response = await axios.post(`/users/setup_2fa`)
        return response;
    } catch (error) {
        console.error("Error during setup qr code:", error);
        return error.response;
    }
}

const post_otp_submit = async (token) => {
    try {
        const response = await axios.post(`/auth/2fa`, null, {
            params: {
                token: token,
            },
        })
        return response;
    } catch (error) {
        console.error("Error during submit qr code:", error);
        return error.response;
    }
}

export {
    getAddressByCoord, getCoordByAddress,
    getProducts, getDetailProducts, postLogin, getLogOut,
    postComment, postSignup, postCart, getCart, putCart,
    deleteCart, postProduct, deleteProduct,
    getPromocode, putPromocode, postPromocode, deletePromocode,
    postCreateOrder, getOrder, postUsePromo, getUserById,
    getImageByName, postUploadAvartar, postUploadProductImage,
    postPayforOrder, dangerousGetFindProduct,
    get_qr_code, post_qr_code_setup, post_otp_submit
}