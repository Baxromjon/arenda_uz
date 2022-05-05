import React, {useEffect, useState} from "react";
import request from "../../utils/request";
import {api} from "../../utils/api";
import {TOKEN} from "../../utils/constant";
import {useHistory} from "react-router-dom";

function LastDayOrderPage() {
    const [users, setUsers] = useState([]);
    // console.log(users);
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getUsersLastDay()
        } else {
            history.push('/')
        }
    }, []);

    const getUsersLastDay = () => {
        request({
            url: api.getLastDayUsers,
            method: 'GET'
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
        })
    }

    return (
        <div className="col-xl-12">
            <button type="button" className="btn btn-info m-1 p-1" onClick={() => history.goBack()}>
                <span className="fa fa-arrow-left-circle"></span>Orqaga
            </button>
            <div className="m-1 p-1">
                <table className="table table-striped text-center">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Ismi va Familiyasi</th>
                        <th>Telefon raqami</th>
                        <th>Buyurtma qilgan mahsulot</th>
                        <th>Mahsulot soni</th>
                        <th>Buyurtma qilgan sanasi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.firstName + ' ' + item.lastName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.product.name}</td>
                            <td>{item.product.wasGiven}</td>
                            <td>{item.day.replace("T", " ").split(".")[0]}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LastDayOrderPage;