// import { apiSlice } from "./apiSlice.js";
// import { EMPLOYEE_URL, UPLOAD_URL } from "../constants.js";
// // import { updateEmployee } from "../../../../backend/controllers/employeeController.js";

// export const employeesApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllEmployees: builder.query({
//       query: () => `${EMPLOYEE_URL}/allemployees`,
//     }),
//     createEmployee: builder.mutation({
//       query: (newEmployee) => ({
//         url: `${EMPLOYEE_URL}/create-employee`,
//         method: "POST",
//         body: newEmployee,
//       }),
//     }),

//     updateEmployee: builder.mutation({
//       query: ({ id, updatedEmployee }) => ({
//         url: `${EMPLOYEE_URL}/update-employee/${id}`,
//         method: "PUT",
//         body: updatedEmployee,
//       }),
//     }),

// //     addMovieReview: builder.mutation({
// //       query: ({ id, rating, comment }) => ({
// //         url: `${MOVIE_URL}/${id}/reviews`,
// //         method: "POST",
// //         body: { rating, id, comment },
// //       }),
// //     }),

// //     deleteComment: builder.mutation({
// //       query: ({ movieId, reviewId }) => ({
// //         url: `${MOVIE_URL}/delete-comment`,
// //         method: "DELETE",
// //         body: { movieId, reviewId },
// //       }),
// //     }),

//     deleteEmployee: builder.mutation({
//       query: (id) => ({
//         url: `${EMPLOYEE_URL}/delete-employee/${id}`,
//         method: "DELETE",
//       }),
//     }),

//     getSpecificEmployee: builder.query({
//       query: (id) => `${EMPLOYEE_URL}/specific-employee/${id}`,
//     }),

//     uploadImage: builder.mutation({
//       query: (formData) => ({
//         url: `${UPLOAD_URL}`,
//         method: "POST",
//         body: formData,
//       }),
//     }),

// //     getNewMovies: builder.query({
// //       query: () => `${MOVIE_URL}/new-movies`,
// //     }),

// //     getTopMovies: builder.query({
// //       query: () => `${MOVIE_URL}/top-movies`,
// //     }),

// //     getRandomMovies: builder.query({
// //       query: () => `${MOVIE_URL}/random-movies`,
// //     }),
//   }),
// });

// export const {
//   useGetAllEmployeesQuery,
//   useCreateEmployeeMutation,
//   useUpdateEmployeeMutation,
// //   useAddMovieReviewMutation,
// //   useDeleteCommentMutation,
//   useGetSpecificEmployeeQuery,
//   useUploadImageMutation,
//   useDeleteEmployeeMutation,
//   //
// //   useGetNewMoviesQuery,
// //   useGetTopMoviesQuery,
// //   useGetRandomMoviesQuery,
// } = employeesApiSlice;

import { apiSlice } from "./apiSlice.js";
import { EMPLOYEE_URL, UPLOAD_URL } from "../constants.js";

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => `${EMPLOYEE_URL}/allemployees`,
    }),
    createEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: `${EMPLOYEE_URL}/create-employee`,
        method: "POST",
        body: newEmployee,
      }),
      // Handle errors for the createEmployee mutation
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Check if the error response contains a message about duplicate email
          const { status } = error.response;
          if (status === 400 && error.response.data.message === "Duplicate email") {
            throw new Error("Duplicate email"); // Propagate the error message
          }
        }
      },
    }),
    updateEmployee: builder.mutation({
      query: ({ id, updatedEmployee }) => ({
        url: `${EMPLOYEE_URL}/update-employee/${id}`,
        method: "PUT",
        body: updatedEmployee,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/delete-employee/${id}`,
        method: "DELETE",
      }),
    }),
    getSpecificEmployee: builder.query({
      query: (id) => `${EMPLOYEE_URL}/specific-employee/${id}`,
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

// Export the hooks for usage in components
export const {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetSpecificEmployeeQuery,
  useUploadImageMutation,
  useDeleteEmployeeMutation,
} = employeesApiSlice;
