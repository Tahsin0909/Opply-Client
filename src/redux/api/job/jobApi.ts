import {
  CreateJobRequest,
  JobResponse,
  JobsApplication,
  JobsListResponse,
  PaginationParams,
  UpdateJobRequest,
} from "@/interfaces/global";
import baseApi from "../baseApi";

// Add these interfaces for category responses
export interface SubCategory {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  children: SubCategory[];
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Category[];
}
interface SingleCategoriesResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: [Category];
}

interface SubCategoriesResponse {
  success: boolean;
  message: string;
  data: SubCategory[];
}

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<JobResponse, CreateJobRequest>({
      query: (data) => ({
        url: "/jobs/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobs: builder.query<JobsListResponse, PaginationParams>({
      query: (data) => ({
        url: "/jobs",
        method: "GET",
        params: data,
      }),
      providesTags: ["Jobs"],
    }),
    getMyJobs: builder.query<JobsListResponse, void>({
      query: () => "/jobs/my-jobs",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query<JobResponse, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    updateJob: builder.mutation<
      JobResponse,
      { id: string; data: UpdateJobRequest }
    >({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Jobs", id },
        { type: "Jobs" },
      ],
    }),
    deleteJob: builder.mutation<JobResponse, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    applyJob: builder.mutation<JobResponse, { userId: string; jobId: string }>({
      query: ({ userId, jobId }) => ({
        url: `/apply-jobs/${jobId}`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Jobs"],
    }),
    getApplicant: builder.query<JobsApplication, string>({
      query: (id) => `/jobs/appliciants/${id}`,
      providesTags: ["Jobs"],
    }),
    // Add category endpoints
    getCategories: builder.query<CategoriesResponse, PaginationParams>({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params,
      }),
      providesTags: ["Categories"],
    }),
    getSubCategories: builder.query<SubCategoriesResponse, void>({
      query: () => `/category/sub-categories`,
      providesTags: ["Categories"],
    }),
    getSubCategoriesByCategory: builder.query<
      SingleCategoriesResponse,
      { id?: string }
    >({
      query: ({ id }) => `/category/${id}`,
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetMyJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useApplyJobMutation,
  useGetApplicantQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} = jobApi;
