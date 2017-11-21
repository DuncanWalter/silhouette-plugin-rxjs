import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// TODO schedule pushes for after reducer returns
import { symbols } from 'silhouette-core'
import { Container } from 'vitrarius'

const { members, get } = Container;

// non colliding instance props are important 
const __stream__ = Symbol('stream'); 



function Queue(){
    let next = { 
        value: undefined,
        next: undefined,
    };
    let last = next;
    return {
        enqueue(value){
            last.value = value;
            last.next = { 
                value: undefined,
                next: undefined,
            };
            last = last.next;
        },
        forEach(fun){
            while(next.next){
                fun(next.value);
                next = next.next;
            }
        },
    }
}

// middleware for plugging in rxjs- not too difficult, 
// even with lazy BehaviorSubjects for performance
export default function(settings){ 

    const queue = new Queue();

    return {
        prototype: {
            // State changes result in push calls which are designed to
            // be hijacked for reactive purposes.
            [symbols.__push__]: next => function({ value, done }){
                next.call(this, { value, done });
                if(this[__stream__] instanceof BehaviorSubject){
                    if(done){
                        queue.enqueue([this[__stream__], undefined, true]);
                    } else {
                        queue.enqueue([this[__stream__], value, false]);
                    }
                } else {
                    this[__stream__] = value;
                }

                // shuts down child nodes upon stream termination here
                if(done && this[symbols.__children__]){
                    members(this[symbols.__children__]).forEach(m => 
                        get(child, mem)[symbols.__push__]({ done: true })
                    );
                }

                if(this === this[symbols.__root__]){
                    queue.forEach(([ stream, value, done ]) => {
                        done ? stream.complete() : stream.next(value);
                    });
                }

            },
            // we need to add a method for accessing the streams as an outsider.
            // could also use defineProperty and get to make it fancy, but
            // I think that might cut against the grain of RXJS philosophy? Not sure.
            asObservable: next => function(){
                if(!(this[__stream__] instanceof BehaviorSubject)){
                    this[__stream__] = new BehaviorSubject(this[__stream__]);
                }
                let b = new BehaviorSubject(this[__stream__].value);
                this[__stream__].subscribe(v => b.next(v));
                return b;
            },
            get stream(){
                return this.asObservable();
            },
        }
    }
};