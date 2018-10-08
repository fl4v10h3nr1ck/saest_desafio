import React 				from 'react';


const ListaDeNoticias = () => (
	<div className="bloco">
		<div className="titulo">
			Últimas Notícias
		</div>
		<div className="row align-items-end no-gutters">
			<div className="col-3 titulo_tabela">
				<b>Notícia</b>
			</div>
			<div className="col titulo_tabela">
				<b>Decrição</b>
			</div>
			<div className="col-2 titulo_tabela">
				<b>Data</b>
			</div>
		</div>
		<div className="row no-gutters">
			<div className="col" align='center'>
				<hr className='separador'/>
			</div>
		</div>
		{getNoticias()}
	</div>
);




const getNoticias=()=>{
	
	var noticias = [{titulo:"SAEST realiza ação itinerante no campus de Abaetetuba UFPA", 
					descricao:"No período de 17 a 21 de setembro de 2018, a Superintendência de Assistência Estudantil, órgão da Reitoria da Universidade Federal do Pará, por meio de sua equipe técnica itinerante, realizou no campus de Abaetetuba ação itinerante, com várias atividades.", 
					data:"06/10/2018"}, 
					{titulo:"Programa bolsa permanência mec: reabertura do sigaest para recebimento", descricao:"A SAEST vinculada a Reitoria da UFPa, COMUNICA aos discentes que fizeram inscrição no Programa Bolsa Permanência do MEC no ano de 2018, que o Sistema Gerencial de Assistência Estudantil (SIGAEST) será reaberto para recebimento de documentos pendentes.", 
					data:"05/10/2018"},
					{titulo:"Saest divulga resultado final do auxílio kit-acadêmico - edital nº 05/2018/saest/ufpa.", 
					descricao:"O Auxílio Kit Acadêmico é um benefício financeiro destinado exclusivamente a discentes em vulnerabilidade socioeconômica. Tem como objetivo a aquisição/compra de material didático/pedagógico/específicos e de instrução em apoio às atividades acadêmicas.", 
					data:"02/10/2018"},
					{titulo:"Saest divulga informações sobre as inscrições-2018 do programa bolsa permanência mec", 
					descricao:"Ressaltamos que esse será o último prazo para envio de documentos pendentes. Após esse prazo, o SIGAEST fechará em definitivo e só será reaberto no próximo período de inscrição a ser estipulado pelo Ministério da Educação.", 
					data:"29/09/2018"}];
	
	
	return( 
		noticias.map(
			function(noticia, i){
				return(
					<div key={i}>
						<div className="row align-items-center no-gutters">
							<div className="col-3 titulo_tabela">
								{noticia.titulo}
							</div>
							<div className="col titulo_tabela">
								{noticia.descricao}
							</div>
							<div className="col-2 titulo_tabela">
								{noticia.data}
							</div>
						</div>
						{(i<(noticias.length-1)) && 
						<div className="row no-gutters">
							<div className="col" align='center'>
								<hr className='separador'/>
							</div>
						</div>}
					</div>
				)	
			}
		)
	)
}




export default ListaDeNoticias;
