import "./Purchased.scss"
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import ModalPurchase from '../Purchase/ModalPurchase';
import { useMediaQuery } from "react-responsive";

const Purchased = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../assets/image_products', false, /\.(png|jpe?g|svg)$/));
    let clone = []
    for (let i = 0; i < 10; i++) {
        clone.push({
            id: i,
            name: `Apple Juice (${i * 100} ml)`,
            price: "100 rup",
            image: images[Math.floor(Math.random() * images.length)],
            address: "Революционная 46, Самара, Россия",
            reviews: [
                {
                    user: "stan@juice-sh.op",
                    review: "I'd stand on my head to make you a deal for this piece of art."
                },
                {
                    user: "bender@juice-sh.op",
                    review: "Just when my opinion of humans couldn't get any lower, along comes Stanewqceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                }


            ],
            description: "Finest pressings of apples. Allergy disclaimer: Might contain traces of worms. Can be sent back to us for recycling."

        })
    }

    const [listProductPurchased, setListProductPurchased] = useState(clone);
    const [show, setShow] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


    return <div className="basket-container">
        {
            isMobile ?
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Address delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProductPurchased && listProductPurchased.length > 0 && listProductPurchased.map((item, key) => {
                                return <tr key={key + ' product-in-basket'}>
                                    <td>{key}</td>
                                    <td>
                                        <div className="product-container-purchased">
                                            <span>{item.name}</span>
                                            <img src={item.image}></img>
                                            <span>{item.price}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {item.address}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table> :
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Address delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProductPurchased && listProductPurchased.length > 0 && listProductPurchased.map((item, key) => {
                                return <tr key={key + ' product-in-basket'}>
                                    <td>{key}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={item.image}></img>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.address}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
        }
        <ModalPurchase show={show} setShow={setShow} ></ModalPurchase>
    </div>
}

export default Purchased