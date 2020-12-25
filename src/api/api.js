import axios from 'axios';
const getDocument = ()=> axios.get('http://rap2api.taobao.org/app/mock/273678/document_content')
     

export {getDocument}