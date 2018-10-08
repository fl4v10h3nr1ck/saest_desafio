import React 				from 'react';
import logo 				from "../images/logo.png";
import 							 '../styles/barra_rodape.css';

const BarraRodape = () => (
	<footer className="navbar-fixed-bottom barra_rodape">
		<div className="container justify-content-center">
			<div className="row align-items-center justify-content-center no-gutters">
				<div className="col area_logo" align="center">
					<img src={logo} alt="SIGAEST" className="logo"/>
					<span className="col area_copyright fnt_branco">Copyright {anoAtual()} SAEST - UFPa. Todos os Direitos Reservados.</span>
				</div>
			</div>
		</div>
	</footer>
);



const anoAtual=()=>{
	
	return new Date().getYear();
}


export default BarraRodape;
