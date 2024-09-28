import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import "./Basket.scss"
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import ModalPurchase from '../Purchase/ModalPurchase';

const Basket = (props) => {
    const listProduct = useSelector(state => state.orderListState.orderList)
    const [show, setShow] = useState(false);

    return <div className="basket-container">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listProduct && listProduct.length > 0 && listProduct.map((item, key) => {
                        return <tr key={key + ' product-in-basket'}>
                            <td>{key}</td>
                            <td>{item.name}</td>
                            <td>
                                <img src={item.image}></img>
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <div className='action-content'>
                                    <Button variant="outline-primary" onClick={() => setShow(true)}>Puschare</Button>
                                    <Button variant="outline-warning">Delete</Button>
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <ModalPurchase show={show} setShow={setShow} ></ModalPurchase>
    </div>

}

export default Basket;