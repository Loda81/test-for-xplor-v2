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

function App() {
  //add state to store the selected issue number from MessagePane
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null); 


  const handleIssueChange = (issue: Issue) => {
    setSelectedIssue(issue); // Store the selected issue object
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar issue={selectedIssue} />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          <MessagesPane onIssueChange={handleIssueChange}  />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
