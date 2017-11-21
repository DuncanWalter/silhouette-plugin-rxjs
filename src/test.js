import tap from 'tap'
import { create } from 'silhouette-core'
import rxjsPlugin from './index.js'
let sil = create( rxjsPlugin() );

tap.test('rxjsPlugin tests', t => {
    t.true(sil);// 1
    sil.bind('', __ => ({ a: 3, b: { c: [], d: 4 }}));
    t.true(sil.a); // 2
    t.true(sil.b.c); // 3
    
    let incra = 0;
    let incrb = 0;
    let a = 0;
    let b = undefined;

    sil.a.stream.subscribe(val => a = val);
    sil.b.stream.subscribe(val => b = val);
    sil.a.stream.subscribe(val => incra++);
    sil.b.stream.subscribe(val => incrb++);

    t.same(a, 3); // 4
    let aa = incra;
    let bb = incrb;

    sil.a.extend('incra', i => i + 1);
    sil.dispatch('incra', {});
    t.deepEqual(a, 4); // 5
    t.true(incra > aa); // 6
    aa = incra;
    t.true(incrb == bb); // 7

    sil.b.c.bind('', __ => [10, 20, 30]);
    t.same(incra, aa);// 8
    t.true(incrb > bb);// 9
    
    t.deepEqual(b, {c: [10, 20, 30], d: 4}); //  10
    
    sil.b.extend('whatever', state => {
        return Object.assign({}, state, {c: [...state.c, 1]});
    });
    sil.b.dispatch('whatever', {});

    t.true(b.c[3]); // 11





    sil = create( rxjsPlugin() );
    sil.bind('', __ => ({view: {}}));

    sil.view.bind('', __ => ({ a: [{v: 1}]}));

    let c = 0;
    sil.view.a[0].v.stream.subscribe(v => c = v);
    t.true(c === 1);
    sil.view.a[0].stream.subscribe(v => c = v);
    t.true(c instanceof Object);
    sil.view.a.stream.subscribe(v => c = v);
    t.true(c instanceof Array);
    sil.view.stream.subscribe(v => c = v);
    t.true(c instanceof Object);
    t.true(sil.stream.value instanceof Object);

    


    t.end();
    
});