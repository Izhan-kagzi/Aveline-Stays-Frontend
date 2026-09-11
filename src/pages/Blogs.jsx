import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import { api } from "../data/api.js";
import { blogImageMap } from "../data/content.js";
import BackButton from "../components/BackButton.jsx";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    api
      .get("/blogs")
      .then((data) => {
        if (!mounted) return;

        setBlogs(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!mounted) return;

        setBlogs([]);
      })
      .finally(() => {
        if (!mounted) return;

        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#15191c] pt-28 pb-24">
      <div className="wrap px-6 md:px-10">

        {/* Header */}
        <header className="mb-16 md:mb-20">
          <BackButton />

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-10 bg-[#c8a96b]" />

              <span className="text-[#a78950] text-[10px] uppercase tracking-[0.3em] font-medium">
                Aveline Journal
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                  Stories worth
                  <span className="block text-[#15191c]/40 italic">
                    travelling for.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-sm md:text-base leading-7 text-[#15191c]/55">
                  Discover thoughtful travel inspiration, destination
                  stories, hotel guides and ideas for making every stay
                  a little more memorable.
                </p>
              </div>

              <div className="hidden lg:flex shrink-0 items-center justify-center w-24 h-24 border border-[#c8a96b]/35 text-[#a78950]">
                <BookOpen size={27} strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <BlogSkeleton />
        ) : blogs.length > 0 ? (
          <section aria-label="Aveline Journal articles">

            {/* Journal meta */}
            <div className="flex items-center justify-between border-y border-[#15191c]/10 py-4 mb-8">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#15191c]/35">
                The Journal
              </span>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#15191c]/35">
                {blogs.length} {blogs.length === 1 ? "Story" : "Stories"}
              </span>
            </div>

            {/* Blog grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  index={index}
                />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState />
        )}

        {/* Bottom statement */}
        {!loading && blogs.length > 0 && (
          <div className="mt-20 md:mt-28 pt-8 border-t border-[#15191c]/10 text-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#15191c]/25">
              Travel thoughtfully · Stay beautifully · Aveline Stays
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   BLOG CARD
========================================================= */

function BlogCard({ blog, index }) {
  const image = blogImageMap[blog.id];

  return (
    <Link
      to={`/blogs/${blog.id}`}
      className="
        group
        block
        bg-white
        border border-[#15191c]/10
        overflow-hidden
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_18px_50px_rgba(21,25,28,0.08)]
      "
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#eef1f2]">
        {image ? (
          <img
            src={image}
            alt={blog.title}
            loading={index < 3 ? "eager" : "lazy"}
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-[1.05]
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#15191c]/25">
            <BookOpen size={30} strokeWidth={1.2} />
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60" />

        {/* Number */}
        <div className="
          absolute top-4 left-4
          w-9 h-9
          flex items-center justify-center
          bg-white/90
          backdrop-blur-sm
          text-[#15191c]
          text-[9px]
          tracking-[0.15em]
        ">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Arrow */}
        <div className="
          absolute bottom-4 right-4
          w-10 h-10
          flex items-center justify-center
          bg-white
          text-[#15191c]
          transition-all duration-300
          group-hover:bg-[#c8a96b]
          group-hover:text-white
        ">
          <ArrowUpRight
            size={17}
            strokeWidth={1.4}
            className="
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-7">

        {/* Meta */}
        <div className="
          flex flex-wrap items-center gap-x-3 gap-y-1
          mb-4
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-[#15191c]/35
        ">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={12} strokeWidth={1.4} />
            {blog.date}
          </span>

          <span className="w-1 h-1 rounded-full bg-[#c8a96b]" />

          <span>{blog.author}</span>
        </div>

        {/* Title */}
        <h2 className="
          font-serif
          text-2xl
          leading-tight
          mb-3
          text-[#15191c]
          transition-colors duration-300
          group-hover:text-[#a78950]
        ">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="
          text-sm
          leading-6
          text-[#15191c]/50
          line-clamp-3
        ">
          {blog.excerpt}
        </p>

        {/* Read story */}
        <div className="
          mt-6
          pt-5
          border-t border-[#15191c]/10
          flex items-center justify-between
        ">
          <span className="
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-[#15191c]/40
          ">
            Read Story
          </span>

          <ArrowUpRight
            size={15}
            strokeWidth={1.4}
            className="
              text-[#a78950]
              transition-transform duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>

        {/* Hover line */}
        <div className="
          mt-6
          h-px
          w-0
          bg-[#c8a96b]
          transition-all duration-500
          group-hover:w-full
        " />
      </div>
    </Link>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function BlogSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-white border border-[#15191c]/10 overflow-hidden"
        >
          {/* Image skeleton */}
          <div className="h-64 bg-[#eef1f2] animate-pulse" />

          {/* Content skeleton */}
          <div className="p-7">
            <div className="h-2 w-28 bg-[#eef1f2] animate-pulse mb-5" />

            <div className="h-6 w-4/5 bg-[#eef1f2] animate-pulse mb-3" />

            <div className="h-3 w-full bg-[#eef1f2] animate-pulse mb-2" />

            <div className="h-3 w-3/4 bg-[#eef1f2] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div className="
      bg-white
      border border-[#15191c]/10
      py-20 px-6
      text-center
    ">
      <div className="
        mx-auto
        w-16 h-16
        flex items-center justify-center
        border border-[#c8a96b]/35
        text-[#a78950]
        mb-6
      ">
        <BookOpen size={24} strokeWidth={1.2} />
      </div>

      <p className="
        text-[9px]
        uppercase
        tracking-[0.25em]
        text-[#a78950]
        mb-3
      ">
        Coming Soon
      </p>

      <h2 className="font-serif text-3xl mb-3">
        Our journal is taking shape.
      </h2>

      <p className="
        max-w-md
        mx-auto
        text-sm
        leading-6
        text-[#15191c]/50
      ">
        We’re preparing stories, destination guides and travel
        inspiration for you. Check back soon.
      </p>
    </div>
  );
}