import Axios from 'axios'
import Swal from 'sweetalert2' 
import HeadPage from '../../../components/HeadPage'
import Link from "next/link"; 
import Navbar from "../../../components/Navbar";
import { useState } from 'react';
import authPortal from '../../../config/auth'

const EditArticle = ({dataNews, PASSWORD_PORTAL, URL_API}) => {
     // DATE VALUE STRINGS
     const [dataForm, setDataForm] = useState({ autor: dataNews.autor, categoria: dataNews.categoria, descricao: dataNews.descricao, texto: dataNews.texto, titulo: dataNews.titulo})

     function handleDataForm(value){
         setDataForm( data => {
         return ( {...data, [value.target.name]: value.target.value,})
         })
     } 

    // AUTHENTICATION
    function authPutForm(){
        authPortal(PASSWORD_PORTAL,submitDataForm)
    }

    // SUBMIT FORM
    async function submitDataForm() {
        let dataSendForm = {
            autor: dataForm.autor,
            tecnologia: dataForm.tecnologia,
            categoria: dataForm.categoria,
            texto: dataForm.texto,
            titulo: dataForm.titulo,
            descricao: dataForm.descricao
        }
        
            
            

        await Axios.put(`${URL_API}/ajaxNews/artigos/${dataNews.id}`, dataSendForm )
        .then( response => {
            console.log(response)
            if(response.data == 'Atualizado com sucesso!'){
                Swal.fire({
                    title: 'Atualizado com sucesso!',
                    text: 'O artigo foi atualizado!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    })
            }
        })
        .catch( erro => {
            Swal.fire({
                title: 'Ops...',
                text: 'Houve um erro na conexão!',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                })
            console.log(erro)
        })
    }
    
    return ( 
        <>
        <HeadPage titlePage={'Editar noticia - AjaxNews'} />
        <Navbar/>
         <section id="new-article" className="container-section">
            <h1>Novo Artigo</h1>
            <div className="container-new-article">
                <label htmlFor="titulo">Titulo</label>
                <input onChange={handleDataForm} value={dataForm.titulo} type="text" placeholder="Ex: titulo da noticia" id="titulo" name="titulo" />

                <label htmlFor="descricao">Descrição</label>
                <input onChange={handleDataForm} value={dataForm.descricao} type="text" placeholder="Ex: descrição da noticia" id="descricao" name="descricao" />

                <label htmlFor="categoria">Categoria</label>
                <select onChange={handleDataForm} value={dataForm.categoria} name="categoria" id="categoria" >
                    <option disabled value="0">Selecionar</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="ciencia">Ciência</option>
                    <option value="espaço">Espaço</option>
                    <option value="games">Games</option>
                </select>

                <label htmlFor="texto">Texto</label>
                <textarea onChange={handleDataForm} value={dataForm.texto} name="texto" id="texto" placeholder="Texto da noticia" ></textarea>
 
                
                <label htmlFor="autor">Autor</label>
                <input  type="text" onChange={handleDataForm} value={dataForm.autor} placeholder="Ex: Machado de Assis" id="autor" name="autor" />
                 
                <span>
                    <Link href="/portal"><a>Voltar</a></Link> 
                    <button onClick={authPutForm}>Atualizar</button>
                </span>
                
            </div>
        </section>
        </>
     );
}

export async function getServerSideProps(context) {
    const {editArticle} = context.params
    const URL_API = process.env.URL_API
    const PASSWORD_PORTAL = process.env.PASSWORD_PORTAL

    let dataNews = await Axios.get(`${process.env.URL_API}/ajaxNews/artigos/id/${editArticle}`).then( dados => dados.data).catch( erro => console.log('erro ao requisitar atualização de artigo'))
   
    return { props: { dataNews, PASSWORD_PORTAL, URL_API} }
}

export default EditArticle;