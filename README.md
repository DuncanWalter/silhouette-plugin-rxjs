# **RXJS Plugin for Silhouette**

This plugin adds an `asObservable` function to all silhouettes which returns an rxjs observable representing the state behind the silhouette instance over time. The observables are created lazily for performance and originate from behavior subjects.

``` javascript
import { create } from 'silhouette-core'
import rxjsPlugin from 'silhouette-plugin-rxjs'

const sil = create(rxjsPlugin());

sil.asObservable().subscribe(slice => console.log(slice));
// > { }
```