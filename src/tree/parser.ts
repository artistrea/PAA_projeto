export function textToInfoParser(text: string) {
  let lines = data.split('\n').map((l)=>l.trim())
  type Rule = {[key: string] : string | number | boolean}
  const rules : Array<Rule> = []
  const allKeys : Set<string> = new Set(["name", "type", "p"])

  for(const line of lines){
    const rule : Rule = {}
    let [leaf, params] = line.split(/,(.*)/).map((s)=>s.replace(/["“”]/g, '').trim())
    let [symptoms, prob] = params.split("),").map((s)=>s.replace(/["“”]/g, '').trim())
    rule.p = parseFloat(prob)
    const type = leaf[0];
    rule.name = leaf.slice(2);
    let [condition, attrsStr] = symptoms.split("(").map((s)=>s.trim())
    const negation : boolean = (condition === "NOT")
    const attrs = attrsStr.split(', ')
    let aux : Array<string>
    let symptom : string
    for(const attr of attrs){
      aux = attr.split("NOT ")
      symptom = aux[aux.length-1].slice(2)
      allKeys.add(symptom)
      rule[symptom] = !((negation?1:0) ^ (aux[0]===""?1:0))
    }
    switch(type){
      case 'C':
        rule.type = 'C'
      break;
      case 'S':
        rule.type = 'S'
      break;
      default:
        alert("Erro") // cuidado com quebra de linha no final do arq
      break;
    }
    rules.push(rule)
    
  }
  
  return { rules, allKeys }
}


const data = "“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3";
