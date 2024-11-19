import { Table, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../../../../redux/apis/adminApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const UserManagement = () => {
    const { data: allUsers, refetch } = useGetAllUsersQuery();
    const [blockUser, { isSuccess: blockSuccess }] = useBlockUserMutation();
    const [unblockUser, { isSuccess: unblockSuccess }] = useUnblockUserMutation();
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (blockSuccess) {
            toast.success("User Blocked Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            refetch()
        }
    }, [blockSuccess]);

    useEffect(() => {

        if (unblockSuccess) {
            toast.success("User Unblocked Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            refetch()
        }
    }, [unblockSuccess]);

    return <>
        <Container>
            <Row>
                <Col>
                    <h2 className="text-primary mb-4">All Users</h2>
                    <div className="overflow-auto">
                        {allUsers ? (
                            <ul className="list-group">
                                {allUsers.map((user, i) => (
                                    <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 bg-light border-0 rounded-3">
                                        <div className="d-flex align-items-center">
                                            <span className="badge bg-primary text-white rounded-pill me-3">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <h5 className="mb-0 text-dark">Mobile: {user.mobile}</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex">
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
                            <div className="text-center text-muted">
                                <Spinner animation="border" role="status" size="sm" />
                                <span className="ms-2">Loading users...</span>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>

    </>
}

export default UserManagement