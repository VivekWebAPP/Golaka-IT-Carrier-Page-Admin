import { combineReducers } from 'redux';
import loginAndSigin from './loginAndSiginReducer';
import resumeDownload from './downloadResumeReducer';


const CombinedReducer = combineReducers({
    authonication:loginAndSigin,
    userResumeDownload:resumeDownload,
});

export default CombinedReducer;