import Head from 'next/head'
import Navbar from '../components/Navbar';
import NewsEdit from '../components/NewsEdit';
import Link from 'next/link'
import Axios from 'axios'
import { useState } from 'react'; 
import HeadPage from '../components/HeadPage';

const Portal = ({ responseDataNews, URL_API, PASSWORD_PORTAL }) => {
  
    const [searchNewsValue, setSearchNewsValue] = useState('')

    const [dataNews, setDataNews] = useState(responseDataNews)

     function handleSearchNewsValue(ev){
        // GET VALUE INPUT
        setSearchNewsValue( (ev.target.value).toLowerCase() )
        // SET VALUE DATA
        setDataNews(responseDataNews.filter(artigo => artigo.titulo.toLowerCase().includes(searchNewsValue) ))
    }

    function clearSearchNews(){
        // CLEAR SEARCH
        if(searchNewsValue == ''){ setDataNews(responseDataNews) } 
    }

    return ( 
        <>
        <HeadPage titlePage={'AjaxNews - Portal edição'}/>

        <Navbar/>

        <section id="postal-news" className="container-section">
            <div className="banner-postal-news">
                <div className="info-banner-postal">
                    <h1>Administre suas postagens</h1>
                    <p>Adicione novos artigos ao seu blog</p>
                    <Link href="/portal/newArticle"><a><button>Novo artigo</button></a></Link>
                </div>
            </div>
            
        </section>
        
        <div id="search-news-portal" className="container-section">
            <div className="search-news-portal-container">
                <input onChange={handleSearchNewsValue} onBlur={clearSearchNews} type="text" placeholder="Buscar notícia"/>
                <svg  viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
        </div>

        <section id="last-news" className="container-section"> 
        <div className="news-container">
        {dataNews.length != 0 ? 
         (dataNews.map( artigo => { 
            return <NewsEdit key={artigo.id} news={{artigo, URL_API, PASSWORD_PORTAL}}/>
         }))
         : 
         (<h1>Nenhuma notícia disponivel</h1>)}
        </div>
        </section>

        </>
     );
}

export async function getServerSideProps(context) {
 
    let URL_API = process.env.URL_API
    let PASSWORD_PORTAL = process.env.PASSWORD_PORTAL
    let responseDataNews = await Axios.get( `${URL_API}/ajaxNews/artigos`).then( dados => dados.data).catch( erro => console.log('erro ao requisitar portal') ) || []

    return {
      props: { responseDataNews, URL_API, PASSWORD_PORTAL },
    }
  }

export default Portal;