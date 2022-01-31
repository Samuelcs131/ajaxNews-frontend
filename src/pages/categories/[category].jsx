import Axios from 'axios'
import News from "../../components/News";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import HeadPage from "../../components/HeadPage";

const Space = ({dataNews}) => {

    const routerPage = useRouter().query.category 

    const { isFallback } = useRouter()
 
    if(isFallback) { return <p>Carregando pagina</p>}
    
    return ( 
        <>
        <HeadPage titlePage={`Todas as notícias de ${routerPage} - AjaxNews`} />
        <Navbar/>

        <section id="last-news" className="container-section">
        <h2 className="title-last-news">Categoria {routerPage}</h2>
        <div className="news-container">
       
        {dataNews.length != 0 ? 
         (dataNews.map( artigo => { 
            return <News key={artigo.id} news={artigo}/>
         }))
         : 
         (<h1>Nenhuma notícia disponivel</h1>)}
      
        </div>
        </section>
        
        </>
     );
}

 

 
export async function getServerSideProps(context) {
 
    const { category } = context.query
 
    let dataNews = await Axios.get(`${process.env.URL_API}/ajaxNews/artigos/categoria/${category}`).then( dados => dados.data ) || []
   
    return {
      props: { dataNews },
    }
  }

export default Space;