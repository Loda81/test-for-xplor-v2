import {
  Chip,
  Sheet,
  Stack,
  Typography,
}  from "@mui/joy";

import ChatBubble from "./ChatBubble";
import useFetch from "./useFetch";
import {  useEffect } from 'react';
import { Issue, DisplayIssue, Comment } from './type'



// add a tupe message prop to store the selected issue number & comments
type MessagesPaneProps = {
  onCommentsFetched: (comments: Comment[]) => void; 
  displayIssues: DisplayIssue[] | null; // Sidebar receives the tab
  selectedIssue: Issue | null; 
};


export default function MessagesPane({ selectedIssue, onCommentsFetched, displayIssues }: MessagesPaneProps) {
 const comments = useFetch<Comment[]>({ url: selectedIssue ? selectedIssue.comments_url : "" }, { enabled: selectedIssue  ? true : false});
 console.log(selectedIssue)
  useEffect(() => {
    if (comments.data) {
      onCommentsFetched(comments.data);  // Send comments to parent
    }
  }, [comments.data, onCommentsFetched]);  

  

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
    {selectedIssue && (
        <div>
             <Typography 
         level="h2"
         noWrap
        >Issues exchanges
        </Typography>
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
                #{selectedIssue.number}
              </Chip>
            }
          >
            {selectedIssue.title}
          </Typography>
          <Typography level="body-sm">{selectedIssue.user.login}</Typography>
        </Stack>
        </div>
      )}
      {comments.data && displayIssues && (
        <Stack
         spacing={2} justifyContent="flex-end" px={2} py={3}
         >
          <ChatBubble variant="solid" {...selectedIssue!} />
          {comments.data.map((comment) => {
            const toDisplay = displayIssues?.find(dI => dI.login === comment.user.login);
           return (
              toDisplay && toDisplay.displayMessage ? (
                <ChatBubble
                  key={comment.id}
                  variant={comment.user.login === selectedIssue?.user.login ? "solid" : "outlined"}
                  {...comment}
                />
              ) : null
            );
          })}
        </Stack>
      )}
    </Sheet>
  );
}


