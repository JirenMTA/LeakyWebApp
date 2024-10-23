import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import "./Basket.scss"
import Button from 'react-bootstrap/Button';
import ModalPurchase from '../Purchase/ModalPurchase';
import { useMediaQuery } from 'react-responsive';
import ModalPromocode from '../Purchase/ModalPromocode';

const Basket = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../assets/image_products', false, /\.(png|jpe?g|svg)$/));
    let clone = []
    for (let i = 0; i < 10; i++) {
        const full_price = Math.floor(Math.random() * 10) * 10 + 200;
        clone.push({
            id: i,
            name: `Apple Juice (${i * 100} ml)`,
            full_price: full_price,
            sale: full_price - Math.floor(Math.random() * 2) * 10,
            image: images[Math.floor(Math.random() * images.length)],
            address: "Революционная 46, Самара, Россия",
        });
    }

    const [listProduct, setListProduct] = useState(clone);
    const [show, setShow] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [item, setItem] = useState(null);
    const [showModalPromocode, setShowModalPromocode] = useState(false);
    const [code, setCode] = useState('');

    useEffect(() => {
        setListProduct(prevList =>
            prevList.map(product =>
                product?.id === item?.id ? { ...product, ...item } : product
            )
        );
    }, [item]);

    return <div className="basket-container">
        {!isMobile ?
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='column-no'>No</th>
                        <th className='column-name'>Name</th>
                        <th className='column-img'>Image</th>
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
                                <td>{item?.name}</td>
                                <td>
                                    <img src={item?.image}></img>
                                </td>
                                <td>
                                    {

                                        item?.total_price && item?.total_price < item?.sale ?
                                            <>
                                                <div className='full-price line-through'>
                                                    {item?.full_price + " руб."}
                                                </div>
                                                <div className='total-price'>
                                                    {item?.total_price + " руб."}
                                                </div>
                                            </>
                                            :
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
                                                    {item?.full_price + " руб."}
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
                                        <Button variant="outline-primary" onClick={() => { setShow(true); setItem(item) }}>Purchase</Button>
                                        <Button variant="outline-success"
                                            onClick={() => { setShowModalPromocode(true); setItem(item); setCode(item?.code || '') }}>
                                            Promocode
                                        </Button>
                                        <Button variant="outline-warning">Delete</Button>
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
                                        <span>{item.name}</span>
                                        <img src={item.image}></img>
                                        {

                                            item?.total_price && item?.total_price < item?.sale ?
                                                <>
                                                    <div className='full-price line-through'>
                                                        {item?.full_price + " руб."}
                                                    </div>
                                                    <div className='total-price'>
                                                        {item?.total_price + " руб."}
                                                    </div>
                                                </>
                                                :
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
                                        <input
                                            disabled
                                            style={{ width: "100%", textAlign: "center", fontSize: "10px" }}
                                            value={item?.code || ''}
                                        ></input>
                                        <Button variant="outline-primary" onClick={() => { setShow(true); setItem(item) }}>Purchase</Button>
                                        <Button variant="outline-success" onClick={() => { setShowModalPromocode(true); setItem(item) }}>Code</Button>
                                        <Button variant="outline-warning">Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        }
        <ModalPurchase show={show} setShow={setShow} item={item} ></ModalPurchase>
        <ModalPromocode
            show={showModalPromocode}
            setShow={setShowModalPromocode}
            item={item}
            code={code || ''}
            setCode={setCode}
            setItem={setItem}
        ></ModalPromocode>
    </div>

}

export default Basket;