
import React, { useMemo, useState } from "react";

const data = [
  {
      title : " ",
      url : "/media/images/abstract.jpeg",
      hoverText : "cliquez sur moi",
      textAlter : "image abstraite violette",
      description : [
          {
              subtitle: "",
              paragraph: " "
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
              paragraph: "blablabla.."
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
            <button>{element}</button>
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
        .chain(f => maybe(f.description))
        .chain(f => maybe(f[0]))
        .chain(f => maybe(f.paragraph))
        .map(f => f.trim())
        .getOrElse("paragraphe manquant");

      checkedTitle.push(checkTitle);
      checkedParagraph.push(checkParagraph);
    }
    
    setTitle(checkedTitle);
    setParagraph(checkedParagraph);
  
  }, [data]);



  console.log(paragraph)
  
  return (
    <section>
    {/*Oui react échappe les caractères blanc et interprète les accolades d'où les entitée html. */}
      <p>Pour ce test, j'utilise un objet js composée de 4 documents, soit [&#123;&nbsp;&#125;,&#123;&nbsp;&#125;,&#123;&nbsp;&#125;,&#123;&nbsp;&#125;]</p>
      <p>J'ai volontairement effacer certaine valeurs des propriétées car il faut aussi tester le second cas</p>
      <p>Naturellement tout repose sur la même page App, exceptée le css. La raison ? Pas besoin de rechercher telle ou telle dossier, j'ai 
        conscience parfaitement que ce n'est pas une bonne pratique.
      </p>
      <p>Enfin le but n'est pas de tester toutes les propriétées mais seulement les plus pertinentes (sa évite les doublons)</p>

      <h3>les titres des documents: </h3>
      <Badge params={title}/>

      <h3>les paragraphes des documents</h3>
      <Badge params={paragraph}/>

      <h3>L'intérêt des monades maybe</h3>
      <p>
        La monade maybe permet de définir une variable comme null ou non null dès sa création. Ceci permet d'économiser sur la mémoire d'une application,
        cela permet de mieux contrôler vos données d'une certaine façon, en revanche les monades sont gourmandes sur le plans des ressources: Non pas sur
        la mémoire allouée mais sur les performances globales d'une applications du aux nombreuses récursions.
      </p>
      
    </section>
  )
}

export default App;