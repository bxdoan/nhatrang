import type {Metadata} from 'next';
import Review from './Review';
export const metadata:Metadata={title:'Duyệt khảo sát trạm',robots:{index:false,follow:false}};
export default function Page(){return <Review/>}
