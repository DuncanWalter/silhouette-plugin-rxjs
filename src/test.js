import tap from 'tap'
import { create } from 'silhouette-core'
import rxjsPlugin from './index.js'
let sil = create( rxjsPlugin() );

tap.test('rxjsPlugin tests', t => {
    t.true(sil);// 1
    sil.define({ a: 3, b: { c: [], d: 4 }});
    t.true(sil.select('a')); // 2
    t.true(sil.select('b','c')); // 3
    
    let incra = 0;
    let incrb = 0;
    let a = 0;
    let b = undefined;

    sil.select('a').asObservable().subscribe(val => a = val);
    sil.select('b').asObservable().subscribe(val => b = val);
    sil.select('a').asObservable().subscribe(val => incra++);
    sil.select('b').asObservable().subscribe(val => incrb++);

    t.same(a, 3); // 4
    let aa = incra;
    let bb = incrb;

    sil.select('a').extend('incra', i => i + 1);
    sil.dispatch('incra', {});
    t.deepEqual(a, 4); // 5
    t.true(incra > aa); // 6
    aa = incra;
    t.true(incrb == bb); // 7

    sil.select('b').define([10, 20, 30], 'c');
    t.same(incra, aa);// 8
    t.true(incrb > bb);// 9
    
    t.deepEqual(b, {c: [10, 20, 30], d: 4}); //  10
    
    sil.select('b').extend('whatever', state => {
        return Object.assign({}, state, {c: [...state.c, 1]});
    });
    sil.select('b').dispatch('whatever', {});

    t.true(b.c[3]); // 11





    sil = create( rxjsPlugin() );
    sil.define({view: {}});

    sil.select('view').define({ a: [{v: 1}]});

    let c = 0;
    sil.select('view', 'a', 0, 'v').asObservable().subscribe(v => c = v);
    t.true(c === 1);
    sil.select('view', 'a', 0).asObservable().subscribe(v => c = v);
    t.true(c instanceof Object);
    sil.select('view', 'a').asObservable().subscribe(v => c = v);
    t.true(c instanceof Array);
    sil.select('view').asObservable().subscribe(v => c = v);
    t.true(c instanceof Object);
    sil.asObservable().subscribe(v => c = v);
    t.true(c instanceof Object);

    


    t.end();
    
});