"use client";
import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import Alert from "./Alert";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetup,
}: {
  setIsSetup: (value: boolean) => void;
}) => {
  const [isCamToggled, setIsCamToggled] = useState(false);
  const [isMicToggled, setIsMicToggled] = useState(false);
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  useEffect(() => {
    if (!isCamToggled) {
      call.camera.disable();
    } else {
      call.camera.enable();
    }

    if (!isMicToggled) {
      call.microphone.disable();
    } else {
      call.microphone.enable();
    }
  }, [isCamToggled, isMicToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Meeting Setup</h1>
      <VideoPreview className="lg:max-w-2xl" />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicToggled}
            onChange={(e) => setIsMicToggled(e.target.checked)}
          />
          Audio
        </label>
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isCamToggled}
            onChange={(e) => setIsCamToggled(e.target.checked)}
          />
          Video
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetup(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
