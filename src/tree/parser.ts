export function textToInfoParser(text: string) {
  let lines = data.split('\n').map((l)=>l.trim())

  type Atom = {
    type: "cause" | "symptom";
    label: string;
  };
  
  type LogicSentence = {
    consequence: Atom;
    parameters: (Atom & { value: boolean })[]; // ignore cause
    probability: number;
  };

  const rules : LogicSentence[] = []
  const allSymptoms : Set<string> = new Set()

  for(const line of lines){
    const rule : LogicSentence = {} as LogicSentence;
    let [leaf, params] = line.split(/,(.*)/).map((s)=>s.replace(/["“”]/g, '').trim())
    let [symptoms, prob] = params.split("),").map((s)=>s.replace(/["“”]/g, '').trim())
    rule.probability = parseFloat(prob)
    const type = leaf[0];
    switch(type){
      case 'C':
        rule.consequence = {type: 'cause', label: leaf.slice(2)};
      break;
      case 'S':
        rule.consequence = {type: 'symptom', label: leaf.slice(2)};
      break;
      default:
        alert("Erro") // cuidado com quebra de linha no final do arq
      break;
    }
    let [condition, attrsStr] = symptoms.split("(").map((s)=>s.trim())
    const negation : boolean = (condition === "NOT")
    const attrs = attrsStr.split(', ')
    let aux : Array<string>
    let symptom : string
    rule.parameters = []
    for(const attr of attrs){
      aux = attr.split("NOT ")
      symptom = aux[aux.length-1].slice(2)
      allSymptoms.add(symptom)
      rule.parameters.push({type:'symptom', label:symptom, value: !((negation?1:0) ^ (aux[0]===""?1:0))})
    }
    rules.push(rule)
    
  }
  console.log(rules)
  console.log(allSymptoms)
  return { rules, allSymptoms }
}


const data = "“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3";
