import {
  Chip,
  Sheet,
  Stack,
  Typography,
  Table,
  Button,
  Grid,
}  from "@mui/joy";

import ChatBubble from "./ChatBubble";
import useFetch from "./useFetch";
import { useState } from 'react';

type User = {
  login: string;
  avatar_url: string;
};

type Issue = {
  id: number;
  created_at: string;
  user: User;
  number: number;
  title: string;
  body: string;
  comments_url: string;
};

// Add object type array to store issues
type IssueTab = {
  id: number;
  created_at: string;
  user: User;
  number: number;
  title: string;
  body: string;
  comments_url: string;
}[];

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

export default function MessagesPane() {
  const [page, setPage] = useState(1);
  const [issueNumber, setIssue] = useState(7901);
  const issue = useFetch<Issue>({ url: `https://api.github.com/repos/facebook/react/issues/${issueNumber}` });
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });
 
  console.log(page,issueNumber)
  // request issues by page
  const { data } = useFetch<IssueTab>({
    url: "https://api.github.com/repos/facebook/react/issues",  
    params: {
      page: page < 1 ? 1 : page, 
      per_page: 10, 
    }
  });

  const handleRowClick = (issue: Issue) => {
     setIssue(issue.number);
    // Vous pouvez gérer l'événement ici, comme rediriger vers une page de détails ou afficher un modal
  };
// change issue page
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleLoadPrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };
console.log(data)
  return (
    <Sheet
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
        {data && data.length > 0 ? (
        <div>
          <h2>Issues List</h2>
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
        </div>
      ) : (
        <div>No issues found or pb with data loading.</div>
      )}
      
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Grid>
          <Button onClick={handleLoadPrevious}>Previous page</Button>
        </Grid>
        <Grid>
          <Button onClick={handleLoadMore}>Next page</Button>
        </Grid>
      </Grid>
      
      
      {issue.data && (
        <div>
          <h2>Issues Exchanges</h2>
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue.data?.number}
              </Chip>
            }
          >
            {issue.data.title}
          </Typography>
          <Typography level="body-sm">{issue.data.user.login}</Typography>
        </Stack>
        </div>
      )}
      {comments.data && (
        <Stack
         spacing={2} justifyContent="flex-end" px={2} py={3}
         >
          <ChatBubble variant="solid" {...issue.data!} />
          {comments.data.map((comment) => (
            <ChatBubble
              key={comment.id}
              variant={comment.user.login === issue.data!.user.login ? "solid" : "outlined"}
              {...comment}
            />
          ))}
        </Stack>
      )}
    </Sheet>
  );
}
