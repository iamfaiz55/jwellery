import { Table, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../../../../redux/apis/adminApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

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
        <Container>
            <Row>
                <Col>
                    <h2 className="text-primary mb-3">All Users</h2>
                    <div className="overflow-auto">
                        {allUsers ? (
                            <Table responsive bordered variant='primary'
                                className="bg-white">
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
            </Row>
        </Container>
    </>
}

export default UserManagement