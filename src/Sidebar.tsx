import Sheet from "@mui/joy/Sheet";

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
};



export default function Sidebar({ issue, comments }: SidebarProps) {
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
 <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
  You are watching issue number: {issue && issue.number !== null ? issue.number : "N/A"}
</div>

<div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
  Issue status is: {issue && issue.state !== null ? issue.state : "N/A"}
</div>

<div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
  Initiator:
</div>

<div style={{ marginBottom: '16px', fontSize: '16px' }}>
  {issue && issue.user.login !== null ? issue.user.login : "N/A"}
</div>

<div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
  List of Contributors:
</div>

{comments.map((comment) => (
  <div key={comment.id} style={{ marginBottom: '8px', fontSize: '14px' }}>
    {comment.user.login}
  </div>
))}
    </Sheet>
  );
}
