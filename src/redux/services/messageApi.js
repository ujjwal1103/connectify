import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config/constant";
import { getCurrentUserAndAccessToken } from "../../utils/getCurrentUserId";

export const messageApi = createApi({
  reducerPath: "message",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const { user, accessToken } = getCurrentUserAndAccessToken();
      if (accessToken && user) {
        headers.set("authorization", `${accessToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ["messages"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) =>
        `messages/${data?.chatId}?page=${data?.page || 1}&pageSize=${
          data?.limit || 20
        }`,
      keepUnusedDataFor: true,
      pollingInterval: 5000,
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, newMessage }) => ({
        url: `message/${chatId}`,
        method: "POST",
        body: newMessage,
      }),
    }),
    sendAttachments: builder.mutation({
      query: ({ chatId, formData }) => ({
        url: `message/attachments/${chatId}`,
        method: "POST",
        headers: {
          Accept: "multipart/form-data",
        },
        body: formData,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation, useSendAttachmentsMutation } = messageApi;
