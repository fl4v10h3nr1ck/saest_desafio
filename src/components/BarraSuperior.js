import React 						from 'react';
import { connect } 					from 'react-redux';
import { withRouter, Link } 		from 'react-router-dom';
import BotaoSair 					from "./BotaoSair";
import logo 						from "../images/logo.png";
import 							 	'../styles/barra_superior.css';
import { IconContext  } 			from 'react-icons';
import { FiUser } 					from 'react-icons/fi';


const BarraSuperior = ({logado =false, admin=false, nome=""}) => (
	<div className="row barra_superior">
		<div className="col">
			<div className="container">
				<div className="row align-items-center no-gutters">
					<div className="col-1 area_logo" align="center">
						<Link to="/">
							<img src={logo} alt="SIGAEST" className="logo"/>
						</Link>
					</div>
					<div className="col area_titulo" align="left">
						<Link to="/">
							<h3 className="titulo">SIGAEST</h3>
						</Link>
					</div>
					<div className="col" align='right'>	
						{logado && <div className="boas_vindas">Bem vindo, {nome}</div>}
					</div>
					<div className="col-1" align='center'>
						<div className="row align-items-center no-gutters">
							<div className="col" align='center'>
								{logado && 
								<div className="bt_redondo amarelo" align='center'>
									<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
										<div>
											<Link to={{pathname: admin?"/AreaDoAdmin":"/AreaDoAluno"}} title={admin?"Área do Administrador":"Área do Aluno"}>
												<FiUser/>
											</Link>	
										</div>
									</IconContext.Provider>
								</div>}
							</div>
						</div>
					</div>
					<div className="col_1" align='center'>
						<div className="row align-items-center no-gutters">
							<div className="col" align='center'>
							{logado && <BotaoSair/>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default connect(null, null)(withRouter(BarraSuperior));
