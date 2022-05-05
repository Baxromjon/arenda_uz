import {useState} from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

function AddProduct(props) {
    const {
        toggle, addProduct
    } = props
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader>Mahsulot qo`shish</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={addProduct}>
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Mahsulot nomi"
                                    name="name" required/>
                            </div>
                            <div className="col-md-6">
                                <AvField
                                    label="Mahsulot miqdori (donada)"
                                    name="amount" type="number" required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Mahsulot narxi"
                                    name="price" type="number" required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <AvField
                                    label="Mahsulot haqida qisqacha"
                                    name="description"
                                    type="textarea"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button className="btn btn-success">Saqlash</button>
                            </div>
                            <div className="col-md-4">
                                <button onClick={() => setIsOpen(false)} className="btn btn-danger">Bekor qilish
                                </button>
                            </div>
                        </div>
                    </AvForm>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddProduct;
