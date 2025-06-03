import { useEffect, useRef, useState } from 'react';
import './Visualize.css'
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Eye, X } from 'lucide-react';

interface VisualizeProps {
    webpage_screenshot: string;
    issueX: number;
    issueY: number;
    issueWidth: number;
    issueHeight: number;
}

function Visualize(props: VisualizeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInnerButtonClick = (event: any) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
        setDimensions({
            width: img.width,
            height: img.height
        });
        setIsLoading(false);
        
        setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) 
                return;
            
            const ctx = canvas.getContext('2d');

            if (!ctx) 
                return;
            
            ctx.drawImage(img, 0, 0);
            
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(props.issueX, props.issueY, props.issueWidth, props.issueHeight);
        }, 0);
        };
        
        img.onerror = (err) => {
        console.error('Error loading image:', err);
        setIsLoading(false);
        };
        
        img.src = props.webpage_screenshot;
    }, [props.webpage_screenshot, props.issueX, props.issueY, props.issueWidth, props.issueHeight]);

    return (
        <>
            <button className='visualize-dialog-trigger' onClick={(event) => {
                setIsOpen(true);
                handleInnerButtonClick(event);
            }}>
                <Eye />
            </button>
            <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop className="visualize-dialog-backdrop" />
                    <Dialog.Positioner className="visualize-dialog-positioner">
                        <Dialog.Content className="visualize-dialog-content">
                            <div className='visualize-dialog-wrapper'>
                                <div className='visualize-dialog-header'>
                                    <Dialog.Title className='visualize-dialog-title'>Issue Visualization</Dialog.Title>
                                    <Dialog.CloseTrigger className="dialog-close-trigger"><X size={18} /></Dialog.CloseTrigger>
                                </div>
                                <div className='visualize-dialog-wrapper-2'>
                                    <div className='visualize-screenshot'>
                                        {isLoading && <div>Loading...</div>}
                                        <canvas
                                            ref={canvasRef}
                                            width={dimensions.width}
                                            height={dimensions.height}
                                            style={{ 
                                                maxWidth: '100%', 
                                                height: 'auto',
                                                display: isLoading ? 'none' : 'block' 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

export default Visualize;