import { LoaderCircle } from 'lucide-react';
import './LoadingWheel.css'

interface LoadingWheelProps {
    isLoading?: boolean;
}

export default function LoadingWheel(props: LoadingWheelProps) {
    return (
        <>
            {props.isLoading && <LoaderCircle className="loading-spinner" />}
        </>
    );
}