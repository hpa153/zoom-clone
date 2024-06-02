import { PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";

export type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const CallLayout = ({ layout }: { layout: CallLayoutType }) => {
  switch (layout) {
    case "grid":
      return <PaginatedGridLayout />;
    case "speaker-right":
      return <SpeakerLayout participantsBarPosition="left" />;
    default:
      return <SpeakerLayout participantsBarPosition="right" />;
  }
};

export default CallLayout;
