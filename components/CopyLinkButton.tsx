import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

const CopyLinkButton = ({
  meetingLink,
  buttonText,
}: {
  meetingLink: string;
  buttonText: string;
}) => {
  const { toast } = useToast();

  return (
    <Button
      className="bg-dark-3"
      onClick={() => {
        navigator.clipboard.writeText(meetingLink);
        toast({
          title: "Link Copied",
        });
      }}
    >
      <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
      {buttonText}
    </Button>
  );
};

export default CopyLinkButton;
