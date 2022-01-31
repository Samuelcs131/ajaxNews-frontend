import { useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'


const Navbar = () => {

    const myRouter = useRouter()

    useEffect(()=>{
      // GET ELEMENTS HTML
      const GET_ELEMENT = (elementHtml) => document.querySelector(elementHtml);
      const NAV_LIST = document.querySelectorAll('.nav-list li')

      // ACTIVE MENU MOBILE
      GET_ELEMENT('.mobile-menu').addEventListener('click',actionMenu)

      function actionMenu(){
          GET_ELEMENT('.mobile-menu').classList.toggle('active');
          GET_ELEMENT('.nav-list').classList.toggle('active');

          // ANIMATION LIST MENU
          NAV_LIST.forEach(
              (link,index) => { 
                  link.style.animation ? 
                  (link.style.animation = "") :
                  (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`)
              }) 
      }

      // CLOSE MENU 
      for(let num = 0; num < NAV_LIST.length; num++){
          NAV_LIST[num].addEventListener('click', () => {
              // CLOSE MENU & LIST
              GET_ELEMENT('.mobile-menu').classList.remove('active');
              GET_ELEMENT('.nav-list').classList.remove('active');
              // RESET STYLE ANIMATION
              for(let x = 0; x < 4; x++){
                  NAV_LIST[x].style.animation = ""
              }
          })
      }

      // TOGGLE SEARCH
      GET_ELEMENT('#icon-search-navbar').addEventListener('click', 
      ()=>{
          GET_ELEMENT('.input-search-navbar').classList.toggle("active")
      })
 
    })

    // ACTIVE ROUTER IN MENU
    function activeForPortal(){
        const routerActive = ['/portal','/portal/newArticle','/portal/edit/[editArticle]']
        for(let x = 0; x < routerActive.length; x++){
             let activeMenu = myRouter.pathname == routerActive[x] 
             if(activeMenu == true){ return true }
        }
    }
 
    function activeForNews(){
        const routerActive = ['/', '/news/[news]', '/categories/[category]', '/search/[search]']
        for(let x = 0; x < routerActive.length; x++){
            let activeMenu = myRouter.pathname == routerActive[x] 
            if(activeMenu == true){ return true }
       }
    } 

  return (
      <header className="navbar">
          <div className='logo-navbar'>
                <Link href={'/'}><a>AjaxNews</a></Link>
          </div>
      <nav className="container">
         <div className="buttons-left-container">
                <Link href="/">
                <a><button className={activeForNews() == true ? "active":""}>News</button></a></Link>
                <Link href="/portal">
                <a><button className={activeForPortal() == true ? "active":""}>Portal</button></a></Link>
         </div> 
        <div className="right-menu-container">
            <form action={`http://localhost:3000/search/search`} method="GET">

            <svg id="icon-search-navbar" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

            <input className="input-search-navbar" type="text" placeholder="Pesquisar notícia" name="titulo"/>
            </form>
            
            <div className="mobile-menu">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
 
            
        </div>
       

         
 
         <ul className="nav-list">
             <li><Link href={`/categories/tecnologia`}><a>Tecnologia</a></Link></li>
             <li><Link href={`/categories/ciencia`}><a>Ciência</a></Link></li>
             <li><Link href={`/categories/espaço`}><a>Espaço</a></Link></li>
             <li><Link href={`/categories/games`}><a>Games</a></Link></li>
         </ul>
         
      </nav>
      </header>
   );
}



export default Navbar