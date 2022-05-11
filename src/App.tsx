import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { defaultTheme } from "./theme";
import { ApolloProvider } from "@apollo/client";
import { client } from './apollo';


const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: 'Hahmlet', serif, 'Flamenco', cursive;
  
  @font-face {
    font-family: 'Flamenco', cursive;
    src: url();
    unicode-range: U+26;
  }
  @font-face {
    font-family: 'Hahmlet', serif;
    src: url();
    unicode-range: U+AC00-D7A3;
  }
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

*{
  box-sizing: border-box;
  color:inherit;
}
body{
  font-family: 'Flamenco', cursive;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  height:100vh;
}
a{
  text-decoration: none;
}
button{
  cursor: pointer;
}
`;

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
