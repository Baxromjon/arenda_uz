import {useEffect, useState} from "react";
import {Modal, ModalHeader} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation'
import request from "../../utils/request";
import {api} from "../../utils/api";
import {TOKEN} from "../../utils/constant";
import {useHistory} from "react-router-dom";

function InputProductPage(props) {
    let history = useHistory();
    const {InputProduct, currentUser} = props;
    const [isOpen, setIsOpen] = useState(true);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getProduct()
        } else {
            history.push('/')
        }

    }, [])
    const getProduct = () => {
        request({
            url: api.getInputTrade + currentUser.userId,
            method: 'GET'
        }).then(res => {
            setProduct(res.data)
        }).catch(err => {
        })
    }
    return (
        <div>
            <div>
                <Modal isOpen={isOpen} className="modal-dialog-centered">
                    <ModalHeader>Mahsulotni qaytarish</ModalHeader>
                    <AvForm onValidSubmit={InputProduct}>
                        <div className="row p-1 m-1">
                            <div className="col-md-12">
                                <AvField
                                    name="productId" type="select">
                                    <option value="">Mahsulotni tanlang</option>
                                    {product?.map(item =>
                                        <option value={item.id}>{item.productName}</option>)}
                                </AvField>
                            </div>
                        </div>
                        <div className="row p-1 m-1">
                            <div className="col-md-12">
                                <AvField type="number"
                                         name="amount" required/>
                            </div>
                        </div>
                        <div className="row p-1 m-1">
                            <div className="col-md-3">
                                <button className="btn btn-success">Saqlash</button>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-danger" onClick={() => setIsOpen(false)}>Bekor qilish
                                </button>
                            </div>
                        </div>
                    </AvForm>
                </Modal>
            </div>

        </div>
    )
}

export default InputProductPage;
