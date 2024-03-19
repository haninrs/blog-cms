"use client";


// jgn lupa  i react-share

import React from "react";
import { LinkedinIcon, LinkedinShareButton } from "react-share";

export default function LinkedButton({ slug, url }: { slug: string; url: string }) {
  return (
    <LinkedinShareButton url={`${url}/blog/${slug}`}>
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
  );
}
