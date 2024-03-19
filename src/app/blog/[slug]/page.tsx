/* eslint-disable @next/next/no-img-element */
import { getBlogsSlug, getBlogs } from "@/lib/blog";
import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Wrapper from "@/components/wrapper";
import ShareButton from "@/components/share";
import { IBlogs } from "@/type/type";

export const revalidate = 3600

export const generateStaticParams = async () => {
  const blog = await getBlogs()

  return blog.map((item : IBlogs) => ({
    params: {
      slug: item.fields.slug
    },
  }));
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogsSlug(params.slug);

  return {
    title: blog.fields.title,
    description : blog.fields.title,
    author : blog.fields.author.fields.name,
    openGraph: {
        images: [`https:${blog.fields.img.fields.file.url}`, `https:${blog.fields.author.fields.image.fields.file.url}`]
    }
  };
}

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const blog = await getBlogsSlug(params.slug);

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="my-[2.5px] md:text-3xl sm:text-2xl text-xl">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="my-[2.5px] md:text-2xl sm:text-xl text-lg font-bold">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="my-5 md:text-xl sm:text-lg text-base tracking-tight font-semibold">{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className="my-5 md:text-lg sm:text-base text-sm">{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5 className="my-10 md:text-base sm:text-sm text-xs">{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6 className="my-10 mb-20 md:text-base sm:text-sm text-xs">{children}</h6>,
    },
  };

  return (
    <Wrapper>
    <div className="flex ">
      <div className="flex-1 sticky max-md:hidden top-[100px] h-full">
        <Link className="flex items-center gap-2 text-gray-900 " href="/#">
          <IoMdArrowRoundBack className="items-center size-8" /> back
        </Link>
        <ShareButton slug={blog.fields.slug} className="mt-5"/>
      </div>

      <div className="flex-[2] pr-52 max-lg:pr-0">
        <h1 className="mb-2 text-[32px] max-md:text-[24px] font-bold tracking-tight text-gray-900 ">{blog.fields.title}</h1>

         <p className="font-bold text-[18px] max-md:text-[14px]">{blog.fields.author.fields.name}</p>
         <p className="text-[18px] max-md:text-[14px]">{blog.fields.date}</p>

        <img className="my-[2.5px]  rounded-lg" src={`${blog.fields.img.fields.file.url}`} alt={`${blog.fields.title}`} />

        {documentToReactComponents(blog.fields.content, options)}
      </div>
    </div>
    </Wrapper>
  );
}
