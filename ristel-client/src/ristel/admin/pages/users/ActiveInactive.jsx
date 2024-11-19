import { useGetAllUsersQuery } from "../../../../redux/apis/adminApi";

const ActiveInactive = ({ type }) => {
    return (
        <>
            {type === "active" && <ActiveUsers />}
            {type === "inactive" && <InactiveUsers />}
        </>
    );
};

const ActiveUsers = () => {
    const { data = [] } = useGetAllUsersQuery();

    const activeUsers = data.filter(user => !user.isDelete);

    return (
        <div>
            <h3 className="text-success mb-3 mt-5">Active Users</h3>
            {activeUsers.length > 0 ? (
                <ul className="list-group">
                    {activeUsers.map((user, index) => (
                        <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center mb-3 bg-light border rounded-3 shadow-sm">
                            <div>
                                <h5 className="mb-0">Mobile: {user.mobile}</h5>
                                <span className="text-muted">Active User</span>
                            </div>
                            <span className="badge bg-success rounded-pill">{index + 1}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-muted">No active users found.</div>
            )}
        </div>
    );
};

const InactiveUsers = () => {
    const { data = [] } = useGetAllUsersQuery();

    const inactiveUsers = data.filter(user => user.isDelete);

    return (
        <div>
            <h3 className="text-danger mb-3 mt-5">Inactive Users</h3>
            {inactiveUsers.length > 0 ? (
                <ul className="list-group">
                    {inactiveUsers.map((user, index) => (
                        <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center mb-3 bg-light border rounded-3 shadow-sm">
                            <div>
                                <h5 className="mb-0">Mobile: {user.mobile}</h5>
                                <span className="text-muted">Inactive User</span>
                            </div>
                            <span className="badge bg-danger rounded-pill">{index + 1}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-muted">No inactive users found.</div>
            )}
        </div>
    );
};

export default ActiveInactive;
