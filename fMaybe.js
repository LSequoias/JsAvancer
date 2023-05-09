
const person = {
    surname: "jeane",
    age: 34,
    coor: {
        codex: 95000,
        ville: "Paris"
    }
}


const maybe = (valeur) => ({
    
    map: (callback) => {
        if(valeur) {
            return maybe(callback(valeur));
        } else {
            return maybe(null);
        }
    },

    // ou chain
    flatMap: (callback) => {
        if(valeur) {
            return callback(valeur);
        } else {
            return maybe(null);
        }
    },

    getOrElse: (arg) => {
        // coupe circuit
        return valeur || arg;
    }
});


const checkName = maybe(person)
    .flatMap(f => maybe(f.surname))
    .getOrElse("surnom introuvable")
;

const checkVille = maybe(person)
    .flatMap(f => maybe(f.coor))
    .flatMap(f => maybe(f.ville))
    .getOrElse("ville inconnue")
;

console.log(`nom => ${checkName} \nville => ${checkVille}`);