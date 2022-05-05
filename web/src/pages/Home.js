import React, {useEffect, useState} from 'react';
import './Home.css'
import {TOKEN} from "../utils/constant";
import request from "../utils/request";
import {api} from "../utils/api";
import EditUser from "./EditUser";
import EditPassword from "./EditPassword";
import {Link, useHistory} from "react-router-dom";
import AddProduct from "./productPage/AddProduct";
import EditProduct from "./productPage/EditProduct";
import {Modal, ModalBody, ModalHeader} from "reactstrap";

function Home() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState('');
    const [currentProduct, setCurrentProduct] = useState('');
    const [getCounts, setGetCounts] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getMe()
            getCount()
        } else {
            history.push('/')
        }
    }, [])

    const getCount = () => {
        request({
            url: api.getOrderCount,
            method: 'GET'
        }).then(res => {
            setGetCounts(res.data)
        }).catch(err => {
        })
    }
    const getMe = () => {
        request({
            url: api.me,
            method: 'GET'
        }).then(res => {
            setCurrentUser(res.data.object)
        })
    }
    const editUserModal = () => {
        setShowEditModal(true)
    }
    const passwordModal = () => {
        setShowPasswordModal(true)
    }
    const editUser = (e, v) => {
        request({
            url: api.editAdmin + currentUser.userId,
            method: 'PUT',
            data: v
        }).then(res => {
            getMe()
            setShowEditModal(false)
        }).catch(err => {
        })
    }
    const editPassword = (e, v) => {
        request({
            url: api.editPassword + currentUser.id,
            method: 'PUT',
            data: v
        }).then(res => {
            getMe()
            passwordModal()
        })
    }
    const saveModal = () => {
        setOpenSaveModal(true)
    }
    const deleteModal = (item) => {
        setCurrentProduct(item);
        setOpenDeleteModal(true)
    }
    const editProductModal = (item) => {
        setCurrentProduct(item);
        setOpenEditModal(true);
    }
    const addProduct = (e, v) => {
        request({
            url: api.addProducts,
            method: 'POST',
            data: v
        }).then(res => {
            getCount()
            setOpenSaveModal(false);
        }).catch(err => {
            alert("Saqlashda hatolik!")
        })
    }
    const editProduct = (e, v) => {
        request({
            url: api.editProduct + currentProduct.id,
            method: 'PUT',
            data: v
        }).then(res => {
            getCount();
            setOpenEditModal(false);
        })
    }
    const deleteProduct = () => {
        request({
            url: api.deleteProduct + currentProduct.id,
            method: 'DELETE'
        }).then(res => {
            getCount()
            setOpenDeleteModal(false);
        })
    }
    return (
        <div>
            <div className="topnav">
                <Link to="/home">Asosiy</Link>
                <Link to="/users">Mijozlar</Link>
                {/*<Link to="/products">Mahsulotlar</Link>*/}
                <Link to="/orders">Buyurtmalar</Link>

                <div className="topnav-right">
                    <a href="/" onClick={() => localStorage.removeItem(TOKEN)}>Chiqish</a>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="profile-user-box card-box bg-custom">
                        <div className="row">
                            <div className="col-sm-10"><span className="float-left mr-3"><img
                                src={"https://bootdey.com/img/Content/avatar/avatar1.png"} alt="image"
                                className="thumb-lg rounded-circle"/></span>
                                <div className="media-body text-white">
                                    <h4 className="mt-1 mb-1 font-18">{currentUser.firstName + ' ' + currentUser.lastName}</h4>
                                    <p className="font-13 text-light">Sayt Adminstratori</p>

                                    <p className="font-13 text-light fw-bold"><strong>Telefon :</strong><span
                                        className="m-l-15">{currentUser.phoneNumber}</span></p>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="dropdown text-right">
                                    <button type="button" className="dropbtn btn btn-light waves-effect"
                                    ><i
                                        className="mdi mdi-account-settings-variant mr"></i> Taxrirlash
                                    </button>
                                    <div className="dropdown-content">
                                        <a href="#" className="text-center text-primary"
                                           onClick={() => editUserModal()}>Ma`lumotni taxrirlash</a>
                                        <a href="#" className="text-center text-primary"
                                           onClick={() => passwordModal()}>Parolni taxrirlash</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center text-primary">Umumiy ma`lumotlar</h1>
            <div className="row p-xl-4">
                {
                    showEditModal &&
                    <EditUser
                        toggle={(x) => editUserModal(x)}
                        editUser={editUser}
                        currentUser={currentUser}/>
                }{
                showPasswordModal &&
                <EditPassword
                    toggle={(x) => passwordModal(x)}
                    editPassword={editPassword}
                    currentUser={currentUser}
                />
            }{
                openSaveModal &&
                <AddProduct
                    toggle={(x) => saveModal(x)}
                    addProduct={addProduct}/>
            }{
                openEditModal &&
                <EditProduct
                    toggle={(x) => editProductModal(x)}
                    editProduct={editProduct}
                    currentProduct={currentProduct}/>
            }
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="card-box1 tilebox-one"><i
                                className="icon-layers float-right text-muted"></i>
                                <h6 className="text-muted text-uppercase mt-0"><b
                                    className="color-text">Buyurtmalar</b></h6>
                                <h2 className="text-size" data-plugin="counterup">Jami:</h2>
                                <h2 className="" data-plugin="counterup">{getCounts.orderCount}</h2>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-box1 tilebox-one"><i
                                className="icon-paypal float-right text-muted"></i>
                                <h6 className="text-muted text-uppercase mt-0 color-text"><b
                                    className="color-text">Mijozlar soni</b></h6>
                                <h2 className="text-size"><span data-plugin="counterup">Jami:</span></h2>
                                <h2 className=""><span
                                    data-plugin="counterup">{getCounts.userCount?.countUser}</span></h2>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-box1 tilebox-one"><i
                                className="icon-paypal float-right text-muted"></i>
                                <h6 className="text-muted text-uppercase mt-0 color-text"><b
                                    className="color-text">1 oydan oshiq buyurtma qilmagan mijozlar</b></h6>
                                <h2 className="text-size"><span data-plugin="counterup">Jami:</span></h2>
                                <h2 className=""><span
                                    data-plugin="counterup"><Link to={"/last-order"}>{getCounts.lastDayCount}</Link></span></h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4 className="text-center color-text fw-bold">Jami mahsulotlar </h4>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Mahsulot nomi</th>
                                    <th>Mahsulot soni</th>
                                    <th>Mahsulot narxi (donaga)</th>
                                    <th className="col-md-3 example">Taxrirlash
                                        <button type="submit" onClick={() => saveModal()}><i
                                            className="fa fa-save"></i></button></th>
                                </tr>
                                </thead>
                                <tbody>
                                {getCounts.products ? getCounts.products?.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.amount + ' dona'}</td>
                                        <td>{item.price + ' so`m'}</td>
                                        <td className="example">
                                            <button type="submit" onClick={() => editProductModal(item)}><i
                                                className="fa fa-edit"></i></button>
                                            <button type="submit" onClick={() => deleteModal(item)}><i
                                                className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ) : 'Ma`lumotlar mavjud emas!'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal isOpen={openDeleteModal}>
                    <ModalHeader>{currentProduct.productName + 'ni o`chirmoqchimisiz?'}</ModalHeader>
                    <ModalBody>
                        <button className="btn btn-danger p-1 m-2" onClick={() => deleteProduct()}>O`chirish
                        </button>
                        <button className="btn btn-success p-1 m-1"
                                onClick={() => setOpenDeleteModal(false)}>Bekor qilish
                        </button>
                    </ModalBody>
                </Modal>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="text-center color-text fw-bold">Omborda mavjud</h4>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Mahsulot nomi</th>
                                <th>Mahsulot soni</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getCounts.products ? getCounts.products?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.productName}</td>
                                    <td>{(item.residue) + ' dona'}</td>
                                </tr>) : 'Ma`lumotlar mavjud emas'}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-center color-text fw-bold">Mijozlarda mavjud</h4>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Mahsulot nomi</th>
                                <th>Mahsulot soni</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getCounts.products ? getCounts.products?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.amount - item.residue + ' dona'}</td>
                                </tr>) : <h6 className="text-center">Ma`lumotlar mavjud emas</h6>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
