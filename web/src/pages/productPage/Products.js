import React, {Component} from 'react';
import image from '../../images/36.png'
import {TOKEN} from "../../utils/constant";
import request from "../../utils/request";
import {api} from "../../utils/api";
import './Product.css'
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import {Modal, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";

class Products extends Component {

    state = {
        products: [],
        currentProduct: '',
        showModal: false,
        addShowModal: false,
        deleteShowModal: false
    }

    componentDidMount() {
        if (localStorage.getItem(TOKEN)) {
            this.getProducts()
        } else {
            this.props.history.push('/')
        }
    }

    getProducts = () => {
        request({
            url: api.getProducts,
            method: 'GET'
        }).then(res => {
            this.setState({
                products: res.data.object
            })
        })
    }
    addShowModal = () => {
        this.setState({
            addShowModal: !this.state.addShowModal
        })
    }
    addProduct = (e, v) => {
        let current = this.state.currentProduct;
        request({
            url: !current ? api.addProducts : (api.editProduct + current.id),
            method: !current ? 'POST' : 'PUT',
            data: v
        }).then(res => {
            this.getProducts()
            !current ? this.addShowModal() : this.editModal()
        }).catch(err => {
            alert("Saqlashda hatolik!")
        })
    }
    editModal = (item) => {
        this.setState({
            currentProduct: item,
            showModal: !this.state.showModal
        })
    }
    deleteModal=(item)=>{
        this.setState({
            deleteShowModal:!this.state.deleteShowModal,
            currentProduct:item
        })
    }
    deleteProduct=()=>{
        let current=this.state.currentProduct
        request({
            url:api.deleteProduct+current.id,
            method:'DELETE'
        }).then(res=>{
            this.getProducts()
            this.setState({
                deleteShowModal:false
            })
        })
    }

    render() {
        const {products, currentProduct, addShowModal, showModal, deleteShowModal} = this.state
        return (
            <div>
                <div className="topnav">
                    <Link to="/home">Asosiy</Link>
                    <Link to="/users">Mijozlar</Link>
                    <Link to="/products">Mahsulotlar</Link>
                    <Link to="/orders">Buyurtmalar</Link>

                    <div className="topnav-right">
                        <a href="/" onClick={()=>localStorage.removeItem(TOKEN)}>Chiqish</a>
                    </div>
                </div>
                <h1 className="text-center text-info">Mahsulotlar</h1>
                <div className="container">
                    <div className="card-1 m-1 p-1">
                        <button className="btn btn-info cursor"
                                onClick={this.addShowModal}>Qo`shish
                        </button>
                    </div>
                </div>

                <div className="gallery">
                    {products?.map((item, index) =>
                        <div className="container">
                            <div className="card  m-1 p-1" style={{width: "250px"}}>
                                <img className="card-img-top" src={image} alt="Card image" style={{width: "100%"}}/>
                                <div className="card-body">
                                    <h4 className="card-title">{item.name}</h4>
                                    <h6 className="card-title">{"Jami: "+item.amount+" dona"}</h6>
                                    <h6 className="card-title">{"Qoldiq: "+item.residue+" dona"}</h6>
                                    <p className="card-text">{item.description}</p>
                                    <button className="btn btn-success m-1 p-1"
                                            onClick={() => this.editModal(item)}>Taxrirlash
                                    </button>
                                    <button className="btn btn-danger m-1 p-1"
                                    onClick={()=>this.deleteModal(item)}>O`chirish</button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
                {
                    addShowModal &&
                    <AddProduct
                        toggle={(x) => this.addShowModal(x)}
                        addProduct={this.addProduct}/>
                }{
                showModal &&
                <EditProduct
                    toggle={(x) => this.editModal()}
                    editProduct={this.addProduct}
                    currentProduct={currentProduct}/>
            }
            <Modal isOpen={deleteShowModal}>
                <ModalHeader>{"Mahsulotni o`chirishni xohlaysizmi?"}</ModalHeader>
                <ModalFooter>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-danger" onClick={this.deleteProduct}>HA</button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-success"
                            onClick={this.deleteModal}>YO`Q</button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}

export default Products;
