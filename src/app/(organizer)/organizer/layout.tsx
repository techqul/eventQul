import { Sidebar } from "@/components/layout/Sidebar";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar type="organizer" />
      <main className="flex-1 md:ml-64 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
