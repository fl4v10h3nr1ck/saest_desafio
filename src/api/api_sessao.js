
import * as api_usuarios from './api_usuarios';


export const login = (user) => {
 
	if(!api_usuarios.temUsuario())
		api_usuarios.setValoresIniciais();
	
	var retorno  = api_usuarios.tentativaDeLogin(user.cpf, user.senha);
	
	if(retorno!=null){
		
		const response = {
			login:1,
			token: 'user221'+retorno.id,
			data: {
			  id:retorno.id,
			  email: retorno.email,
			  cpf: retorno.cpf,
			  admin:retorno.admin
			}
		};
		
		return response;
	}
	else{
	
		const response = {
			login:0,
		};
		
		return response;
	}
};
