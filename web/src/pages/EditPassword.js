import {useState} from "react";
import {Modal, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

function EditPassword(props) {
    const {editPassword} = props
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader>Parolni o`zgartirish</ModalHeader>
                <AvForm onValidSubmit={editPassword}>
                    <div className="p-2 m-2">
                        <div className="row">
                            <div className="col-md-12">
                                <AvField
                                    label="Parolingiz"
                                    type="password"
                                    name="oldPassword" required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Yangi parol"
                                    type="password"
                                    name="password"
                                    required/>
                            </div>
                            <div className="col-md-6">
                                <AvField
                                    label="Yangi parol (qayta kiriting)"
                                    type="password"
                                    name="prePassword"
                                    required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button className="btn btn-success">Saqlash</button>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-danger" onClick={() => setIsOpen(false)}>Bekor qilish</button>
                            </div>
                        </div>
                    </div>
                </AvForm>
            </Modal>
        </div>
    )
}

export default EditPassword;
