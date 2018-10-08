import React, { Component }				from 'react';
import { connect } 						from 'react-redux';
import { withRouter } 					from 'react-router-dom';
import * as actions_sessao				from '../actions/actions_sessao';
import { IconContext  } 				from 'react-icons';
import { FiLogOut } 					from 'react-icons/fi';
import { bindActionCreators } 			from 'redux';



class BotaoSair extends Component {

	render(){
	
		const { history } = this.props;
		const { sair } = this.props.actions;
	
		return(
		<div className="bt_redondo rosa" align='center' onClick={() => sair(history)} title='Sair'>
			<IconContext.Provider value={{ color: "#FFFFFF", className: 'bt_icon'}}>
				<div>
					<FiLogOut/>
				</div>
			</IconContext.Provider>
		</div>)				
	}
}
	

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actions_sessao, dispatch)
  };
};

export default connect(null, mapDispatch)(withRouter(BotaoSair));
