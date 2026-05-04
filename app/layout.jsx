import "./globals.css";
export const metadata = {
  title: 'Landing page',
  description : 'Asimple landing page',

};

export default function Rootlayout({children}){
  return(
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
