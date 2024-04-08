import { IFilteredIssues, IIssue, IRepoInfo } from '@/shared';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Octokit } from "octokit";

export type IssuesStateType = {
 data: IIssue[],
 isLoading: boolean;
 error: string | undefined;
 filteredIssues: IFilteredIssues;
 prevUrl: string | null;
 repoInfo: IRepoInfo | null
};

const initialState: IssuesStateType = {
 data: [],
 isLoading: false,
 error: undefined,
 filteredIssues: {
  to_do: [],
  in_progress: [],
  done: [],
 },
 prevUrl: null,
 repoInfo: null
};

type IFetchIssuesProps = {
  url: string, 
  query?: string
}

export const fetchIssues = createAsyncThunk(
 "issues/fetchIssues",
 async function ({url = '', query = ''}: IFetchIssuesProps, { rejectWithValue, dispatch }) {
   try {
    const [owner, repo] = url.split('https://github.com/')[1]?.split('/');

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    return await octokit.request(`GET /repos/${owner}/${repo}/issues${query ? '?' + query : ''}`, {
      owner,
      repo,
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error("Server Error!");
      }
      return res.data;
    });
   } catch (error: unknown) {
     if (error instanceof Error) {
       return rejectWithValue(error.message);
     } else {
       return rejectWithValue("An unknown error occurred");
     }
   }
 }
);

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    updatePrevUrl: (state, action) => {
      state.prevUrl = action.payload;
    },
    updateRepoInfo: (state, action) => {
      state.repoInfo = action.payload;
    },
    updateFilteredIssues: (state, action) => {
      state.filteredIssues = action.payload;
    },
  },
  extraReducers: (builder) => {
   builder.addCase(fetchIssues.pending, (state) => {
    state.error = "";
     state.isLoading = true;
   });
   builder.addCase(fetchIssues.fulfilled, (state, action) => {
     state.isLoading = false;
     state.data = action.payload;
     state.error = "";
   });
   builder.addCase(fetchIssues.rejected, (state, action) => {
     state.isLoading = false;
     state.data = [];
     state.error = action.payload as string | undefined;
     state.filteredIssues = {to_do: [], in_progress: [], done: []};
     state.repoInfo = null;
    });
 },
});
export const {updatePrevUrl, updateRepoInfo, updateFilteredIssues} = issuesSlice.actions;

export default issuesSlice.reducer;
