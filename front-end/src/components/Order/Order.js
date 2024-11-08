import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalPurchase from '../Purchase/ModalPurchase';
import { useMediaQuery } from 'react-responsive';
import ModalPromocode from '../Purchase/ModalPromocode';
import { deleteCart, getCart, getOrder, putCart } from '../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import "./Order.scss"
import { doFetchListOrder } from '../../redux/action/listOrderAction';


const Order = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../assets/image_products', false, /\.(png|jpe?g|svg)$/));

    const [show, setShow] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [itemCurrent, setItemCurrent] = useState(null);
    const [showModalPromocode, setShowModalPromocode] = useState(false);
    const [code, setCode] = useState('');
    const [purchaseAll, setPurchaseAll] = useState(false);
    const [listOrder, setListOrder] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const dispatch = useDispatch();

    const fetchListOrder = async () => {
        const res = await getOrder();
        setListOrder(res?.data);
        dispatch(doFetchListOrder({ numberOrder: res?.data?.length }));
    }

    const handlePurchaseAll = () => {
        setPurchaseAll(true);
        setShow(true);
    }

    useEffect(() => {
        fetchListOrder();
    }, []);

    return <div className="basket-container">
        {!isMobile ? listOrder && listOrder?.length > 0 && listOrder.map((order, key) => {
            return <div className='border-order' key={order?.id}>
                <div className='total-price-content'>
                    {`Total price: ${order?.total_price} руб.`}
                    <div>
                        <Button variant="outline-primary" onClick={handlePurchaseAll}>
                            Purchase all
                        </Button>
                    </div>
                    <div className='promocode-all'>
                        <Button
                            onClick={() => { setCurrentOrder(order); setShowModalPromocode(true); }}
                            variant="outline-success">
                            Code
                        </Button>
                        <input
                            disabled
                            value={order?.code || ''}
                        ></input>
                    </div>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className='column-no'>No</th>
                            <th className='column-name'>Name</th>
                            <th className='column-img'>Image</th>
                            <th className='column-amount'>Amount</th>
                            <th className='column-price'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order?.purchases && order?.purchases?.length > 0 && order?.purchases.map((product, key) => {
                                return <tr key={key + ' product-in-basket'}>
                                    <td>{key}</td>
                                    <td>{product?.product?.name}</td>
                                    <td>
                                        <img src={images[product?.product?.id % images.length]}></img>
                                    </td>
                                    <td>
                                        <input
                                            disabled
                                            value={product?.amount || ''}
                                            style={{ textAlign: "center", fontSize: "15px", width: "100%" }}
                                        ></input>
                                    </td>
                                    <td>
                                        {
                                            product?.product?.sale && product?.product?.sale < product?.product?.full_price ?
                                                <>
                                                    <div className='full-price line-through'>
                                                        {product?.product?.full_price + " руб."}
                                                    </div>
                                                    <div className='sale'>
                                                        {product?.product?.sale + " руб."}
                                                    </div>

                                                </>
                                                :
                                                <div className='full-price'>
                                                    {product?.product?.full_price + " руб."}
                                                </div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table></div>
        }) :
            listOrder && listOrder?.length > 0 && listOrder.map((order, key) => {
                return <div className='border-order' key={order?.id}>
                    <div className='total-price-content'>
                        {`Total price: ${order?.total_price} руб.`}
                        <div>
                            <Button variant="outline-primary" onClick={handlePurchaseAll}>
                                Purchase all
                            </Button>
                        </div>
                        <div className='promocode-all'>
                            <Button
                                onClick={() => { setCurrentOrder(order); setShowModalPromocode(true); }}
                                variant="outline-success">
                                Code
                            </Button>
                            <input
                                disabled
                                value={order?.code || ''}
                            ></input>
                        </div>
                    </div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className='column-no'>No</th>
                                <th className='column-product'>Product</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order?.purchases && order?.purchases?.length > 0 && order.purchases.map((product, key) => {
                                    return <tr key={key + ' product-in-basket'}>
                                        <td>{key}</td>
                                        <td>
                                            <div className='product-in-basket-container'>
                                                <span>{product?.product?.name}</span>
                                                <img src={images[product?.product?.id % images.length]}></img>
                                                {
                                                    product?.product?.sale && product?.product?.sale < product?.product?.full_price ?
                                                        <>
                                                            <div className='full-price line-through'>
                                                                {product?.product?.full_price + " руб."}
                                                            </div>
                                                            <div className='sale'>
                                                                {product?.product?.sale + " руб."}
                                                            </div>

                                                        </>
                                                        :
                                                        <div className='full-price'>
                                                            {product?.product?.full_price + " руб."}
                                                        </div>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className='action-content'>
                                                <input
                                                    disabled
                                                    value={product?.amount || ''}
                                                    style={{ textAlign: "center", fontSize: "15px", width: "100%" }}
                                                ></input>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            })
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
            listOrder={listOrder}
            setListOrder={setListOrder}
            currentOrder={currentOrder}
            fetchListOrder={fetchListOrder}
        ></ModalPromocode>
    </div>

}

export default Order;