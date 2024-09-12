import Sheet from "@mui/joy/Sheet";

type Issue = {
  id: number;
  created_at: string;
  number: number;
  title: string;
  state: string;
  body: string;
  comments_url: string;
};

type SidebarProps = {
  issue: Issue | null; // Sidebar receives the issue object
};



export default function Sidebar({ issue }: SidebarProps) {
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
       <div>
         you are watching issue number : {issue && issue.number !== null && issue.number}
      </div>
       <div>
        Issue status is: {issue && issue.state !== null && issue.state}
      </div>
    </Sheet>
  );
}
