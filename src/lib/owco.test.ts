import { describe, expect, it } from 'vitest';
import { access, agvTotal, canAccess, entryTypes, reservedTpt, initialActive, inputDate } from './owco';
describe('OWCO mock rules',()=>{
 it('gives admin exactly the seven requested screens',()=>expect(access.admin).toEqual(['dashboard','shipments','master','ledger','meeting','users','settings']));
 it('gives user exactly dashboard, shipments, CHA User and meeting',()=>expect(access.user).toEqual(['dashboard','shipments','cha','meeting']));
 it('keeps the ledger out of user preview navigation',()=>expect(canAccess('user','ledger')).toBe(false));
 it('composes AGV from quantity and per-unit cost',()=>expect(agvTotal([{id:'1',product:'Apples',unit:'Cartons',quantity:'10',cost:'25'},{id:'2',product:'Pears',unit:'Cartons',quantity:'4',cost:'12.5'}])).toBe(300));
 it('reserves the full TPT amount in full mode',()=>expect(reservedTpt(14082.8,'full',500)).toBe(14082.8));
 it('reserves the entered partial TPT amount',()=>expect(reservedTpt(14082.8,'partial',500)).toBe(500));
 it('does not reserve more than available TPT',()=>expect(reservedTpt(100,'partial',200)).toBe(100));
 it('allows only TPT transfers for new Rob ledger entries',()=>expect(entryTypes).toEqual(['TPT (Transfer)']));
 it('restores the EGSU5029071 clearance and financial data from the screenshot',()=>{const s=initialActive.find(s=>s.vase==='EGSU5029071');expect(s).toMatchObject({chaDescription:'Apple',cha:'InterlinkShipping',netWeight:'20556',liner:'Evergreen',be:'9466053',beDate:'2026-05-24',eta:'2026-06-10',agv:'99990',gsm:'11011.4',bull:'11511.41'});});
 it('converts prototype dates into editable date values',()=>expect(inputDate('31/Oct/25')).toBe('2025-10-31'));
});
