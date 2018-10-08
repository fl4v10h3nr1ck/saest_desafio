
import * as consts				from "../util/consts";
import {geraId}					from "../util/util";
import $ 						from "jquery";


export const getUsuarios = () => {
	
	var usuarios = localStorage.getItem(consts.CHAVE_USUARIOS);
	
	if(usuarios!=null){
		
		var aux;
			
		try {aux = $.parseJSON(usuarios);}
				
		catch (e) { return null;} 
		
		return aux;
	}
	
	return null;
};



export const temUsuario = () => {
	
	return getUsuarios()!=null;
};




export const setValoresIniciais = () => {
	
	localStorage.setItem(consts.CHAVE_USUARIOS, 
	'[{"id":'+consts.ID_ALUNO_PADRAO+', "cpf":"'+consts.CPF_ALUNO_PADRAO+'", "email":"'+consts.EMAIL_ALUNO_PADRAO+'", "senha":"'+consts.SENHA_ALUNO_PADRAO+'", "admin":0}'+
	', {"id":'+consts.ID_ADMIN_PADRAO+', "cpf":"'+consts.CPF_ADMIN_PADRAO+'", "email":"'+consts.EMAIL_ADMIN_PADRAO+'", "senha":"'+consts.SENHA_ADMIN_PADRAO+'", "admin":1}]');
	
};




export const tentativaDeLogin=(cpf, senha)=>{
	
	var usuarios = getUsuarios();
	
	if(usuarios!=null){
	
		for (var i in usuarios) {
	
			if(usuarios[i].cpf === cpf && usuarios[i].senha === senha)
				return usuarios[i];
	
		}
	
	}
	
	return null;
};
	
	
	

export const novoUsuario=(cpf, email, repete_email, senha, repete_senha, admin)=>{
	
	var usuarios = getUsuarios();
	if(usuarios==null)
		usuarios = [];
	
	usuarios.push({
		id:geraId(),
		cpf:cpf, 
		email:email,
		senha:senha,
		admin:admin
	}); 
	
	try{
	
		var jUsers = JSON.stringify(usuarios);
		
		localStorage.setItem(consts.CHAVE_USUARIOS, jUsers);
	}
	catch (e) { return '{"status":"erro"}';} 
	
	return '{"status":"ok"}';
};
	
	
	
	
export const alterarUsuario=(id, cpf, email, repete_email, senha, repete_senha, admin)=>{
	
	var usuarios = getUsuarios();
	if(usuarios==null)
		return '{"status":"erro", "erro":"Usuário não encontrado."}';
	
	if(usuarios!=null){
	
		var controle = false;
	
		for (var i in usuarios) {
	
			if(usuarios[i].id === id){
				
				usuarios[i].cpf = cpf;
				usuarios[i].email = email;
				usuarios[i].admin = admin;
				
				if(senha!=null && senha.length>0)
					usuarios[i].senha = senha;
				
				controle = true;
				break;
			}
		}
				
		if(controle){

			try{
	
				var jUsers = JSON.stringify(usuarios);
		
				localStorage.setItem(consts.CHAVE_USUARIOS, jUsers);
			}
			catch (e) { return '{"status":"erro", "erro":"Não foi possível gravar os dados."}';} 
	
		}
	}
	
	return '{"status":"ok"}';
};
	
	
	
	
	
export const getUsuario=(id)=>{
	
	var usuarios = getUsuarios();
	
	if(usuarios==null)
		return null;
	
	for (var i in usuarios) {
	
		if(usuarios[i].id === id)
			return usuarios[i];			
	}
	
	return null;
};
	
	
	
	
	
	
	