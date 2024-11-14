// import node module libraries
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const FormSelect = ({
	placeholder = '',
	defaultselected = 'Select',
	options = [],
	id = '',
	name = '',
	style = '',
	onChange,
	required = false,
}) => {
	return (
		<Fragment>
			<Form.Select
				defaultValue={defaultselected}
				id={id}
				name={name}
				onChange={onChange}
				required={required}
				style={style ? style : {}}
			>
				{placeholder ? (
					<option value="" className="text-muted">
						{placeholder}
					</option>
				) : (
					''
				)}
				{options.map((item, index) => {
					return (
						<option key={index} value={item.value} className="text-dark">
							{item.label}
						</option>
					);
				})}
			</Form.Select>
		</Fragment>
	);
};

FormSelect.propTypes = {
	placeholder: PropTypes.string,
	defaultselected: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	required: PropTypes.bool
};

export default FormSelect;
