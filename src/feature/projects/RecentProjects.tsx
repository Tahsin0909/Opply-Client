/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "@/components/modal/Modal";
import WithEmptyState from "@/components/others/AllState";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { useGetAllProjectsQuery } from "@/redux/api/projects/projectApi";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BidNowModal } from "./BidNowModal";
import { ProjectsCard } from "./card/ProjectsCard";
import { useToggleFavoriteMutation } from "@/redux/api/favourite/favApi";
import { toast } from "sonner";
import useAuthUser from "@/hooks/useGetMe";

const RecentProjects = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const { user } = useAuthUser();
  const {
    data: projects,
    isLoading,
    error,
  } = useGetAllProjectsQuery({
    limit: 4,
    sort: "-createdAt",
  });

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
          miniTitle="Projects"
          subtitle="Connect with skilled professionals for your one-off tasks, freelance gigs, or specialized short-term projects."
          title="Recent Projects"
        />
        <PrimaryButton onClick={() => router.push("/project")}>
          <div className="flex items-center justify-center gap-3 text-nowrap">
            <p>See Projects</p>
            <MoveUpRight className="w-4" />
          </div>
        </PrimaryButton>
      </div>

      <WithEmptyState
        data={projects?.data || []}
        emptyStateProps={{
          title: "No projects found",
          description: "There are currently no projects available.",
        }}
        action={
          <PrimaryButton
            onClick={() => {}}
            // onClick={() => refreshProjects()}
          >
            Refresh Projects
          </PrimaryButton>
        }
        loading={isLoading}
        error={error as any}
        spinnerSize="lg"
        errorMessage=" Failed to fetch projects. Please try again later."
        errorTitle="Error Fetching Projects"
        loadingMessage="Fetching latest projects..."
        loadingTitle=" Loading Projects"
      >
        {(data) => (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {data.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.1 * (index + 1), ease: "easeIn" }}
                className={`border-t lg:odd:border-r ${
                  index >= data.length - 2 ? "border-b" : ""
                }`}
              >
                <ProjectsCard
                  isOpen={isModalOpen === index}
                  onOpen={() => setIsModalOpen(index)}
                  onClose={() => setIsModalOpen(null)}
                  className=""
                  name={post.user?.firstName + " " + post.user?.lastName}
                  avatar={
                    post.user?.profilePicture ||
                    "https://i.ibb.co/4f1x5zj/placeholder.png"
                  }
                  title={post.name}
                  postedTime={post.createdAt}
                  tags={Object.values(post.skills) as string[]}
                  budget={post.budget}
                  priceType={post.priceType}
                  deadline={post.deadline}
                  description={post.goal}
                  projectId={post.id}
                  favorite={false}
                  isFavorite={post.isFavorite}
                  handleToggleFavorite={handleToggleFavorite}
                  id={post.userId === user?.id}
                />
                {
                  <Modal
                    isOpen={isModalOpen === index}
                    onClose={() => setIsModalOpen(null)}
                  >
                    <BidNowModal
                      className=""
                      name={post.user?.firstName + " " + post.user?.lastName}
                      avatar={
                        post.user?.profilePicture ||
                        "https://i.ibb.co/4f1x5zj/placeholder.png"
                      }
                      title={post.name}
                      postedTime={post.createdAt}
                      tags={Object.values(post.skills) as string[]}
                      budget={post.budget}
                      priceType={post.priceType}
                      deadline={post.deadline}
                      description={post.goal}
                      scopeWork={post.scopeOfWork as string}
                      onClose={() => setIsModalOpen(null)}
                      projectId={post.id}
                      isFavorite={post.isFavorite}
                      favorite={false}
                      handleToggleFavorite={handleToggleFavorite}
                    />
                  </Modal>
                }
              </motion.div>
            ))}
          </div>
        )}
      </WithEmptyState>
    </div>
  );
};

export default RecentProjects;
