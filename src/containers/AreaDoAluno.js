import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { Link, Redirect } 				from 'react-router-dom';
import * as api_usuarios 				from '../api/api_usuarios';
import BarraSuperior					from '../components/BarraSuperior';
import BarraRodape						from '../components/BarraRodape';
import { sessionService } 				from 'redux-react-session';
import * as api_editais 				from '../api/api_editais';
import { IconContext  } 				from 'react-icons';
import { FiEye, FiArrowLeft, FiEdit } 	from 'react-icons/fi';
import NaoVerificado					from '../components/NaoVerificado';
import 							 		'../styles/area_do_aluno.css';
import { withRouter } 					from 'react-router-dom';


class AreaDoAluno extends Component {
	
	
	constructor(props, context) {
    
		super(props, context);
		
		this.state = {
			permitido:0,
			admin_vendo:false,
			user:{
				id:0,
				admin:false,
				nome:"",
				admin_vendo:false,
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
		
		if(user.id>0){
					
			var usuario = api_usuarios.getUsuario(user.id);
			
			if(usuario!=null)
				return (
					<div>
						<BarraSuperior  logado={true}  admin={user.admin} nome={user.nome}/>
						<div className='container'>
							<div className='row'>
								<div className='col'>
									<br/>
									<h4>{user.admin_vendo?"Estes são os dados de":"Bem vindo ao SIGAEST,"} {usuario.email}</h4>
								</div>
							</div>
							<div className='row'>
								<div className='col'>
									<br/>
									{user.admin_vendo?
											"Estes são os dados do usuário selecionado":
											(usuario.admin?"Estes são seus dados cadastrados":
											"Abaixo estão relacionados os editais que você participa")}
								</div>
							</div>
							<div className='row'>
								<div className='col'>
									<div className="bloco">
										<div className="titulo">
											<div className='row justify-content-center align-items-center no-gutters'>
												<div className='col'>
													{usuario.admin?"Informações Cadastrais":"Menu do Aluno"}
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
											<div className='col-4'>
												<div className='area_dados_pessoais'>
													<div className='row'>
														<div className='col'>
															<h6>Dados Pessoas</h6>
														</div>
													</div>
													<div className='row'>
														<div className='col'>		
															<b>ID:</b> {usuario.id}<br/>
														</div>
													</div>
													<div className='row'>
														<div className='col'>		
															<b>Nome:</b> {usuario.email}<br/>
														</div>
													</div>
													<div className='row'>
														<div className='col'>		
															<b>Email:</b> {usuario.email}<br/>
														</div>
													</div>	
													<div className='row'>
														<div className='col'>		
															<b>CPF:</b> {usuario.cpf}<br/>
														</div>
													</div>
													<div className='row'>
														<div className='col'>		
															<b>Tipo de Conta:</b> {usuario.admin?"Administrador":"Aluno"}<br/>
														</div>
													</div>
													<div className='row'>
														<div className="col bt_opcao" align='center'>
														<br/>
														{!user.admin_vendo && 
															<div className="bt_redondo amarelo" align='center' title='Editar'>
																<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																	<div>
																		<Link to={{pathname: "/AlteraUsuario"}} title='Editar'>
																			<FiEdit/>
																		</Link>
																	</div>
																</IconContext.Provider>
															</div>}
														</div>
													</div>
												</div>
												<br/><br/><br/><br/><br/><br/>
											</div>
											{!usuario.admin && 
											<div className="col" align='center'>
												<div className='lista_editais'>
												<div className="bloco">
													<div className="titulo">
														<div className="row align-items-end no-gutters">
															<div className="col" align='left'>
															{user.admin_vendo?"Lista de Editais Que o Aluno Participa":"Lista de Editais Que Você Participa"}
															</div>
														</div>	
													</div>
													<div className="row align-items-end no-gutters">
														<div className="col titulo_tabela">
															<b>Nome</b>
														</div>
														<div className="col-2 titulo_tabela" align='center'>
															<b>Status</b>
														</div>
														<div className="col-2 titulo_tabela" align='center'>
															<b>Ação</b>
														</div>
													</div>
													<div className="row no-gutters">
														<div className="col" align='center'>
															<hr className='separador'/>
														</div>
													</div>
													{this.getMeusEditais(user.id)}
												</div></div>
											</div>}
										</div>
									</div>
								</div>
							</div>
						</div>
						<BarraRodape />
					</div>)
		}
		else
			return (
				<div className="row align-items-center no-gutters">
					<div className="col" align='center'>
						<br/><br/><br/>Usuário não Encontrado<br/><br/><br/>
					</div>
				</div>);

	}
	
	
	
	
	
	seNaoPermitido(){
		
		return (
			<Redirect to={{pathname: '/login',state: { from: this.props.location }}}/>
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
				
				var id_temp=0;
				
				if(this.props.location.state!=null && this.props.location.state.id>0)
					id_temp = this.props.location.state.id;
				
				if(user.admin>0 && id_temp>0 && id_temp!== user.id)
					this.setState({
						permitido:1,	
						user:{
							id:id_temp,
							admin:user.admin>0,
							nome:user.email,
							admin_vendo:true
						}
					});
				else
					this.setState({
						permitido:1,
						user:{
							id:user.id,
							admin:user.admin>0,
							nome:user.email,
							admin_vendo:false
						}
					});
			
			})
			.catch(()=>{
				
				this.setState({permitido:-1});
			})
	}

	
	
	
	
	
	getMeusEditais(id_user){
		
		var editais =  api_editais.getMeusEditais(id_user);

		if(editais!=null && editais.length>0){
				
			return (
				editais.map(
						function(edital, i){
							return(
								<div key={i}>
									<div className="row align-items-center no-gutters">
										<div className="col titulo_tabela">
											{edital.nome}
										</div>
										<div className="col-2 titulo_tabela" align='center'>
											{edital.status?"Ativo":"Desativado"}
										</div>
										<div className="col-2 titulo_tabela" align='center'>
											<div className="row align-items-center no-gutters">
												<div className="col" align='center'>
													<Link to={{pathname: "/VerEdital", state: {id:edital.id, retorno:"/"}}}>
														<div className="bt_redondo azul" align='center'>
															<IconContext.Provider value={{ color: "#FFFFFF", className: 'bt_icon'}}>
															  <div>
																<FiEye/>
															  </div>
															</IconContext.Provider>
														</div>
													</Link>	
												</div>
											</div>	
										</div>
									</div>
									{(i<(editais.length-1)) && 
									<div className="row no-gutters">
										<div className="col" align='center'>
											<hr className='separador'/>
										</div>
									</div>}
								</div>)
						}
					)
				);						
		}
		else
			return (
				
				<div className="row align-items-center no-gutters">
					<div className="col" align='center'>
						<br/><br/><br/>Não Participa de Nenhum Edital no Momento<br/><br/><br/>
					</div>
				</div>);
		
		
	}
	
}


export default connect(null, null)(withRouter(AreaDoAluno));
