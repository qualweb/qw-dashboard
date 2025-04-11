import './IssueLocation.css'
import { Clipboard, useClipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, MapPin } from 'lucide-react'

interface IssueLocationProps {
    pointer : string;
}

function IssueLocation(props: IssueLocationProps) {
    const clipboard = useClipboard({ value: props.pointer })

    return (
        <>
            <Clipboard.RootProvider value={clipboard}>
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