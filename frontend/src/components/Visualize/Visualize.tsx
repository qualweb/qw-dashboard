import { useEffect, useState } from 'react';
import './Visualize.css'
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Eye } from 'lucide-react';
import { getWebpageScreenshot } from '../../services/EvaluationService';

interface VisualizeProps {
    evaluation_id: string;
}

function Visualize(props: VisualizeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [webpageScreehshot, setWebpageScreehshot] = useState(null);

    useEffect(() => {
        const fetchWebpageScreenshot = async () => {
            const data = await getWebpageScreenshot(props.evaluation_id);
            setWebpageScreehshot(data);
        }
        fetchWebpageScreenshot();
    }, [props.evaluation_id]);

    return (
        <>
            <button className='visualize' onClick={() => setIsOpen(true)}>
                <Eye />
            </button>
            <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop className="dialog-backdrop" />
                    <Dialog.Positioner className="dialog-positioner">
                        <Dialog.Content className="dialog-content">
                            <Dialog.Title>Element Visualization</Dialog.Title>
                            
                            <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

export default Visualize;