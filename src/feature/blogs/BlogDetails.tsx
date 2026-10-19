"use client";
import HeroHeader from "@/components/shared/header/Header";
import React from "react";
import blogHeader from "@/assets/header/blogHeader.png";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { useParams, usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";
import BlogCard from "./card/BlogCard";
import {
  useGetBlogBySlugQuery,
  useGetAllBlogsQuery,
} from "@/redux/api/blog/blogApi";
import type { Blog } from "@/interfaces/global";
import WithEmptyState from "@/components/others/AllState";
import { blogs as fallbackBlogs } from "./fakeData";

const BlogDetails = () => {
  const path = usePathname();
  const params = useParams();
  const slug = (params?.id as string) || path.split("/")[2];
  const router = useRouter();

  // Fetch blog data by slug
  const { data: myData, isLoading, error } = useGetBlogBySlugQuery(slug);

  // Fetch all blogs (limit to 20 to ensure enough data for filtering)
  const {
    data: allBlogs,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
  } = useGetAllBlogsQuery({
    page: 1,
    limit: 20,
  });

  const fallbackBlog = React.useMemo(() => {
    return (fallbackBlogs as unknown as Blog[]).find(
      (b) => b.slug === slug || b.id === slug
    );
  }, [slug]);

  // Destructure myData with fallback
  const rawBlog = myData?.data;
  const blog = (Array.isArray(rawBlog) ? rawBlog[0] : rawBlog) || fallbackBlog;

  // Destructure blog for easier access (with fallback for rendering)
  const { title, image, description, createdAt, categoryId } = blog || {};

  // Filter blogs by categoryId and exclude current blog
  const relatedBlogPosts = React.useMemo(() => {
    const apiPosts = (allBlogs?.data ?? []).filter(
      (item: Blog) => item.categoryId === categoryId && item.id !== blog?.id
    );
    if (apiPosts.length > 0) {
      return apiPosts.slice(0, 6);
    }
    return (fallbackBlogs as unknown as Blog[])
      .filter((item: Blog) => item.categoryId === categoryId && item.id !== blog?.id)
      .slice(0, 6);
  }, [allBlogs, categoryId, blog]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <WithEmptyState
      data={blog ? [blog] : []} // Use blog directly, wrapped in array if exists
      emptyStateProps={{
        title: "Blog Not Found",
        description: "The requested blog could not be loaded.",
      }}
      action={
        <PrimaryButton onClick={() => router.push("/blog")}>
          Explore All Blogs
        </PrimaryButton>
      }
      loading={isLoading && !blog}
      error={!blog && !isLoading && (!!error || !blog)}
      spinnerSize="lg"
      errorMessage="Failed to fetch blog details. Please try again later."
      errorTitle="Error Fetching Blog"
      loadingMessage="Fetching blog details..."
      loadingTitle="Loading Blog"
    >
      {() => (
        <div>
          <HeroHeader
            breadcrumbs={breadcrumbs}
            title={title || "Untitled Blog"}
            imageUrl={image || blogHeader.src} // Fallback to default image
          />
          {/* Blog details section */}
          <div className="container space-y-6 mb-10">
            <p className="text-lg">
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No date available"}
            </p>
            <h1 className="md:text-3xl text-2xl lg:text-5xl font-medium">
              {title || "Untitled Blog"}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: description || "" }} />
          </div>
          <div className="container section-gap">
            <div className="flex items-center justify-between">
              <SectionTitle miniTitle="" subtitle="" title="Related Blogs" />
              <PrimaryButton onClick={() => router.push("/blog")}>
                <div className="flex items-center justify-center gap-3 text-nowrap">
                  <p>See More</p>
                  <MoveUpRight className="w-4" />
                </div>
              </PrimaryButton>
            </div>
            {/* Related Blogs */}
            <WithEmptyState
              data={relatedBlogPosts}
              emptyStateProps={{
                title: "No Related Blogs Found",
                description: "There are currently no related blogs available.",
              }}
              action={
                <PrimaryButton onClick={() => router.push("/blog")}>
                  Explore All Blogs
                </PrimaryButton>
              }
              loading={isRelatedLoading && relatedBlogPosts.length === 0}
              error={relatedBlogPosts.length > 0 ? false : isRelatedError}
              spinnerSize="lg"
              errorMessage="Failed to fetch related blogs. Please try again later."
              errorTitle="Error Fetching Related Blogs"
              loadingMessage="Fetching related blogs..."
              loadingTitle="Loading Related Blogs"
            >
              {(data: Blog[]) => (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {data.map((data: Blog, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.1 * (idx + 1), ease: "easeIn" }}
                    >
                      <BlogCard
                        id={data.id}
                        imageUrl={data.image || (data as { imageUrl?: string }).imageUrl || "/blogs/blog-1.jpg"}
                        title={data.title}
                        slug={data.slug}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </WithEmptyState>
          </div>
        </div>
      )}
    </WithEmptyState>
  );
};

export default BlogDetails;
