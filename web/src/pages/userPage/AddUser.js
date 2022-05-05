import {useState} from "react";
import {Modal, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

function AddUser(props) {
    const {
        toggle, addUser
    }=props
    const [isOpen]=useState(true);
    return(
        <div>
            <Modal isOpen={isOpen} className="modal-dialog-centered">
                <ModalHeader>Mijoz qo`shish</ModalHeader>
                <AvForm onValidSubmit={addUser}>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="Mijozning ismi"
                                name="firstName" required/>
                        </div>
                        <div className="col-md-6">
                            <AvField
                                label="Mijozning familiyasi"
                                name="lastName" required/>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="Telefon raqam"
                                name="phoneNumber"required/>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="Manzili"
                                name="address"/>
                        </div>
                        <div className="col-md-6">
                            <AvField
                                label="ko`cha nomi"
                                name="street"/>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <AvField
                                label="uy raqami"
                                name="home" />
                        </div>
                        <div className="col-md-6">
                            <AvField
                                label="mo`ljal"
                                name="destination"/>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-3">
                            <button className="btn btn-success">saqlash</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger"
                                    onClick={toggle}>bekor qilish
                            </button>
                        </div>
                    </div>
                    <br/>


                </AvForm>
            </Modal>
        </div>
    )


}
export default AddUser;
