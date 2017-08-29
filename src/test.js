import tap from 'tap'
import { create } from 'silhouette-core'
import rxjsPlugin from './index.js'
let sil = create( rxjsPlugin() );

tap.test('rxjsPlugin tests', t => {
    t.true(sil);// 1
    sil.define({ a: 3, b: { c: 1, d: 4 }});
    t.true(sil.a); // 2
    t.true(sil.b.c); // 3
    
    let incra = 0;
    let incrb = 0;
    let a = 0;
    let b = undefined;

    sil.a.asObservable().subscribe(val => a = val);
    sil.b.asObservable().subscribe(val => b = val);
    sil.a.asObservable().subscribe(val => incra++);
    sil.b.asObservable().subscribe(val => incrb++);

    t.same(a, 3); // 4
    let aa = incra;
    let bb = incrb;

    sil.a.extend('incra', i => i + 1);
    sil.dispatch('incra', {});
    t.deepEqual(a, 4); // 5
    t.true(incra > aa); // 6
    aa = incra;
    t.true(incrb == bb); // 7

    sil.b.define([10, 20, 30], 'c');
    t.same(incra, aa);// 8
    t.true(incrb > bb);// 9
    t.deepEqual(b, {c: [10, 20, 30], d: 4}); //  10
    
    sil.b.extend('whatever', state => {
        return Object.assign({}, state, {c: [...state.c, 1]});
    });
    sil.b.dispatch('whatever', {});

    t.true(b.c[3]); // 11




    sil = create( rxjsPlugin() );
    sil.define({view: {}});

    sil.view.define({ a: [{v: 1}]});

    let c = 0;
    sil.view.a[0].v.asObservable().subscribe(v => c = v);
    t.true(c === 1);
    sil.view.a[0].asObservable().subscribe(v => c = v);
    t.true(c instanceof Object);
    sil.view.a.asObservable().subscribe(v => c = v);
    t.true(c instanceof Array);
    sil.view.asObservable().subscribe(v => c = v);
    t.true(c instanceof Object);
    sil.asObservable().subscribe(v => c = v);
    t.true(c instanceof Object);

    


    t.end();
    
});