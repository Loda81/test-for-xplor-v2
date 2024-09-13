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
import {  useEffect, useState } from 'react';

type User = {
  login: string;
  avatar_url: string;
};

type Issue = {
  id: number;
  created_at: string;
  user: User;
  number: number;
  state: string;
  title: string;
  body: string;
  comments_url: string;
};

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

// add a tupe message prop to store the selected issue number & comments
type MessagesPaneProps = {
  onIssueChange: (issue: Issue) => void;
  onCommentsFetched: (comments: Comment[]) => void; 
};


export default function MessagesPane({ onIssueChange, onCommentsFetched }: MessagesPaneProps) {
  const [page, setPage] = useState(0);
  const [issueNumber, setIssue] = useState(0);
   // Ne pas lancer la requête si issueNumber est 0
   const issue = useFetch<Issue>({
    url: `https://api.github.com/repos/facebook/react/issues/${issueNumber}`,
  }, {
    enabled: issueNumber !== 0, // Ne pas activer tant qu'il n'y a pas de numéro d'issue sélectionné
  });  
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });
 
  useEffect(() => {
    if (comments.data) {
      onCommentsFetched(comments.data);  // Send comments to parent
    }
  }, [comments.data, onCommentsFetched]);  

  // request issues by page
  const { data } = useFetch<Issue[]>({
    url: "https://api.github.com/repos/facebook/react/issues",
    params: {
      page: page < 1 ? 1 : page,
      per_page: 10,
    },
  }, {
    enabled: page > 0, // Ne pas activer tant que la page n'est pas supérieure à 0
  });
console.log(comments.data)
  const handleRowClick = (issue: Issue) => {
     setIssue(issue.number);
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


