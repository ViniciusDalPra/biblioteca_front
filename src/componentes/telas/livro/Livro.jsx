import { useState, useEffect } from "react";
import LivroContext from "./LivroContext";
import { getGenerosAPI } from "../../../servicos/GeneroServico";
import {
    getLivrosAPI, getLivroPorCodigoAPI,
    deleteLivroAPI, cadastraLivroAPI
} from "../../../servicos/LivroServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Livro() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: "", quantidade_estoque: "",
        valor: "", ativo: "", data_cadastro: new Date().toISOString().slice(0, 10),
        Genero: ""
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", nome: "",
            descricao: "", quantidade_estoque: "",
            valor: "", ativo: "", data_cadastro: new Date().toISOString().slice(0, 10),
            Genero: ""
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getLivroPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraLivroAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaLivros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(false);

    const recuperaLivros = async () => {
        setCarregando(true);
        setListaObjetos(await getLivrosAPI());
        setCarregando(false);
    }

    const recuperaGeneros = async () => {
        setListaGeneros(await getGenerosAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteLivroAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaLivros();
        }
    }

    useEffect(() => {
        recuperaLivros();
        recuperaGeneros();
    }, []);

    return (
        <LivroContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaGeneros
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </LivroContext.Provider>
    )



}

export default Livro;