import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/api_sessao';



export const login = (user, history) => {
	return () => {
    
		if(user!=null){
			
			var response = sessionApi.login(user);
			
			if(response.login>0){
			 
				  const { token } = response;
				  
				  sessionService.saveSession({ token })
				  .then(() => {
					sessionService.saveUser(response.data)
					.then(() => {
					  
					  if(response.data.admin>0)
						  history.push('/AreaDoAdmin');
					  else
						history.push('/');
					
					}).catch(err => {return false});
				  }).catch(err => {return false});
				
				return true;
			}
		}
	
		return false;
	};
};



export const sair = (history) => {
	return () => {
		
		sessionService.deleteSession();
		
		sessionService.deleteUser();
				
		history.push('/login');
	};
};
