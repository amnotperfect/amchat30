import Head from 'next/head'


export default function Layout({children}){
return(
    <div>
    <Head>
    <title>amchat3</title>
    </Head>
    <main>
    {children}
    </main>
    </div>
)
}