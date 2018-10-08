import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { sessionService } 				from 'redux-react-session';
import FormDeEdital 					from "./FormDeEdital";
import BarraSuperior					from '../../components/BarraSuperior';
import BarraRodape						from '../../components/BarraRodape';
import NaoPermitido						from '../../components/NaoPermitido';
import NaoVerificado					from '../../components/NaoVerificado';
import { IconContext  } 				from 'react-icons';
import { FiArrowLeft } 					from 'react-icons/fi';
import { withRouter } 					from 'react-router-dom';

class NovoEdital extends Component {
  
  
  
	constructor(props, context) {
    
		super(props, context);

		this.state = {
			permitido:0,
			retorno:"/"
		}
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
		
		const { retorno } = this.state;
	
		const { history } = this.props;
	
		return (
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
					<div className='row'>
						<div className='col'>
							<h5>Criar Edital</h5>
						</div>		
					</div>
					<div className='row'>
						<div className='col'>
							<br/>
							preencha o formulário abaixo de um novo edital no sistema
							<br/><br/>
						</div>		
					</div>
					<div className='row'>
						<div className='col' align='center'>
							<div className="bloco">
								<div className="titulo">
									<div className='row justify-content-center align-items-center no-gutters'>
										<div className='col'>
											Painel de criação de edital
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
									status:'1',
									tipo:'1'}} retorno={retorno}/>
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
				
				if(user.admin>0)
					this.setState({permitido:1});
				else
					this.setState({permitido:-1});
				
				this.render();
			})
			.catch(
				err => {
				
				this.setState({permitido:-1});
				
				this.render()});
	}
	
}
  

export default connect(null, null)(withRouter(NovoEdital));


