// import {useEffect, useState} from "react";
// import {Modal, ModalHeader} from "reactstrap";
// import {AvField, AvForm} from "availity-reactstrap-validation";
// import {CURRENTUSER, TOKEN} from "../../utils/constant";
// import request from "../../utils/request";
// import {api} from "../../utils/api";
// import {useHistory} from "react-router-dom";
//
// function AddOrder(props) {
//     const {
//         toggle
//     } = props
//     let history = useHistory();
//     const [isOpen] = useState(true);
//     const [isOpenConfirm, setIsOpenConfirm] = useState(false);
//     const [totalPrice, setTotalPrice] = useState(0);
//     console.log(totalPrice)
//     const [wasGiven, setWasGiven] = useState(0);
//     const [currentProduct, setCurrentProduct] = useState('');

//     const [product, setProduct] = useState([]);
//     const currentUser=localStorage.getItem(CURRENTUSER)
//     useEffect(() => {
//         if (localStorage.getItem(TOKEN)) {
//             getProduct()
//         } else {
//             history.push('/')
//         }
//     }, [])
//     const getProduct = () => {
//         request({
//             url: api.getProducts,
//             method: 'GET'
//         }).then(res => {
//             setProduct(res.data.object)
//         }).catch(err => {
//             alert("Error!")
//         })
//     }
//     const confirmation = () => {
//         setIsOpenConfirm(!isOpenConfirm);
//     }
//     const showPrice = (e, v) => {
//         request({
//             url: api.getOneProduct + v.productId,
//             method: 'GET'
//         }).then(res => {
//             setCurrentProduct(res.data)
//             setWasGiven(v.wasGiven)
//             setTotalPrice(res.data.price * v.wasGiven)
//         }).catch(err => {
//         })
//     }
//     const addOrder = (e,v) => {
//         let DTO={
//             userId:'',
//             productId:'',
//             wasGiven:''
//         }
//         DTO.userId=currentUser.id
//         DTO.productId=currentProduct.id
//         DTO.wasGiven=wasGiven;
//     }
//
//     return (
//         <div>
//             <Modal isOpen={isOpen} className="modal-dialog-centered">
//                 <ModalHeader>Yangi buyurtma</ModalHeader>
//                 <AvForm onValidSubmit={showPrice}>
//                     <div className="row m-2">
//                         <div className="col-md-12">
//                             <h4 className="fw-bold">Yangi buyurtma</h4>
//                         </div>
//                     </div>
//                     <div className="row m-2">
//                         <div className="col-md-12">
//                             <AvField
//                                 type="select"
//                                 name="productId">
//                                 <option>Mahsulotni tanlang</option>
//                                 {product?.map((item, index) =>
//                                     <option value={item.id}>{item.name}</option>
//                                 )}
//                             </AvField>
//                         </div>
//                     </div>
//                     <div className="row m-2">
//                         <div className="col-md-12">
//                             <AvField
//                                 label="Mijozga berildi"
//                                 type="number"
//                                 name="wasGiven" required/>
//                         </div>
//                     </div>
//                     <button className="btn btn-success m-2" onClick={() => confirmation()}>saqlash</button>
//                     <button className="btn btn-danger m-2"
//                             onClick={toggle}>bekor qilish
//                     </button>
//                 </AvForm>
//             </Modal>
//             <Modal isOpen={isOpenConfirm}>
//                 <ModalHeader>{'Umumiy narx: ' + totalPrice + ' so`m'}</ModalHeader>
//                 <AvForm onValidSubmit={addOrder}>
//                     <button className="btn btn-success m-1 p-1">Tasdiqlash</button>
//                     <button className="btn btn-danger m-1 p-1" onClick={() => setIsOpenConfirm(false)}>Bekor qilish
//                     </button>
//                 </AvForm>
//             </Modal>
//         </div>
//     )
// }
//
// export default AddOrder;
