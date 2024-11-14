import { Table, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../../../../redux/apis/adminApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const socket = io(import.meta.env.VITE_BACKEND_URL);

const Online = () => {
    const navigate = useNavigate();
    // const { data: allUsers, refetch } = useGetAllUsersQuery();
    const [blockUser, { isSuccess: blockSuccess }] = useBlockUserMutation();
    const [unblockUser, { isSuccess: unblockSuccess }] = useUnblockUserMutation();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        const userId = user && user._id;
        socket.emit("login", userId);

        socket.on("onlineUsers", (users) => {
            const uniqueUsers = Array.from(new Set(users.map(u => u._id)))
                .map(id => users.find(user => user._id === id));
            setOnlineUsers(uniqueUsers);
        });
    }, [user]);

    useEffect(() => {
        if (blockSuccess) {
            toast.success("User Blocked Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
        }
    }, [blockSuccess]);

    useEffect(() => {
        if (unblockSuccess) {
            toast.success("User Unblocked Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
        }
    }, [unblockSuccess]);
    return <>
        <Container fluid className="bg-white p-5">
            {/* Online Users Table */}
            <Row className="mb-4">
                <Col>
                    <h2 className="text-primary mb-3">Online Users</h2>
                    <div className="overflow-auto">
                        {onlineUsers.length > 0 ? (
                            <Table responsive bordered variant='primary' className="bg-white">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {onlineUsers.map((user, i) => (
                                        <tr key={user._id} className="table-light">
                                            <td>{i + 1}</td>
                                            <td>{user.mobile}</td>
                                            <td>
                                                {user.isBlock ? (
                                                    <Button
                                                        variant="outline-success"
                                                        className="me-2"
                                                        onClick={() => unblockUser(user._id)}
                                                    >
                                                        Unblock
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline-danger"
                                                        className="me-2"
                                                        onClick={() => blockUser(user._id)}
                                                    >
                                                        Block
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => navigate(`/admin/get-history/${user._id}`)}
                                                >
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p className="text-muted">No users are online at the moment.</p>
                        )}
                    </div>
                </Col>
            </Row>

            {/* All Users Table */}
            {/* <Row>
                <Col>
                    <h2 className="text-primary mb-3">All Users</h2>
                    <div className="overflow-auto">
                        {allUsers ? (
                            <Table responsive bordered hover className="bg-white">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((user, i) => (
                                        <tr key={user._id} className="table-light">
                                            <td>{i + 1}</td>
                                            <td>{user.mobile}</td>
                                            <td>
                                                {user.isBlock ? (
                                                    <Button
                                                        variant="outline-success"
                                                        className="me-2"
                                                        onClick={() => unblockUser(user._id)}
                                                    >
                                                        Unblock
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline-danger"
                                                        className="me-2"
                                                        onClick={() => blockUser(user._id)}
                                                    >
                                                        Block
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => navigate(`/admin/get-history/${user._id}`)}
                                                >
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className="text-center text-muted">
                                <Spinner animation="border" role="status" size="sm" />
                                <span className="ms-2">Loading users...</span>
                            </div>
                        )}
                    </div>
                </Col>
            </Row> */}
        </Container>
    </>
}

export default Online