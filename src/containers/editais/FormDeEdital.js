import React, { Component }  		from 'react'
import { Field, reduxForm } 		from 'redux-form'
import Botao 						from '../../components/Botao';
import 								 '../../styles/form_usuario.css';
import { SubmissionError } 			from 'redux-form';
import { bindActionCreators } 		from 'redux';
import * as actions_editais 		from '../../actions/actions_editais';
import inputComErro 				from '../../components/InputComErro';
import { withRouter } 				from 'react-router-dom';
import PropTypes 					from 'prop-types';
import { connect } 					from 'react-redux';

var path_retorno; 


class FormDeEdital extends Component {

	
  
	constructor(props, context) {
    
		super(props, context);

		this.enviarDados = this.enviarDados.bind(this);
	}



	
	render() {
	
		const {handleSubmit, submitting, retorno, initialValues} = this.props
	  
		path_retorno = retorno;
	  
		return (
			<div>
				<div className="row area">
					<div className="col">
						<form onSubmit={handleSubmit(this.enviarDados)}>
							<Field name="nome" 			component={inputComErro} type="text" label="Nome:*" 		placeholder="Digite o nome do edital"/>
							<Field name="descricao" 	component={inputComErro} type="text" label="Descricao:*" 	placeholder="informe a descrição do edital"/>
							<br/>
							<b>Qual é o status do edital?</b>
							<br/><br/>
							<Field  component="input"	name="status" type="radio"  value="0"/>Desativado
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Field  component="input"	name="status" type="radio" value="1"/>Ativo
							<br/><br/>
							<b>Qual é o tipo do edital?</b>
							<br/><br/>
							<Field 	name="tipo" type="radio" component="input" value="0"/>Edital
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Field 	name="tipo" type="radio" component="input" value="1"/>Instrução Normativa
							<br/><br/>
							<b>Selecione a modalidade do curso:</b>
							<br/><br/>
							<Field name="modalidade_tecnic" component="input" type="checkbox"/>Técnico
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Field name="modalidade_gradua" component="input" type="checkbox"/>Graduação
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Field name="modalidade_posgra" component="input" type="checkbox"/>Pós Graduação
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Field name="modalidade_mestre" component="input" type="checkbox"/>Mestrado
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Field name="modalidade_doutor" component="input" type="checkbox"/>Doutorado
							<br/><br/>
							<Botao label={initialValues!=null && initialValues.id>0?'Salvar Edital':'Criar Edital'} tipo='bt_azul' disabled={submitting}/>
						</form>	
					</div>
				</div>
			</div>	
		)
	}

	
	
	
	enviarDados(values) {
 
		const { history, initialValues } = this.props;
		const { novoEdital, alterarEdital } = this.props.actions;
 
		return new Promise(function(resolve){resolve()})
		.then(() => {
		  
			if(values.nome==null || values.nome.length<=0)
				throw new SubmissionError({nome: 'Informe o nome do edital', _error: 'falha ao cadastrar!'});
		
			if(values.descricao==null || values.descricao.length<=0)
				throw new SubmissionError({descricao: 'Informe a descrição do edital', _error: 'falha ao cadastrar!'});	
		
			var modalidade ="";
			
			if(values.modalidade_tecnic)
				modalidade += "1#";
			else
				modalidade += "0#";
			
			if(values.modalidade_gradua)
				modalidade += "1#";
			else
				modalidade += "0#";
					
			if(values.modalidade_posgra)
				modalidade += "1#";
			else
				modalidade += "0#";
				
			if(values.modalidade_mestre)
				modalidade += "1#";
			else
				modalidade += "0#";
				
			if(values.modalidade_doutor)
				modalidade += "1#";
			else
				modalidade += "0#";
			
			
			if(initialValues!=null && initialValues.id>0){
				
				if(!alterarEdital({
						id:initialValues.id,
						nome:values.nome,
						descricao:values.descricao,
						status:values.status,
						tipo:values.tipo,
						modalidade:modalidade
					}, history, path_retorno))
					throw new SubmissionError({_error: 'Um erro ocorreu ao gravar as informações'});
			}
			else{
				
				if(!novoEdital({
						nome:values.nome,
						descricao:values.descricao,
						status:values.status,
						tipo:values.tipo,
						modalidade:modalidade
					}, history, path_retorno))
					throw new SubmissionError({_error: 'Um erro ocorreu ao gravar as informações'});
			}
		})
	}
}	
	


const { object } = PropTypes;

FormDeEdital.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_editais, dispatch)
  };
};

FormDeEdital = connect(null, mapDispatch)(withRouter(FormDeEdital));

export default reduxForm({form: 'edital'})(FormDeEdital);