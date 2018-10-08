import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { sessionService } 				from 'redux-react-session';
import BarraSuperior					from '../../components/BarraSuperior';
import BarraRodape						from '../../components/BarraRodape';
import NaoVerificado					from '../../components/NaoVerificado';
import * as api_editais 				from '../../api/api_editais';
import { Link } 						from 'react-router-dom';
import  * as cons						from '../../util/consts';
import 									 '../../styles/ver_edital.css';
import { IconContext  } 				from 'react-icons';
import { FiEdit, FiCheck, FiArrowLeft} 	from 'react-icons/fi';
import { bindActionCreators } 			from 'redux';
import PropTypes 						from 'prop-types';
import { withRouter } 					from 'react-router-dom';
import * as actions_editais 			from '../../actions/actions_editais';
import NaoPermitido						from '../../components/NaoPermitido';


var ref = () =>{}



class VerEdital extends Component {
  
  
 
	constructor(props, context) {
    
		super(props, context);

		this.state = {
			permitido:0,
			retorno:"/",
			id_usuario:0,
			admin:false,
			edital:{
				id:0
			}			
		};
		
		ref = this;
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
    
		const { edital, admin, id_usuario } = this.state;
	
		const { history } = this.props;
	
		if(edital.id>0){
					
			var aux_edital = api_editais.getEdital(edital.id);
			
			if(aux_edital!=null){
				
				var tipo = "";
				var artigo = ["", ""];
				
				if(aux_edital.tipo === cons.TIPO_EDITAL_VALOR){
					
					tipo = cons.TIPO_EDITAL_NOME;
					artigo = ["ao", "o"];	
				}
				else{
					
					tipo = cons.TIPO_INSNORM_NOME;
					artigo = ["a", "a"];	
				}	
				
				return (
					<div>
						<BarraSuperior />
						<div className='container area_geral'>
							<div className='row'>
								<div className='col'>
									<h5>{tipo} {aux_edital.nome}</h5>
								</div>		
							</div>
							<div className='row'>
								<div className='col' align='left'>
									<br/>
									verifique e realize ações referente {artigo[0]} {tipo} escolhid{artigo[1]}
									<br/><br/>
								</div>							
							</div>
							<div className='row'>
								<div className='col' align='center'>
									<div className="bloco">
										<div className='row'>
											<div className='col'>
												<div className="titulo">
													<div className='row justify-content-center align-items-center no-gutters'>
														<div className='col justify-content-center' align='left'>
															Painel de visualização do edital
														</div>	
														<div className='col' align='right'>
															<div className="row justify-content-center align-items-center no-gutters">
																{admin && 
																<div className="col bt_opcao" align='right'>
																	<Link to={{pathname: "/AlterarEdital", state: {id:aux_edital.id, retorno:"/"}}} title='Editar'>
																		<div className="bt_redondo amarelo" align='center'>
																			<IconContext.Provider value={{ color: "#FFF", className: 'bt_icon'}}>
																				<div>
																					<FiEdit/>
																				</div>
																			</IconContext.Provider>
																		</div>
																	</Link>	
																</div>}
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
												</div>	
											</div>		
										</div>
										<div className='row area_dados'>
											<div className='col'>
												<div className='row'>
													<div className='col'>
														<br/>
														<b>Nome:</b> {aux_edital.nome}<br/>
													</div>
												</div>	
												<div className='row'>
													<div className='col'>
														<br/>													
														<b>Criado em:</b> <br/>
													</div>
												</div>
												<div className='row'>
													<div className='col'>
														<br/>													
														<b>Tipo:</b> {tipo}<br/>
													</div>
												</div>
												<div className='row'>
													<div className='col'>
														<br/>													
														<b>Descrição:</b> {aux_edital.descricao}<br/>
													</div>
												</div>
												<div className='row'>
													<div className='col' align='center'>
														{!admin && !api_editais.jaParticipaDeEdital(aux_edital.id, id_usuario) && 
														<div className="bt_opcao" onClick={() =>actions_editais.participarDeEdital(aux_edital.id, id_usuario, ref)} title='Participar'>
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
										</div>
									</div>
								</div>		
							</div>
						</div>
						<BarraRodape />
					</div>
				)
			}
		}
		
		return (
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
					<div className='row'>
						<div className='col' align='center'>
							<br/><br/>
							<h4>Edital não encontrado ou não está mais disponível</h4>
						</div>
					</div>
					<div className='row' align='center'>
						<div className='col' align='center'>
							<br/><br/><br/>
							<Link to={"/"}>Voltar para página inicial</Link>
							<br/><br/><br/>
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
				
				var id = 0;
				var retorno = "/";
				
				if(this.props.location.state!=null){
					id = this.props.location.state.id;
					retorno = this.props.location.state.retorno;
				}
				
				if(id>0){
				
					this.setState({
						permitido:1,
						retorno:retorno,
						id_usuario:user.id,
						admin:user.admin>0,
						edital:{
							id:id
						}
					});
				}
			}).
			catch(()=>{
				
				this.setState({
						permitido:-1
					})
			})
	}
	
}
  
 
const { object } = PropTypes;

VerEdital.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_editais, dispatch)
  };
};

VerEdital = connect(null, mapDispatch)(withRouter(VerEdital));

export default VerEdital;
  
