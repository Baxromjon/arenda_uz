import {useState} from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

function EditProduct(props) {
    const {editProduct, currentProduct} = props
    const [isOpen, setOpen] = useState(true)
    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader>Mahsulotni taxrirlash</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={editProduct}>
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Mahsulot nomi"
                                    name="name"
                                    value={currentProduct.productName}
                                    required/>
                            </div>
                            <div className="col-md-6">
                                <AvField
                                    label="Mahsulot miqdori (donada)"
                                    name="amount" type="number"
                                    value={currentProduct.amount}
                                    required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Mahsulot narxi"
                                    name="price" type="number" required
                                    value={currentProduct.price}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <AvField
                                    label="Mahsulot haqida qisqacha"
                                    name="description"
                                    type="textarea"
                                    value={currentProduct.description}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button className="btn btn-success">Saqlash</button>
                            </div>
                            <div className="col-md-4">
                                <button onClick={() => setOpen(false)} className="btn btn-danger">Bekor qilish</button>
                            </div>
                        </div>
                    </AvForm>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditProduct;
