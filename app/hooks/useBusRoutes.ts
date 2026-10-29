'use client';
import base from '../data/busResearch.json';
import approved from '../data/busApproved.json';
import {applyApproved, ApprovedStop} from '../lib/bus-approved';
const routes=applyApproved(base,approved as ApprovedStop[]);
export default function useBusRoutes(){return routes}
