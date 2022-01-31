import Link from "next/link";
import Swal from 'sweetalert2'
import Axios from 'axios'
import authPortal from '../config/auth'
import Image from "next/image";

const NewsEdit = ({news}) => {

    let {artigo} = news
    let {URL_API} = news
    let {PASSWORD_PORTAL} = news

    // HORARIO
     let dataNoticia = new Intl.DateTimeFormat('pt-BR',{dateStyle: 'medium'}).format(new Date(artigo.dataCriacao))

    function activeAuthPortal(){
        authPortal(PASSWORD_PORTAL, deleteArticle)
    }

    // DELETE ARTICLE
    function deleteArticle(){
        Swal.fire({
            title: 'Tem certeza?',
            text: "A eliminação dos dados é irreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, deletar'
          })
          // POSITIVE
          .then( async (result)=>{
                if(result.isConfirmed){

                    await Axios.delete(`${URL_API}/ajaxNews/artigos/${artigo.id}`)

                    // DELETE SUCESS
                    .then( res => {
                        if(res.data == 'Artigo apagado com sucesso!'){
                        Swal.fire({
                            title: 'Deletado!',
                            text: 'O poste foi deletado com sucesso!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            })

                        setTimeout(()=>location.reload(), 1500);
                        }
                    }) 
                }
          })
          .catch(erro => {
            Swal.fire({
              title: 'Ops...',
              text: 'Houve um erro na conexão com o banco de dados!',
              icon: 'error',
              confirmButtonColor: '#3085d6',
            })
          })
    }

 

    return ( 
        <div className="new-item">
            <Link href={`/news/${artigo.id}`}><a>
            <Image src={artigo.imagem} priority alt="imagem noticia"  layout="responsive" width={400} height={250} />
            <h4>{artigo.titulo}</h4>
            </a></Link>
            <span>{dataNoticia}</span>
            <span>{artigo.autor}</span>

            <div className="edit-news-item">
                <Link href={`portal/edit/${artigo.id}`}><a><button>Editar</button></a></Link>
                <button onClick={()=>activeAuthPortal()}>Excluir</button>
            </div>
        </div>
     );
}
 
export default NewsEdit;