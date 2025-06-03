import './IssueLocation.css'
import { Clipboard, useClipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, MapPin } from 'lucide-react'

interface IssueLocationProps {
    pointer : string;
}

function IssueLocation(props: IssueLocationProps) {
    const clipboard = useClipboard({ value: props.pointer })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInnerButtonClick = (event: any) => {
        event.stopPropagation();
    };

    return (
        <>
            <Clipboard.RootProvider value={clipboard} onClick={handleInnerButtonClick} >
                <Clipboard.Control>
                    <Clipboard.Trigger className='location-wrapper'>
                        <Clipboard.Indicator className='location' copied={<CheckIcon />}>
                            <MapPin />
                        </Clipboard.Indicator>
                    </Clipboard.Trigger>
                </Clipboard.Control>
            </Clipboard.RootProvider>
        </>
    );
}

export default IssueLocation;