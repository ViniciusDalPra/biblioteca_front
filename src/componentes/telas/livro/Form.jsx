import { useContext } from "react";
import LivroContext from "./LivroContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";
function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaGeneros }
        = useContext(LivroContext);

    return (
        <Dialogo id="modalEdicao" titulo="Livro"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                placeholder="" requerido="false"
                name="codigo" value={objeto.codigo} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                placeholder="Informe o nome" requerido="true"
                name="nome" value={objeto.nome} onchange={handleChange}
                msgvalido="Campo nome OK" msginvalido="Informe o nome"
                readonly={false} />
            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                placeholder="Informe a descrição" requerido="true"
                name="descricao" value={objeto.descricao} onchange={handleChange}
                msgvalido="Campo descrição OK" msginvalido="Informe a descrição"
                readonly={false} />
            <CampoEntrada id="txtValor" label="Valor" tipo="number"
                placeholder="Informe o valor" requerido="true"
                name="valor" value={objeto.valor}
                onchange={handleChange}
                msgvalido="Campo valor OK" msginvalido="Informe o valor"
                readonly={false} />
            <CampoSelect id="selectAtivo" label="Ativo"
                requerido="true"
                name="ativo" value={objeto.ativo}
                onchange={handleChange}
                msgvalido="Campo ativo OK" msginvalido="Informe se está ativo"
                readonly={false}>
                <option value={true}>SIM</option>
                <option value={false}>NÃO</option>
            </CampoSelect>
            <CampoSelect id="selectGenero" label="Genero"
                requerido="true"
                name="genero" value={objeto.genero}
                onchange={handleChange}
                msgvalido="Campo Genero OK" msginvalido="Informe a Genero"
                readonly={false}>
                {
                    listaGeneros.map((gen) => (
                        <option value={gen.codigo} key={gen.codigo}>{gen.nome}</option>
                    ))
                }
            </CampoSelect>

    
            
        </Dialogo>
    )
}

export default Form;