import React, { Component }  		from 'react'
import { Field, reduxForm } 		from 'redux-form'
import Botao 						from '../../components/Botao';
import 								 '../../styles/form_usuario.css';
import { SubmissionError } 			from 'redux-form';
import { bindActionCreators } 		from 'redux';
import * as actions_usuarios 		from '../../actions/actions_usuarios';
import inputComErro 				from '../../components/InputComErro';
import { withRouter } 				from 'react-router-dom';
import PropTypes 					from 'prop-types';
import { connect } 					from 'react-redux';


var path_retorno; 


class FormDeUsuario extends Component {

	
  
	constructor(props, context) {
    
		super(props, context);

		this.enviarDados = this.enviarDados.bind(this);
	}


	
	render() {
	
		const {handleSubmit, mostrar_admin, submitting, error, retorno, initialValues} = this.props
	  
		path_retorno = retorno;
	  
		return (
			<div>
				<div className="row area">
					<div className="col">
						<form onSubmit={handleSubmit(this.enviarDados)}>
							<Field name="cpf" 			component={inputComErro} type="text" label="CPF*" 		placeholder="Digite seu CPF"/>
							<Field name="email" 		component={inputComErro} type="text" label="E-mail*" 				placeholder="Digite seu E-mail"/>
							<Field name="repete_email" 	component={inputComErro} type="text" label="Confirmação de E-mail*" placeholder="Digite seu email novamente"/>
							<Field name="senha" 		component={inputComErro} type="password" label="Senha*" 				placeholder="Digite sua senha"/>
							<Field name="repete_senha" 	component={inputComErro} type="password" label="Confirmação de Senha*" 	placeholder="Digite sua senha novamente"/>
							<div className={mostrar_admin?"mostrar_admin":"esconder_admin"}>
								Administrador?<Field name="admin" component="input" type="checkbox"/>
							</div>
							<div align='center' className="erro">
								{error && <span>{error}</span>}
							</div>
							<Botao label={initialValues!=null && initialValues.id>0?'Salvar Conta':'Criar Conta'} disabled={submitting}/>
						</form>	
					</div>
				</div>
			</div>	
		)
	}

	
	
	
	enviarDados(values) {
 
		const { history, initialValues } = this.props;
		const { novoUsuario, alterarUsuario } = this.props.actions;
 
 
		return new Promise(function(resolve){resolve()})
		.then(() => {
		  
			if(values.cpf==null || values.cpf.length<6)
				throw new SubmissionError({cpf: 'Informe um CPF válido (pelo menos 6 dígitos)', _error: 'falha ao cadastrar!'});
		
			if(values.email==null || values.email.length<6)
				throw new SubmissionError({email: 'Informe um E-mail válido (pelo menos 6 caracteres)', _error: 'falha ao cadastrar!'});	
		
			if(values.repete_email==null || values.repete_email !== values.email)
				throw new SubmissionError({repete_email: 'Os endereços de e-mail não são iguais', _error: 'falha ao cadastrar!'});
		
			if(initialValues!=null && initialValues.id>0){
				
				if(!alterarUsuario({
						id:initialValues.id,
						cpf:values.cpf,
						email:values.email,
						repete_email:values.repete_email,
						senha:values.senha,
						repete_senha:values.repete_senha,
						admin:values.admin?1:0
					}, history, path_retorno))
					throw new SubmissionError({_error: 'Um erro ocorreu ao gravar as informações'});
			}
			else{
				
				if(values.senha==null || values.senha.length<6)
					throw new SubmissionError({senha: 'Informe uma senha válida (pelo menos 6 caracteres)', _error: 'falha ao cadastrar!'});
		
				if(values.repete_senha==null || values.repete_senha !== values.senha)
					throw new SubmissionError({repete_senha: 'erro":"As senhas não são iguais', _error: 'falha ao cadastrar!'});
		  
				if(!novoUsuario({
						cpf:values.cpf,
						email:values.email,
						repete_email:values.repete_email,
						senha:values.senha,
						repete_senha:values.repete_senha,
						admin:values.admin?1:0
				  
					}, history, path_retorno))
					throw new SubmissionError({_error: 'Um erro ocorreu ao gravar as informações'});
			}
		})
	}
}	
	


const { object } = PropTypes;

FormDeUsuario.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_usuarios, dispatch)
  };
};

FormDeUsuario = connect(null, mapDispatch)(withRouter(FormDeUsuario));

export default reduxForm({form: 'usuario'})(FormDeUsuario);