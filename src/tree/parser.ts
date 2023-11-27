export function textToInfoParser(text: string) {
  let lines = data.split('\n').map((l)=>l.trim())
  type Node = {[key: string] : string | number | boolean}
  let nodes : Array<Node> = []

  for(const line of lines){
    const node : Node = {}

    let [leaf, params] = line.split(/,(.*)/).map((s)=>s.replace(/["“”]/g, '').trim())
    let [symptoms, prob] = params.split("),").map((s)=>s.replace(/["“”]/g, '').trim())
    //node.p = parseFloat(prob) => TODO: concerta inconsistencias baseadas na p
    let type = leaf[0];
    node.name = leaf.slice(2);
    let [condition, attrsStr] = symptoms.split("(").map((s)=>s.trim())
    let negation : boolean = (condition === "NOT")
    let attrs = attrsStr.split(', ')
    
    for(const attr of attrs){
      let aux = attr.split("NOT ")
      let symptom = aux[aux.length-1]
      node[symptom] = !((negation?1:0) ^ (aux[0]===""?1:0))
    }
    switch(type){
      case 'C':
        node.type = 'C'
      break;
      case 'S':
        node.type = 'S'
      break;
      default:
        //alert("Erro") // cuidado com quebra de linha no final do arq
      break;
    }
    nodes.push(node)
  }

  return nodes
}


const data = "“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3";
