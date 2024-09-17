import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import { useState } from 'react';

type User = {
  login: string;
  avatar_url: string;
};


type Issue = {
  id: number;
  created_at: string;
  number: number;
  title: string;
  user: User;
  state: string;
  body: string;
  comments_url: string;
};

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

type DisplayIssue = {
  login: string;
  displayMessage: boolean;
};

function App() {
  //add state to store the selected issue number from MessagePane
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null); 
  const [comments, setComments] = useState<Comment[]>([]);
  const [displayIssues, setDisplayedIssues] = useState<DisplayIssue[]>([]); 
  


  const handleIssueChange = (issue: Issue) => {
    setSelectedIssue(issue); // Store the selected issue object
  };

  const handleCommentsFetched = (fetchedComments: Comment[]) => {
     setComments(fetchedComments); // Store the comments fetched by MessagesPane
  };

  const handleDisplayIssueChange = (displayIssue: DisplayIssue[]) => {
    setDisplayedIssues(displayIssue); // Store the selected issue object
  };


  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar 
           issue={selectedIssue}
           comments={comments}
           onDisplayIssueChange ={handleDisplayIssueChange}          
          />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          <MessagesPane 
           displayIssues={displayIssues}
           onIssueChange={handleIssueChange}
           onCommentsFetched={handleCommentsFetched}
             />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
