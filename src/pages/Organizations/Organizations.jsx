import { Card, Table } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Link, useLocation } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import organizationAPI from "../../api/organizationAPI";

export default function Organizations() {
    const { authToken } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    const location = useLocation();

    const [notification, setNotification] = useState(
        // location.state?.notification ||
        {
            type: "",
            message: "",
            show: false,
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await organizationAPI.getAllOrganizations(
                    authToken
                );
                setOrganizations(data.organizations);
            } catch (error) {
                console.error("Error fetching Subjects:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (organizationID) => {
        try {
            const data = await organizationAPI.deleteOrganizationByID(
                organizationID,
                authToken
            );
            // console.log(data);
            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
            if (data.resType === "success") {
                setOrganizations((prevOrganizations) =>
                    prevOrganizations.filter(
                        (organization) => organization.id !== organizationID
                    )
                );
            }
        } catch (error) {
            console.error("Error deleting Organization:", error);
        }
    };
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
                                Organizations
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-sm btn-success"
                        to={"create-organization"}
                    >
                        Create Organization
                    </Link>
                </div>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "40%" }}>Name</th>
                                    <th style={{ width: "20%" }}>
                                        Persons Count
                                    </th>
                                    <th style={{ width: "30%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizations.map((organization, index) => (
                                    <tr key={organization.id}>
                                        <td>{index + 1}</td>
                                        <td>{organization.name}</td>
                                        <td>{organization._count.contacts}</td>
                                        <td className="d-flex gap-3">
                                            <Link
                                                className="btn btn-sm btn-success"
                                                to={`update-organization/${organization.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <DeleteConfirmationModal
                                                handleDelete={() =>
                                                    handleDelete(
                                                        organization.id
                                                    )
                                                }
                                                notification={notification}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </main>
        </>
    );
}
