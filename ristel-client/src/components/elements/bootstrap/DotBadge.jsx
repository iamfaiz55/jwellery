/***************************
Component : DotBadge
****************************

Availalble Parameters

bg        : Optional ( default = primary ), possible bg options are, primary, light-primary, secondary,  light-secondary etc...

*/

// import node module libraries
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const DotBadge = ({ children, bg = 'light-primary' }) => {
	return (
		<span className="me-2">
			<Badge bg={bg} className="badge-dot"></Badge> {children}
		</span>
	);
};

DotBadge.propTypes = {
	bg: PropTypes.string
};

export default DotBadge;
