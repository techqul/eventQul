import { Button } from "@/components/ui/button";
import { Download, Ticket, FileImage } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { downloadTicketAsPDF, downloadTicketAsImage } from "@/lib/utils/download";

interface ActionButtonsProps {
  orderId?: string;
}

export function ActionButtons({ orderId }: ActionButtonsProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    try {
      const fileName = `ticket-${orderId || 'confirmation'}.pdf`;
      await downloadTicketAsPDF('ticket-download-element', fileName);
      toast({
        title: "Download Started",
        description: "Your ticket PDF is being downloaded.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadImage = async () => {
    try {
      const fileName = `ticket-${orderId || 'confirmation'}.png`;
      await downloadTicketAsImage('ticket-download-element', fileName);
      toast({
        title: "Download Started",
        description: "Your ticket image is being downloaded.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <Button variant="outline" className="flex-1" onClick={handleDownloadPDF}>
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
      <Button variant="outline" className="flex-1" onClick={handleDownloadImage}>
        <FileImage className="w-4 h-4 mr-2" />
        Download Image
      </Button>
      <Button className="flex-1" onClick={() => router.push("/events")}>
        <Ticket className="w-4 h-4 mr-2" />
        Browse Events
      </Button>
    </div>
  );
}
