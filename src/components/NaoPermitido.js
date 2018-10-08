import React							from 'react';
import { Link } 						from 'react-router-dom';

	const NaoPermitido = () => (
		<div>
			<div className='row'>
				<div className='col' align='center'>
					<br/><br/>
					<h4>Você não tem permissão para ver este conteúdo. O que deseja fazer?</h4>
				</div>
			</div>
			<div className='row' align='center'>
				<div className='col' align='center'>
					<br/><br/><br/>
					<Link to={"/login"}>Entrar com uma conta diferente</Link>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ou&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Link to={"/"}>Voltar para página inicial</Link>
					<br/><br/><br/>
				</div>		
			</div>
		</div>
	);


export default NaoPermitido;


