import React 								from 'react';
import PropTypes 							from 'prop-types';
import { BrowserRouter as Router, Route } 	from 'react-router-dom';
import { connect } 							from 'react-redux';
import Home 								from './Home';
import Login 								from './usuarios/Login';
import NovoUsuario 							from './usuarios/NovoUsuario';
import AlteraUsuario 						from './usuarios/AlteraUsuario';
import ListaDeUsuarios 						from './usuarios/ListaDeUsuarios';
import AreaDoAdmin 							from './AreaDoAdmin';
import AreaDoAluno 							from './AreaDoAluno';
import NovoEdital 							from './editais/NovoEdital';
import AlterarEdital 						from './editais/AlterarEdital';
import VerEdital 							from './editais/VerEdital';
import PrivateRoute 						from '../components/PrivateRoute';


const App = ({ authenticated, checked }) => (
  <Router>
    { checked &&
      <div>
        <PrivateRoute exact path="/" 					component={Home} 			authenticated={authenticated}/>
		<PrivateRoute exact path="/AlteraUsuario" 		component={AlteraUsuario} 	authenticated={authenticated}/>
		<PrivateRoute exact path="/ListaDeUsuarios" 	component={ListaDeUsuarios} authenticated={authenticated}/>
		<PrivateRoute exact path="/AreaDoAdmin" 		component={AreaDoAdmin} 	authenticated={authenticated}/>
		<PrivateRoute exact path="/AreaDoAluno" 		component={AreaDoAluno} 	authenticated={authenticated}/>
		<PrivateRoute exact path="/NovoEdital" 			component={NovoEdital} 		authenticated={authenticated}/>
		<PrivateRoute exact path="/AlterarEdital" 		component={AlterarEdital} 	authenticated={authenticated}/>
		<PrivateRoute exact path="/VerEdital" 			component={VerEdital} 		authenticated={authenticated}/>
        <Route path="/login" 							component={Login}/>
		<Route path="/NovoUsuario" 						component={NovoUsuario} />
      </div>
    }
  </Router>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session!=null?session.checked: true,
  authenticated: session!=null?session.authenticated: true,
});

export default connect(mapState)(App);
