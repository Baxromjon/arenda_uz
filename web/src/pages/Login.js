import React, {Component} from 'react';
import {AvField, AvForm} from 'availity-reactstrap-validation'
import request from "../utils/request";
import {api} from "../utils/api";
import {TOKEN} from "../utils/constant";
import './Login.css'
import {useHistory} from "react-router-dom";


function Login()  {
    let history=useHistory();
    const login=(e,v)=>{
        request({
            url:api.login,
            method:'POST',
            data:v
        }).then(res=>{
            if (res.status===200){
                localStorage.setItem(TOKEN, 'Bearer '+res.data.object)
                history.push("/home")
            }
        }).catch(err=>{
            alert("Nimadir xato! Iltimos qayta urinib ko`ring!")
        })
    }
    // render() {
        return(
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <h1 className="h2">Xush kelibsiz!</h1>
                                <p className="lead">
                                    Sayt xizmatlaridan foydalanish uchun loginni kiriting
                                </p>
                            </div>

                            <div className="card-1">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="fotosurat"
                                                 className="img-fluid rounded-circle" width="132" height="132"/>
                                        </div>
                                        <AvForm onValidSubmit={login}>
                                            <div className="form-group">
                                                <label>Telefon raqam</label>
                                                <AvField className="form-control form-control-lg" name="phoneNumber"
                                                       placeholder="Telefon raqam: +998971234567"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Parol</label>
                                                <AvField className="form-control form-control-lg" type="password"
                                                       name="password" placeholder="Parol: democode"/>
                                            </div>
                                            <button className="text-center mt-3 btn btn-info">
                                                Kirish
                                            </button>
                                        </AvForm>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    // }
}

Login.propTypes = {};

export default Login;
