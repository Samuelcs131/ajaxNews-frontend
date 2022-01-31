import Link from "next/link"; 
import Navbar from "../../components/Navbar";
import Axios from 'axios' 
import Swal from 'sweetalert2'
import { useState } from "react";
import authPortal from '../../config/auth'
import HeadPage from "../../components/HeadPage";

const Test = ({URL_API, PASSWORD_PORTAL}) => {
    
     // DATE VALUE STRINGS
     const [dataForm, setDataForm] = useState({titulo: ''})
    
     function handleDataForm(value){
         setDataForm( data => {
         return ( {...data, [value.target.name]: value.target.value,})
         })
     }
    
     // DATE VALUE IMAGE
    const [dataFormFileImage, setDataFormFileImage] = useState('')
   
    function handleDataFormFileImage(value){
        let file = value.target.files[0]
        setDataFormFileImage(file)
    }

    function authSubmitForm(){
        authPortal(PASSWORD_PORTAL,submitDataForm)
    }
    
    // SUBMIT FORM
    async function submitDataForm() {
        let dataImage = new FormData()
        dataImage.append('imagem', dataFormFileImage)
        dataImage.append('autor', dataForm.autor)
        dataImage.append('tecnologia', dataForm.tecnologia)
        dataImage.append('categoria', dataForm.categoria)
        dataImage.append('texto', dataForm.texto)
        dataImage.append('titulo', dataForm.titulo)
        dataImage.append('descricao', dataForm.descricao)
            
            

        await Axios.post(`${URL_API}/ajaxNews/artigos`, dataImage )
        .then( response => {
            if(response.data == 'Cadastrado com sucesso!'){
                Swal.fire({
                    title: 'Cadastrado com sucesso!',
                    text: 'O artigo foi registrado!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    })
                // CLEAR FORM
                setDataForm({ autor: '', categoria: 0, descricao: '', texto: '', titulo: ''})
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
        <HeadPage titlePage={'Criar noticia - AjaxNews'}/>
        <Navbar/>
         <section id="new-article" className="container-section">
            <h1>Novo Artigo</h1>
            <div className="container-new-article">
                <label htmlFor="titulo">Titulo</label>
                <input onChange={handleDataForm} value={dataForm.titulo} type="text" placeholder="Ex: titulo da noticia" id="titulo" name="titulo" />

                <label htmlFor="descricao">Descrição</label>
                <input onChange={handleDataForm} value={dataForm.descricao} type="text" placeholder="Ex: descrição da noticia" id="descricao" name="descricao" />

                <label htmlFor="categoria">Categoria</label>
                <select onChange={handleDataForm} value={dataForm.categoria} name="categoria" id="categoria" defaultValue={0}>
                    <option disabled value="0">Selecionar</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="ciencia">Ciência</option>
                    <option value="espaço">Espaço</option>
                    <option value="games">Games</option>
                </select>

                <label htmlFor="texto">Texto</label>
                <textarea onChange={handleDataForm} value={dataForm.texto} name="texto" id="texto" placeholder="Texto da noticia" ></textarea>

                <label htmlFor="imagem">Imagem</label>
                <input onChange={handleDataFormFileImage} type="file" name="imagem" id="imagem" />
                
                <label htmlFor="autor">Autor</label>
                <input  type="text" onChange={handleDataForm} value={dataForm.autor} placeholder="Ex: Machado de Assis" id="autor" name="autor" />
                 
                <span>
                    <Link href="/portal"><a>Voltar</a></Link> 
                    <button onClick={authSubmitForm}>Cadastrar</button>
                </span>
                
            </div>
        </section>
        </>
     );
}

export async function getServerSideProps() { 
    const URL_API = process.env.URL_API
    const PASSWORD_PORTAL = process.env.PASSWORD_PORTAL
   
    return { props: { URL_API, PASSWORD_PORTAL } }
}

export default Test;