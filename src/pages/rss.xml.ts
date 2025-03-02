import type { APIRoute } from "astro";
import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export const GET: APIRoute = async({params,request,site})=>{
   const blogPosts = await getCollection('blog');
    return rss({
        stylesheet: '/styles/rss.xsl',
        title:`El blog de Dan`,
        description:`El blog de dan es estatico sobre el mundo de la programacion`,
        site:site??"",
        items:blogPosts.map(({data,slug})=>({
        title:data.title,
        pubDate:data.date,
        description:data.description,
        link:`posts/${slug}`
        })),
        customData:`<language>es-mx</language>`,

    });

}