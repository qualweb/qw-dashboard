import { Dialog } from '@ark-ui/react/dialog';
import './AddWebpages.css'
import { Portal } from '@ark-ui/react/portal';
import { Field } from '@ark-ui/react/field';
import { X } from 'lucide-react';
import { addWebpages } from '../../services/EvaluationService';

interface AddWebpagesProps {
    monitoring_id: string;
}

function AddWebpages(props: AddWebpagesProps) {
    let webpages = '';

    const handleAddWebpages = (webpages: string) => {
        const webpagesArray = webpages.split(',').map((webpage) => webpage.trim());
        
        const postWebpages = async (webpages: string[]) => {
            await addWebpages(props.monitoring_id, webpages);
        };
        
        if (webpagesArray.length > 0) {
            postWebpages(webpagesArray);
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger className='add-webpages-button'>+ Add Webpages</Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop className='add-webpages-backdrop' />
                <Dialog.Positioner className='add-webpages-dialog-positioner'>
                    <Dialog.Content className='add-webpages-dialog-content'>
                        <div className='add-webpages-dialog-content-wrapper'>
                            <div className='add-webpages-dialog-header'>
                                <Dialog.Title className='add-webpages-dialog-title'>Add Webpages</Dialog.Title>
                                <Dialog.CloseTrigger className='add-webpages-dialog-close'><X /></Dialog.CloseTrigger>
                            </div>
                            <Field.Root className='add-webpages-dialog-field'>
                                <Field.Label className='add-webpages-dialog-label'>Insert the webpages separated by commas</Field.Label>
                                <Field.Input className='add-webpages-dialog-input' onChange={(e) => webpages = e.target.value} />
                                <Field.ErrorText>Error Info</Field.ErrorText>
                            </Field.Root>
                            <button className='add-webpages-dialog-add-button' onClick={() => {
                                handleAddWebpages(webpages);
                            }}>Add Webpages</button>
                        </div>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default AddWebpages;