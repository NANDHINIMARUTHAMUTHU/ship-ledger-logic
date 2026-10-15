import records from '@/assets/shipments.json';
export type Role = 'admin' | 'user';
export const screens = ['dashboard','shipments','master','ledger','meeting','users','settings','cha'] as const;
export type Screen = typeof screens[number];
export const titles: Record<Screen,string> = {dashboard:'Dashboard',shipments:'Active Shipments',master:'Master Records',ledger:'Ledger',meeting:'Meeting',users:'User Management',settings:'Settings',cha:'CHA User'};
export const access: Record<Role,Screen[]> = {admin:['dashboard','shipments','master','ledger','meeting','users','settings'],user:['dashboard','shipments','cha','meeting']};
export const canAccess = (role:Role,screen:Screen) => access[role].includes(screen);
export type Shipment = typeof records.active[number] & {cha?:string;agency?:string;enhancement?:string;netWeight?:string;liner?:string;be?:string;beDate?:string;beType?:string;note?:string;breakdown?:CostLine[]};
export type CostLine = {id:string;product:string;unit:string;quantity:string;cost:string};
export const agvTotal = (lines:CostLine[]) => lines.reduce((sum,line)=>sum+(Number(line.quantity)||0)*(Number(line.cost)||0),0);
export const reservedTpt = (total:number,mode:'full'|'partial',partial:number) => mode==='full'?total:Math.min(total,Math.max(0,partial));
export const entryTypes = ['TPT (Transfer)'] as const;
export const money = (n:number|string|undefined) => Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
export const statuses = ['Shipment Created','Awaiting Review','Awaiting Documents','Received Documents','Clearance Assigned','Filed','Awaiting Telex','Ready for Delivery','Delivered'];
export const initialActive:Shipment[] = records.active;
export const initialMaster:Shipment[] = records.master;
export function downloadCsv(name:string,headers:string[],rows:(string|number)[][]){const quote=(v:string|number)=>`"${String(v).replaceAll('"','""')}"`;const blob=new Blob([[headers,...rows].map(row=>row.map(quote).join(',')).join('\n')],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
