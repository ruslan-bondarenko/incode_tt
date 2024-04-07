export type ColumnType = {
 id: string;
 title: string;
 issues: IIssue[];
}

export type IUser = {
 login: string;
 id: number;
 node_id: string;
 avatar_url: string;
 gravatar_id: string;
 url: string;
 html_url: string;
 followers_url: string;
 following_url: string;
 gists_url: string;
 starred_url: string;
 subscriptions_url: string;
 organizations_url: string;
 repos_url: string;
 events_url: string;
 received_events_url: string;
 type: string;
 site_admin: boolean;
};

export type ILabels = {
 id: number;
 node_id: string;
 url: string;
 name: string;
 color: string;
 default: boolean;
 description: string | null;
}

export type IReactions = {
 url: string;
 total_count: number;
 '+1': number;
 '-1': number;
 laugh: number;
 hooray: number;
 confused: number;
 heart: number;
 rocket: number;
 eyes: number;
}

export type IIssue = {
 url: string;
 repository_url: string;
 labels_url: string;
 comments_url: string;
 events_url: string;
 html_url: string;
 id: number;
 node_id: string;
 number: number;
 title: string;
 user: IUser;
 labels: ILabels[];
 state: string;
 locked: boolean;
 assignee: any;
 assignees: any[];
 milestone: any;
 comments: number;
 created_at: string;
 updated_at: string;
 closed_at: string | null;
 author_association: string;
 active_lock_reason: string | null;
 body: string;
 reactions: IReactions;
 timeline_url: string;
 performed_via_github_app: any;
 state_reason: string | null;
}

export type IFilteredIssues = { 
 to_do: IIssue[];
 in_progress: IIssue[];
 done: IIssue[];
};

export type IRepoInfo = {
 name: string,
 repo: {
   name: string,
   url: string,
 }
};
