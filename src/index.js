import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// TODO schedule pushes for after reducer returns

// non colliding instance props are important 
const __stream__ = Symbol('stream'); 

import { symbols } from 'silhouette-core'

// middleware for plugging in rxjs- not too difficult, 
// even with lazy BehaviorSubjects for performance
export default function(settings){ 
    return {
        prototype: {
            // State changes result in push calls which are designed to
            // be hijacked for reactive purposes.
            [symbols.__push__]: next => function({ value, done }){
                next.call(this, { value, done });
                if(this[__stream__] instanceof BehaviorSubject){
                    if(done){
                        this[__stream__].complete();
                    } else {
                        this[__stream__].next(value);
                    }
                } else {
                    this[__stream__] = value;
                }
                // shuts down child nodes upon stream termination here
                if(done){
                    Reflect.ownKeys(this).forEach(key => this[key][symbols.__push__]({ done }));
                }
            },
            // we need to add a method for accessing the streams as an outsider.
            // could also use defineProperty and get to make it fancy, but
            // I think that might cut against the grain of RXJS philosophy? Not sure.
            asObservable: next => function(){
                if( next ){ throw new Error('RXJS plugin cannot overwrite asObservable properties defined by other plugins')}
                if(!(this[__stream__] instanceof BehaviorSubject)){
                    this[__stream__] = new BehaviorSubject(this[__stream__]);
                }
                return this[__stream__].asObservable();
            },
        }
    }
};