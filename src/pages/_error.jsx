import Link from "next/link";
import HeadPage from "../components/HeadPage";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
    return ( 
        <>
        <HeadPage titlePage={'Pagina não encontrada! - AjaxNews'}/>
        <Navbar/>
        <div id="error-page" className="container-section">
        <span>404</span>
        <h1>Pagina não encontrada!</h1>
        <Link href="/"><a><h2>Retorne a pagina inicial</h2></a></Link>
        </div>
        </>
    );
}
 
export default ErrorPage;