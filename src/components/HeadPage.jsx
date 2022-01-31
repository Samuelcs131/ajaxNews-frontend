import Head from "next/head";

const HeadPage = ({titlePage}) => {
    return ( 
        <Head>
            <title>{titlePage}</title>
            <link rel="shortcut icon" href="/img/logo-ajaxnews.svg" type="image/x-icon"/>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
            <meta name="description" content="ajaxnews, noticias" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
     );
}
 
export default HeadPage;