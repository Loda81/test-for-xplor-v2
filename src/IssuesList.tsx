import {
  Sheet,
  Stack,
  Typography,
  Table,
  Button,
  Grid,
  Switch,
}  from "@mui/joy";

import useFetch from "./useFetch";
import { useState } from 'react';
import { Issue } from './type'



// add a tupe message prop to store the selected issue number & comments
type IssuesListProps = {
  onIssueChange: (issue: Issue) => void;
};


export default function IssuesList({ onIssueChange }: IssuesListProps) {
  const [page, setPage] = useState(1);
  const [showIssues, setShowIssues] = useState(true);

  // request issues by page
  const { data, isLoading } = useFetch<Issue[]>({
    url: "https://api.github.com/repos/facebook/react/issues",  
    params: {
      page: page < 1 ? 1 : page, 
      per_page: 10, 
    }
  });
 const handleRowClick = (issue: Issue) => {
     setShowIssues(false);
     onIssueChange(issue);
 };
// change issue page
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleLoadPrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };
 return (
    <Sheet
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >   
     <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography 
         level="h2"
         noWrap
        >Issues List
        </Typography>
        <Switch
          checked={showIssues}
          onChange={() => setShowIssues(prev => !prev)}
        />
      </Stack>

        {showIssues && data && data.length > 0 ? (
        <div>
          <Table hoverRow>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>Creation date</th>
            <th style={{ width: '90%' }}>Title</th>
             </tr>
        </thead>
        <tbody>
          {data.map(issue => {
            const dateFormat = new Date(issue.created_at).toLocaleDateString()
            return (
            <tr 
              key={issue.id}
              onClick={() => handleRowClick(issue)}
              style={{ cursor: 'pointer' }}
              >
              <td style={{ width: '10%' }}>{dateFormat}</td>
              <td style={{ width: '90%' }}>{issue.title}</td>
            </tr>
          )})}
        </tbody>
      </Table>    
      {isLoading && (<div>Loading...</div>)}
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Grid>
          <Button onClick={handleLoadPrevious}>Previous page</Button>
        </Grid>
        <Grid>
          <Button onClick={handleLoadMore}>Next page</Button>
        </Grid>
      </Grid>    
        </div>
      ) : (
        showIssues && <div>No issues found or pb with data loading.</div>
      )} 
    </Sheet>
  );
}


