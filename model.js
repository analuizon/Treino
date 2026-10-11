export const localDate=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export const initialState=()=>({version:1,profile:{name:'Ana',height:163,goal:null,deadline:'2026-12-31'},weights:[],plans:suggestedPlans(),planRevision:2,sessions:[]});
export function validNumber(value,{min=0,max=1000}={}){return value!=='' && Number.isFinite(Number(value)) && Number(value)>=min && Number(value)<=max;}
export function volume(session){return session.exercises.reduce((total,e)=>total+e.sets.reduce((sum,s)=>sum+Number(s.load)*Number(s.reps),0),0);}
export function validateState(s){if(!s||s.version!==1||!s.profile||!Array.isArray(s.weights)||!Array.isArray(s.plans)||s.plans.length!==7||!Array.isArray(s.sessions))throw Error('Arquivo de backup inválido.');if(typeof s.profile.name!=='string'||(s.profile.goal!==null&&!validNumber(s.profile.goal,{min:20,max:400}))||!/^\d{4}-\d{2}-\d{2}$/.test(s.profile.deadline))throw Error('Perfil inválido.');if(!s.weights.every(w=>/^\d{4}-\d{2}-\d{2}$/.test(w.date)&&validNumber(w.value,{min:20,max:400})))throw Error('Pesos inválidos.');if(!s.plans.every(p=>typeof p.title==='string'&&Array.isArray(p.exercises)&&p.exercises.every(e=>typeof e.name==='string'&&Number.isInteger(e.sets)&&e.sets>0&&e.sets<=10)))throw Error('Ficha inválida.');if(!s.sessions.every(p=>typeof p.id==='string'&&/^[A-Za-z0-9-]+$/.test(p.id)&&typeof p.title==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(p.date)&&Array.isArray(p.exercises)&&p.exercises.every(e=>typeof e.name==='string'&&Array.isArray(e.sets)&&e.sets.every(x=>validNumber(x.load)&&validNumber(x.reps,{min:1,max:100})))))throw Error('Histórico inválido.');return s;}

// Templates editáveis, sem cálculo de dieta ou cargas clínicas.
export function suggestedPlans(rpgDay=2){
 if(!Number.isInteger(rpgDay)||rpgDay<0||rpgDay>6)throw Error('Dia de RPG inválido.');
 const ex=(name,sets,reps,unilateral=false)=>({name,sets,reps:({'8–12':'10','10–12':'12','12–15':'15'})[reps]||reps,unilateral,note:'Escolha carga confortável, deixando 2–3 repetições em reserva. Descanso de 60–90 s; adapte com seu profissional.'});
 const workouts=[
 {title:'Glúteos e posteriores',exercises:[ex('Elevação pélvica',3,'8–12'),ex('Mesa flexora',3,'10–12'),ex('Extensão de quadril na polia',2,'12–15',true),ex('Abdução de quadril na máquina',2,'12–15')],note:'5 min de aquecimento + 40 min de musculação + 15 min de cardio leve. Amplitude e posicionamento a validar com seu profissional.'},
 {title:'Costas, braços e abdômen',exercises:[ex('Puxada na frente',3,'8–12'),ex('Remada unilateral com apoio',3,'10–12',true),ex('Rosca com halteres',2,'10–12'),ex('Dead bug',2,'10',true)],note:'5 min de aquecimento + 40 min de musculação + 15 min de cardio leve. Para movimentos sem peso externo, registre 0 kg.'},
 {title:'Quadríceps e glúteos',exercises:[ex('Leg press',3,'10–12'),ex('Cadeira extensora',2,'10–12'),ex('Elevação pélvica',3,'10–12'),ex('Panturrilha na máquina',2,'12–15')],note:'5 min de aquecimento + 40 min de musculação + 15 min de cardio leve. Valide alinhamento e amplitude; não tente corrigir a diferença entre pernas com carga.'},
 {title:'Peito, ombros e costas',exercises:[ex('Supino na máquina',3,'8–12'),ex('Remada sentada',3,'10–12'),ex('Elevação lateral',2,'12–15'),ex('Tríceps na polia',2,'10–12'),ex('Abdominal na máquina',2,'12')],note:'5 min de aquecimento + 40 min de musculação + 15 min de cardio leve.'},
 {title:'Cardio moderado',exercises:[],note:'Até 30 min de escada OU corrida, em intensidade que permita conversar. Não precisa fazer as duas. Reduza ou troque por caminhada se houver fadiga ou desconforto.'},
 {title:'Recuperação ativa',exercises:[],note:'Caminhada leve ou mobilidade confortável por 20–30 min; descanso completo também é uma opção. Priorize recuperar e ampliar o sono em direção a 7–9 h.'}
 ];
 workouts.forEach((p,i)=>{p.warmupMinutes=i<4?5:0;p.strengthMinutes=i<4?40:0;p.cardio=i<4?{mode:i%2?'Corrida leve ou caminhada':'Escada leve',minutes:15}:i===4?{mode:'Escada OU corrida moderada',minutes:30}:{mode:'Caminhada leve (opcional)',minutes:20}});
 let next=0;return Array.from({length:7},(_,day)=>day===rpgDay?{day,title:'RPG / recuperação',note:'Dia ajustável. Siga a sessão e as orientações do fisioterapeuta; sem treino intenso adicional.',exercises:[]}:{day,...structuredClone(workouts[next++])});
}
export function goalMetrics(weights,goal,deadline,today=localDate()){
 const dateMs=d=>Date.parse(d+'T12:00:00Z');
 const valid=weights.filter(w=>w.date<=today).sort((a,b)=>a.date.localeCompare(b.date));
 if(!valid.length||!validNumber(goal,{min:20,max:400})||!Number.isFinite(dateMs(deadline)))return null;
 const recent=valid.filter(w=>dateMs(today)-dateMs(w.date)<7*86400000);
 const baseline=recent.length?recent.reduce((s,w)=>s+w.value,0)/recent.length:valid.at(-1).value;
 const days=Math.round((dateMs(deadline)-dateMs(today))/86400000),remaining=Math.max(0,baseline-goal);
 return {baseline,remaining,days,weekly:days>0?remaining/(days/7):null,count:recent.length,stale:recent.length===0};
}

export function plannedReps(value){const match=String(value).match(/^\s*(\d{1,3})\s*$/);return match&&Number(match[1])>0&&Number(match[1])<=100?Number(match[1]):'';}
export function workoutSession(plan){return {id:crypto.randomUUID(),date:localDate(),title:plan.title,cardio:plan.cardio?structuredClone(plan.cardio):null,exercises:plan.exercises.map(e=>({name:e.name,unilateral:e.unilateral,sets:Array.from({length:e.sets},()=>({load:e.name==='Dead bug'?0:'',reps:plannedReps(e.reps)}))}))};}
export function upgradePlans(state){
 if(state.planRevision===2)return false;
 const rpg=state.plans.findIndex(p=>p.title==='RPG / recuperação');
 // Only replace the original empty template or an untouched generated template.
 const original=['Glúteos e posteriores','Costas e braços','Recuperação / RPG','Quadríceps e glúteos','Peito, ombros e abdômen','Treino complementar','Cardio leve e mobilidade'];
 const empty=state.plans.every((p,i)=>p.title===original[i]&&p.exercises.length===0&&p.note===(i===2?'Dia provisório: ajuste quando confirmar o RPG.':'Defina exercícios e intensidade com seu profissional.'));
 if(empty){state.plans=suggestedPlans(rpg>=0?rpg:2);state.planRevision=2;return true}return false;
}
