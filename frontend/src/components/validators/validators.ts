export function validateUrl(value : string) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s]+$/i.test(value)) {
        error = 'Invalid url';
    }
    return error;
}