import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useMediaQuery } from 'react-responsive';
import { deleteCart, getCart, getImageByName, postCreateOrder, putCart } from '../../service/apiService';
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { doFetchListOrder } from '../../redux/action/listOrderAction';
import { getOrder } from '../../service/apiService';
import { doFetchListCart } from '../../redux/action/listCartAction';
import { toast } from 'react-toastify';
import defaultImageProduct from '../../assets/image_products/default.jpg'
import "./Cart.scss"
import getSalePrice from '../utils/GetSalePrice';


const Cart = (props) => {
    const [listProduct, setListProduct] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const userState = useSelector(state => state.userState);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    const fetchListCart = async () => {
        const res = await getCart();
        setListProduct(res?.data?.products);
        setTotalPrice(res?.data?.total_price);
    }

    const fetchChangeCart = async (data) => {
        await putCart(data);
    }

    const handleChangeAmount = async (item, value) => {
        if (+value <= 0) { value = 1 }
        setListProduct(prevItems =>
            prevItems.map(i =>
                i?.product?.id === item?.product?.id ? { ...i, amount: value } : i
            )
        );
        await fetchChangeCart({
            "user_id": +userState?.account?.id,
            "product_id": +item?.product?.id,
            "amount": +value
        });
        await fetchListCart();
    };

    const handleDelteteItem = async (item) => {
        await deleteCart({
            "product_id": +item?.product?.id,
            "user_id": +userState?.account?.id,
        })
        await fetchListCart();
    }

    const handleCreateOrder = async () => {
        var payload = { products: [] }
        listProduct.forEach(product => {
            payload.products.push({ cart_id: +product?.id, amount: +product?.amount });
        });
        if (payload?.products?.length <= 0) {
            toast.error("Cart empty!");
            return
        }

        const res = await postCreateOrder(payload);
        let listOrder = await getOrder();
        let listCart = await getCart();
        setListProduct(listCart?.data?.products);
        setTotalPrice(listCart?.data?.total_price);
        dispatch(doFetchListCart({ orderList: listCart?.dat?.products }));
        dispatch(doFetchListOrder({ numberOrder: listOrder?.data?.length }));
    }

    useEffect(() => {
        fetchListCart();
    }, []);

    return <div className="basket-container">
        <div className='total-price-content'>
            {`Total price: ${totalPrice} руб.`}
        </div>
        <Button variant="outline-primary" onClick={handleCreateOrder}>
            Create orders
        </Button>
        {!isMobile ?
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='column-no'>No</th>
                        <th className='column-name'>Name</th>
                        <th className='column-img'>Image</th>
                        <th className='column-amount'>Amount</th>
                        <th className='column-price'>Price</th>
                        <th className='column-action'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProduct && listProduct.length > 0 && listProduct.map((item, key) => {
                            return <tr key={key + ' product-in-basket'}>
                                <td>{key}</td>
                                <td>{item?.product?.name}</td>
                                <td>
                                    <img src={item?.product?.image ? getImageByName(item?.product?.image, 'product') : defaultImageProduct}></img>
                                </td>
                                <td>
                                    <NumericInput
                                        className="form-control"
                                        value={item?.amount}
                                        onChange={(event) => { handleChangeAmount(item, event); }}
                                        inputMode="numeric"
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </td>
                                <td>
                                    {
                                        item?.product?.sale > 0 ?
                                            <>
                                                <div className='full-price line-through'>
                                                    {item?.product?.full_price + " руб."}
                                                </div>
                                                <div className='sale'>
                                                    {getSalePrice(item?.product?.full_price, item?.product?.sale) + " руб."}
                                                </div>

                                            </>
                                            :
                                            <div className='full-price'>
                                                {item?.product?.full_price + " руб."}
                                            </div>
                                    }
                                </td>
                                <td>
                                    <div className='action-content'>
                                        <Button variant="outline-warning"
                                            onClick={() => handleDelteteItem(item)}
                                        >Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table> :
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='column-no'>No</th>
                        <th className='column-product'>Product</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProduct && listProduct.length > 0 && listProduct.map((item, key) => {
                            return <tr key={key + ' product-in-basket'}>
                                <td>{key}</td>
                                <td>
                                    <div className='product-in-basket-container'>
                                        <span>{item?.product?.name}</span>
                                        <img src={item?.product?.image ? getImageByName(item?.product?.image, 'product') : defaultImageProduct}></img>
                                        {

                                            item?.product?.sale > 0 ?
                                                <>
                                                    <div className='full-price line-through'>
                                                        {item?.product?.full_price + " руб."}
                                                    </div>
                                                    <div className='sale'>
                                                        {getSalePrice(item?.product?.full_price, item?.product?.sale) + " руб."}
                                                    </div>

                                                </>
                                                :
                                                <div className='full-price'>
                                                    {item?.product?.full_price + " руб."}
                                                </div>


                                        }
                                    </div>
                                </td>
                                <td>
                                    <div className='action-content'>
                                        <NumericInput
                                            className="form-control"
                                            value={item?.amount}
                                            onChange={(event) => { handleChangeAmount(item, event); }}
                                            inputMode="numeric"
                                            onKeyDown={(event) => {
                                                if (!/[0-9]/.test(event.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <Button variant="outline-warning">Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        }
    </div>

}

export default Cart;