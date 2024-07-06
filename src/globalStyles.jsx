import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

.source-serif-4 {
  font-family: "Source Serif 4", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.source-serif-4-bolg {
  font-family: "Source Serif 4", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

:root {
  --purple: #B78DFC;
  --darker-purple: #4a00c1;
  --dark-grey: #333;
  --error-red: #CA2F28;
  --light-grey: #f8f9fa;
}

  /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
  
}
/*
  Typographic tweaks!
  3. Add accessible line-height
  4. Improve text rendering
*/
body, button, a {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: "Source Serif 4", serif;  

}

a {
  text-decoration: none;
}
/*
  5. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  6. Remove built-in form typography styles
*/
input, button, textarea, select {
}
/*
  7. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  8. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}


/* ---- estilos ---- */
body{
  background-color: var(--purple);
  color: var(--dark-grey);
}

main {
  display: flex;
  }



  
/* --- left sidebar --- */
nav.sidebar{
  width: 20rem;
  position: relative;
  background-color: #f5eff7;

}

nav.sidebar .container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 1rem;
  width: 20rem;
}

nav.sidebar .logo {
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid var(--purple);
}


.links{

}

.links > * {
padding: 1rem;

}

.links a{
  font-size: 1.5rem  ;
}

.links a:hover {
  background-color: #e8e3ea;
}




.btn {
  background-color: var(--darker-purples);
  color: #fff;
  border: 0;
  padding-top: .5rem;
  padding-bottom: .5rem;
}

.btn:hover{
  background-color: #320083;
}

.error-msg{
  text-align: center;
  color: var(--error-red);
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: .8rem;

}


/* --- flex related classes --- */
.d-flex{
  display: flex;
}

.d-flex-col{
  display: flex;
  flex-direction: column;
}

.align-items-center{
  align-items: center;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-1 {
  gap: 1rem;
}


`;

export default GlobalStyle;
