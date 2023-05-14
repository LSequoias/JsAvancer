import './App.css';
import React, { useMemo, useState } from "react";

const data = [
  {
      title : " ",
      url : "/media/images/abstract.jpeg",
      hoverText : "cliquez sur moi",
      textAlter : "image abstraite violette",
      description : [
          {
              subtitle: "une image pour définir l'abstrait.",
              paragraph: ""
          }
      ],
      tags : "Abstrait"
  },
  {
      title : "",
      url : "/media/images/abstract2.jpg",
      hoverText : "Cliquez sur image",
      textAlter : "image abstraite multicolore",
      description : [
          {
              subtitle: "vide lumineux",
              paragraph: "image montrant.."
          }
      ],
      tags : "Abstrait"
  },
  {
      title : "chat gris",
      url : "/media/images/catGray.jpg",
      hoverText : "",
      textAlter : "chat gris",
      description : [
          {
              subtitle: "chat gris",
              paragraph: "voici un chat gris"
          }
      ],
      tags : "Chat"
  },
  {
      title : "chat gris expressif",
      url : "/media/images/catGray2.jpg",
      hoverText : "Cliquez sur image",
      textAlter : "chat gris expressif",
      description : [
          {
              subtitle: "chat gris expressif",
              paragraph: "blablabla chat gris.."
          }
      ],
      tags : "Chat"
  }
];

const Badge = ({params}) => {
  return (
    <>
      {
        params.map((element, k) => (
          <React.Fragment key={k}>
            <button className='button' title="Ce n'est pas un vrais bouton..">{element}</button>
          </React.Fragment>
        ))  
      }
    </>
  )
}


const App = () => {

  const [title, setTitle] = useState(null);
  const [paragraph, setParagraph] = useState(null);

  const maybe = value => ({
    map: callback => {
      if(value) {
        return maybe(callback(value));
      } else {
        return maybe(null);
      }
    },
    chain: callback => {
      if(value) {
        return callback(value)
      } else {
        return maybe(null)
      }
    },
    getOrElse: option => {
      return value || option;
    }
  });

  
  useMemo(() => {

    const checkedTitle  = [];
    const checkedParagraph = [];

    for (let k = 0; k < data.length; k++) {
      
      const checkTitle = maybe(data)
        .chain((a) => maybe(a[k]))
        .chain(f => maybe(f.title))
        .map(f => f.trim())
        .getOrElse("titre manquant");


      const checkParagraph = maybe(data)
        .chain((a) => maybe(a[k]))
        .chain((f) => maybe(f.description))
        .chain((f)=> maybe(f[0]))
        .chain((f) => maybe(f.paragraph))
        .map((f) => f.trim())
        .getOrElse("paragraphe manquant");

      checkedTitle.push(checkTitle);
      checkedParagraph.push(checkParagraph);
    }
    
    setTitle(checkedTitle);
    setParagraph(checkedParagraph);
  
  }, [data]);

  
  return (
    <section>
      <h1 className='title'>Implémentation d'une monade avec React</h1>
      <article>
        <p className='paragraph'>
          Le paradigme fonctionnel n'est pas une contrainte pour la programmtion reactive de React, il est tout à fait possible de couplée 
          les deux aux besoins.
        </p>

        <p className="paragraph">
          Pour ce teste l'objectif seras d'utiliser un objet plus complexe pour vous montrer qu'une monade
          peut être appliquée sans trop modifier la structure initiale.
        </p>

        <h3 className="subtitle">L'objet en question:</h3>

        <figure className="mediaContent">
          <img src="media/img/obj.png" alt="image d'exemple" className='image' title='objet javascript'/>
        </figure>

        <p className="paragraph">
          Bien qu'il soit préférable de vouloir tester toutes les propriétées de l'objet dans une situation réel,
          pour cette exemple je vais tester simplement les propriétées <span className='prop'>title</span> et <span className='prop'>subtitle</span>.
        </p>

        <p className='paragraph'>
          Ce que l'ont ne souhaite pas c'est que les propriétées soit <span className='key'>undefined</span>
          &nbsp;ou <span className='key'>null</span>, ou dans le pire des cas que les propriétée attendue soit inexistantes.
        </p>

        <p className="paragraph">
          Bien sûr une simple condition remplit ce prérequis dans <span className="key">90%</span> des cas mais, supposont que l'ont tombes sur un objet auxquelles
          aucun schéma n'est établie, ou si l'objet est gérée par le client par exemple en l'absence d'un prestataire pour mettre son site à jour. 
          La <span className="key">monade</span> Maybe peu résoudre ces soucies.
        </p>
      </article>

      <article>
        <p className="paragraph">
          Pour commençais, voyons le résultat produit par la monade.
        </p>

        <h3 className='resultat'>les titres des documents: </h3>
        <div className="center">
          <Badge params={title}/>
        </div>

        <h3 className='resultat'>les paragraphes des documents</h3>
        <div className="center">
          <Badge params={paragraph}/>
        </div>
      </article>

      <article>
        <p className="paragraph">
          Comme promis les propriétées <span className="prop">title</span> et <span className="prop">subtitle</span> ont reçue un
          texte de remplacement si aucune valeur initiale à était déclarée (voir l'image).
        </p>

        <h3 className="subtitle">Structure de la monade</h3>
        <figure className="mediaContent">
          <img src="media/img/maybe.png" alt="monade javascript" title='exemple de monade maybe' className='image'/>
        </figure>

        <h3 className='subtitle'>Syntaxe</h3>
        <p className="paragraph">
          La monade maybe suit le pattern <span className="key">null checking</span> qui consiste à chainer les instructions, la chaine 
          se brise si la valeur retournée est null ou undefined, par conséquent la valeur de défaut est attribuée si la chaine est brisée. 
        </p>

        <p className='paragraph'>
          Le nom des méthodes ne rentreras pas en conflit ceci grâce à <span className="key">l'encapsulations de l'objet</span>. 
        </p>

        <p className='paragraph'>
          Enfin les monades ne sont pas régis par un patron de conception quelconque, ici j'utilise un <span className="key">factory</span> avec des fonctions c'est pour moi 
          la méthode qui m'a permis de comprendre cette monade.. Il y as d'autre façon d'interprétée la monade maybe.
        </p>
      </article>

      <article> 
        <h3 className="subtitle">Tester les propriétées</h3>

        <figure className="mediaContent">
          <img src="media/img/maybe2.png" alt="usage de monade maybe javascript" className="image" title='utilisation de la monade maybe'/>
        </figure>

        <p className="paragraph">
          En premier temps j'ai besoins d'une boucle vue que nous somme dans un objet javascript avec plusieurs documents (ou collection pour certain).
          Si je ne fait pas ceci, je n'obtiendrais que le premier document et pas les autres, l'usage de la monade serait bien limitée dans ce cas là.
        </p>

        <p className="paragraph">
          On déclare notre variable jusque là en principe pas de difficultée. Comme valeur on lui donne une instance de <span className="key">maybe</span>,
          &nbsp;<span className="key">maybe</span> à pour argument <span className="key">l'objet data</span>.
        </p>

        <p className="paragraph">
          Première chaine: On chaine l'instance avec la méthode <span className="met">chain</span> qui est accessible vue qu'elle est également une même instance de <span className="key">maybe</span>.  
          &#40;<span className="prop"> a </span>&#41; est le <span className="prop">functor</span> qui nous serviras de callback, ce <span className="prop">functor</span> retourne 
          une même instance de <span className="key">maybe</span> avec comme argument le <span className="prop">functor</span> associer une <span className="key">key</span> définit par la boucle,
          ce <span className="prop">functor</span> qui est &#40;<span className="prop"> a </span>&#41; est associer à <span className="key">data</span> par conséquence.
        </p>

        <p className="paragraph">
          Seconde chaine: Le <span className="prop">functor</span> retourne une instance de <span className="key">maybe</span> avec comme argument
          le <span className="prop">functor</span> parcourant la propriétée <span className="prop">title</span>. Vue que nous somme à l'intérieur d'une boucle et que la chaine 
          précédente parcourt l'ensemble des documents, ce sont <span className="under">toutes les propriétées title qui sont traitées</span>.
        </p>

        <p className='paragraph'>
          Troisième chaine: On s'attend à avoir la propriétée title dans l'objet, du coup on chaîne avec la méthode <span className="met">map</span> qui est 
          propre à la monade maybe &#40;<span className="under">rappel l'encapsulation des méthodes</span>&#41;. Le functor est cette propriétée et on la chaine avec 
          la méthode native de javascript trim&#40; &#41; qui permet de vider les espaces blanc indésirable dans la valeur.
        </p>

        <p className="paragraph">
          Quatrième chaine: C'est la méthode <span className="met">getOrElse</span> aussi appelée <span className="key">Extract</span> parfois.  
          Si toutes les chaines se sont déroulées sans accroc alors la valeur est retournée, si une des chaines ces brisées avant alors la monade 
          <span className="key">&nbsp;maybe</span> prend comme argument <span className="key">null</span>. <span className="met">getOrElse</span> retourne alors 
          la valeur par défaut que l'ont donne comme argument.  
        </p>
      </article>

      <article> 
        <h3 className="subtitle">Le cas du tableau</h3>

        <p className="paragraph">
          Vous avez surement constatez la deuxième variable implique une valeur trouvée dans un <span className="key">array</span>. Pour le coup le 
          processus est un poil identique si ce n'est qu'il faut parcourir le tableau.
        </p>

        <figure className="mediaContent">
          <img src="media/img/maybe3.png" alt="exemple de monade javascript" className="image" title='exemple de monade maybe'/>
        </figure>

        <p className="paragraph">
          Plutôt que de placée la <span className="key">key</span> avec &#91; k &#93; il faut indiqué <span className="key">l'itération</span> souhaitée. 
          Si l'on place &#91; k &#93; le résultat seras ambigues pour javascript.
        </p>
      </article>
      
      <article>
        <h3 className="subtitle">Dans React</h3>
        <figure className="mediaContent">
          <img src="media/img/maybe4.png" alt="monade maybe dans react" className="image" title='exemple de monode dans react'/>
        </figure>

        <p className="paragraph">
          Ont <span className="key">push</span> les valeurs implicites des variables dans des tableaux hors scope de la boucle <span className="key">for</span>.
        </p>

        <p className="paragraph">
          Une fois ces valeurs accessibles, il nous suffit de les placée dans les états locales dédiés (les hooks useState&#40;&nbsp;&#41;).
        </p>

        <p className="paragraph">
          Le hook useMemo&#40;&nbsp;&#41; à son importance, en effet les monades sont des instances sur des instances, à chaque fois qu'une chaine est 
          utilisée, un <span className="key">callback</span> est appelée. C'est un peu comme de la récursions à gogo.. Le problème c'est que lorsque la
          monade opère sur React, React vérifie les potentiels changement dans son dom virtuel.. survient alors le <span className="key">re render</span>  
          &nbsp;du composant. Ce hook permet d'ignorée les propriétées inchangées avec les conditions, les valeurs non changer son gardée en mémoire.
        </p>
      </article>

      <article>
        <h3 className='subtitle'>L'intérêt des monades maybe</h3>
        <p className='paragraph'>
          La monade maybe est parfaite pour vérifier les valeurs implicites des variables si elle sont <span className="key">null</span> ou&nbsp; 
          <span className="key">undefined</span> et permettant en conséquence de les redéfinir avant leurs utilisations. C'est l'une  
          des méthodes les plus sûr pour évité une valeur <span className="key">undefined</span> en javascript. Toutefois les monades sont très  
          gourmande en performance bien qu'elle alloue que peu de mémoire sur un système / application. En résumée les monades maybe sont plus 
          intéressantes sur des traitements de lourd et où les erreurs ne sont pas permis.
        </p>
      </article>

      <article>
        <h3 className='subtitle note'>Note:</h3>
        <p className="paragraph">
          Le design de la page est juste pour rendre la lecture plus attrayante.. Je n'est pas chercher à faire quelques chose de complexe c'est le 
          minimun syndicale. Sorry pour mon 1/15 d'orthographe.
        </p>
      </article>
    </section>
  )
}

export default App;