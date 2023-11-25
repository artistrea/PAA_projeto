export function textToInfoParser(text: string) {
  let lines = data.split('\n').map((l)=>l.trim())

  for(const line of lines){


    let [leaf, params] = line.split(/,(.*)/).map((s)=>s.replace(/["“”]/g, '').trim())
    let [symptoms, prob] = params.split("),").map((s)=>s.replace(/["“”]/g, '').trim())
    let p = parseFloat(prob)

    let type = leaf[0];
    leaf = leaf.slice(2);
    switch(type){
      case 'C':
        
        let [condition, attrsStr] = symptoms.split("(").map((s)=>s.trim())
        let negation = condition === "NOT"
        let attrs = attrsStr.split(', ')
        
        for(const attr of attrs){
          attr.split("NOT ")

        }
        // console.log("/n")
      break;
      case 'S':
        //console.log('S');
      break;
      default:
        //alert("Erro") // cuidado com quebra de linha no final do arq
      break;
    }
  }
}


const data = "“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“C causa 2”, NOT (“S sintoma 2”, NOT “S sintoma 3”), 0.3";
