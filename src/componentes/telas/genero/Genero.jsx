import { useState, useEffect } from "react";
import GeneroContext from "./GeneroContext";
import {
    getGenerosAPI, getGeneroPorCodigoAPI,
    deleteGeneroAPI, cadastraGeneroAPI
} from "../../../servicos/GeneroServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { useNavigate } from "react-router-dom";

function Genero() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
    }

    const editarObjeto = async codigo => {
        try{
        setObjeto(await getGeneroPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        }catch (err){
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraGeneroAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
            navigate("/login", { replace: true });
        }
        recuperaGeneros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(false);

    const recuperaGeneros = async () => {
        try{
        setCarregando(true);
        setListaObjetos(await getGenerosAPI());
        setCarregando(false);
        }catch (err){
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        
        if (window.confirm('Deseja remover este objeto?')) {
            try{
            let retornoAPI = await deleteGeneroAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaGeneros();
            }catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaGeneros();
    }, []);

    return (
        <GeneroContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </GeneroContext.Provider>
    )



}

export default Genero;