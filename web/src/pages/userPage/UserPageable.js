import ReactPaginate from 'react-paginate';
import React, {
    useEffect,
    useState
} from 'react';
import request from "../../utils/request";
import {api} from "../../utils/api";
import AddOrder from "./AddOrder";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import InputProductPage from "./InputProductPage";
import {Modal, ModalFooter, ModalHeader} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation'
import './User.css'
import {CURRENTUSER, TOKEN} from "../../utils/constant";
import {Link, useHistory} from "react-router-dom";

function PaginatedItems(key, value) {
    let history = useHistory();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [currentUser, setCurrentUser] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [addShowModal, setAddShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [search, setSearch] = useState('');
    const getUsers = () => {
        request({
            url: api.getUsers + `?page=${page}&size=10&search=${search}`,
            method: 'GET'
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            alert("Xatolik!")
        })
    }
    const openOrderModal = (item) => {
        setCurrentUser(item);
        setShowOrderModal(!showOrderModal);
    }
    const addOrder = (e, v) => {
        let order = {
            userId: "",
            productId: "",
            wasGiven: "",
            taken: ""
        }
        order.userId = currentUser.userId
        order.productId = v.productId
        order.wasGiven = v.wasGiven
        order.taken = v.taken
        request({
            url: api.addOrders,
            method: 'POST',
            data: order
        }).then(res => {
            getUsers()
            openOrderModal()
        }).catch(err => {
        })
    }
    const editUserShowModal = (item) => {
        setCurrentUser(item)
        setShowModal(!showModal)
    }
    const addShowModalModal = () => {
        setAddShowModal(!addShowModal)
    }
    const editUser = (e, v) => {
        request({
            url: api.editUser + currentUser.userId,
            method: 'PUT',
            data: v
        }).then(res => {
            getUsers()
            setShowModal(false)
        }).catch(err => {
        })
    }
    const addUser = (e, v) => {
        request({
            url: api.saveUser,
            method: 'POST',
            data: v
        }).then(res => {
            getUsers()
            addShowModalModal()
        }).catch(err => {
            alert(err.message)
        })
    }
    const deleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setCurrentUser(item)
    }
    const deleteUser = () => {
        request({
            url: api.deleteUser + currentUser.userId,
            method: 'DELETE'
        }).then(res => {
            deleteModal()
            getUsers()
        }).catch(err => {
            alert(err)
        })
    }
    const outputModal = (item) => {
        setShowOutput(!showOutput)
        setCurrentUser(item)
    }
    const editInputProduct = (e, v) => {
        let DTO = {
            userId: "", productId: "", amount: ""
        }
        DTO.userId = currentUser.userId
        DTO.productId = v.productId
        DTO.amount = v.amount
        request({
            url: api.inputTrade,
            method: 'POST',
            data: DTO
        }).then(res => {
            getUsers()
            setShowOutput(false)
        })
    }
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getUsers()
            setPageCount(Math.ceil(users.count / users.size));
        } else {
            history.push("/")
        }

    }, [itemOffset, users.size]);

    const handleInputChange = (e, v) => {
        setSearch(v.search)
        request({
            url: api.getUsers + `?page=${page}&size=10&search=${v.search}`,
            method: 'GET'
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            alert("Xatolik!")
        })
    }
    const handlePageClick = (event) => {
        setPage(event.selected);
        const newOffset = event.selected * users.size % users.count;
        setItemOffset(newOffset);
    };
    const handlePageClickCancel = (e) => {
        request({
            url: api.getUsers + `?page=${page}&size=10`,
            method: 'GET'
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            alert("Xatolik!")
        })
    }
    const toLink = (item) => {
        setCurrentUser(item)
        localStorage.setItem(CURRENTUSER, JSON.stringify(item))
        history.push('/add-order')
    }


    return (
        <>
            <div className="items">
                <div className="topnav">
                    <Link to="/home">Asosiy</Link>
                    <Link to="/users">Mijozlar</Link>
                    {/*<Link to="/products">Mahsulotlar</Link>*/}
                    <Link to="/orders">Buyurtmalar</Link>

                    <div className="topnav-right">
                        <a href="/" onClick={() => localStorage.removeItem(TOKEN)}>Chiqish</a>
                    </div>
                </div>
                <h1 className="text-center text-primary">Mijozlar</h1>
                <div className="row">
                    <div className="col-md-9">
                        <button className="btn btn-success m-2"
                                onClick={() => addShowModalModal()}><i className="icon icon-plus"/>Qo'shish
                        </button>
                    </div>
                    <div className="col-md-3">
                        <AvForm className="example" style={{margin: "auto", width: "300px"}}
                                onValidSubmit={handleInputChange}>
                            <AvField type="text" placeholder="Qidiruv.." name="search"/>
                            <button type="submit" onChange={handlePageClick}><i className="fa fa-search"></i></button>
                            <button type="submit" onClick={() => handlePageClickCancel()}><i
                                className="fa fa-trash"></i>
                            </button>
                        </AvForm>
                    </div>
                </div>
                <div className="row p-xl-4">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Ismi va familiyasi</th>
                            <th>Telefon raqami</th>
                            <th>Mijozdagi qoldiq</th>
                            <th>Manzil</th>
                            <th>Buyurtma</th>
                            <th>Taxrirlash</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.totalElements?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.firstName + ' ' + item.lastName}</td>
                                <td>{item.phoneNumber}</td>
                                <td className="col-md-1">{item.residues?.map(res => (res.productName + ' ' + res.amount + ' dona,  '))}</td>
                                <td className="col-md-2">{item.address + ', \n'
                                    + item.street + ' ko`chasi, \n' +
                                    item.home + '-uy, (' + item.destination + ')'}</td>
                                <td>
                                    <button className="btn btn-info p-1 m-1"
                                            onClick={() => toLink(item)}>buyurtma
                                    </button>
                                    <br/>
                                    <button className="btn btn-info p-1 m-1"
                                            onClick={() => outputModal(item)}
                                    >Qaytarish
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-success p-1 m-1"
                                            onClick={() => editUserShowModal(item)}
                                    >Taxrirlash
                                    </button>
                                    <button className="btn btn-danger p-1 m-1"
                                            onClick={() => deleteModal(item)}
                                    >O`chirish
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={showDeleteModal}>
                    <ModalHeader>{'Mijozni o`chirishni xohlaysizmi'}</ModalHeader>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={deleteUser}>HA</button>
                        <button className="btn btn-success" onClick={deleteModal}>YO`Q</button>
                    </ModalFooter>
                </Modal>
                {showOrderModal &&
                    <AddOrder
                        toggle={(x) => openOrderModal(x)}
                        addOrder={addOrder}
                        currentUser={currentUser}
                    />}
                {
                    showModal &&
                    <EditUser
                        toggle={(x) => editUserShowModal(x)}
                        editUser={editUser}
                        currentUser={currentUser}
                    />}
                {addShowModal && <AddUser
                    toggle={(x) => addShowModalModal(x)}
                    addUser={addUser}/>
                }{
                showOutput &&
                <InputProductPage
                    toggle={(x) => outputModal(x)}
                    InputProduct={editInputProduct}
                    currentUser={currentUser}/>
            }
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
        </>
    );
}

export default PaginatedItems;
