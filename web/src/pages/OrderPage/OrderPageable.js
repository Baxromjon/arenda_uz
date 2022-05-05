import ReactPaginate from 'react-paginate';
import React, {
    useEffect,
    useState
} from 'react';
import request from "../../utils/request";
import {api} from "../../utils/api";
import './Order.css'
import {TOKEN} from "../../utils/constant";
import {Link, useHistory} from "react-router-dom";


function OrderPageable({currentItems}) {
    return (
        <div className="items">
            <div className="topnav">
                <Link to="/home">Asosiy</Link>
                <Link to="/users">Mijozlar</Link>
                <Link to="/orders">Buyurtmalar</Link>

                <div className="topnav-right">
                    <a href="/" onClick={() => localStorage.removeItem(TOKEN)}>Chiqish</a>
                </div>
            </div>
            <h1 className="text-center text-primary">Buyurtmalar</h1>
            <div className="row p-xl-4">
                <table className="table table-bordered table-hover text-center">
                    <thead>
                    <tr>
                        <th className="col-md-1">№</th>
                        <th className="col-md-2">Mijozning ismi va familiyasi</th>
                        <th className="col-md-2">Mijozning telefon raqami</th>
                        <th className="col-md-2">Berilgan mahsulot turi</th>
                        <th className="col-md-1">Mijozga berildi (donada)</th>
                        <th className="col-md-1">Buyurtma narxi</th>
                        <th className="col-md-2">Buyurtma sanasi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems ? currentItems?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.firstName + ' ' + item.lastName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.productName}</td>
                            <td>{item.wasGiven + ' dona'}</td>
                            <td>{item.orderPrice + ' so`m'}</td>
                            <td>{item.createdAt.split("T")[0]}</td>
                        </tr>
                    ) : 'Ma`lumotlar mavjud emas'}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PaginatedItems({itemsPerPage}) {
    let history = useHistory();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const getOrders = () => {
        request({
            url: api.getOrders + `?page=${page}&size=10`,
            method: 'GET'
        }).then(res => {
            setOrders(res.data)
        }).catch(err => {
            alert("Xatolik!")
        })
    }
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getOrders()
            setPageCount(Math.ceil(orders.count / orders.size));
        } else {
            history.push('/')
        }

    }, [itemOffset, orders.size]);

    const handlePageClick = (event) => {
        setPage(event.selected);
        const newOffset = event.selected * orders.size % orders.count;
        setItemOffset(newOffset);
    };

    return (
        <>
            <OrderPageable currentItems={orders.totalElements}/>
            <ReactPaginate
                nextLabel="keyingi >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< oldingi"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

        </>
    );
}

export default PaginatedItems;
