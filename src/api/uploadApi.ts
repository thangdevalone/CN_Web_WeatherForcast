import { IMGBB_HOST, IMGBB_KEY } from '@/constants';
import axios from 'axios';

const uploadApi = {
    postImg(form: File) {
        const formData = new FormData();
        console.log(form)
        formData.append('image', form);

        return axios.post(`${IMGBB_HOST}?key=${IMGBB_KEY}`, formData);
    },
};
export default uploadApi;
