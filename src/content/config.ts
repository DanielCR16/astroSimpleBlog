import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
    type:'content',
    schema:({image})=>
        z.object({
            title: z.string(),
            date:  z.date(),
            description: z.string(),
            //Relacion
            author:  reference('author'),
            image: image(),
        //Relacion
        tags: z.array(z.string()) ,
        isDraft:z.boolean().default(false),
        }),
});
const authorCollection = defineCollection({
    type:'data',
    schema:({image})=>
        z.object({
            name:z.string(),
            avatar:image(),
            twitter: z.string(),
            linkedIn: z.string(),
            github: z.string(),
            bio: z.string(),
            subtitle: z.string(),
        })
    
});

export const collections = {
  
blog:blogCollection,
author:authorCollection,

};