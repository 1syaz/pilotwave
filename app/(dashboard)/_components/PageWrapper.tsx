interface IDashboardWrapperProps {
  children: React.ReactNode;
}

function PageWrapper({ children }: IDashboardWrapperProps) {
  return (
    <div
      className="mt-15 p-5  min-h-[calc(100vh-60px)] flex flex-col gap-10 bg-background-secondary
     overflow-auto"
    >
      {children}
    </div>
  );
}

export default PageWrapper;
