import Head from 'next/head'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import News from '../components/News';
import Topics from '../components/Topics';
import Axios from 'axios'
import { useRouter } from 'next/router';
import HeadPage from '../components/HeadPage';

const Home = ({ dataNews }) => {

   const { isFallback } = useRouter()
 
    if(isFallback) { return <p>Carregando pagina</p>}

  return (
      <>
      <HeadPage titlePage={'AjaxNews - As principais notícias'}/>
      

      <Navbar/>
      {dataNews.length != 0 &&
      ( <Topics  news={dataNews[dataNews.length - 1] || dataNews[0]}/> ) }
      
      <section id="last-news" className="container-section">
      <h2 className="title-last-news">Latest News</h2>
      <div className="news-container">
      {dataNews.length != 0 ? 
         (dataNews.map( artigo => { 
            return <News key={artigo.id} news={artigo}/>
         }))
         : 
         (<h1>Nenhuma notícia disponivel</h1>)}
      
      </div>
      </section>
      <Footer/>
      </>
   );
}

 export async function getServerSideProps() { 
   let dataNews = await Axios.get( `${process.env.URL_API}/ajaxNews/artigos`)
   .then( artigos => artigos.data).catch( erro => console.log('erro ao requisitar index') ) || [] 
 
   

   return {
     props: { dataNews },
   }
 }

export default Home;