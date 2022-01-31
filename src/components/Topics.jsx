import Link from "next/link";
import Image from 'next/image'

const Topics = ({news}) => {
    let dataNoticia = new Intl.DateTimeFormat('pt-BR',{dateStyle: 'medium'}).format(new Date(news.dataCriacao))
     
    return ( 
    <>
    <section id="hot-topics">
        <div className="container-section">
            <h1>Topics</h1>

            
            <div className="news-container">
            <Link href={`/news/${news.id}`} >
                <a className="banner-news">
                    <Image src={news.imagem} priority alt="imagem topico"  layout="responsive" width={400} height={250} />
                     
                    <div className="info-banner">
                    <h1>{news.titulo}</h1>
                    <span>{dataNoticia}</span>
                    <span>{news.autor}</span>
                    </div>
                </a>
            </Link>
                <div className="resume-news">
                    {news.texto.substring(0,290)+'...'}
                </div>
            </div>
            

        </div>
    </section>
    </>
     );
}
 
export default Topics;