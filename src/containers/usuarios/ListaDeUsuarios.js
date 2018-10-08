import React, { Component } 			from 'react';
import PropTypes 						from 'prop-types';
import { connect } 						from 'react-redux';
import { bindActionCreators } 			from 'redux';
import * as actions_usuarios 			from '../../actions/actions_usuarios';
import { sessionService } 				from 'redux-react-session';
import * as api_usuarios 				from '../../api/api_usuarios';
import BarraSuperior					from '../../components/BarraSuperior';
import BarraRodape						from '../../components/BarraRodape';
import NaoPermitido						from '../../components/NaoPermitido';
import NaoVerificado					from '../../components/NaoVerificado';
import { Link } 						from 'react-router-dom';
import { FiEye, FiPlus, FiArrowLeft } 	from 'react-icons/fi';
import { IconContext  } 				from 'react-icons';
import { withRouter } 					from 'react-router-dom';


class ListaDeUsuarios extends Component {
  
  
  
  
	constructor(props, context) {
    
		super(props, context);
	
		this.state = {permitido:0};
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
	
	
	
	
	
	sePermitido(){
		
		const { permitido } = this.state;
	
		const { history } = this.props;
	
		return(
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
					<div className='row'>
						<div className='col'>
							<br/>
							<h4>Usuários Cadastrados</h4>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<br/>
							Veja abaixo a lista dos usuários cadastrados no sistema
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className="bloco">
								<div className="titulo">
									<div className='row justify-content-center align-items-center no-gutters'>
										<div className='col'>
											Lista de Usuários Cadastrados
										</div>
										<div className="col-1" align='right'>
											{permitido && 
											<div className="bt_redondo azul" align='center'>
												<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
													<div>
														<Link to={{pathname: "/NovoUsuario", state: {retorno:"/ListaDeUsuarios"}}} title='Novo Usuário'>
															<FiPlus/>
														</Link>
													</div>
												</IconContext.Provider>
											</div>}		
										</div>
										<div className='col-1' align='right'>
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
								<div className="row align-items-end no-gutters">
									<div className="col titulo_tabela">
										<b>Nome</b>
									</div>
									<div className="col titulo_tabela">
										<b>E-mail</b>
									</div>
									<div className="col-2 titulo_tabela" align='center'>
										<b>CPF</b>
									</div>
									<div className="col-2 titulo_tabela" align='center'>
										<b>Privilégio</b>
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
								{this.getUsuarios()}
							</div>
						</div>
					</div>
				</div>
			</div>)
	}
	
	
	


	getUsuarios(){
	
		var usuarios =  api_usuarios.getUsuarios();

		if(usuarios!=null && usuarios.length>0){
				
			return (
				usuarios.map(
					function(usuario, i){
						return(
							<div key={i}>
								<div className="row align-items-center no-gutters">
									<div className="col titulo_tabela">
										{usuario.email}
									</div>
									<div className="col titulo_tabela">
										{usuario.email}
									</div>
									<div className="col-2 titulo_tabela" align='center'>
										{usuario.cpf}
									</div>
									<div className="col-2 titulo_tabela" align='center'>
										{usuario.admin?"Administrador":"Aluno"}
									</div>
									<div className="col-2 titulo_tabela" align='center'>
										<div className="row align-items-center no-gutters">
											<div className="col" align='center'>
												<div className="bt_redondo azul" align='center'>
													<IconContext.Provider value={{ color: "#FFFFFF", className: 'bt_icon'}}>
														<div>
															<Link to={{pathname: "/AreaDoAluno", state: {id:usuario.id, retorno:"/"}}}>
																<FiEye/>
															</Link>	
														</div>
													</IconContext.Provider>
												</div>
											</div>
										</div>	
									</div>
								</div>
								{(i<(usuarios.length-1)) && 
								<div className="row no-gutters">
									<div className="col" align='center'>
										<hr className='separador'/>
									</div>
								</div>}
							</div>
						)
					}
				)
			);						
		}
		else
			return (
				
				<div className="row align-items-center no-gutters">
					<div className="col" align='center'>
						<br/><br/><br/>Nenhum Usuário Cadastrado<br/><br/><br/>
					</div>
				</div>);
	}	
	
	
	
	
	componentDidMount() {
		sessionService.loadUser()
		.then(user => {
			
			if(user.admin>0)
				this.setState({permitido:1});
			else
				this.setState({permitido: -1});
			
			}
		)
		.catch(err => {
			
			this.setState({permitido: -1});
		
			}
		)
	}	

	
}


const { object } = PropTypes;

ListaDeUsuarios.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_usuarios, dispatch)
  };
};

export default connect(null, mapDispatch)(withRouter(ListaDeUsuarios));
