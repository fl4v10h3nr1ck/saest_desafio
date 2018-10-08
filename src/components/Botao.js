import React 				from 'react';

const Botao = ({label="", tipo="bt_cinza", disabled}) => (
  <button className={"btn btn-lg btn-primary btn-block "+tipo} type="submit" disabled={disabled}>{label}</button>
);

export default Botao;
