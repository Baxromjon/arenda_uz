import {useState} from "react";
import {Modal, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";


function EditUser(props) {
    const {
        editUser, currentUser
    } = props;
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <Modal isOpen={isOpen} className="modal-dialog-centered">
                <ModalHeader> Mijoz ma`lumotlarini taxrirlash</ModalHeader>
                <AvForm onValidSubmit={editUser}>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="Mijozning ismi"
                                name="firstName"
                                defaultValue={currentUser.firstName}
                                required/>
                        </div>
                        <div className="col-md-6">
                            <AvField
                                label="Mijozning familiyasi"
                                name="lastName"
                                value={currentUser.lastName}
                                required/>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="Telefon raqam"
                                name="phoneNumber"
                                value={currentUser.phoneNumber}
                                required/>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="Manzili"
                                name="address"
                                value={currentUser.address}
                            />
                        </div>
                        <div className="col-md-6">
                            <AvField
                                label="ko`cha nomi"
                                name="street"
                                value={currentUser.street}
                            />
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="uy raqami"
                                name="home"
                                value={currentUser.home}
                            />
                        </div>
                        <div className="col-md-6">
                            <AvField
                                label="mo`ljal"
                                name="destination"
                                value={currentUser.destination}
                            />
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-3">
                            <button className="btn btn-success">saqlash</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger"
                                    onClick={() => setIsOpen(false)}>bekor qilish
                            </button>
                        </div>
                    </div>
                    <br/>
                </AvForm>
            </Modal>
        </div>
    )
}

export default EditUser;
