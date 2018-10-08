import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { sessionService } 				from 'redux-react-session';
import FormDeUsuario 					from "./FormDeUsuario";
import BarraSuperior					from '../../components/BarraSuperior';
import BarraRodape						from '../../components/BarraRodape';
import { IconContext  } 				from 'react-icons';
import { FiArrowLeft } 					from 'react-icons/fi';
import { withRouter } 					from 'react-router-dom';

class NovoUsuario extends Component {
  
  
	constructor(props, context) {
    
		super(props, context);

		this.state = {
			mostrar_admin:false,
			retorno:"/"
		}
	}
  
 
	render() {
    
		const { mostrar_admin, retorno } = this.state;
	
		const { history } = this.props;
	
		return (
			<div>
				<BarraSuperior />
				<div className='container area_geral'>
					<div className='row'>
						<div className='col'>
							<h4>Crie sua conta no SIGAEST</h4>
						</div>		
					</div>
					<div className='row'>
						<div className='col'>
							<br/>
							Utilize o formulário abaixo para criar a sua conta.
							<br/><br/>
						</div>		
					</div>
					<div className='row'>
						<div className='col' align='center'>
							<div className="bloco">
								<div className="titulo">
									<div className='row justify-content-center align-items-center no-gutters'>
										<div className='col'>
											Dados Pessoais
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
								<FormDeUsuario mostrar_admin={mostrar_admin} retorno={retorno}/>
								<br/>
							</div>	
						</div>		
					</div>
				</div>
				<BarraRodape />
			</div>
		)
	}
	
	

	componentDidMount() {
		sessionService.loadUser()
		.then(user => {
			
			if(user.admin>0)
				this.setState({mostrar_admin:true, retorno:"/ListaDeUsuarios"});
			else
				this.setState({mostrar_admin:false, retorno:"/AreaDoAluno"});
			
			}
		)
		.catch(err => {
			
			this.setState({mostrar_admin:false, retorno:"/login"});
		
			}
		)
	}
}

export default connect(null, null)(withRouter(NovoUsuario));

