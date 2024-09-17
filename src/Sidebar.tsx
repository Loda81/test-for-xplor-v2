import { Avatar, Sheet, Typography, Badge, Checkbox } from "@mui/joy";
import { useState, useEffect } from "react";

type User = {
  login: string;
  avatar_url: string;
};

type Issue = {
  id: number;
  created_at: string;
  number: number;
  title: string;
  state: string;
  user: User;
  body: string;
  comments_url: string;
};

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

type SidebarProps = {
  issue: Issue | null; // Sidebar receives the issue object
  comments: Comment[]; // Sidebar receives the comments array
  onDisplayIssueChange: (displayIssue: { displayMessage: boolean; login: string;}[]) => void; //send display message info
};

type UniqueLogin = {
  login: string;
  nbMessage: number;
  avatar: string;
  displayMessage: boolean;
};

export default function Sidebar({ issue, comments, onDisplayIssueChange  }: SidebarProps) {
  // Create an array with unique login and count the number of messages
  const [displayIssues, setDisplayIssues] = useState<UniqueLogin[]>([]);

  useEffect(() => {
    const uniqueLogins: { [key: string]: UniqueLogin } = {};

    comments.forEach((comment) => {
      if (comment.user.login && !uniqueLogins[comment.user.login]) {
        uniqueLogins[comment.user.login] = {
          login: comment.user.login,
          avatar: comment.user.avatar_url,
          nbMessage: 1,
          displayMessage: true, // Default value is true
        };
      } else if (comment.user.login && uniqueLogins[comment.user.login]) {
        uniqueLogins[comment.user.login].nbMessage += 1;
      }
    });

    setDisplayIssues(Object.values(uniqueLogins)); // Initialize displayIssues state
  }, [comments]);

     // Appeler onDisplayIssueChange chaque fois que displayIssue change
     useEffect(() => {
      onDisplayIssueChange(displayIssues);
    }, [displayIssues, onDisplayIssueChange]);


  const handleChangeChecked = (login: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.login === login
          ? { ...issue, displayMessage: event.target.checked }
          : issue
      )
    );
  };
  
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Issue number */}
      <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
        You are watching issue number: {issue?.number ?? "N/A"}
      </Typography>

      {/* Issue status */}
      <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
        Issue status is: {issue?.state ?? "N/A"}
      </Typography>

      {/* Initiator */}
      <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
        Initiator:
      </Typography>
         <Avatar size="sm" variant="solid" src={issue?.user.avatar_url} />         
           {issue?.user.login ?? "N/A"}   
      

      {/* List of Contributors */}
      <Typography sx={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
        List of Contributors:
      </Typography>

      {displayIssues.map((lA) => (
        <div key={lA.login} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Badge badgeContent={lA.nbMessage} color="primary">
            <Avatar size="sm" variant="solid" src={lA.avatar} />
          </Badge>
          <Typography sx={{ fontSize: '16px', marginLeft: '8px' }}>
            {lA.login}
          </Typography>
          <Checkbox
          title= "Show User's Messages?"
          checked={lA.displayMessage}
          onChange={handleChangeChecked(lA.login)}
          />
        </div>
      ))}
    </Sheet>
  );
}
