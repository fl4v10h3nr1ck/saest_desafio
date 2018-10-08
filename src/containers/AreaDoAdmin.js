import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { Link } 						from 'react-router-dom';
import BarraSuperior					from '../components/BarraSuperior';
import BarraRodape						from '../components/BarraRodape';
import NaoPermitido						from '../components/NaoPermitido';
import NaoVerificado					from '../components/NaoVerificado';
import { sessionService } 				from 'redux-react-session';
import 								 	'../styles/area_do_admin.css';
import { FaHandsHelping, FaClipboard, FaUserGraduate, FaFlag, FaChartBar, FaDatabase } 				
										from 'react-icons/fa';
import { FiEdit, FiArrowLeft } 			from 'react-icons/fi';
import { IconContext  } 				from 'react-icons';
import { withRouter } 					from 'react-router-dom';


class AreaDoAdmin extends Component {
	
	
	constructor(props, context) {
    
		super(props, context);
		
		this.state = {
			permitido:0,
			user:{
				id:0,
				admin:false,
				nome:"",
				cpf:""
			}
		};
	}
	
		
	render() {
    
		const { permitido } = this.state;
		
		if(permitido>0)
			return this.sePermitido();
		else if(permitido===0)
			return this.seNaoVerificado();
		else
			return this.seNaoPermitido();
	}
  
	
	
	
	sePermitido(){
		
		const { user } = this.state;

		const { history } = this.props;
		
		return (
			<div>
				<BarraSuperior logado={true}  admin={true} nome={user.nome}/>
				<div className='container area_geral'>
					<div className='row'>
						<div className='col'>
							<br/>
							<h4>Bem vindo ao SIGAEST, {user.nome}</h4>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<br/>
							Utilize o menu abaixo para realizar suas ações dentro do sistema
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className="bloco">
								<div className="titulo">
									<div className='row justify-content-center align-items-center no-gutters'>
										<div className='col'>
											Menu do Administrador
										</div>	
										<div className='col' align='right'>
											<div className="col bt_opcao" align='right'>
												<div className="bt_redondo azul" align='center' title='voltar' onClick={() =>history.goBack()}>
													<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
														<div>
															<FiArrowLeft/>
														</div>
													</IconContext.Provider>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-5'>
										<div className='area_dados_pessoais'>
											<div className='row'>
												<div className='col'>
													<h6>Dados Pessoas</h6>
												</div>
											</div>
											<div className='row'>
												<div className='col'>		
													<b>Nome/E-mail:</b> {user.nome}<br/>
												</div>
											</div>	
											<div className='row'>
												<div className='col'>			
													<b>Função:</b> Analista de Sistemas<br/>
												</div>
											</div>
											<div className='row'>
												<div className='col'>		
													<b>CPF:</b> {user.cpf}<br/>
												</div>
											</div>
											<div className='row'>
												<div className="col " align='center'>
													<br/><br/>
													<div className="bt_redondo amarelo" align='center' title='Editar'>
														<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
															<div>
																<Link to={{pathname: "/AlteraUsuario"}} title='Editar'>
																	<FiEdit/>
																</Link>
															</div>
														</IconContext.Provider>
													</div>
													<br/><br/>
												</div>
											</div>
										</div>
										<br/><br/><br/><br/><br/><br/><br/><br/>
									</div>
									<div className="col" align='center'>
										<div className='row'>
											<div className='col'>
												<div className='bloco_opcao' align='center'>
													<Link to={{pathname: "/"}}>
														<div className='col'>
															<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																<div>
																	<FaHandsHelping/>
																</div>
															</IconContext.Provider>
															<div className='bloco_opcao_ttl'>Editais</div>
														</div>
													</Link>
												</div>
											</div>
											<div className='col'>
												<div className='bloco_opcao' align='center'>
													<Link to={{pathname: "/"}}>
														<div className='col'>
															<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																<div>
																	<FaClipboard/>
																</div>
															</IconContext.Provider>
															<div className='bloco_opcao_ttl'>Questionários</div>
														</div>
													</Link>
												</div>
											</div>
											<div className='col'>
												<div className='bloco_opcao' align='center'>
													<Link to={{pathname: "/ListaDeUsuarios"}}>
														<div className='col'>
															<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																<div>
																	<FaUserGraduate/>
																</div>
															</IconContext.Provider>
															<div className='bloco_opcao_ttl'>Alunos</div>
														</div>
													</Link>
												</div>
											</div>
											<div className="w-100"></div>
											<div className='col'>
												<div className='bloco_opcao' align='center'>
													<Link to={{pathname: "/"}}>
														<div className='col'>
															<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																<div>
																	<FaFlag/>
																</div>
															</IconContext.Provider>
															<div className='bloco_opcao_ttl'>Recursos</div>
														</div>
													</Link>
												</div>
											</div>
											<div className='col'>
												<div className='bloco_opcao' align='center'>
													<Link to={{pathname: "/"}}>
														<div className='col'>
															<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																<div>
																	<FaChartBar/>
																</div>
															</IconContext.Provider>
															<div className='bloco_opcao_ttl'>Estatísitica</div>
														</div>
													</Link>
												</div>
											</div>
											<div className='col'>
												<div className='bloco_opcao' align='center'>
													<Link to={{pathname: "/"}}>
														<div className='col'>
															<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																<div>
																	<FaDatabase/>
																</div>
															</IconContext.Provider>
															<div className='bloco_opcao_ttl'>Banco de Dados</div>
														</div>
													</Link>
												</div>
											</div>
											<div className="w-100"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<BarraRodape />
			</div>)
	}
  
  
	
	seNaoPermitido(){
		
		return (
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
				
					<NaoPermitido/>		
				
				</div>
				<BarraRodape />
			</div>
		)
	}
  
  
  
	seNaoVerificado(){
		
		return (
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
				
					<NaoVerificado/>		
				
				</div>
				<BarraRodape />
			</div>
		)
	}
	
	
	
	componentDidMount() {
		
		sessionService.loadUser().
			then(user => {
			
				if(user.admin>0)
					this.setState({
						permitido:1, 
						user:{
							id:user.id,
							admin:true,
							nome:user.email,
							cpf:user.cpf
						}
					});
				else
					this.setState({
						permitido:-1, 
						user:{
							id:user.id,
							admin:false,
							nome:user.email,
							cpf:user.cpf
						}
					});
			})
			.catch(
				err => {
				
				this.setState({permitido:-1});
				});
	}
	
	
	
	
}

export default connect(null, null)(withRouter(AreaDoAdmin));
