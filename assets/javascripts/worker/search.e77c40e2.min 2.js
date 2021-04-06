!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t,r){"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */var n=/["'&<>]/;e.exports=function(e){var t,r=""+e,i=n.exec(r);if(!i)return r;var s="",o=0,a=0;for(o=i.index;o<r.length;o++){switch(r.charCodeAt(o)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}a!==o&&(s+=r.substring(a,o)),a=o+1,s+=t}return a!==o?s+r.substring(a,o):s}},function(e,t,r){var n=r(2),i=r(3);void 0===i.lunr&&(i.lunr=n),e.exports=n},function(e,t,r){var n,i;
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */!function(){var s,o,a,u,l,c,h,d,f,p,y,m,g,x,v,w,Q,b,S,k,E,L,P,T,O,R,I=function(e){var t=new I.Builder;return t.pipeline.add(I.trimmer,I.stopWordFilter,I.stemmer),t.searchPipeline.add(I.stemmer),e.call(t,t),t.build()};I.version="2.3.9"
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */,I.utils={},I.utils.warn=(s=this,function(e){s.console&&console.warn&&console.warn(e)}),I.utils.asString=function(e){return null==e?"":e.toString()},I.utils.clone=function(e){if(null==e)return e;for(var t=Object.create(null),r=Object.keys(e),n=0;n<r.length;n++){var i=r[n],s=e[i];if(Array.isArray(s))t[i]=s.slice();else{if("string"!=typeof s&&"number"!=typeof s&&"boolean"!=typeof s)throw new TypeError("clone is not deep and does not support nested objects");t[i]=s}}return t},I.FieldRef=function(e,t,r){this.docRef=e,this.fieldName=t,this._stringValue=r},I.FieldRef.joiner="/",I.FieldRef.fromString=function(e){var t=e.indexOf(I.FieldRef.joiner);if(-1===t)throw"malformed field ref string";var r=e.slice(0,t),n=e.slice(t+1);return new I.FieldRef(n,r,e)},I.FieldRef.prototype.toString=function(){return null==this._stringValue&&(this._stringValue=this.fieldName+I.FieldRef.joiner+this.docRef),this._stringValue}
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */,I.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var t=0;t<this.length;t++)this.elements[e[t]]=!0}else this.length=0},I.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},I.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},I.Set.prototype.contains=function(e){return!!this.elements[e]},I.Set.prototype.intersect=function(e){var t,r,n,i=[];if(e===I.Set.complete)return this;if(e===I.Set.empty)return e;this.length<e.length?(t=this,r=e):(t=e,r=this),n=Object.keys(t.elements);for(var s=0;s<n.length;s++){var o=n[s];o in r.elements&&i.push(o)}return new I.Set(i)},I.Set.prototype.union=function(e){return e===I.Set.complete?I.Set.complete:e===I.Set.empty?this:new I.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},I.idf=function(e,t){var r=0;for(var n in e)"_index"!=n&&(r+=Object.keys(e[n]).length);var i=(t-r+.5)/(r+.5);return Math.log(1+Math.abs(i))},I.Token=function(e,t){this.str=e||"",this.metadata=t||{}},I.Token.prototype.toString=function(){return this.str},I.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},I.Token.prototype.clone=function(e){return e=e||function(e){return e},new I.Token(e(this.str,this.metadata),this.metadata)}
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */,I.tokenizer=function(e,t){if(null==e||null==e)return[];if(Array.isArray(e))return e.map((function(e){return new I.Token(I.utils.asString(e).toLowerCase(),I.utils.clone(t))}));for(var r=e.toString().toLowerCase(),n=r.length,i=[],s=0,o=0;s<=n;s++){var a=s-o;if(r.charAt(s).match(I.tokenizer.separator)||s==n){if(a>0){var u=I.utils.clone(t)||{};u.position=[o,a],u.index=i.length,i.push(new I.Token(r.slice(o,s),u))}o=s+1}}return i},I.tokenizer.separator=/[\s\-]+/
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */,I.Pipeline=function(){this._stack=[]},I.Pipeline.registeredFunctions=Object.create(null),I.Pipeline.registerFunction=function(e,t){t in this.registeredFunctions&&I.utils.warn("Overwriting existing registered function: "+t),e.label=t,I.Pipeline.registeredFunctions[e.label]=e},I.Pipeline.warnIfFunctionNotRegistered=function(e){e.label&&e.label in this.registeredFunctions||I.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},I.Pipeline.load=function(e){var t=new I.Pipeline;return e.forEach((function(e){var r=I.Pipeline.registeredFunctions[e];if(!r)throw new Error("Cannot load unregistered function: "+e);t.add(r)})),t},I.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach((function(e){I.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)}),this)},I.Pipeline.prototype.after=function(e,t){I.Pipeline.warnIfFunctionNotRegistered(t);var r=this._stack.indexOf(e);if(-1==r)throw new Error("Cannot find existingFn");r+=1,this._stack.splice(r,0,t)},I.Pipeline.prototype.before=function(e,t){I.Pipeline.warnIfFunctionNotRegistered(t);var r=this._stack.indexOf(e);if(-1==r)throw new Error("Cannot find existingFn");this._stack.splice(r,0,t)},I.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e);-1!=t&&this._stack.splice(t,1)},I.Pipeline.prototype.run=function(e){for(var t=this._stack.length,r=0;r<t;r++){for(var n=this._stack[r],i=[],s=0;s<e.length;s++){var o=n(e[s],s,e);if(null!=o&&""!==o)if(Array.isArray(o))for(var a=0;a<o.length;a++)i.push(o[a]);else i.push(o)}e=i}return e},I.Pipeline.prototype.runString=function(e,t){var r=new I.Token(e,t);return this.run([r]).map((function(e){return e.toString()}))},I.Pipeline.prototype.reset=function(){this._stack=[]},I.Pipeline.prototype.toJSON=function(){return this._stack.map((function(e){return I.Pipeline.warnIfFunctionNotRegistered(e),e.label}))}
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */,I.Vector=function(e){this._magnitude=0,this.elements=e||[]},I.Vector.prototype.positionForIndex=function(e){if(0==this.elements.length)return 0;for(var t=0,r=this.elements.length/2,n=r-t,i=Math.floor(n/2),s=this.elements[2*i];n>1&&(s<e&&(t=i),s>e&&(r=i),s!=e);)n=r-t,i=t+Math.floor(n/2),s=this.elements[2*i];return s==e||s>e?2*i:s<e?2*(i+1):void 0},I.Vector.prototype.insert=function(e,t){this.upsert(e,t,(function(){throw"duplicate index"}))},I.Vector.prototype.upsert=function(e,t,r){this._magnitude=0;var n=this.positionForIndex(e);this.elements[n]==e?this.elements[n+1]=r(this.elements[n+1],t):this.elements.splice(n,0,e,t)},I.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,t=this.elements.length,r=1;r<t;r+=2){var n=this.elements[r];e+=n*n}return this._magnitude=Math.sqrt(e)},I.Vector.prototype.dot=function(e){for(var t=0,r=this.elements,n=e.elements,i=r.length,s=n.length,o=0,a=0,u=0,l=0;u<i&&l<s;)(o=r[u])<(a=n[l])?u+=2:o>a?l+=2:o==a&&(t+=r[u+1]*n[l+1],u+=2,l+=2);return t},I.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},I.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),t=1,r=0;t<this.elements.length;t+=2,r++)e[r]=this.elements[t];return e},I.Vector.prototype.toJSON=function(){return this.elements}
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */,I.stemmer=(o={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},a={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},u="[aeiouy]",l="[^aeiou][^aeiouy]*",c=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),h=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*"),d=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),f=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]"),p=/^(.+?)(ss|i)es$/,y=/^(.+?)([^s])s$/,m=/^(.+?)eed$/,g=/^(.+?)(ed|ing)$/,x=/.$/,v=/(at|bl|iz)$/,w=new RegExp("([^aeiouylsz])\\1$"),Q=new RegExp("^"+l+u+"[^aeiouwxy]$"),b=/^(.+?[^aeiou])y$/,S=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,k=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,E=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,L=/^(.+?)(s|t)(ion)$/,P=/^(.+?)e$/,T=/ll$/,O=new RegExp("^"+l+u+"[^aeiouwxy]$"),R=function(e){var t,r,n,i,s,u,l;if(e.length<3)return e;if("y"==(n=e.substr(0,1))&&(e=n.toUpperCase()+e.substr(1)),s=y,(i=p).test(e)?e=e.replace(i,"$1$2"):s.test(e)&&(e=e.replace(s,"$1$2")),s=g,(i=m).test(e)){var R=i.exec(e);(i=c).test(R[1])&&(i=x,e=e.replace(i,""))}else s.test(e)&&(t=(R=s.exec(e))[1],(s=f).test(t)&&(u=w,l=Q,(s=v).test(e=t)?e+="e":u.test(e)?(i=x,e=e.replace(i,"")):l.test(e)&&(e+="e")));return(i=b).test(e)&&(e=(t=(R=i.exec(e))[1])+"i"),(i=S).test(e)&&(t=(R=i.exec(e))[1],r=R[2],(i=c).test(t)&&(e=t+o[r])),(i=k).test(e)&&(t=(R=i.exec(e))[1],r=R[2],(i=c).test(t)&&(e=t+a[r])),s=L,(i=E).test(e)?(t=(R=i.exec(e))[1],(i=h).test(t)&&(e=t)):s.test(e)&&(t=(R=s.exec(e))[1]+R[2],(s=h).test(t)&&(e=t)),(i=P).test(e)&&(t=(R=i.exec(e))[1],s=d,u=O,((i=h).test(t)||s.test(t)&&!u.test(t))&&(e=t)),s=h,(i=T).test(e)&&s.test(e)&&(i=x,e=e.replace(i,"")),"y"==n&&(e=n.toLowerCase()+e.substr(1)),e},function(e){return e.update(R)}),I.Pipeline.registerFunction(I.stemmer,"stemmer")
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */,I.generateStopWordFilter=function(e){var t=e.reduce((function(e,t){return e[t]=t,e}),{});return function(e){if(e&&t[e.toString()]!==e.toString())return e}},I.stopWordFilter=I.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),I.Pipeline.registerFunction(I.stopWordFilter,"stopWordFilter")
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */,I.trimmer=function(e){return e.update((function(e){return e.replace(/^\W+/,"").replace(/\W+$/,"")}))},I.Pipeline.registerFunction(I.trimmer,"trimmer")
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */,I.TokenSet=function(){this.final=!1,this.edges={},this.id=I.TokenSet._nextId,I.TokenSet._nextId+=1},I.TokenSet._nextId=1,I.TokenSet.fromArray=function(e){for(var t=new I.TokenSet.Builder,r=0,n=e.length;r<n;r++)t.insert(e[r]);return t.finish(),t.root},I.TokenSet.fromClause=function(e){return"editDistance"in e?I.TokenSet.fromFuzzyString(e.term,e.editDistance):I.TokenSet.fromString(e.term)},I.TokenSet.fromFuzzyString=function(e,t){for(var r=new I.TokenSet,n=[{node:r,editsRemaining:t,str:e}];n.length;){var i=n.pop();if(i.str.length>0){var s,o=i.str.charAt(0);o in i.node.edges?s=i.node.edges[o]:(s=new I.TokenSet,i.node.edges[o]=s),1==i.str.length&&(s.final=!0),n.push({node:s,editsRemaining:i.editsRemaining,str:i.str.slice(1)})}if(0!=i.editsRemaining){if("*"in i.node.edges)var a=i.node.edges["*"];else{a=new I.TokenSet;i.node.edges["*"]=a}if(0==i.str.length&&(a.final=!0),n.push({node:a,editsRemaining:i.editsRemaining-1,str:i.str}),i.str.length>1&&n.push({node:i.node,editsRemaining:i.editsRemaining-1,str:i.str.slice(1)}),1==i.str.length&&(i.node.final=!0),i.str.length>=1){if("*"in i.node.edges)var u=i.node.edges["*"];else{u=new I.TokenSet;i.node.edges["*"]=u}1==i.str.length&&(u.final=!0),n.push({node:u,editsRemaining:i.editsRemaining-1,str:i.str.slice(1)})}if(i.str.length>1){var l,c=i.str.charAt(0),h=i.str.charAt(1);h in i.node.edges?l=i.node.edges[h]:(l=new I.TokenSet,i.node.edges[h]=l),1==i.str.length&&(l.final=!0),n.push({node:l,editsRemaining:i.editsRemaining-1,str:c+i.str.slice(2)})}}}return r},I.TokenSet.fromString=function(e){for(var t=new I.TokenSet,r=t,n=0,i=e.length;n<i;n++){var s=e[n],o=n==i-1;if("*"==s)t.edges[s]=t,t.final=o;else{var a=new I.TokenSet;a.final=o,t.edges[s]=a,t=a}}return r},I.TokenSet.prototype.toArray=function(){for(var e=[],t=[{prefix:"",node:this}];t.length;){var r=t.pop(),n=Object.keys(r.node.edges),i=n.length;r.node.final&&(r.prefix.charAt(0),e.push(r.prefix));for(var s=0;s<i;s++){var o=n[s];t.push({prefix:r.prefix.concat(o),node:r.node.edges[o]})}}return e},I.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",t=Object.keys(this.edges).sort(),r=t.length,n=0;n<r;n++){var i=t[n];e=e+i+this.edges[i].id}return e},I.TokenSet.prototype.intersect=function(e){for(var t=new I.TokenSet,r=void 0,n=[{qNode:e,output:t,node:this}];n.length;){r=n.pop();for(var i=Object.keys(r.qNode.edges),s=i.length,o=Object.keys(r.node.edges),a=o.length,u=0;u<s;u++)for(var l=i[u],c=0;c<a;c++){var h=o[c];if(h==l||"*"==l){var d=r.node.edges[h],f=r.qNode.edges[l],p=d.final&&f.final,y=void 0;h in r.output.edges?(y=r.output.edges[h]).final=y.final||p:((y=new I.TokenSet).final=p,r.output.edges[h]=y),n.push({qNode:f,output:y,node:d})}}}return t},I.TokenSet.Builder=function(){this.previousWord="",this.root=new I.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},I.TokenSet.Builder.prototype.insert=function(e){var t,r=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var n=0;n<e.length&&n<this.previousWord.length&&e[n]==this.previousWord[n];n++)r++;this.minimize(r),t=0==this.uncheckedNodes.length?this.root:this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(n=r;n<e.length;n++){var i=new I.TokenSet,s=e[n];t.edges[s]=i,this.uncheckedNodes.push({parent:t,char:s,child:i}),t=i}t.final=!0,this.previousWord=e},I.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},I.TokenSet.Builder.prototype.minimize=function(e){for(var t=this.uncheckedNodes.length-1;t>=e;t--){var r=this.uncheckedNodes[t],n=r.child.toString();n in this.minimizedNodes?r.parent.edges[r.char]=this.minimizedNodes[n]:(r.child._str=n,this.minimizedNodes[n]=r.child),this.uncheckedNodes.pop()}}
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */,I.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},I.Index.prototype.search=function(e){return this.query((function(t){new I.QueryParser(e,t).parse()}))},I.Index.prototype.query=function(e){for(var t=new I.Query(this.fields),r=Object.create(null),n=Object.create(null),i=Object.create(null),s=Object.create(null),o=Object.create(null),a=0;a<this.fields.length;a++)n[this.fields[a]]=new I.Vector;e.call(t,t);for(a=0;a<t.clauses.length;a++){var u=t.clauses[a],l=null,c=I.Set.empty;l=u.usePipeline?this.pipeline.runString(u.term,{fields:u.fields}):[u.term];for(var h=0;h<l.length;h++){var d=l[h];u.term=d;var f=I.TokenSet.fromClause(u),p=this.tokenSet.intersect(f).toArray();if(0===p.length&&u.presence===I.Query.presence.REQUIRED){for(var y=0;y<u.fields.length;y++){s[j=u.fields[y]]=I.Set.empty}break}for(var m=0;m<p.length;m++){var g=p[m],x=this.invertedIndex[g],v=x._index;for(y=0;y<u.fields.length;y++){var w=x[j=u.fields[y]],Q=Object.keys(w),b=g+"/"+j,S=new I.Set(Q);if(u.presence==I.Query.presence.REQUIRED&&(c=c.union(S),void 0===s[j]&&(s[j]=I.Set.complete)),u.presence!=I.Query.presence.PROHIBITED){if(n[j].upsert(v,u.boost,(function(e,t){return e+t})),!i[b]){for(var k=0;k<Q.length;k++){var E,L=Q[k],P=new I.FieldRef(L,j),T=w[L];void 0===(E=r[P])?r[P]=new I.MatchData(g,j,T):E.add(g,j,T)}i[b]=!0}}else void 0===o[j]&&(o[j]=I.Set.empty),o[j]=o[j].union(S)}}}if(u.presence===I.Query.presence.REQUIRED)for(y=0;y<u.fields.length;y++){s[j=u.fields[y]]=s[j].intersect(c)}}var O=I.Set.complete,R=I.Set.empty;for(a=0;a<this.fields.length;a++){var j;s[j=this.fields[a]]&&(O=O.intersect(s[j])),o[j]&&(R=R.union(o[j]))}var F=Object.keys(r),C=[],_=Object.create(null);if(t.isNegated()){F=Object.keys(this.fieldVectors);for(a=0;a<F.length;a++){P=F[a];var N=I.FieldRef.fromString(P);r[P]=new I.MatchData}}for(a=0;a<F.length;a++){var D=(N=I.FieldRef.fromString(F[a])).docRef;if(O.contains(D)&&!R.contains(D)){var A,B=this.fieldVectors[N],$=n[N.fieldName].similarity(B);if(void 0!==(A=_[D]))A.score+=$,A.matchData.combine(r[N]);else{var z={ref:D,score:$,matchData:r[N]};_[D]=z,C.push(z)}}}return C.sort((function(e,t){return t.score-e.score}))},I.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map((function(e){return[e,this.invertedIndex[e]]}),this),t=Object.keys(this.fieldVectors).map((function(e){return[e,this.fieldVectors[e].toJSON()]}),this);return{version:I.version,fields:this.fields,fieldVectors:t,invertedIndex:e,pipeline:this.pipeline.toJSON()}},I.Index.load=function(e){var t={},r={},n=e.fieldVectors,i=Object.create(null),s=e.invertedIndex,o=new I.TokenSet.Builder,a=I.Pipeline.load(e.pipeline);e.version!=I.version&&I.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+I.version+"' does not match serialized index '"+e.version+"'");for(var u=0;u<n.length;u++){var l=(h=n[u])[0],c=h[1];r[l]=new I.Vector(c)}for(u=0;u<s.length;u++){var h,d=(h=s[u])[0],f=h[1];o.insert(d),i[d]=f}return o.finish(),t.fields=e.fields,t.fieldVectors=r,t.invertedIndex=i,t.tokenSet=o.root,t.pipeline=a,new I.Index(t)}
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */,I.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=I.tokenizer,this.pipeline=new I.Pipeline,this.searchPipeline=new I.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},I.Builder.prototype.ref=function(e){this._ref=e},I.Builder.prototype.field=function(e,t){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=t||{}},I.Builder.prototype.b=function(e){this._b=e<0?0:e>1?1:e},I.Builder.prototype.k1=function(e){this._k1=e},I.Builder.prototype.add=function(e,t){var r=e[this._ref],n=Object.keys(this._fields);this._documents[r]=t||{},this.documentCount+=1;for(var i=0;i<n.length;i++){var s=n[i],o=this._fields[s].extractor,a=o?o(e):e[s],u=this.tokenizer(a,{fields:[s]}),l=this.pipeline.run(u),c=new I.FieldRef(r,s),h=Object.create(null);this.fieldTermFrequencies[c]=h,this.fieldLengths[c]=0,this.fieldLengths[c]+=l.length;for(var d=0;d<l.length;d++){var f=l[d];if(null==h[f]&&(h[f]=0),h[f]+=1,null==this.invertedIndex[f]){var p=Object.create(null);p._index=this.termIndex,this.termIndex+=1;for(var y=0;y<n.length;y++)p[n[y]]=Object.create(null);this.invertedIndex[f]=p}null==this.invertedIndex[f][s][r]&&(this.invertedIndex[f][s][r]=Object.create(null));for(var m=0;m<this.metadataWhitelist.length;m++){var g=this.metadataWhitelist[m],x=f.metadata[g];null==this.invertedIndex[f][s][r][g]&&(this.invertedIndex[f][s][r][g]=[]),this.invertedIndex[f][s][r][g].push(x)}}}},I.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),t=e.length,r={},n={},i=0;i<t;i++){var s=I.FieldRef.fromString(e[i]),o=s.fieldName;n[o]||(n[o]=0),n[o]+=1,r[o]||(r[o]=0),r[o]+=this.fieldLengths[s]}var a=Object.keys(this._fields);for(i=0;i<a.length;i++){var u=a[i];r[u]=r[u]/n[u]}this.averageFieldLength=r},I.Builder.prototype.createFieldVectors=function(){for(var e={},t=Object.keys(this.fieldTermFrequencies),r=t.length,n=Object.create(null),i=0;i<r;i++){for(var s=I.FieldRef.fromString(t[i]),o=s.fieldName,a=this.fieldLengths[s],u=new I.Vector,l=this.fieldTermFrequencies[s],c=Object.keys(l),h=c.length,d=this._fields[o].boost||1,f=this._documents[s.docRef].boost||1,p=0;p<h;p++){var y,m,g,x=c[p],v=l[x],w=this.invertedIndex[x]._index;void 0===n[x]?(y=I.idf(this.invertedIndex[x],this.documentCount),n[x]=y):y=n[x],m=y*((this._k1+1)*v)/(this._k1*(1-this._b+this._b*(a/this.averageFieldLength[o]))+v),m*=d,m*=f,g=Math.round(1e3*m)/1e3,u.insert(w,g)}e[s]=u}this.fieldVectors=e},I.Builder.prototype.createTokenSet=function(){this.tokenSet=I.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},I.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new I.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},I.Builder.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1);t.unshift(this),e.apply(this,t)},I.MatchData=function(e,t,r){for(var n=Object.create(null),i=Object.keys(r||{}),s=0;s<i.length;s++){var o=i[s];n[o]=r[o].slice()}this.metadata=Object.create(null),void 0!==e&&(this.metadata[e]=Object.create(null),this.metadata[e][t]=n)},I.MatchData.prototype.combine=function(e){for(var t=Object.keys(e.metadata),r=0;r<t.length;r++){var n=t[r],i=Object.keys(e.metadata[n]);null==this.metadata[n]&&(this.metadata[n]=Object.create(null));for(var s=0;s<i.length;s++){var o=i[s],a=Object.keys(e.metadata[n][o]);null==this.metadata[n][o]&&(this.metadata[n][o]=Object.create(null));for(var u=0;u<a.length;u++){var l=a[u];null==this.metadata[n][o][l]?this.metadata[n][o][l]=e.metadata[n][o][l]:this.metadata[n][o][l]=this.metadata[n][o][l].concat(e.metadata[n][o][l])}}}},I.MatchData.prototype.add=function(e,t,r){if(!(e in this.metadata))return this.metadata[e]=Object.create(null),void(this.metadata[e][t]=r);if(t in this.metadata[e])for(var n=Object.keys(r),i=0;i<n.length;i++){var s=n[i];s in this.metadata[e][t]?this.metadata[e][t][s]=this.metadata[e][t][s].concat(r[s]):this.metadata[e][t][s]=r[s]}else this.metadata[e][t]=r},I.Query=function(e){this.clauses=[],this.allFields=e},I.Query.wildcard=new String("*"),I.Query.wildcard.NONE=0,I.Query.wildcard.LEADING=1,I.Query.wildcard.TRAILING=2,I.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},I.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=I.Query.wildcard.NONE),e.wildcard&I.Query.wildcard.LEADING&&e.term.charAt(0)!=I.Query.wildcard&&(e.term="*"+e.term),e.wildcard&I.Query.wildcard.TRAILING&&e.term.slice(-1)!=I.Query.wildcard&&(e.term=e.term+"*"),"presence"in e||(e.presence=I.Query.presence.OPTIONAL),this.clauses.push(e),this},I.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=I.Query.presence.PROHIBITED)return!1;return!0},I.Query.prototype.term=function(e,t){if(Array.isArray(e))return e.forEach((function(e){this.term(e,I.utils.clone(t))}),this),this;var r=t||{};return r.term=e.toString(),this.clause(r),this},I.QueryParseError=function(e,t,r){this.name="QueryParseError",this.message=e,this.start=t,this.end=r},I.QueryParseError.prototype=new Error,I.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},I.QueryLexer.prototype.run=function(){for(var e=I.QueryLexer.lexText;e;)e=e(this)},I.QueryLexer.prototype.sliceString=function(){for(var e=[],t=this.start,r=this.pos,n=0;n<this.escapeCharPositions.length;n++)r=this.escapeCharPositions[n],e.push(this.str.slice(t,r)),t=r+1;return e.push(this.str.slice(t,this.pos)),this.escapeCharPositions.length=0,e.join("")},I.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},I.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},I.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return I.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},I.QueryLexer.prototype.width=function(){return this.pos-this.start},I.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},I.QueryLexer.prototype.backup=function(){this.pos-=1},I.QueryLexer.prototype.acceptDigitRun=function(){var e,t;do{t=(e=this.next()).charCodeAt(0)}while(t>47&&t<58);e!=I.QueryLexer.EOS&&this.backup()},I.QueryLexer.prototype.more=function(){return this.pos<this.length},I.QueryLexer.EOS="EOS",I.QueryLexer.FIELD="FIELD",I.QueryLexer.TERM="TERM",I.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",I.QueryLexer.BOOST="BOOST",I.QueryLexer.PRESENCE="PRESENCE",I.QueryLexer.lexField=function(e){return e.backup(),e.emit(I.QueryLexer.FIELD),e.ignore(),I.QueryLexer.lexText},I.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(I.QueryLexer.TERM)),e.ignore(),e.more())return I.QueryLexer.lexText},I.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(I.QueryLexer.EDIT_DISTANCE),I.QueryLexer.lexText},I.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(I.QueryLexer.BOOST),I.QueryLexer.lexText},I.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(I.QueryLexer.TERM)},I.QueryLexer.termSeparator=I.tokenizer.separator,I.QueryLexer.lexText=function(e){for(;;){var t=e.next();if(t==I.QueryLexer.EOS)return I.QueryLexer.lexEOS;if(92!=t.charCodeAt(0)){if(":"==t)return I.QueryLexer.lexField;if("~"==t)return e.backup(),e.width()>0&&e.emit(I.QueryLexer.TERM),I.QueryLexer.lexEditDistance;if("^"==t)return e.backup(),e.width()>0&&e.emit(I.QueryLexer.TERM),I.QueryLexer.lexBoost;if("+"==t&&1===e.width())return e.emit(I.QueryLexer.PRESENCE),I.QueryLexer.lexText;if("-"==t&&1===e.width())return e.emit(I.QueryLexer.PRESENCE),I.QueryLexer.lexText;if(t.match(I.QueryLexer.termSeparator))return I.QueryLexer.lexTerm}else e.escapeCharacter()}},I.QueryParser=function(e,t){this.lexer=new I.QueryLexer(e),this.query=t,this.currentClause={},this.lexemeIdx=0},I.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=I.QueryParser.parseClause;e;)e=e(this);return this.query},I.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},I.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},I.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},I.QueryParser.parseClause=function(e){var t=e.peekLexeme();if(null!=t)switch(t.type){case I.QueryLexer.PRESENCE:return I.QueryParser.parsePresence;case I.QueryLexer.FIELD:return I.QueryParser.parseField;case I.QueryLexer.TERM:return I.QueryParser.parseTerm;default:var r="expected either a field or a term, found "+t.type;throw t.str.length>=1&&(r+=" with value '"+t.str+"'"),new I.QueryParseError(r,t.start,t.end)}},I.QueryParser.parsePresence=function(e){var t=e.consumeLexeme();if(null!=t){switch(t.str){case"-":e.currentClause.presence=I.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=I.Query.presence.REQUIRED;break;default:var r="unrecognised presence operator'"+t.str+"'";throw new I.QueryParseError(r,t.start,t.end)}var n=e.peekLexeme();if(null==n){r="expecting term or field, found nothing";throw new I.QueryParseError(r,t.start,t.end)}switch(n.type){case I.QueryLexer.FIELD:return I.QueryParser.parseField;case I.QueryLexer.TERM:return I.QueryParser.parseTerm;default:r="expecting term or field, found '"+n.type+"'";throw new I.QueryParseError(r,n.start,n.end)}}},I.QueryParser.parseField=function(e){var t=e.consumeLexeme();if(null!=t){if(-1==e.query.allFields.indexOf(t.str)){var r=e.query.allFields.map((function(e){return"'"+e+"'"})).join(", "),n="unrecognised field '"+t.str+"', possible fields: "+r;throw new I.QueryParseError(n,t.start,t.end)}e.currentClause.fields=[t.str];var i=e.peekLexeme();if(null==i){n="expecting term, found nothing";throw new I.QueryParseError(n,t.start,t.end)}switch(i.type){case I.QueryLexer.TERM:return I.QueryParser.parseTerm;default:n="expecting term, found '"+i.type+"'";throw new I.QueryParseError(n,i.start,i.end)}}},I.QueryParser.parseTerm=function(e){var t=e.consumeLexeme();if(null!=t){e.currentClause.term=t.str.toLowerCase(),-1!=t.str.indexOf("*")&&(e.currentClause.usePipeline=!1);var r=e.peekLexeme();if(null!=r)switch(r.type){case I.QueryLexer.TERM:return e.nextClause(),I.QueryParser.parseTerm;case I.QueryLexer.FIELD:return e.nextClause(),I.QueryParser.parseField;case I.QueryLexer.EDIT_DISTANCE:return I.QueryParser.parseEditDistance;case I.QueryLexer.BOOST:return I.QueryParser.parseBoost;case I.QueryLexer.PRESENCE:return e.nextClause(),I.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+r.type+"'";throw new I.QueryParseError(n,r.start,r.end)}else e.nextClause()}},I.QueryParser.parseEditDistance=function(e){var t=e.consumeLexeme();if(null!=t){var r=parseInt(t.str,10);if(isNaN(r)){var n="edit distance must be numeric";throw new I.QueryParseError(n,t.start,t.end)}e.currentClause.editDistance=r;var i=e.peekLexeme();if(null!=i)switch(i.type){case I.QueryLexer.TERM:return e.nextClause(),I.QueryParser.parseTerm;case I.QueryLexer.FIELD:return e.nextClause(),I.QueryParser.parseField;case I.QueryLexer.EDIT_DISTANCE:return I.QueryParser.parseEditDistance;case I.QueryLexer.BOOST:return I.QueryParser.parseBoost;case I.QueryLexer.PRESENCE:return e.nextClause(),I.QueryParser.parsePresence;default:n="Unexpected lexeme type '"+i.type+"'";throw new I.QueryParseError(n,i.start,i.end)}else e.nextClause()}},I.QueryParser.parseBoost=function(e){var t=e.consumeLexeme();if(null!=t){var r=parseInt(t.str,10);if(isNaN(r)){var n="boost must be numeric";throw new I.QueryParseError(n,t.start,t.end)}e.currentClause.boost=r;var i=e.peekLexeme();if(null!=i)switch(i.type){case I.QueryLexer.TERM:return e.nextClause(),I.QueryParser.parseTerm;case I.QueryLexer.FIELD:return e.nextClause(),I.QueryParser.parseField;case I.QueryLexer.EDIT_DISTANCE:return I.QueryParser.parseEditDistance;case I.QueryLexer.BOOST:return I.QueryParser.parseBoost;case I.QueryLexer.PRESENCE:return e.nextClause(),I.QueryParser.parsePresence;default:n="Unexpected lexeme type '"+i.type+"'";throw new I.QueryParseError(n,i.start,i.end)}else e.nextClause()}},void 0===(i="function"==typeof(n=function(){return I})?n.call(t,r,t,e):n)||(e.exports=i)}()},function(e,t,r){"use strict";(function(t){e.exports=function(){if("object"==typeof globalThis)return globalThis;var e;try{e=this||new Function("return this")()}catch(e){if("object"==typeof window)return window;if("object"==typeof self)return self;if(void 0!==t)return t}return e}()}).call(this,r(4))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";r.r(t),r.d(t,"handler",(function(){return u}));function n(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}u((n=n.apply(e,t||[])).next())}))}Object.create;Object.create;r(1);var i,s=r(0);class o{constructor({config:e,docs:t,index:r,options:n}){this.options=n,this.documents=function(e){const t=new Map,r=new Set;for(const n of e){const[e,i]=n.location.split("#"),o=n.location,a=n.title,u=s(n.text).replace(/\s+(?=[,.:;!?])/g,"").replace(/\s+/g," ");if(i){const i=t.get(e);r.has(i)?t.set(o,{location:o,title:a,text:u,parent:i}):(i.title=n.title,i.text=u,r.add(i))}else t.set(o,{location:o,title:a,text:u})}return t}(t),this.highlight=function(e){const t=new RegExp(e.separator,"img"),r=(e,t,r)=>`${t}<mark data-md-highlight>${r}</mark>`;return n=>{n=n.replace(/[\s*+\-:~^]+/g," ").trim();const i=new RegExp(`(^|${e.separator})(${n.replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&").replace(t,"|")})`,"img");return e=>e.replace(i,r).replace(/<\/mark>(\s+)<mark[^>]*>/gim,"$1")}}(e),lunr.tokenizer.separator=new RegExp(e.separator),this.index=void 0===r?lunr((function(){1===e.lang.length&&"en"!==e.lang[0]?this.use(lunr[e.lang[0]]):e.lang.length>1&&this.use(lunr.multiLanguage(...e.lang));const r=function(e,t){const[r,n]=[new Set(e),new Set(t)];return[...new Set([...r].filter(e=>!n.has(e)))]}(["trimmer","stopWordFilter","stemmer"],n.pipeline);for(const t of e.lang.map(e=>"en"===e?lunr:lunr[e]))for(const e of r)this.pipeline.remove(t[e]),this.searchPipeline.remove(t[e]);this.field("title",{boost:1e3}),this.field("text"),this.ref("location");for(const e of t)this.add(e)})):lunr.Index.load(r)}search(e){if(e)try{const t=this.highlight(e),r=function(e){const t=new lunr.Query(["title","text"]);return new lunr.QueryParser(e,t).parse(),t.clauses}(e).filter(e=>e.presence!==lunr.Query.presence.PROHIBITED),n=this.index.search(e+"*").reduce((e,{ref:n,score:i,matchData:s})=>{const o=this.documents.get(n);if(void 0!==o){const{location:n,title:a,text:u,parent:l}=o,c=function(e,t){const r=new Set(e),n={};for(let e=0;e<t.length;e++)for(const i of r)t[e].startsWith(i.term)&&(n[i.term]=!0,r.delete(i));for(const e of r)n[e.term]=!1;return n}(r,Object.keys(s.metadata)),h=+!l+ +Object.values(c).every(e=>e);e.push({location:n,title:t(a),text:t(u),score:i*(1+h),terms:c})}return e},[]).sort((e,t)=>t.score-e.score).reduce((e,t)=>{const r=this.documents.get(t.location);if(void 0!==r){const n="parent"in r?r.parent.location:r.location;e.set(n,[...e.get(n)||[],t])}return e},new Map);let i;if(this.options.suggestions){const e=this.index.query(e=>{for(const t of r)e.term(t.term,{fields:["title"],presence:lunr.Query.presence.REQUIRED,wildcard:lunr.Query.wildcard.TRAILING})});i=e.length?Object.keys(e[0].matchData.metadata):[]}return Object.assign({items:[...n.values()]},void 0!==i&&{suggestions:i})}catch(t){console.warn(`Invalid query: ${e} – see https://bit.ly/2s3ChXG`)}return{items:[]}}}let a;function u(e){return n(this,void 0,void 0,(function*(){switch(e.type){case i.SETUP:return yield function(e){return n(this,void 0,void 0,(function*(){let t="../lunr";if("undefined"!=typeof parent&&"IFrameWorker"in parent){const e=document.querySelector("script[src]"),[r]=e.src.split("/worker");t=t.replace("..",r)}const r=[];for(const n of e.lang)"ja"===n&&r.push(t+"/tinyseg.min.js"),"en"!==n&&r.push(`${t}/min/lunr.${n}.min.js`);e.lang.length>1&&r.push(t+"/min/lunr.multi.min.js"),r.length&&(yield importScripts(t+"/min/lunr.stemmer.support.min.js",...r))}))}(e.data.config),a=new o(e.data),{type:i.READY};case i.QUERY:return{type:i.RESULT,data:a?a.search(e.data):{items:[]}};default:throw new TypeError("Invalid message type")}}))}!function(e){e[e.SETUP=0]="SETUP",e[e.READY=1]="READY",e[e.QUERY=2]="QUERY",e[e.RESULT=3]="RESULT"}(i||(i={})),addEventListener("message",e=>n(void 0,void 0,void 0,(function*(){postMessage(yield u(e.data))})))}]);