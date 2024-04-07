import { IFilteredIssues, IIssue } from "../types";

export const urlRegex = /https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/;

export function capitalizeWords(sentence: string) {
  return sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function formatUpdateDate(updateDate: string) {
  const currentDate = new Date();
  const updatedDate = new Date(updateDate);
  const diffTime = Math.abs(currentDate.getTime() - updatedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return `updated ${diffDays} days ago`;
}

export const groupIssues = (data: IIssue[]) => {
 const now = new Date();
 const groupedIssues: IFilteredIssues = {
   to_do: [],
   in_progress: [],
   done: [],
 };

 data.forEach((issue: IIssue) => {
   const createdAt = new Date(issue.created_at);
   const isWithin24Hours =
     (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60) <= 24;

   if (issue.state !== "closed" && isWithin24Hours) {
     groupedIssues.to_do.push(issue);
   } else if (issue.state === "open") {
     // && issue.assignees.length
     groupedIssues.in_progress.push(issue);
   } else if (issue.state === "closed") {
     groupedIssues.done.push(issue);
   }
 });

 return groupedIssues;
};
