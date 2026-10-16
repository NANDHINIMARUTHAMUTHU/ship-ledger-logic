import { describe,it,expect } from 'vitest';
import { availableTpt,paymentTotals,reservationAmount,transferTotal,type LedgerEntry } from './owco-finance';
import { initialMaster,initialActive } from './owco';
describe('Connected ledger payments',()=>{
it('preserves the first screenshot shipment values',()=>expect(initialActive.find(s=>s.vase==='HLBU9787118')).toMatchObject({shp:'TFC',rcv:'GMF',chaDescription:'XF',liner:'OOCL',agv:'25401.6',netWeight:'21168',dos:'62470',be:'9466051'}));
const entries:LedgerEntry[]=[{id:'test',date:'2026-10-16',description:'Transfer',reference:'TPT-1',type:'TPT (Transfer)',debit:0,credit:1000}];
it('makes an added ledger transfer available for payments',()=>expect(transferTotal(entries)).toBe(1000));
it('uses the full available TPT amount',()=>expect(reservationAmount(1000,'full',200)).toBe(1000));
it('uses only the entered partial TPT amount',()=>expect(reservationAmount(1000,'partial',200)).toBe(200));
it('includes saved TPT in Total and Remaining',()=>expect(paymentTotals(25401.6,11318.8,1000)).toEqual({paid:11318.8,reserved:1000,total:12318.8,remaining:13082.8}));
it('does not use a transfer twice across shipments',()=>{const shipment=initialMaster[0];if(!shipment)throw new Error('Missing sample shipment');expect(availableTpt(entries,[{...shipment,vase:'other',tptReserved:'200'}],'current')).toBe(800)});
});
