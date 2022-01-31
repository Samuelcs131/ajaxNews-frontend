import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import Axios from 'axios'
import News from "../../components/News"; 
import HeadPage from "../../components/HeadPage";

const Search = ({dataNews}) => {
 

   useEffect(()=>{
      document.title = `AjaxNews - Buscar notícia  `
   })
    return ( 
        <>
        <HeadPage titlePage={'AjaxNews - Buscar notícia'}/>

        <Navbar/>

         <div className="container-section" style={{marginTop: '-20px'}}>
            <h2>Resultados da busca: </h2>
         </div>

        <section id="last-news" className="container-section">
        <div className="news-container">
       
        {dataNews.length != 0 ? 
         (dataNews.map( artigo => { 
            return <News key={artigo.id} news={artigo}/>
         }))
         : 
         (<h1>Nenhuma notícia encontrada</h1>)}
      
        </div>
        </section>

        </>
     );
}
 
export async function getServerSideProps(context) {
 
   const {titulo} = context.query

   let dataNews = await Axios.get(`${process.env.URL_API}/ajaxNews/artigos/titulo?titulo=${titulo}`).then( dados => dados.data ) || []
  
   return {
     props: { dataNews },
   }
 }

export default Search;