import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import "../Basket.scss"
import Button from 'react-bootstrap/Button';
import ModalPurchase from '../../Purchase/ModalPurchase';
import { useMediaQuery } from 'react-responsive';
import ModalPromocode from '../../Purchase/ModalPromocode';
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../service/apiService';
import AdminModalAddProduct from './AdminModalAddProduct';

const ProductManager = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../../assets/image_products', false, /\.(png|jpe?g|svg)$/));

    const [listProduct, setListProduct] = useState([]);
    const [showModalAddproduct, setShowModalAddproduct] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const userState = useSelector(state => state.userState);

    const fetchListProduct = async () => {
        const res = await getProducts();
        setListProduct(res?.data)
    }

    useEffect(() => {
        fetchListProduct();
    }, [])

    const handleChangeAmount = (item, value) => {
        if (+value <= 0) { value = 1 }
        setListProduct(prevItems =>
            prevItems.map(i =>
                i?.id === item?.id ? { ...i, amount: value } : i
            )
        );
    };


    return <div className="basket-container">
        <Button onClick={() => (setShowModalAddproduct(true))}>Add product</Button>
        {!isMobile ?
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='column-no'>No</th>
                        <th className='column-name'>Name</th>
                        <th className='column-img'>Image</th>
                        <th className='column-amount'>Amount</th>
                        <th className='column-price'>Price</th>
                        <th className='column-action'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProduct && listProduct.length > 0 && listProduct.map((item, key) => {
                            return <tr key={key + ' product-in-basket'}>
                                <td>{key}</td>
                                <td>{item?.name}</td>
                                <td>
                                    <img src={images[item?.id % images.length]}></img>
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
                                        item?.sale && item?.sale < item?.full_price ?
                                            <>
                                                <div className='full-price line-through'>
                                                    {item.full_price + " руб."}
                                                </div>
                                                <div className='sale'>
                                                    {item?.sale + " руб."}
                                                </div>

                                            </>
                                            :
                                            <div className='full-price'>
                                                {item?.full_price + " руб."}
                                            </div>
                                    }
                                </td>
                                <td>
                                    <div className='action-content'>
                                        <Button variant="outline-primary">Change</Button>
                                        <Button variant="outline-warning"
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
                                        <span>{item?.name}</span>
                                        <img src={images[item?.id % images.length]}></img>
                                        {

                                            item?.sale && item?.sale < item?.full_price ?
                                                <>
                                                    <div className='full-price line-through'>
                                                        {item?.full_price + " руб."}
                                                    </div>
                                                    <div className='sale'>
                                                        {item?.sale + " руб."}
                                                    </div>

                                                </>
                                                :
                                                <div className='full-price'>
                                                    {item?.full_price}
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
                                        <Button variant="outline-primary">Change</Button>
                                        <Button variant="outline-warning">Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        }
        <AdminModalAddProduct
            showModalAddproduct={showModalAddproduct}
            fetchListProduct={fetchListProduct}
            setShowModalAddproduct={setShowModalAddproduct}
        ></AdminModalAddProduct>
    </div>

}

export default ProductManager;