import {
  ConsultationResponse,
  ConsultationsListResponse,
  PaginationParams,
} from "@/interfaces/global";
import baseApi from "../baseApi";

const consultation = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create consultation
    createConsultation: builder.mutation<ConsultationResponse, FormData>({
      query: (body) => ({
        url: "/consultation/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Consultation"],
    }),

    // Get all consultations
    getConsultations: builder.query<
      ConsultationsListResponse,
      PaginationParams
    >({
      query: ({ limit, page, searchTerm }) => ({
        url: "/consultation",
        params: { limit, page, searchTerm },
      }),
      providesTags: ["Consultation"],
    }),

    // Get my consultations
    getMyConsultations: builder.query<ConsultationsListResponse, void>({
      query: () => "/consultation/my-consultations",
      providesTags: ["Consultation"],
    }),

    // Get single consultation by ID
    getConsultationById: builder.query<ConsultationResponse, string>({
      query: (id) => `/consultation/${id}`,
      providesTags: (result, error, id) => [{ type: "Consultation", id }],
    }),

    // Update consultation
    updateConsultation: builder.mutation<
      ConsultationResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/consultation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Consultation", id },
        "Consultation",
      ],
    }),

    // Delete consultation
    deleteConsultation: builder.mutation<ConsultationResponse, string>({
      query: (id) => ({
        url: `/consultation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Consultation"],
    }),
  }),
});

export const {
  useCreateConsultationMutation,
  useGetConsultationsQuery,
  useGetMyConsultationsQuery,
  useGetConsultationByIdQuery,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
} = consultation;
