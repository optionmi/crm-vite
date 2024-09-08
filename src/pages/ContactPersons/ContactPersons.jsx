import { Card, Table } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import contactsAPI from "../../api/contactsAPI";
import TablePagination from "../../components/TablePagination";
import DataTable from "../../components/DataTable";

export default function ContactPersons() {
    const { authToken } = useContext(AuthContext);
    const [notification, setNotification] = useState(
        // location.state?.notification ||
        {
            type: "",
            message: "",
            show: false,
        }
    );

    // useEffect(() => {
    //     try {
    //         contactsAPI.getAllContacts(authToken).then((data) => {
    //             // console.log(data);
    //             setContactPersons(data);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);

    const handleDelete = async (contactID) => {
        try {
            const data = await contactsAPI.deleteContactByID(
                authToken,
                contactID
            );
            // console.log(data);
            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
            if (data.resType === "success") {
                setContactPersons((prevContactPersons) =>
                    prevContactPersons.filter(
                        (contact) => contact.id !== contactID
                    )
                );
            }
        } catch (error) {
            console.error("Error deleting Contact:", error);
        }
    };

    const [contactPersons, setContactPersons] = useState([]);
    // const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async ({ pageIndex }) => {
        setLoading(true);
        try {
            const data = await contactsAPI.getAllContacts(
                authToken,
                pageIndex,
                pageSize
            );
            setContactPersons(data.contacts);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchData = async (e) => {
        if (e.target.value === "") return fetchData({ pageIndex: 0 });
        if (e.target.value.length < 3) return;
        setLoading(true);
        try {
            const data = await contactsAPI.getContactByName(
                authToken,
                e.target.value
            );
            setContactPersons(data.contacts);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error("Error searching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Emails",
            accessor: "emails",
            Cell: ({ row }) => (
                <Table>
                    <tbody>
                        {row.original.emails.map((email) => (
                            <tr key={email.id}>
                                <td width={"10%"} className="label">
                                    {email.label}
                                </td>
                                <td>{email.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ),
        },
        {
            Header: "Numbers",
            accessor: "numbers",
            Cell: ({ row }) => (
                <Table>
                    <tbody>
                        {row.original.contact_numbers.map((number) => (
                            <tr key={number.id}>
                                <td width={"10%"} className="label">
                                    {number.label}
                                </td>
                                <td>{number.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ),
        },
        {
            Header: "Organization",
            accessor: "organization.name",
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }) => (
                <div className="d-flex gap-3">
                    <Link
                        className="btn btn-sm btn-success"
                        to={`update-contact/${row.original.id}`}
                    >
                        Edit
                    </Link>
                    <DeleteConfirmationModal
                        handleDelete={() => handleDelete(row.original.id)}
                        notification={notification}
                    />
                </div>
            ),
        },
    ];

    // useEffect(() => {
    //     fetchData({ pageIndex: 0 }); // Load initial data
    // }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="d-flex justify-content-between my-2 align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Contact Persons
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-sm btn-success"
                        to={"create-contact"}
                    >
                        Create Contact
                    </Link>
                </div>
                <Card>
                    <Card.Body>
                        <DataTable
                            columns={columns}
                            data={contactPersons}
                            fetchData={fetchData}
                            loading={loading}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            searchData={searchData}
                        />
                    </Card.Body>
                </Card>
            </main>
        </>
    );
}
