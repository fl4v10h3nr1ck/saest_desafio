import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { sessionService } 				from 'redux-react-session';
import FormDeEdital 					from "./FormDeEdital";
import BarraSuperior					from '../../components/BarraSuperior';
import BarraRodape						from '../../components/BarraRodape';
import NaoPermitido						from '../../components/NaoPermitido';
import NaoVerificado					from '../../components/NaoVerificado';
import * as api_editais 				from '../../api/api_editais';
import { IconContext  } 				from 'react-icons';
import { FiArrowLeft } 					from 'react-icons/fi';
import { withRouter } 					from 'react-router-dom';


class AlterarEdital extends Component {
  
  
  
	constructor(props, context) {
    
		super(props, context);

		this.state = {
			permitido:0,
			retorno:"/",
			edital:{
				id:0,
				nome:'', 
				descricao:'', 
				status:1, 
				tipo:1, 
				modalidade:"0#0#0#0#0"
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
		
		const { retorno, edital } = this.state;
	
		const { history } = this.props;
	
		var modalidades = edital.modalidade.split("#");
	
		return (
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
					<div className='row'>
						<div className='col'>
							<h5>Editar Edital</h5>
						</div>		
					</div>
					<div className='row'>
						<div className='col'>
							<br/>
							preencha o formulário abaixo com os novos dados do edital
							<br/><br/>
						</div>		
					</div>
					<div className='row'>
						<div className='col' align='center'>
							<div className="bloco">
								<div className="titulo">
									<div className='row justify-content-center align-items-center no-gutters'>
										<div className='col'>
											Painel de edição de edital
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
								<FormDeEdital enableReinitialize={true} initialValues={{
									id:edital.id,
									nome:edital.nome, 
									descricao:edital.descricao, 
									status:edital.status>0?'1':'0', 
									tipo:edital.tipo>0?'1':'0', 
									modalidade_tecnic:modalidades.length>0 && modalidades[0]>0?true:false,
									modalidade_gradua:modalidades.length>1 && modalidades[1]>0?true:false,
									modalidade_posgra:modalidades.length>2 && modalidades[2]>0?true:false,
									modalidade_mestre:modalidades.length>3 && modalidades[3]>0?true:false,
									modalidade_doutor:modalidades.length>4 && modalidades[4]>0?true:false
									}} retorno={retorno}/>
								<br/>
							</div>	
						</div>		
					</div>
				</div>
				<BarraRodape />
			</div>
		)
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
				
				if(user.admin>0){
					
					var id = this.props.location.state.id;
				
					
					if(id>0){
					
						var edital = api_editais.getEdital(id);
			
						if(edital!=null){
			
							this.setState({
								permitido:1,
								retorno:this.props.location.state.retorno,
								edital:{
									id:edital.id,
									nome:edital.nome, 
									descricao:edital.descricao, 
									status:edital.status, 
									tipo:edital.tipo, 
									modalidade:edital.modalidade
								}
							});
							return;
						}
					}
					
					this.setState({permitido:-1});
				}
			})
			.catch(err => {
				
				this.setState({permitido:-1});
			});
	}
	
}
  
 
export default connect(null, null)(withRouter(AlterarEdital)); 
  
 