import { getToken } from '../seguranca/Autenticacao';

export const getLivrosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livro`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const getLivroPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/livro/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const deleteLivroAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/livro/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraLivroAPI = async (objeto, metodo) => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/livro`,
        {
            method : metodo,
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            },
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}