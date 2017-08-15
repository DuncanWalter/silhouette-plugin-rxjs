import { BehaviorSubject } from 'rxjs/BehaviorSubject'

// non colliding instance props are important 
const __stream__ = Symbol('stream'); 

// middleware for plugging in rxjs- not too difficult, 
// even with lazy BehaviorSubjects for performance
export default settings => { return {
    Silhouette(next, namespace){

        let symbols = namespace.symbols;
        let proto = next.prototype;
        
        // State changes result in push calls which are designed to
        // be hijacked for reactive purposes.
        let push = proto[symbols.__push__];
        proto[symbols.__push__] = function({ value, done }){
            push({ value, done });
            if(this[__stream__] instanceof BehaviorSubject){
                if(done){
                    this[__stream__].complete();
                } else {
                    this[__stream__].next(value);
                }
            } else {
                this[__stream__] = value;
            }
            if(done){
                Object.keys(this).forEach(key => this[key][symbols.__push__]({ done }));
            }
        }

        // we need to add a method for accessing the streams as an outsider.
        // could also use defineProperty and get to make it fancy, but
        // I think that might cut against the grain of RXJS philosophy? Not sure.
        proto.asObservable = function(){
            if(!(this[__stream__] instanceof BehaviorSubject)){
                this[__stream__] = new BehaviorSubject(this[__stream__]);
            }
            return this[__stream__].asObservable();
        }

        return next;
    }
}};