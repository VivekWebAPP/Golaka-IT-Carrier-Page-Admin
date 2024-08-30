const resumeDownload = (state = '', action) => {
    switch (action.type) {
        case 'Fetch_Successfull':
            return action.payload;
        case 'Fetch_Unsuccessfull':
            return '';
        case 'Download_Successfull':
            return action.payload;
        case 'Download_Unsuccessfull':
            return '';
        default:
            return state;
    }
}

export default resumeDownload;