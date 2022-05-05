import './AddOrder.css'
import React, {useEffect, useState} from "react";
import request from "../../utils/request";
import {api} from "../../utils/api";
import {CURRENTUSER, TOKEN} from "../../utils/constant";
import {useHistory} from "react-router-dom";
import {Modal, ModalHeader} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation';
import ReactPaginate from "react-paginate";


function AddOrder() {

    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const history = useHistory();
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [oldTotalPrice, setOldTotalPrice] = useState(0);
    const [wasGiven, setWasGiven] = useState(0);
    const [currentProduct, setCurrentProduct] = useState('');
    const currentUser = JSON.parse(localStorage.getItem(CURRENTUSER))
    const [page, setPage] = useState(0);
    const [orders, setOrders] = useState([]);
    const [itemOffset, setItemOffset]=useState(0);
    const [pageCount, setPageCount]=useState(0);
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllProducts()
            getAllOrders()
            getTotalPrice()
            setPageCount(Math.ceil(orders.count / orders.size));
        } else {
            history.push('/')
        }
    }, [itemOffset, orders.size])
    const getAllOrders = () => {
        request({
            url: api.getByUserId + currentUser.userId + `?page=${page}&size=10`,
            method: 'GET'
        }).then(res => {
            setOrders(res.data)
        }).catch(err => {
        })
    }
    const getAllProducts = () => {
        request({
            url: api.getProducts,
            method: 'GET'
        }).then(res => {
            setProduct(res.data.object)
        }).catch(err => {
        })
    }
    const openSaveModal = () => {
        setIsOpen(!isOpen)
    }
    const confirmation = () => {
        setIsOpenConfirm(!isOpenConfirm);
    }
    const showPrice = (e, v) => {
        request({
            url: api.getOneProduct + v.productId,
            method: 'GET'
        }).then(res => {
            setCurrentProduct(res.data)
            setWasGiven(v.wasGiven)
            setTotalPrice(res.data.price * v.wasGiven)
        }).catch(err => {
        })
    }
    const addOrder = (e, v) => {
        let DTO = {
            userId: '',
            productId: '',
            wasGiven: ''
        }
        DTO.userId = currentUser.userId
        DTO.productId = currentProduct.id
        DTO.wasGiven =wasGiven;
        currentProduct.residue < wasGiven ? alert("Omborda yetarlicha mahsulot mavjud emas!") :
        request({
            url: api.addOrders,
            method: 'POST',
            data: DTO
        }).then(res => {
            setIsOpenConfirm(false);
            setIsOpen(false);
            getAllOrders();
            getTotalPrice();
        }).catch(err => {
        })
    }
    const handlePageClick = (event) => {
        setPage(event.selected);
        const newOffset = event.selected * orders.size % orders.count;
        setItemOffset(newOffset);

    };
    const cancelOrder = () => {
        setIsOpenConfirm(false);
        setCurrentProduct('');

    }
    const getTotalPrice = () => {
        request({
            url: api.getTotalPrice + currentUser.userId,
            method: 'GET'
        }).then(res => {
            setOldTotalPrice(res.data)
        }).catch(err => {
        })
    }
    return (
        <div>
            <div className="col-xl-12">
                <button type="button" className="btn btn-info m-1 p-1" onClick={() => history.goBack()}>
                    <span className="fa fa-arrow-left-circle"></span>Orqaga
                </button>

                <div className="row m-1 p-1">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                 alt="Maxwell Admin"/>
                                        </div>
                                        <h5 className="user-name">{currentUser.firstName + ' ' + currentUser.lastName}</h5>
                                        <h6 className="user-phone">{currentUser.phoneNumber}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>Manzil</h5>
                                        <p>{currentUser.address + ', ' + currentUser.street + ' ko`chasi, ' + currentUser.home +
                                            '-uy, ' + ' (' + currentUser.destination + ')'}</p>
                                    </div>
                                    <div className="about">
                                        <h5>Umumiy buyurtmalar narxi</h5>
                                        <h2 className="text-dark">{oldTotalPrice + ' UZS'}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h2 className="text-center">Buyurtmalar</h2>
                        <div>
                            <button className="btn btn-info"
                                    onClick={() => openSaveModal()}>Buyurtma
                            </button>
                            <table className="table table-row-cell text-center">
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Mahsulot nomi</th>
                                    <th>Mahsulot soni</th>
                                    <th>Mahsulot narxi</th>
                                    <th>Buyurtma sanasi</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.totalElements?.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.wasGiven}</td>
                                        <td>{item.orderPrice}</td>
                                        <td>{item.createdAt.replace("T", " ").split(".")[0]}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <ReactPaginate
                            nextLabel="keyingi >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< oldingi"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                    <Modal isOpen={isOpen} className="modal-dialog-centered">
                        <ModalHeader>Yangi buyurtma</ModalHeader>
                        <AvForm onValidSubmit={showPrice}>
                            <div className="row m-2">
                                <div className="col-md-12">
                                    <h4 className="fw-bold">Yangi buyurtma</h4>
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-md-12">
                                    <AvField
                                        type="select"
                                        name="productId">
                                        <option>Mahsulotni tanlang</option>
                                        {product?.map((item, index) =>
                                            <option value={item.id}>{item.name}</option>
                                        )}
                                    </AvField>
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-md-12">
                                    <AvField
                                        label="Mijozga berildi"
                                        type="number"
                                        name="wasGiven" required/>
                                </div>
                            </div>
                            <button className="btn btn-success m-2" onClick={() => confirmation()}>saqlash</button>
                            <button className="btn btn-danger m-2"
                                    onClick={() => setIsOpen(false)}>bekor qilish
                            </button>
                        </AvForm>
                    </Modal>
                    <Modal isOpen={isOpenConfirm}>
                        <ModalHeader>{'Umumiy narx: ' + totalPrice + ' so`m'}</ModalHeader>
                        <AvForm onValidSubmit={addOrder}>
                            <button className="btn btn-success m-1 p-1">Tasdiqlash</button>
                            <button className="btn btn-danger m-1 p-1" onClick={() => cancelOrder()}>Bekor
                                qilish
                            </button>
                        </AvForm>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default AddOrder;