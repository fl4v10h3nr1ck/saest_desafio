import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { Redirect } 				from 'react-router-dom';
import BarraSuperior					from '../components/BarraSuperior';
import BarraRodape						from '../components/BarraRodape';
import { sessionService } 				from 'redux-react-session';
import ListaDeEditais					from './editais/ListaDeEditais';
import NaoVerificado					from '../components/NaoVerificado';

class Home extends Component {

	
	constructor(props, context) {
    
		super(props, context);

		this.state = {
			permitido:0,
			user:{
				id:0,
				nome:"",
				admin:false
			}
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
		
		const{user} = this.state;
		
		return(
				<div>
					<BarraSuperior logado={true}  admin={user.admin} nome={user.nome}/>
					<div className='container'>
						<div className='row'>
							<div className='col'>
								<div className='row'>
									<div className='col'>
										<h3>Painel de Editais</h3>
										<br/>
										<span>Utilize o menu abaixo para {true?"criar, editar e excluir":"participar de"} editais no sistema</span>
										<br/><br/>
									</div>
								</div>
							</div>
							<ListaDeEditais/>
						</div>
					</div>
					<BarraRodape />
				</div>
		);		
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
			
				this.setState({
					permitido:1, 
					user:{
						id:user.id,
						admin: user.admin>0, 
						nome:user.email
					}
				});
			})
			.catch(
				err => {this.setState({permitido:-1});}
			)				
	}
}



export default connect(null, null)(Home);
