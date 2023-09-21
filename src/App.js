import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Publishers from "./pages/Publishers";
import Salesperson from "./pages/Salesperson";
import Books from "./pages/Books";
import Leads from "./pages/Leads/Leads";
import Login from "./pages/Login";
import CreatePublisher from "./pages/create/CreatePublisher";
import CreateLead from "./pages/Leads/CreateLead";
import CreateSalesperson from "./pages/create/CreateSalesperson";
import CreateBook from "./pages/create/createBook";
import ViewPublisher from "./pages/view/ViewPublisher";
import ViewSalesperson from "./pages/view/ViewSalesperson";
import ViewAccount from "./pages/view/viewAccount";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import "./App.css";
import "./styles/sidebar.css";
import "./styles/Header.css";
import "./styles/home.css";
import "./styles/publisher.css";
import "./styles/leads.css";
import "./styles/login.css";
import "./styles/books.css";
import "./styles/salesperson.css";
import "./styles/attendance.css";
import "./styles/Expense.css";
import "./styles/account.css";
import "./styles/claim.css";
import "./styles/boards.css";
import "./styles/subject.css";
import "./styles/series.css";
import "./styles/sample.css";
import "./styles/utilities.css";
import Attendance from "./pages/Attendance";
import CreateAttendance from "./pages/create/CreateAttendance";
import Expense from "./pages/Expense";
import CreateExpense from "./pages/create/CreateExpense";
import Claim from "./pages/Claim";
import CreateClaim from "./pages/create/CreateClaim";
import Boards from "./pages/Boards";
import CreateBoards from "./pages/create/CreateBoards";
import Subject from "./pages/Subject";
import CreateSubject from "./pages/create/CreateSubject";
import Series from "./pages/Series";
import CreateSeries from "./pages/create/CreateSeries";
import CreateSample from "./pages/create/CreateSample";
import ViewLead from "./pages/Leads/ViewLead";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            exact
                            path="/manage-account"
                            element={<ViewAccount />}
                        />

                        {/* Publisher Routes */}
                        <Route
                            exact
                            path="/publishers"
                            element={<Publishers />}
                        />
                        <Route
                            exact
                            path="/create/publisher"
                            element={<CreatePublisher />}
                        />
                        <Route
                            exact
                            path="/publisher/view/:id"
                            element={<ViewPublisher />}
                        />
                        {/* Salesperson Routes */}
                        <Route
                            exact
                            path="/salesperson"
                            element={<Salesperson />}
                        />
                        <Route
                            exact
                            path="/create/salesperson"
                            element={<CreateSalesperson />}
                        />
                        <Route
                            exact
                            path="/attendance"
                            element={<Attendance />}
                        />
                        <Route
                            exact
                            path="/create/attendance"
                            element={<CreateAttendance />}
                        />
                        <Route
                            exact
                            path="/salesperson/view/:id"
                            element={<ViewSalesperson />}
                        />
                        {/* Books Routes */}
                        <Route exact path="/books" element={<Books />} />
                        <Route
                            exact
                            path="/create/book"
                            element={<CreateBook />}
                        />
                        {/* Leads Routes */}
                        <Route exact path="/leads" element={<Leads />} />
                        <Route
                            path="/leads/create/:stageID"
                            element={<CreateLead />}
                        />
                        <Route
                            path="/leads/view/:leadID"
                            element={<ViewLead />}
                        />
                        {/* Travelling Expense */}
                        <Route
                            exact
                            path="/travelling-expense"
                            element={<Expense />}
                        />
                        <Route
                            exact
                            path="/create/travelling-expense"
                            element={<CreateExpense />}
                        />
                        {/* Travelling Claim */}
                        <Route
                            exact
                            path="/travelling-claim"
                            element={<Claim />}
                        />
                        <Route
                            exact
                            path="/create/travelling-claim"
                            element={<CreateClaim />}
                        />
                        {/* Boards */}
                        <Route exact path="/boards" element={<Boards />} />
                        <Route
                            exact
                            path="/create/board"
                            element={<CreateBoards />}
                        />
                        {/* Subject */}
                        <Route exact path="/subjects" element={<Subject />} />
                        <Route
                            exact
                            path="/create/subject"
                            element={<CreateSubject />}
                        />
                        {/* Series */}
                        <Route exact path="/series" element={<Series />} />
                        <Route
                            exact
                            path="/create/series"
                            element={<CreateSeries />}
                        />
                        {/* Sample */}
                        {/* <Route exact path="/sample" element={<Sample />} /> */}
                        <Route
                            exact
                            path="/create/sample"
                            element={<CreateSample />}
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
