import { describe,it,expect } from 'vitest';
import { availableTpt,paymentTotals,reservationAmount,transferTotal,type LedgerEntry } from './owco-finance';
import { initialMaster } from './owco';
describe('Connected ledger payments',()=>{
const entries:LedgerEntry[]=[{id:'test',date:'2026-10-16',description:'Transfer',reference:'TPT-1',type:'TPT (Transfer)',debit:0,credit:1000}];
it('makes an added ledger transfer available for payments',()=>expect(transferTotal(entries)).toBe(1000));
it('uses the full available TPT amount',()=>expect(reservationAmount(1000,'full',200)).toBe(1000));
it('uses only the entered partial TPT amount',()=>expect(reservationAmount(1000,'partial',200)).toBe(200));
it('includes saved TPT in Total and Remaining',()=>expect(paymentTotals(25401.6,11318.8,1000)).toEqual({paid:11318.8,reserved:1000,total:12318.8,remaining:13082.8}));
it('does not use a transfer twice across shipments',()=>expect(availableTpt(entries,[{...initialMaster[0],vase:'other',tptReserved:'200'}],'current')).toBe(800));
});
