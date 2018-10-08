
import * as consts				from "../util/consts";
import {geraId}					from "../util/util";
import $ 						from "jquery";


export const getEditais = () => {
	
	var editais = localStorage.getItem(consts.CHAVE_EDITAIS);
	
	if(editais!=null){
		
		var aux;
			
		try {aux = $.parseJSON(editais);}
				
		catch (e) { return null;} 
		
		return aux;
	}
	
	return null;
};



export const temEdital = () => {
	
	return getEditais()!=null;
};




export const setValoresIniciais = () => {
	
	localStorage.setItem(consts.CHAVE_USUARIOS, 
	'[{"id":'+consts.ID_ALUNO_PADRAO+', "cpf":"'+consts.CPF_ALUNO_PADRAO+'", "email":"'+consts.EMAIL_ALUNO_PADRAO+'", "senha":"'+consts.SENHA_ALUNO_PADRAO+'", "admin":0}'+
	', {"id":'+consts.ID_ADMIN_PADRAO+', "cpf":"'+consts.CPF_ADMIN_PADRAO+'", "email":"'+consts.EMAIL_ADMIN_PADRAO+'", "senha":"'+consts.SENHA_ADMIN_PADRAO+'", "admin":1}]');
	
};


	

export const novoEdital=(nome, descricao, status, tipo, modalidade)=>{
	
	var editais = getEditais();
	if(editais==null)
		editais = [];
	
	editais.push({
		id:geraId(),
		nome:nome, 
		descricao:descricao, 
		status:status, 
		tipo:tipo, 
		modalidade:modalidade	
	}); 
	
	try{
	
		var jEditais = JSON.stringify(editais);
		
		localStorage.setItem(consts.CHAVE_EDITAIS, jEditais);
	}
	catch (e) { return '{"status":"erro", "erro":"Não foi possível gravar os dados."}';} 
	
	return '{"status":"ok"}';
};
	
	
	
	
export const alterarEdital=(id, nome, descricao, status, tipo, modalidade)=>{
	
	var editais = getEditais();
	if(editais==null)
		return '{"status":"erro", "erro":"Usuário não encontrado."}';
	

	if(editais!=null){
	
		var controle = false;
	
		for (var i in editais) {
	
			if(editais[i].id === id){
				
				editais[i].nome = nome;
				editais[i].descricao = descricao;
				editais[i].status = status;
				editais[i].tipo = tipo;
				editais[i].modalidade = modalidade;
				
				controle = true;
				break;
			}
		}
				
		if(controle){

			try{
	
				var jEditais = JSON.stringify(editais);
		
				localStorage.setItem(consts.CHAVE_EDITAIS, jEditais);
			}
			catch (e) { return '{"status":"erro", "erro":"Não foi possível gravar os dados."}';} 
	
		}
	}
	
	return '{"status":"ok"}';
};
	
	
	
	
export const getEdital=(id)=>{
	
	var editais = getEditais();
	
	if(editais==null)
		return null;
	
	for (var i in editais) {
	
		if(editais[i].id === id)
			return editais[i];			
	}
	
	return null;
};
	
	
	
		
export const deletaEdital=(id)=>{
	
	var editais = getEditais();
	
	if(editais==null)
		return '{"status":"erro", "erro":"Edital não encontrado."}';
	
	var controle = false;
	
	if(editais!=null){
	
		for (var i in editais) {
	
			if(editais[i].id === id){
				
				editais.splice(i, 1);
				controle = true;
				break;
			}
		}
				
		if(controle){

			try{
	
				var jEditais = JSON.stringify(editais);
		
				localStorage.setItem(consts.CHAVE_EDITAIS, jEditais);
			}
			catch (e) { return '{"status":"erro", "erro":"Não foi possível gravar os dados."}';} 
	
		}
	}
	
	return '{"status":"ok"}';
};
	
	


export const getParticipacoes = () => {
	
	var participacoes = localStorage.getItem(consts.CHAVE_PARCIPACOES);
	
	if(participacoes!=null){
		
		var aux;
			
		try {aux = $.parseJSON(participacoes);}
				
		catch (e) { return null;} 
		
		return aux;
	}
	
	return null;
};

	
	
	
export const participarDeEdital=(id_edital, id_usuario)=>{
	
	if(id_edital<=0 || id_usuario<=0)
		return '{"status":"erro", "erro":"Edital ou aluno não encontrado."}';
	
	var participacoes = getParticipacoes();
	
	if(participacoes==null)
		participacoes = [];
	
	participacoes.push({
		id:geraId(),
		id_edital:id_edital, 
		id_usuario:id_usuario}); 
	
	try{
	
		var jParticipacoes = JSON.stringify(participacoes);
		
		localStorage.setItem(consts.CHAVE_PARCIPACOES, jParticipacoes);
	}
	catch (e) { return '{"status":"erro", "erro":"Não foi possível gravar os dados."}';} 
	
	return '{"status":"ok"}';
};
	
	
			

	
export const jaParticipaDeEdital=(id_edital, id_usuario)=>{
	
	if(id_edital<=0 || id_usuario<=0)
		return false;
	
	var participacoes = getParticipacoes();
	
	if(participacoes!=null){
	
		for (var i in participacoes) {
	
			if(participacoes[i].id_edital === id_edital && participacoes[i].id_usuario === id_usuario)
				return true;
		}
	}
	
	return false;
};
	
	
	

export const getMeusEditais=(id_usuario)=>{
	
	var editais = getEditais();
	
	var retorno = [];
	
	if(editais==null)
		return retorno;
	
	for (var i in editais) {
	
		if(jaParticipaDeEdital(editais[i].id,  id_usuario))
			retorno.push(editais[i]);		
	}
	
	return retorno;
};
	
	
		
	
		
	
	
	
	