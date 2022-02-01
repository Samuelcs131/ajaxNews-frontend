import Navbar from "../../components/Navbar";
import Axios from 'axios' 
import { useRouter } from "next/router";
import Image from "next/image";
import HeadPage from "../../components/HeadPage";


const News = ({dataNews}) => {

    const { isFallback } = useRouter()
 
    if(isFallback) { return <p>Carregando pagina</p>}

    let news = dataNews || ''

    let dataNoticia = (date) => new Intl.DateTimeFormat('pt-BR',{dateStyle: 'medium'}).format(new Date(date || 0)) 
    let atualizacaoNoticia = (news.dataCriacao == news.dataAtualizacao)  

    return ( 
        <>
        <HeadPage titlePage={`${news.titulo} - AjaxNews`}/>
        <Navbar/>

        <section id="news-page" className="container-section">
            <h1>{news.titulo}</h1>
            
            <h4>{news.descricao}</h4>

            <p>Por <b>{news.autor}</b></p>
            <p>{atualizacaoNoticia == true ? 
            `Publicado em: ${dataNoticia(news.dataCriacao)}` 
            : 
            `Atualizado em: ${dataNoticia(news.dataAtualizacao)}`}</p>

            <hr />

            <div className="news-image-container">
                <Image src={news.imagem} priority alt="imagem topico" width={600} height={350} />
            </div>

            <p>{news.texto}</p>

        </section>
        </>
     );
}


export async function getStaticPaths() {

    let dataNews = await Axios.get(`${process.env.URL_API}/ajaxNews/artigos`)
    .then( artigos => artigos.data)
    
    let paths = dataNews.map(artigo => {
        return { params: { news: artigo.id.toString() }, }
    })

    return {
        paths,
        fallback: true
    };
}

export async function getStaticProps(context) {
const { news } = context.params

let dataNews = await Axios.get(`${process.env.URL_API}/ajaxNews/artigos/id/${news}`).then(dados => dados.data).catch( erro => console.log('erro ao requisitar news') ) || []
  
// RETORNA PAGINA 404
if (!dataNews) {
return { notFound: true }
}

return {
    props: { dataNews },
    
}
}
 


export default News;