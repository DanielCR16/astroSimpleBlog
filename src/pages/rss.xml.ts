import type { APIRoute } from "astro";
import rss from '@astrojs/rss';
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from "markdown-it";


const parser = new MarkdownIt();
export const GET: APIRoute = async({params,request,site})=>{
   const blogPosts = await getCollection('blog');
    return rss({
        stylesheet: '/styles/rss.xsl',
        title:`El blog de Dan`,
        description:`El blog de dan es estatico sobre el mundo de la programacion`,

        xmlns: {
            media: 'http://search.yahoo.com/mrss/',
          },
          
        site:site??"",
        items:blogPosts.map(({data,slug,body})=>({
        title:data.title,
        pubDate:data.date,
        description:data.description,
        link:`posts/${slug}`,
        
        content: sanitizeHtml(parser.render(body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          }),
          
          customData: `<media:content
              type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
              width="${data.image.width}"
              height="${data.image.height}"
              medium="image"
              url="${site + data.image.src}" />
          `,
        })),
        customData:`<language>es-mx</language>`,

    });

}