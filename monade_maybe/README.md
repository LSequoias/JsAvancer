# JsAvancer
_Le pire ennemi que l'on peu trouver un javascript, c'est le type undefined. Pour pallier à ce soucie ont se voient souvent contraint d'appliquée le type null. La monade maybe peu pallier à ce genre de tracas, bien sûr ce n'est pas une solution friendly et comporte quelques defauts, sa principal qualité etant sa résillience si elle est réaliser correctement, avec ça difficile de se plantée._   

### monade Maybe 
La monade maybe permet de traitée les valeurs null ou non null avant leurs éxecutions.  

#### Déclaration d'un objet as traité.
```js
const person = {
    surname: "jeane",
    age: 34,
    coor: {
        codex: 95000,
        ville: "Paris"
    }
}
```

#### La monade Maybe
L'idée est de passer par un objet anonyme de sorte à pouvoir utilisée les mots clée habituellement réservé par javascript. Ainsi leurs portée n'est plus global.  

```js
const maybe = (valeur) => ({
    // instruction
})

// ou bien 

function maybe(valeur) {
    return {
        // instruction
    }
}

```

#### La méthode map
C'est la première méthode essentielle à la monade, elle prend comme paramètre un callback, une fonction de rappel. Ont teste ensuite la valeur
si elle existe ou non. Si elle existe alors ont retourne la fonction maybe qui elle même utilise le callback, une autre fonction avec comme argument la valeur que l'ont lui à définit.  
```js
    map: (callback) => {
        if(valeur) {
            return maybe(callback(valeur));
        } else {
            return maybe(null);
        }
    },

```  
Pour l'instant cela reste assez abstrait, c'est comme si je disait que : fn(n) => value ? fn(call(v)) : fn(null). C'est qu'après que cela aura son sens.  

#### La méthode flatMap
Méthode optionnelle mais vivement consseiller elle permet de détectée si une propriétée existe ou non dans l'objet.
```js
    flatMap: (callback) => {
        if(valeur) {
            return callback(valeur);
        } else {
            return maybe(null);
        }
    },

```
#### La méthode getOrElse
Méthode indispenssable à la monade maybe, elle permet ici de gérée les erreurs si les valeurs sont indéfinit, nous permettant d'attribuée même une valeur par defaut. Si toutefois aucune erreur n'est trouvée alors seul valeur seras retournée, d'où le coupe circuit.  
```js
    getOrElse: (arg) => {
        // coupe circuit
        return valeur || arg;
    }
```

#### Premier teste:  
```js
const checkName = maybe(person)
    .flatMap(f => maybe(f.surname))
    .getOrElse("surnom introuvable")
;

console.log(checkName);
```  
checkName à comme valeur la fonction maybe qui à comme argument l'objet person décrit plus haut.  
La méthode flatMap à comme argument f (ou functor) qui retourne la valeur extraite selon la méthode flatmap(). Conssidérée f comme une boite avec une valeur (soit null, soit une propriétée de l'objet trouvée). Ici maybe(f.surname) existe, objet person possède bien une propriétée surname. 

#### Second teste:
```js
const checkVille = maybe(person)
    .flatMap(f => maybe(f.coor))
    .flatMap(f => maybe(f.ville))
    .getOrElse("ville inconnue")
;
console.log(checkVille);

```  
Ici j'ai besoin d'accédée à la ville, problème si je fait :

```js
const checkVille = maybe(person)
    .flatMap(f => maybe(f.ville))
    .getOrElse("ville inconnue")
;
console.log(checkVille);

```
Pourquoi ? Parce que le functor obtient une valeur null, null car il ne trouve pas la propriétée ville. En effet ville se trouve dans coor.  
Pour illustrée la problématique et sa résolution voici un autre exemple:  

```js
const exemple = {
    aaa: {
        bbb: {
            ccc: "trouvée"
        }
    }
}

```

Pour accédée à cette propriétée, il faudrais donc alors..  
```js  
const ooo = maybe(exemple)
    .flatMap(f => maybe(f.aaa))
    .flatMap(f => maybe(f.bbb))
    .flatMap(f => maybe(f.ccc))
    .getOrElse("valeur non trouvée")
;

console.log(ooo);
```
