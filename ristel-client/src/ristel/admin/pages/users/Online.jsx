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
            {/* Online Users List */}
            <Row className="mb-4">
                <Col>
                    <h2 className="text-primary mb-3">Online Users</h2>
                    <div className="overflow-auto">
                        {onlineUsers.length > 0 ? (
                            <ul className="list-group">
                                {onlineUsers.map((user, i) => (
                                    <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 bg-light rounded-3">
                                        <div className="d-flex align-items-center">
                                            <span className="badge bg-primary text-white rounded-pill me-3">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <h5 className="mb-0">Mobile: {user.mobile}</h5>
                                            </div>
                                        </div>
                                        <div>
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
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">No users are online at the moment.</p>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}

export default Online