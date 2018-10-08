import React 			from 'react';

const inputComErro = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  
	<div>
		<label>{label}</label>
		<div align='center'>
			<input {...input} placeholder={placeholder} type={type}/>
			<div className="erro">
				{touched && error && <span>{error}</span>}
			</div>
		</div>
	</div>
);

export default inputComErro;
