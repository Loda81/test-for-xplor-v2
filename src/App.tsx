import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import { useState } from 'react';

type Issue = {
  id: number;
  created_at: string;
  number: number;
  title: string;
  state: string;
  body: string;
  comments_url: string;
};

type Comment = {
  id: number;
  body: string;
  user: {
    login: string;
  };
};

function App() {
  //add state to store the selected issue number from MessagePane
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null); 
  const [comments, setComments] = useState<Comment[]>([]);

  const handleIssueChange = (issue: Issue) => {
    setSelectedIssue(issue); // Store the selected issue object
  };

  const handleCommentsFetched = (fetchedComments: Comment[]) => {
    console.log(fetchedComments)
    setComments(fetchedComments); // Store the comments fetched by MessagesPane
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar 
           issue={selectedIssue}
           comments={comments}
            />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          <MessagesPane 
           onIssueChange={handleIssueChange}
           onCommentsFetched={handleCommentsFetched}
             />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
