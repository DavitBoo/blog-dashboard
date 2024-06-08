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
  --dark-grey: #333;
  --error-red: #CA2F28;
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

.btn {
  background-color: var(--purple);
  color: #fff;
  border: 0;
  padding-top: .5rem;
  padding-bottom: .5rem;
}

.error-msg{
  text-align: center;
  color: var(--error-red);
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: .8rem;

}

.links{
  gap: 2rem;
}

.links a{
  font-size: 2rem;
}

.d-flex{
  display: flex;
}

.d-flex-col{
  display: flex;
  flex-direction: column;
}


.published{
 background-color: #10a324;
 color: #fff;
 display: inline-block;
 padding: .25rem .5rem;
}
.unpublished{
  background-color: #a31010;
  color: #fff;
  display: inline-block;
  padding: .25rem .5rem;
}

`;

export default GlobalStyle;
