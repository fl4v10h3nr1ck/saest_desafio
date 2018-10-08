import * as api_usuarios 			from '../api/api_usuarios';
import $ 							from "jquery";
import { sessionService } 			from 'redux-react-session';


export const novoUsuario = (usuario, history, retorno) => {
	return () => {
    
		if(usuario!=null){
			
			var response = api_usuarios.novoUsuario(usuario.cpf, 
														usuario.email, 
															usuario.repete_email, 
																usuario.senha, 
																	usuario.repete_senha, 
																		usuario.admin);
			

			
			var aux;
			var erro;	
			
			try { aux = $.parseJSON(response.substring(response.indexOf("{")));}
			catch (e) { erro = true;} 
								
			if(erro || aux.status !== 'ok')
				return false;
		
			history.push(retorno);
			return true;
		}
		 
		return false;	  
	};
};





export const alterarUsuario = (usuario, history, retorno) => {
	return () => {
	
		if(usuario!=null){
			
			var response = api_usuarios.alterarUsuario(usuario.id, 
														usuario.cpf, 
															usuario.email, 
																usuario.repete_email, 
																	usuario.senha, 
																		usuario.repete_senha, 
																			usuario.admin);
			
			
			
			var aux;
			var erro;	
			
			try { aux = $.parseJSON(response.substring(response.indexOf("{")));}
			catch (e) { erro = true;} 
								
			if(erro || aux.status !== 'ok'){
				return false;
			}
			else{
	
				sessionService.saveUser({
					  id:usuario.id,
					  email: usuario.email,
					  cpf: usuario.cpf,
					  admin: usuario.admin
					});
				
				history.push(retorno);
				return true;
			}				
		}
		 
		return false;
	};
};