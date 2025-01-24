import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast"

export const useCustomToast = () => {
    const { toast } = useToast();

    const showToast = (title, desc) => {
        toast({
            variant: "destructive",
            title: title,
            description: desc,
            action: <ToastAction altText="Try again">Try again</ToastAction>
        });
    };

    return { showToast };
};