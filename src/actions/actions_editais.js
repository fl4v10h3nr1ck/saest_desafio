import * as api_editais 			from '../api/api_editais';
import $ 							from "jquery";


export const novoEdital = (edital, history, retorno) => {
	return () => {
    
		if(edital!=null){
			
			var response = api_editais.novoEdital(edital.nome, 
														edital.descricao, 
															edital.status, 
																edital.tipo, 
																	edital.modalidade);
			
			
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





export const alterarEdital = (edital, history, retorno) => {
	return () => {
    

		if(edital!=null){
			
			var response = api_editais.alterarEdital(edital.id, 
														edital.nome, 
															edital.descricao, 
																edital.status, 
																	edital.tipo, 
																		edital.modalidade);
			
			
			var aux;
			var erro;	
			
			try { aux = $.parseJSON(response.substring(response.indexOf("{")));}
			catch (e) { erro = true;} 
								
			if(erro || aux.status !== 'ok')
				return false;
			
			else{
							
				history.push(retorno);
				return true;
			}				
		}
		
		return false;
	};
};





export const deletarEdital = (id, elemento) => {
	

	if(id>0){
			
		var response = api_editais.deletaEdital(id);
			
		var aux;
		var erro;	
			
		try { aux = $.parseJSON(response.substring(response.indexOf("{")));}
		catch (e) { erro = true;} 
								
		if(erro || aux.status !== 'ok')
			return false;
		else{
							
			if(elemento!=null)
				elemento.setState({permitido:1});
		}				
	}
	
		
	return false;

}





export const participarDeEdital = (id_edital, id_usuario, elemento) => {
	

	var response = api_editais.participarDeEdital(id_edital, id_usuario);	
					
	var aux;
	var erro;	
				
	try { aux = $.parseJSON(response.substring(response.indexOf("{")));}
	catch (e) { erro = true;} 
									
	if(erro || aux.status !== 'ok')
		return false;
				
	else{
									
		if(elemento!=null)
			elemento.setState({});	
		
		return true;				
	}
	
	return false;
}


