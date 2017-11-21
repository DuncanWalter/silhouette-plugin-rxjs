# **RXJS Plugin for Silhouette**

This plugin adds an `asObservable` function to all silhouettes which returns an RXJS `BehaviorSubject` representing the state slice within the silhouette instance over time. The observables are created lazily, automatically end subscriptions, and can also be acquired using using a `stream` getter property.

``` javascript
import { create } from 'silhouette-core'
import rxjsPlugin from 'silhouette-plugin-rxjs'

const sil = create( rxjsPlugin() );

sil.stream.subscribe(v => console.log(v)); // > {}
console.log(sil.stream.value); // > {}
```