import Link from "next/link"; 
import Image from 'next/image'

const News = ({news}) => {

    let dataNoticia = new Intl.DateTimeFormat('pt-BR',{dateStyle: 'medium'}).format(new Date(news.dataCriacao))
    
    return ( 
        <>
        
        <Link href={`/news/${news.id}`}> 
        <a className="new-item"> 
            <Image src={news.imagem} layout="responsive" width={400} height={250} alt="foto noticia" />
            <h4>{news.titulo}</h4>
            <span>{dataNoticia}</span>
            <span>{news.autor}</span>
        </a>
        </Link>
        </>
     );
}
 
export default News;