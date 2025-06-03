import { Dialog } from '@ark-ui/react/dialog';
import './AddWebpages.css'
import { Portal } from '@ark-ui/react/portal';
import { Field } from '@ark-ui/react/field';
import { X } from 'lucide-react';
import { addWebpages } from '../../services/EvaluationService';
import { useState } from 'react';

interface AddWebpagesProps {
    monitoring_id: string;
}

function AddWebpages(props: AddWebpagesProps) {
    const [webpages, setWebpages] = useState('');
    const [webpages_authentication, setWebpagesAuthentication] = useState('');

    const [usersame_field, setUsersameField] = useState('');
    const [password_field, setPasswordField] = useState('');
    const [login_button, setLoginButton] = useState('');

    const handleAddWebpages = (webpages: string, webpages_authentication: string) => {
        const webpagesArray = webpages.split(',').map((webpage) => webpage.trim());
        const webpagesAuthenticationArray = webpages_authentication.split(',').map((webpage) => webpage.trim());

        console.log('Webpages to add:', webpagesArray);
        console.log('Webpages requiring authentication:', webpagesAuthenticationArray);
        
        const postWebpages = async (
            webpages: string[], 
            webpagesAuthentication: string[], 
            usernameField: string,
            passwordField: string,
            loginButton: string
        ) => {
            console.log('hello')

            console.log('Webpages to add:', webpages);
            console.log('Webpages requiring authentication:', webpagesAuthentication);

            if (webpages[0] !== "") {
                await addWebpages(props.monitoring_id, webpages);
            }

            if (webpagesAuthentication[0] !== "") {
                console.log('hello')
                await addWebpages(
                    props.monitoring_id, 
                    webpagesAuthentication, 
                    true,
                    usernameField,
                    passwordField,
                    loginButton
                );
            }
        };
        
        postWebpages(webpagesArray, webpagesAuthenticationArray, usersame_field, password_field, login_button);
        setWebpages('');
        setWebpagesAuthentication('');
        setUsersameField('');
        setPasswordField('');
        setLoginButton('');
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
                                <Field.Input className='add-webpages-dialog-input' value={webpages} onChange={(e) => setWebpages(e.target.value)} />
                                <Field.ErrorText>Error Info</Field.ErrorText>
                            </Field.Root>

                            <div className="add-webpages-require-authentication">
                                <h3>Webpages requiring authentication</h3>
                                <div className="add-webpages-require-authentication-fields">
                                    <Field.Root className='add-webpages-dialog-field'>
                                        <Field.Label className='add-webpages-dialog-label'>Insert authentication required webpages separated by commas</Field.Label>
                                        <Field.Input className='add-webpages-dialog-input' value={webpages_authentication} onChange={(e) => setWebpagesAuthentication(e.target.value)} />
                                        <Field.ErrorText>Error Info</Field.ErrorText>
                                    </Field.Root>
                                    <Field.Root className='add-webpages-dialog-field'>
                                        <Field.Label className='add-webpages-dialog-label'>Insert a selector for the usersame field</Field.Label>
                                        <Field.Input className='add-webpages-dialog-input' value={usersame_field} onChange={(e) => setUsersameField(e.target.value)} />
                                        <Field.ErrorText>Error Info</Field.ErrorText>
                                    </Field.Root>
                                    <Field.Root className='add-webpages-dialog-field'>
                                        <Field.Label className='add-webpages-dialog-label'>Insert a selector for the password field</Field.Label>
                                        <Field.Input className='add-webpages-dialog-input' value={password_field} onChange={(e) => setPasswordField(e.target.value)} />
                                        <Field.ErrorText>Error Info</Field.ErrorText>
                                    </Field.Root>
                                    <Field.Root className='add-webpages-dialog-field'>
                                        <Field.Label className='add-webpages-dialog-label'>Insert a selector for the login button</Field.Label>
                                        <Field.Input className='add-webpages-dialog-input' value={login_button} onChange={(e) => setLoginButton(e.target.value)} />
                                        <Field.ErrorText>Error Info</Field.ErrorText>
                                    </Field.Root>
                                </div>
                            </div>
                            <button className='add-webpages-dialog-add-button' onClick={() => {
                                handleAddWebpages(webpages, webpages_authentication);
                            }}>Add Webpages</button>
                        </div>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default AddWebpages;