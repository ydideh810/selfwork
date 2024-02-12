import LoadingSketchCanvas from "@/components/loading/LoadingSketchCanvas";
import LoadingSketchPage from "@/components/loading/LoadingSketchPage";
import SketchHeader from "@/components/sketch/SketchHeader";
import { useOneSketch } from "@/hooks/SketchHooks";
import { SketchCanvasState } from "@/types/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useState } from "react";

const SketchCanvas = dynamic(
  async () => (await import("@/components/sketch/SketchCanvas")).default,
  {
    ssr: false,
    loading: () => <LoadingSketchCanvas />,
  }
);

const SketchPage: NextPageWithLayout = () => {
  const { sketchId } = useRouter().query;
  const [isDeleting, setIsDeleting] = useState(false);
  const { sketch, status } = useOneSketch(sketchId as string, isDeleting);

  if (status === "loading") {
    return <LoadingSketchPage />;
  }

  if (status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="sketch-page">
      <SketchHeader
        name={sketch?.name!}
        projectId={sketch?.projectId!}
        setIsDeleting={setIsDeleting}
      />
      {/* <div className="black-background"></div> */}
      <SketchCanvas
        sketchId={sketchId as string}
        canvasState={sketch?.canvasState as SketchCanvasState}
      />
    </div>
  );
};

export default SketchPage;
