// types.ts
export type User = {
    login: string;
    avatar_url: string;
  };
  
  export type Issue = {
    id: number;
    created_at: string;
    number: number;
    title: string;
    user: User;
    state: string;
    body: string;
    comments_url: string; // Assurez-vous que ce champ est bien défini
  };
  
  export type Comment = {
    id: number;
    created_at: string;
    user: User;
    body: string;
  };
  
  export type DisplayIssue = {
    login: string;
    displayMessage: boolean;
  };


  
 