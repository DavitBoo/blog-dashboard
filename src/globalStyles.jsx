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


:root{
  --purple: #b78dfc;
  --dark-grey: #4d5252;
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
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: "Source Serif 4", serif;  

  background-color: var(--purple);
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


`;

export default GlobalStyle;
