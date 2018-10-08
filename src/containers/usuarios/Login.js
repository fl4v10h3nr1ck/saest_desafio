import React, { Component } 			from 'react';
import { connect } 						from 'react-redux';
import { Link } 						from 'react-router-dom';
import BarraSuperior					from '../../components/BarraSuperior';
import BarraRodape						from '../../components/BarraRodape';
import ListaDeNoticias					from '../../components/ListaDeNoticias';
import FormDeLogin						from './FormDeLogin';



class Login extends Component {
  
  
	render() {
		return(
			<div>
				<BarraSuperior />
				<div className='container'>
					<div className='row'>
						<div className='col-4'>
							<div className="bloco">
								<div className="titulo">
									Realize Seu Login
								</div>
								<FormDeLogin onSubmit={this.submit} />
							</div>
							<br/><br/>
							<div className="bloco">
								<div className="titulo">
									Crie sua Conta
								</div>
								<div className="row align-items-center no-gutters">
									<div className="col" align='center'>
										<br/>
										<Link to="/NovoUsuario">Ainda não possui uma conta? Clique Aqui.</Link>
										<br/>
									</div>
								</div>
							</div>
						</div>
						<div className='col'>
							<ListaDeNoticias/>
						</div>
					</div>
				</div>
				<BarraRodape />
			</div>
		);
	}
}

export default connect(null, null)(Login);

