import React							from 'react';
import load 							from "../images/load.gif";

	const NaoPermitido = () => (
		<div>
			<div className='row'>
				<div className='col' align='center'>
					<br/><br/><br/><br/><br/><br/><br/><br/><br/>
					<img src={load} alt="carregando..." />
					<br/><br/><br/><br/><br/><br/>
				</div>
			</div>
		</div>
	);


export default NaoPermitido;


