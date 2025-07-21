import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { DeleteProjectFunction, JobCardProps, ModalProps } from "../cardTypes";
import { Tag } from "../Tag";
import Link from "next/link";

export const UdProjectsCard = ({
  projectId,
  name,
  avatar,
  title,
  postedTime,
  tags,
  budget,
  priceType,
  deadline,
  description,
  className,
  onOpen,
  handleDeleteProject,
  slug
}: JobCardProps & ModalProps & DeleteProjectFunction & {slug: string}) => {
  return (
    <div
      className={`w-full bg-white border-gray-200  p-6 space-y-4 ${className}`}
    >
      {/* Header with avatar and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-medium text-gray-900">{name}</h2>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={onOpen}
            className="text-gray-400 hover:text-gray-500"
          >
            <Edit className="w-6 h-6 hover:text-primary" />
          </button>
          <button
            onClick={() => handleDeleteProject(projectId)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Trash2 className="w-6 h-6 hover:text-warning" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Posted: {new Date(postedTime).toDateString()}
        </p>
      </div>

      {/* Tags */}
      <div>
        <div className="flex flex-wrap gap-2 border-y py-4">
          {(Array.isArray(tags) ? tags : Object.values(tags || {})).map(
            (tag, index) => (
              <Tag key={index} name={tag as string} />
            )
          )}
        </div>

        {/* Price and Deadline */}
        <div className="grid grid-cols-2 gap-4 border-b py-4">
          <div>
            <h3 className="md:text-xl text-lg font-semibold">{budget}</h3>
            <p className="text-sm text-gray-500">{priceType}</p>
          </div>
          <div>
            <h3 className="md:text-xl text-lg font-semibold">Deadline</h3>
            <p className="text-sm text-gray-500">{deadline}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-gray-600 ">{description}</p>
      </div>

      {/* CTA Button */}
      <div className="mt-5">
        <Link
          href={`/bid-requests/${slug}`}
          className="w-full sm:w-auto px-6 py-3 bg-secondary/80 hover:bg-secondary text-white font-medium rounded-xl transition-colors"
        >
          See Bid request
        </Link>
      </div>
    </div>
  );
};
