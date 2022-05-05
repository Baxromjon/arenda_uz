import {useState} from "react";
import {Modal, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

function EditUser(props) {
    const {editUser, currentUser} = props
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <Modal isOpen={isOpen}>
                <ModalHeader>Ma`lumotni taxrirlash</ModalHeader>
                <AvForm onValidSubmit={editUser}>
                    <div className="p-2 m-2">
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Ismingizni kiriting"
                                    name="firstName"
                                    value={currentUser.firstName}
                                    required/>
                            </div>
                            <div className="col-md-6">
                                <AvField
                                    label="Familiyangizni kiriting"
                                    name="lastName"
                                    value={currentUser.lastName}
                                    required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <AvField
                                    label="Telefon raqamingiz"
                                    name="phoneNumber" required
                                    value={currentUser.phoneNumber}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <button className="btn btn-success">Saqlash</button>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-danger"
                                        onClick={() => setIsOpen(false)}>Bekor qilish
                                </button>
                            </div>
                        </div>
                    </div>

                </AvForm>
            </Modal>
        </div>
    )
}

export default EditUser;
