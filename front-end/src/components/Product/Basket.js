import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import "./Basket.scss"
import Button from 'react-bootstrap/Button';
import ModalPurchase from '../Purchase/ModalPurchase';
import { useMediaQuery } from 'react-responsive';
import ModalPromocode from '../Purchase/ModalPromocode';
import { deleteCart, getCart, putCart } from '../../service/apiService';
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { doFetchListOrder } from '../../redux/action/orderListAction';

const Basket = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../assets/image_products', false, /\.(png|jpe?g|svg)$/));

    const [listProduct, setListProduct] = useState([]);
    const [show, setShow] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [itemCurrent, setItemCurrent] = useState(null);
    const [showModalPromocode, setShowModalPromocode] = useState(false);
    const [code, setCode] = useState('');
    const userState = useSelector(state => state.userState);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const [promocodeAll, setPromocodeAll] = useState('');
    const [purchaseAll, setPurchaseAll] = useState(false);

    useEffect(() => {
        setListProduct(prevList =>
            prevList.map(product =>
                product?.product?.id === itemCurrent?.product?.id ? { ...product, ...itemCurrent } : product
            )
        );
    }, [itemCurrent]);

    const fetchListCart = async () => {
        const res = await getCart();
        setListProduct(res?.data?.products);
        setTotalPrice(res?.data?.total_price);
        dispatch(doFetchListOrder({ orderList: res?.data?.products }));
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

    const handlePurchaseAll = () => {
        setPurchaseAll(true);
        setShow(true);
    }


    useEffect(() => {
        fetchListCart();
    }, []);

    return <div className="basket-container">
        <div className='total-price-content'>
            {`Total price: ${totalPrice} руб.`}
            <div>
                <Button variant="outline-primary" onClick={handlePurchaseAll}>
                    Purchase all
                </Button>
            </div>
            <div className='promocode-all'>
                <Button
                    onClick={() => { setItemCurrent(null); setShowModalPromocode(true); }}
                    variant="outline-success">
                    Code
                </Button>
                <input
                    disabled
                    value={promocodeAll || ''}
                ></input>
            </div>
        </div>

        {!isMobile ?
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='column-no'>No</th>
                        <th className='column-name'>Name</th>
                        <th className='column-img'>Image</th>
                        <th className='column-amount'>Amount</th>
                        <th className='column-price'>Price</th>
                        <th className='column-code'>Promocode</th>
                        <th className='column-action'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProduct && listProduct.length > 0 && listProduct.map((item, key) => {
                            return <tr key={key + ' product-in-basket'}>
                                <td>{key}</td>
                                <td>{item?.product?.name}</td>
                                <td>
                                    <img src={images[item?.product?.id % images.length]}></img>
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

                                        item?.product?.total_price && item?.product?.total_price < item?.product?.sale ?
                                            <>
                                                <div className='full-price line-through'>
                                                    {item?.product?.full_price + " руб."}
                                                </div>
                                                <div className='total-price'>
                                                    {item?.product?.total_price + " руб."}
                                                </div>
                                            </>
                                            :
                                            item?.product?.sale && item?.product?.sale < item?.product?.full_price ?
                                                <>
                                                    <div className='full-price line-through'>
                                                        {item?.product?.full_price + " руб."}
                                                    </div>
                                                    <div className='sale'>
                                                        {item?.product?.sale + " руб."}
                                                    </div>

                                                </>
                                                :
                                                <div className='full-price'>
                                                    {item?.product?.full_price + " руб."}
                                                </div>
                                    }
                                </td>
                                <td>
                                    <input
                                        disabled
                                        value={item?.code || ''}
                                        style={{ textAlign: "center", fontSize: "15px", width: "100%" }}
                                    ></input>
                                </td>
                                <td>
                                    <div className='action-content'>
                                        <Button variant="outline-primary" onClick={() => { setPurchaseAll(false); setShow(true); setItemCurrent(item) }}>Purchase</Button>
                                        <Button variant="outline-success"
                                            onClick={() => { setShowModalPromocode(true); setItemCurrent(item); setCode(item?.code || '') }}>
                                            Promocode
                                        </Button>

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
                                        <img src={images[item?.product?.id % images.length]}></img>
                                        {

                                            item?.product?.total_price && item?.product?.total_price < item?.product?.sale ?
                                                <>
                                                    <div className='full-price line-through'>
                                                        {item?.product?.full_price + " руб."}
                                                    </div>
                                                    <div className='total-price'>
                                                        {item?.product?.total_price + " руб."}
                                                    </div>
                                                </>
                                                :
                                                item?.product?.sale && item?.product?.sale < item?.product?.full_price ?
                                                    <>
                                                        <div className='full-price line-through'>
                                                            {item?.product?.full_price + " руб."}
                                                        </div>
                                                        <div className='sale'>
                                                            {item?.product?.sale + " руб."}
                                                        </div>

                                                    </>
                                                    :
                                                    <div className='full-price'>
                                                        {item?.product?.full_price}
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
                                        <input
                                            disabled
                                            style={{ width: "100%", textAlign: "center", fontSize: "10px" }}
                                            value={item?.code || ''}
                                        ></input>
                                        <Button variant="outline-primary" onClick={() => { setShow(true); setItemCurrent(item) }}>Purchase</Button>
                                        <Button variant="outline-success" onClick={() => { setShowModalPromocode(true); setItemCurrent(item) }}>Code</Button>
                                        <Button variant="outline-warning">Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        }
        <ModalPurchase
            show={show}
            setShow={setShow}
            item={itemCurrent}
            purchaseAll={purchaseAll}
        />
        <ModalPromocode
            show={showModalPromocode}
            setShow={setShowModalPromocode}
            item={itemCurrent}
            code={code || ''}
            setCode={setCode}
            setItem={setItemCurrent}
            promocodeAll={promocodeAll}
            setPromocodeAll={setPromocodeAll}
        ></ModalPromocode>
    </div>

}

export default Basket;