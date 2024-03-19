import { CardBlog } from "@/components/card";
import { getBlogs } from "@/lib/blog";
import { title } from "process";
import { Key } from "react";

export default async function Home() {
  const blogs = await getBlogs();
  // console.log(blogs[2].fields);

  return (
    <div>
      <div className=" flex flex-wrap gap-3 justify-center">
        {blogs.map(
          (items: {
          sys: { id: Key | null | undefined; };
          fields: {
            content: any;
            slug: string;
            title: string;
            img: { fields: { file: { url: string; }; }; };

          };
        }) => <CardBlog
            key={items.sys.id}
            title={items.fields.title}
            img={items.fields.img.fields.file.url}
            contentPrev={items.fields.content.content[0].content[0].value}
            slug={items.fields.slug} />
        )}
      </div>
    </div>
  );
}
