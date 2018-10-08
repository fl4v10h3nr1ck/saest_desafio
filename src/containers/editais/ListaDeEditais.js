import React, { Component }				from 'react';
import * as api_editais 				from '../../api/api_editais';
import { Link } 						from 'react-router-dom';
import * as actions_editais 			from '../../actions/actions_editais';
import { IconContext  } 				from 'react-icons';
import { FiEye, FiEdit, FiTrash, FiCheck, FiPlus} 		
										from 'react-icons/fi';
import { bindActionCreators } 			from 'redux';
import PropTypes 						from 'prop-types';
import { connect } 						from 'react-redux';
import { withRouter } 					from 'react-router-dom';
import { sessionService } 				from 'redux-react-session';


var ref = () =>{}


class ListaDeEditais extends Component {
  
  
  
  
	constructor(props, context) {
    
		super(props, context);
	
		this.state = {id_usuario:0, admin:false};
	
		ref = this;
		
		this.getEditais = this.getEditais.bind(this);
	}


  
  
	render() {
	
		const {admin} = this.state;
	
		return(
		<div className="bloco">
			<div className="titulo">
				<div className="row align-items-end no-gutters">
					<div className="col" align='left'>
					Lista de Editais Criados
					</div>
					<div className="col" align='right'>
						{admin && 
						<div className="bt_redondo azul" align='center'>
							<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
								<div>
									<Link to={{pathname: "/NovoEdital", state: {retorno:"/"}}}>
										<FiPlus/>
									</Link>
								</div>
							</IconContext.Provider>
						</div>}
					</div>
				</div>	
			</div>
			<div className="row align-items-end no-gutters">
				<div className="col titulo_tabela">
					<b>Nome</b>
				</div>
				<div className="col titulo_tabela">
					<b>Decrição</b>
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
			{this.getEditais()}
		</div>)
	}




	getEditais(){
	
		const {id_usuario, admin} = this.state;
				
		var editais =  api_editais.getEditais();

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
										<div className="col titulo_tabela">
											{edital.descricao}
										</div>
										<div className="col-2 titulo_tabela" align='center'>
											{edital.status?"Ativo":"Desativado"}
										</div>
										<div className="col-2 titulo_tabela" align='center'>
											<div className="row align-items-center no-gutters">
												
												<div className="col" align='center'>
													<div className="bt_redondo azul" align='center'>
														<IconContext.Provider value={{ color: "#FFFFFF", className: 'bt_icon'}}>
															<div>
																<Link to={{pathname: "/VerEdital", state: {id:edital.id, retorno:"/"}}}>
																	<FiEye/>
																</Link>			
															</div>
														</IconContext.Provider>
													</div>
												</div>
												
												{admin && 
												<div className="col" align='center'>
													<div className="bt_redondo amarelo" align='center'>
														<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
															<div>
																<Link to={{pathname: "/AlterarEdital", state: {id:edital.id, retorno:"/"}}}>	
																	<FiEdit/>
																</Link>
															</div>
														</IconContext.Provider>
													</div>
												</div>}
												{admin && 
												<div className="col" align='center' onClick={() =>actions_editais.deletarEdital(edital.id, ref)}>
													<div className="bt_redondo rosa" align='center'>
														<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
															<div>
																<FiTrash/>
															</div>
														</IconContext.Provider>
													</div>
												</div>}
												{!admin && !api_editais.jaParticipaDeEdital(edital.id, id_usuario) && 
												<div className="col" align='center' onClick={() =>actions_editais.participarDeEdital(edital.id, id_usuario, ref)}>
													<div className="bt_redondo verde" align='center'>
														<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
															<div>
																<FiCheck/>
															</div>
														</IconContext.Provider>
													</div>
												</div>}
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
						<br/><br/><br/>Nenhum Edital Cadastrado<br/><br/><br/>
					</div>
				</div>);
	}	
	
	
	
	componentDidMount() {
		sessionService.loadUser()
		.then(user => {
			
			if(user.admin>0)
				this.setState({id_usuario:user.id, admin:true});
			else
				this.setState({id_usuario:user.id, admin:false});
			
			}
		)
		.catch(err => {
			
			this.setState({id_usuario:0,admin:false});
		
			}
		)
	}	
}





const { object } = PropTypes;

ListaDeEditais.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_editais, dispatch)
  };
};

ListaDeEditais = connect(null, mapDispatch)(withRouter(ListaDeEditais));

export default ListaDeEditais;
