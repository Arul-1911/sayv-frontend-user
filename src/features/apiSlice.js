import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.sayv.net/api";

export const imgAddr = "https://creative-story.s3.amazonaws.com";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState().auth;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ====== user auth ======= /
    userRegistration: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    loginOtp: builder.mutation({
      query: (data) => ({
        url: "/user/submit-login-otp",
        method: "POST",
        body: data,
      }),
    }),

    // ====== Goals =======
    createGoals: builder.mutation({
      query: (data) => ({
        url: "/goal/create-goal",
        method: "POST",
        body: data,
      }),
    }),

    getGoals: builder.mutation({
      query: () => ({
        url: "/goal/get-goals",
        method: "GET",
      }),
    }),

    getGoal: builder.mutation({
      query: (goalId) => ({
        url: `/goal/get-goal/${goalId}`,
        method: "GET",
      }),
    }),

    updateGoal: builder.mutation({
      query: ({ goalId, goalData }) => ({
        url: `/goal/update-goal/${goalId}`,
        method: "PATCH",
        body: goalData,
      }),
    }),

    deleteGoal: builder.mutation({
      query: (goalId) => ({
        url: `/goal/delete-goal/${goalId}`,
        method: "DELETE",
      }),
    }),

    // ====== payday =======
    createPayday: builder.mutation({
      query: (data) => ({
        url: "/payday/create-payday",
        method: "POST",
        body: data,
      }),
    }),

    getPayday: builder.mutation({
      query: (paydayId) => ({
        url: `/payday/get-payday/${paydayId}`,
        method: "GET",
      }),
    }),

    getPaydays: builder.mutation({
      query: ({ currentStart, currentEnd }) => ({
        url: `/payday/get-paydays?currentStart=${currentStart}&currentEnd=${currentEnd}`,
        method: "GET",
      }),
    }),

    updatePayday: builder.mutation({
      query: ({ paydayId, paydayData }) => ({
        url: `/payday/update-payday/${paydayId}`,
        method: "PATCH",
        body: paydayData,
      }),
    }),

    deletePayday: builder.mutation({
      query: (paydayId) => ({
        url: `/payday/delete-payday/${paydayId}`,
        method: "DELETE",
      }),
    }),

    // ====== Budget =======
    saveBudget: builder.mutation({
      query: (data) => ({
        url: "/budget/create-budget",
        method: "POST",
        body: data,
      }),
    }),

    getBudgets: builder.mutation({
      query: ({ currentStart, currentEnd, date }) => ({
        url: `/budget/get-budgets?currentStart=${currentStart}&currentEnd=${currentEnd}`,
        method: "GET",
      }),
    }),

    getBudget: builder.mutation({
      query: (budgetId) => ({
        url: `/budget/get-budget/${budgetId}`,
        method: "GET",
      }),
    }),

    updateBudget: builder.mutation({
      query: ({ budgetId, budgetData }) => ({
        url: `/budget/update-budget/${budgetId}`,
        method: "PATCH",
        body: budgetData,
      }),
    }),

    deleteBudget: builder.mutation({
      query: (budgetId) => ({
        url: `/budget/delete-budget/${budgetId}`,
        method: "DELETE",
      }),
    }),

    // ====== Category =======
    getCategories: builder.mutation({
      query: () => ({
        url: "/category/get-categorys",
        method: "GET",
      }),
    }),

    // ====== Bills =======
    createBill: builder.mutation({
      query: (data) => ({
        url: "/bill/create-bill",
        method: "POST",
        body: data,
      }),
    }),

    getBills: builder.mutation({
      query: ({ currentStart, currentEnd }) => ({
        url: `/bill/get-bills?currentStart=${currentStart}&currentEnd=${currentEnd}`,
        method: "GET",
      }),
    }),

    getBill: builder.mutation({
      query: (billId) => ({
        url: `/bill/get-bill/${billId}`,
        method: "GET",
      }),
    }),

    updateBill: builder.mutation({
      query: ({ billId, billData }) => ({
        url: `/bill/update-bill/${billId}`,
        method: "PATCH",
        body: billData,
      }),
    }),

    deleteBill: builder.mutation({
      query: (billId) => ({
        url: `/bill/delete-bill/${billId}`,
        method: "DELETE",
      }),
    }),

    // ====== Subscriptions =======
    getSubscriptions: builder.mutation({
      query: () => ({
        url: "/plan/get-plans",
        method: "GET",
      }),
    }),

    // ======= Add New Bank Account =======
    getAddNewBankAccount: builder.mutation({
      query: () => ({
        url: "/user/add-bank",
        method: "GET",
      }),
    }),

    // ===========Get Connected Bank Accounts ==========
    getUserConnections: builder.mutation({
      query: () => ({
        url: "/user/get-user-connection",
        method: "GET",
      }),
    }),

    // ===========Delete Connected Bank Account ==========
    deleteUserConnection: builder.mutation({
      query: (bankId) => ({
        url: `/user/delete-user-connection/${bankId}`,
        method: "POST",
      }),
    }),

    // ========== Get User Consent ==============
    getUserConsent: builder.mutation({
      query: () => ({
        url: "/user/get-user-consent",
        method: "GET",
      }),
    }),

    // ======= Profile =======
    getUserProfile: builder.mutation({
      query: () => ({
        url: "user/get-profile",
        method: "GET",
      }),
    }),

    getCashflow: builder.mutation({
      query: (args) => {
        const {
          currentStart,
          currentEnd,
          previousStart,
          previousEnd,
          account_id,
        } = args;

        function getMonthStartEnd(date) {
          const year = date.getFullYear();
          const month = date.getMonth();
          return {
            start: new Date(year, month, 1).toISOString().slice(0, 10),
            end: new Date(year, month + 1, 0).toISOString().slice(0, 10),
          };
        }

        let _currentStart = currentStart;
        let _currentEnd = currentEnd;
        let _previousStart = previousStart;
        let _previousEnd = previousEnd;

        if (!currentStart && !currentEnd) {
          const currentDate = new Date();
          const { start, end } = getMonthStartEnd(currentDate);
          _currentStart = start;
          _currentEnd = end;
        }

        if (!previousStart && !previousEnd) {
          const previousDate = new Date();
          previousDate.setMonth(previousDate.getMonth() - 1);
          const { start, end } = getMonthStartEnd(previousDate);
          _previousStart = start;
          _previousEnd = end;
        }

        return {
          url: `/user/get-cashflow-data-overview?currentStart=${_currentStart}&currentEnd=${_currentEnd}&previousStart=${_previousStart}&previousEnd=${_previousEnd}&account_id=${account_id}`,
          method: "GET",
        };
      },
    }),

    getCashflowMoneyIn: builder.mutation({
      query: ({
        currentStart,
        currentEnd,
        previousStart,
        previousEnd,
        filter,
        account_id,
      }) => {
        const params = new URLSearchParams();
        const today = new Date();
        const currentYear = today.getFullYear();
        const previousYear = currentYear - 1;

        //formatting date
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const defaultCurrentStart =
          currentStart || formatDate(new Date(currentYear, 0, 1));
        const defaultCurrentEnd = currentEnd || formatDate(today);
        const defaultPreviousStart =
          previousStart || formatDate(new Date(previousYear, 0, 1));
        const defaultPreviousEnd =
          previousEnd || formatDate(new Date(previousYear, 11, 31));

        if (defaultCurrentStart)
          params.append("currentStart", defaultCurrentStart);
        if (defaultCurrentEnd) params.append("currentEnd", defaultCurrentEnd);
        if (defaultPreviousStart)
          params.append("previousStart", defaultPreviousStart);
        if (defaultPreviousEnd)
          params.append("previousEnd", defaultPreviousEnd);
        if (filter) params.append("filter", filter);

        return {
          url: `/user/get-cashflow-data-in?${params.toString()}&account_id=${account_id}`,
          method: "GET",
        };
      },
    }),

    getCashflowMoneyOut: builder.mutation({
      query: ({
        currentStart,
        currentEnd,
        previousStart,
        previousEnd,
        filter,
        account_id,
      }) => {
        const params = new URLSearchParams();
        const today = new Date();
        const currentYear = today.getFullYear();
        const previousYear = currentYear - 1;

        //formatting date
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const defaultCurrentStart =
          currentStart || formatDate(new Date(currentYear, 0, 1));
        const defaultCurrentEnd = currentEnd || formatDate(today);
        const defaultPreviousStart =
          previousStart || formatDate(new Date(previousYear, 0, 1));
        const defaultPreviousEnd =
          previousEnd || formatDate(new Date(previousYear, 11, 31));

        if (defaultCurrentStart)
          params.append("currentStart", defaultCurrentStart);
        if (defaultCurrentEnd) params.append("currentEnd", defaultCurrentEnd);
        if (defaultPreviousStart)
          params.append("previousStart", defaultPreviousStart);
        if (defaultPreviousEnd)
          params.append("previousEnd", defaultPreviousEnd);
        if (filter) params.append("filter", filter);
        return {
          url: `/user/get-cashflow-data-out?${params.toString()}&account_id=${account_id}`,
          method: "GET",
        };
      },
    }),

    getCashflowNet: builder.mutation({
      query: ({
        currentStart,
        currentEnd,
        previousStart,
        previousEnd,
        filter,
        account_id,
      }) => {
        const params = new URLSearchParams();
        const today = new Date();
        const currentYear = today.getFullYear();
        const previousYear = currentYear - 1;

        //formatting date
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const defaultCurrentStart =
          currentStart || formatDate(new Date(currentYear, 0, 1));
        const defaultCurrentEnd = currentEnd || formatDate(today);
        const defaultPreviousStart =
          previousStart || formatDate(new Date(previousYear, 0, 1));
        const defaultPreviousEnd =
          previousEnd || formatDate(new Date(previousYear, 11, 31));

        if (defaultCurrentStart)
          params.append("currentStart", defaultCurrentStart);
        if (defaultCurrentEnd) params.append("currentEnd", defaultCurrentEnd);
        if (defaultPreviousStart)
          params.append("previousStart", defaultPreviousStart);
        if (defaultPreviousEnd)
          params.append("previousEnd", defaultPreviousEnd);
        if (filter) params.append("filter", filter);
        return {
          url: `/user/get-cashflow-data-net?${params.toString()}&account_id=${account_id}`,
          method: "GET",
        };
      },
    }),

    getCashflowListData: builder.mutation({
      query: ({ currentStart, currentEnd, from, account_id }) => ({
        url: `/user/get-all-list?currentStart=${currentStart}&currentEnd=${currentEnd}&from=${from}&account_id=${account_id}`,
        method: "GET",
      }),
    }),

    // ====== Transactions =======
    getTransactions: builder.mutation({
      query: ({ query, currentStart, currentEnd, date, account_id }) => {
        let url = `/user/get-transactions?keyword=${query}&date=${date}&account_id=${account_id}`;

        if (currentStart && currentEnd) {
          url += `&currentStart=${currentStart}&currentEnd=${currentEnd}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),

    getTransaction: builder.mutation({
      query: (tranId) => ({
        url: `/user/get-transaction/${tranId}`,
        method: "GET",
      }),
    }),

    updateTransaction: builder.mutation({
      query: ({ transactionId, transData }) => ({
        url: `/user/update-transaction/${transactionId}`,
        method: "PATCH",
        body: transData,
      }),
    }),

    // ======== EXPORT TRANSACTION CSV =========
    getDownloadTransaction: builder.mutation({
      query: ({ currentStart, currentEnd, account_id }) => {
        let url = `/user/get-transactions-csv?`;

        if (currentStart && currentEnd) {
          url += `&currentStart=${currentStart}&currentEnd=${currentEnd}&account_id=${account_id}`;
        }

        return {
          url,
          method: "GET",
          responseHandler: (response) => response.blob(),
        };
      },
    }),

    // ====== Tags =======
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tag/create-tag",
        method: "POST",
        body: data,
      }),
    }),

    getTags: builder.mutation({
      query: () => ({
        url: "/tag/get-tags",
        method: "GET",
      }),
    }),

    // ====== Assets/Liabilities =======
    getAssetsLiabilities: builder.mutation({
      query: () => ({
        url: `/asset-liability/get-assets-liabilities`,
        method: "GET",
      }),
    }),

    getAssets: builder.mutation({
      query: (query) => ({
        url: `/asset/get-assets?type=${query}`,
        method: "GET",
      }),
    }),

    getAssetsLv2: builder.mutation({
      query: ({ assetLv1Id }) => ({
        url: `/asset-level1/get-assets?asset_ref=${assetLv1Id}`,
        method: "GET",
      }),
    }),

    getAssetsLv3: builder.mutation({
      query: ({ assetLv2Id }) => ({
        url: `/asset-level2/get-assets?asset_level1_ref=${assetLv2Id}`,
        method: "GET",
      }),
    }),

    createAssetLiability: builder.mutation({
      query: (data) => ({
        url: "/asset-liability/create-asset-liability",
        method: "POST",
        body: data,
      }),
    }),

    // ====== Dashboard =======
    dashboardData: builder.mutation({
      query: ({ currentStart, currentEnd, account_id }) => ({
        url: `/user/get-graph-data?currentStart=${currentStart}&currentEnd=${currentEnd}&account_id=${account_id}`,
        method: "GET",
      }),
    }),

    //======= CUSTOMIZE DASHBOARD =======
    getCustomizeDashboard: builder.query({
      query: () => ({
        url: "/user/get-dashboard-settings",
        method: "GET",
      }),
      providesTags: ["DashboardSettings"],
    }),

    updateCustomizeDashboard: builder.mutation({
      query: ({ enabled, disabled }) => ({
        url: "/user/update-dashboard-settings",
        method: "PATCH",
        body: {
          enabled,
          disabled,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DashboardSettings"],
    }),

    //========== BUCKET & CATEGORY ==============
    getBuckets: builder.query({
      query: () => ({
        url: "/bucket/get-buckets",
        method: "GET",
      }),
    }),

    getbucketCategories: builder.query({
      query: ({ bucketId }) => ({
        url: `/category/get-categorys?bucket=${bucketId}`,
        method: "GET",
      }),
    }),

    getTipTopics: builder.query({
      query: ({ categoryId }) => ({
        url: `/tiptopic/get-tiptopics?category=${categoryId}`,
        method: "GET",
      }),
    }),

    // === end of query ====
  }),
});

export const {
  useUserRegistrationMutation,
  useLoginUserMutation,
  useLoginOtpMutation,
  useForgetPasswordMutation,

  useCreateGoalsMutation,
  useGetGoalsMutation,
  useGetGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,

  useCreatePaydayMutation,
  useGetPaydaysMutation,
  useGetPaydayMutation,
  useUpdatePaydayMutation,
  useDeletePaydayMutation,

  useSaveBudgetMutation,
  useGetBudgetsMutation,
  useGetBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,

  useGetCategoriesMutation,

  useCreateBillMutation,
  useGetBillsMutation,
  useGetBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,

  useGetUserProfileMutation,
  useGetSubscriptionsMutation,
  useGetAddNewBankAccountMutation,

  useGetCashflowMutation,
  useGetCashflowMoneyInMutation,
  useGetCashflowMoneyOutMutation,
  useGetCashflowNetMutation,
  useGetCashflowListDataMutation,

  useGetAssetsMutation,
  useGetAssetsLv2Mutation,
  useGetAssetsLv3Mutation,
  useCreateAssetLiabilityMutation,
  useGetAssetsLiabilitiesMutation,

  useDashboardDataMutation,
  useGetCustomizeDashboardQuery,
  useUpdateCustomizeDashboardMutation,

  useGetTransactionsMutation,
  useGetTransactionMutation,
  useUpdateTransactionMutation,

  useGetDownloadTransactionMutation,

  useCreateTagMutation,
  useGetTagsMutation,

  useGetBucketsQuery,
  useGetbucketCategoriesQuery,
  useGetTipTopicsQuery,

  useGetUserConnectionsMutation,
  useDeleteUserConnectionMutation,
  useGetUserConsentMutation,
} = apiSlice;
