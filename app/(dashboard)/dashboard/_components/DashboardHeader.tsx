"use client";

import { Button } from "@/app/_components/ui/button";
import SectionHeading from "../../_components/SectionHeading";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import EditCreatePostDialog from "./EditCreatePostDialog";

function DashboardHeader() {
  return (
    <section className="flex lg:flex-row flex-col lg:items-center items-start justify-between gap-5">
      <SectionHeading
        description="Welcome back, here's what's happening with your accounts today."
        heading="Dashboard"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Post</Button>
        </DialogTrigger>
        <EditCreatePostDialog title="Create Post" />
      </Dialog>
    </section>
  );
}

export default DashboardHeader;
