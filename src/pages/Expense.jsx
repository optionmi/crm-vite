import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import expenseAPI from "../api/expenseAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Expense() {
    let { authToken } = useContext(AuthContext);
    const [expense, setExpense] = useState([]);

    useEffect(() => {
        expenseAPI
            .getAllExpense(authToken)
            .then((data) => {
                setExpense(data);
            })
            .catch((error) => {
                console.error("Error fetching expense:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="expense">
                <div className="header d-flex justify-content-between">
                    <h4>Travelling Expenses</h4>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/travelling-expense"
                    >
                        Create Expense
                    </Link>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-3">
                                <h5>Date</h5>
                            </div>
                            <div className="col-3">
                                <h5>Description</h5>
                            </div>
                            <div className="col-3">
                                <h5>Amount</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {expense.map((expense) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={expense.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <h6>
                                                {
                                                    expense.expense_date.split(
                                                        "T"
                                                    )[0]
                                                }
                                            </h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>
                                                {expense.expense_description}
                                            </h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{expense.amount}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expense;
