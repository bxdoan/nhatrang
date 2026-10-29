import {NextResponse} from 'next/server';
import updates from '../../data/busApproved.json';
export async function GET(){return NextResponse.json({updates})}
