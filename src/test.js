import tap from 'tap'
import { create } from 'silhouette-core'
import rxjsPlugin from './index.js'
const sil = create( rxjsPlugin() );

tap.test('rxjsPlugin tests', t => {
    t.true(sil);
    sil.define({ a: 3, b: { c: 1, d: 4 }});
    t.true(sil.a);
    t.true(sil.b.c);
    
    let incra = 0;
    let incrb = 0;
    let a = 0;
    let b = undefined;

    sil.a.asObservable().subscribe(val => a = val);
    sil.b.asObservable().subscribe(val => b = val);
    sil.a.asObservable().subscribe(val => incra++);
    sil.b.asObservable().subscribe(val => incrb++);

    t.same(a, 3);
    let aa = incra;
    let bb = incrb;

    sil.a.define({e:4});
    t.deepEqual(a, {e:4});
    t.true(incra > aa);
    aa = incra;
    t.true(incrb == bb);

    sil.b.define([10, 20, 30], 'c');
    t.same(incra, aa);
    t.true(incrb > bb);
    t.deepEqual(b, {c: [10, 20, 30], d: 4});

    sil.b.extend('whatever', state => {
        state.c.push(1);
        return state;
    });
    sil.b.dispatch('whatever', {});

    t.true(b.c[3]);

    t.end();
    
});