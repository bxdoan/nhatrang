import type { Metadata } from 'next';
import Collector from './Collector';
export const metadata: Metadata = {title:'Khảo sát trạm xe buýt',robots:{index:false,follow:false}};
export default function Page(){return <Collector/>}
