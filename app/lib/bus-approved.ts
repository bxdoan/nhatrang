export type ApprovedStop={id:string;directionId:string;stopId:string;name:string;lat:number;lng:number;sequence:number;approvedAt:string;sourceId:string};
export function applyApproved<T extends {directions:{id:string;stops:{id:string;name:string}[]}[]}>(base:T[],updates:ApprovedStop[]):T[]{
 return base.map(route=>({...route,directions:route.directions.map(direction=>{let stops=direction.stops.map(s=>({...s}));for(const u of updates.filter(x=>x.directionId===direction.id).sort((a,b)=>a.sequence-b.sequence)){const index=stops.findIndex(s=>s.id===u.stopId);const stop={id:u.stopId,name:u.name,lat:u.lat,lng:u.lng};if(index>=0)stops[index]=stop;else stops.splice(Math.min(u.sequence-1,stops.length),0,stop)}return {...direction,stops}})}));
}
