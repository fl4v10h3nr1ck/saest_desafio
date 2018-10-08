import React, { Component } 			from 'react';
import PropTypes 						from 'prop-types';
import { connect } 						from 'react-redux';
import { bindActionCreators } 			from 'redux';
import { withRouter, Link } 			from 'react-router-dom';
import { Field, reduxForm } 			from 'redux-form'
import Botao 							from '../../components/Botao';
import 								 	'../../styles/form_login.css';
import * as actions_sessao 				from '../../actions/actions_sessao';
import inputComErro 					from '../../components/InputComErro';
import { SubmissionError } 				from 'redux-form';


class FormDeLogin extends Component {



	constructor(props, context) {
    
		super(props, context);

		this.enviarDados = this.enviarDados.bind(this);
	}

	
	
	render() {
  
		const {handleSubmit, error} = this.props
	  
		return (
			<div>
				<div className="row area">
					<div className="col">
						<form onSubmit={handleSubmit(this.enviarDados)}>
							<Field name="cpf"	label="CPF" 	component={inputComErro} type="text" 		placeholder="Digite Seu CPF"/>
							<Field name="senha" label="Senha" 	component={inputComErro} type="password" 	placeholder="Digite Sua Senha"/>
							<div align='center' className="erro">
								{error && <span>{error}</span>}
							</div>
							<Botao label='Entrar'/>
						</form>	
					</div>
				</div>
				<div className="row area">
					<div className="col" align='center'>
						<br/>
						<Link to="/login">Sua conta não possui senha?</Link>
						<br/>
						<Link to="/login">Esqueceu sua senha?</Link>
					</div>
				</div>
			</div>
	  )
	}

	
	
	submit = values => {
	
		const { login } = this.props.actions;
		
		login({cpf:values.cpf, senha:values.senha}, withRouter(this.props.history));
	}
	

	
	
	enviarDados(values) {
 
		const { history } = this.props;
		
		return new Promise(function(resolve){resolve()})
		.then(() => {
		  
			if(values.cpf==null || values.cpf.length<6)
				throw new SubmissionError({cpf: 'Informe um CPF válido (pelo menos 6 dígitos)'});
		
			if(values.senha==null || values.senha.length<6)
				throw new SubmissionError({senha: 'Informe uma senha válida (pelo menos 6 caracteres'});
		  
			const { login } = this.props.actions;
		
			if(!login({cpf:values.cpf, senha:values.senha}, history))
				throw new SubmissionError({_error: 'CPF ou senha inválida'});
		})
	}
}

const { object } = PropTypes;

FormDeLogin.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_sessao, dispatch)
  };
};

FormDeLogin = connect(null, mapDispatch)(withRouter(FormDeLogin));

export default reduxForm({form: 'login'})(FormDeLogin)

