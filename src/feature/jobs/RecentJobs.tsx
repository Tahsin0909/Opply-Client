/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { JobCard } from "./card/JobCard";
import { jobPosts } from "./fakeData";
import { useGetJobsQuery } from "@/redux/api/job/jobApi";
import WithEmptyState from "@/components/others/AllState";
import { Job } from "@/interfaces/global";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import { toast } from "sonner";

const RecentJobs = () => {
  const router = useRouter();

  // State to manage active tab and filtered job posts
  const [activeTab, setActiveTab] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState("all");

  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error,
  } = useGetJobsQuery({
    limit: 4,
    searchTerm: filteredPosts || undefined,
  });

  // Categories for filtering
  const categories = ["all", "clinical", "Non-Clinical"];

  // Handle tab click for filtering jobs
  const handleTabClick = (category: string) => {
    setActiveTab(category);
    setFilteredPosts(category);
  };

  const [toggleFavorite] = useToggleFavoriteMutation();

  const handleToggleFavorite = async (
    itemId: string,
    itemType: "JOB" | "PROJECT"
  ) => {
    try {
      const res = await toggleFavorite({ itemId, itemType }).unwrap();
      if (res.success) {
        toast.success("Project added to favorites!");
      } else {
        toast.error("Failed to add project to favorites.");
      }
      // Handle success
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add project to favorites.");
    }
  };

  return (
    <div className="container section-gap">
      <div className="flex items-center justify-between">
        <SectionTitle
          miniTitle="Jobs"
          subtitle=""
          title="Explore All Latest Jobs"
        />
        <PrimaryButton onClick={() => router.push("/jobs")}>
          <div className="flex items-center justify-center gap-3 text-nowrap">
            <p>See All Jobs</p>
            <MoveUpRight className="w-4" />
          </div>
        </PrimaryButton>
      </div>

      {/* Tabs for filtering by category */}
      <div className="mb-6 overflow-auto">
        <div className="flex items-center gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className={`cursor-pointer border-b-2 border-transparent px-4 py-1 ${
                activeTab === category
                  ? "text-black border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Display job cards */}
      <WithEmptyState
        data={jobs?.data || []}
        emptyStateProps={{
          title: "No Jobs found",
          description: "There are currently no Jobs available.",
        }}
        action={
          <PrimaryButton
            onClick={() => {}}
            // onClick={() => refreshJobs()}
          >
            Refresh Jobs
          </PrimaryButton>
        }
        loading={isLoadingJobs}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Failed to fetch Jobs. Please try again later."
        errorTitle="Error Fetching Jobs"
        loadingMessage="Fetching latest Jobs..."
        loadingTitle=" Loading Jobs"
      >
        {(data: Job[]) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-6">
            {data.map((post: Job, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
                className={` ${index >= jobPosts.length - 2 ? "" : ""}`}
              >
                <JobCard
                  id={post.id}
                  title={post.jobPosition}
                  name={post.user?.companyInfo?.companyName as string}
                  logo={post.user?.profilePicture || ""}
                  location={post.location}
                  postedTime={post.createdAt}
                  tags={post.reqSkills as string[]}
                  salary={post.salaryRange}
                  isFavorite={post.isFavorite}
                  handleToggleFavorite={handleToggleFavorite}
                  view={false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default RecentJobs;
