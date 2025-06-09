/*
Hier werde ich alles über react was man wissen soll erzählen!

fangen wir mal an...

    !!! DIE-BASICS !!! =

//...Operator!

/* mit dem ...operator kann man einiges machen wie z.B ein object/array auf !flacher Ebene! kopieren */


//Dinge erweitern

const normalUser = {name:"name",age:"zahl",id:"zahl"}

const premiumUser = {...normalUser,konto:"zahl"}

const myArray = [1,2,3,4,5]

const biggerArray = [...myArray,6,7,8,9,10]

/* aber merke dir: du kannst ein array oder ein object nicht kopieren sondern nur reffen! */

const bsp = {name:"hallo", alter:17}

const coppy = bsp

coppy.name = "klaus"

console.log(bsp.name) // da kommt "klaus"

/* es gibt aber noch den ... mit dem schlüsselwort "rest", also den ...rest-befehl, der wird beim destructen benutzt */

const object = {a:"",b:"",c:"",d:""}

const { a , ...rest} = object //in ...rest sind b:"",c:"" und d:"" drinnen

/* <!ARRAY-METHODEN!>

In js gibt es verschiedene wege einen Array gut zu bearbeiten die alle nach dem gleichen schema arbeiten=
-> Array.funktion((item)=>{ return... }), diese funktion hat item als parameter für jedes einzelne item innerhalb eines arrays
und führt die gegebene funktion für jedes einzelne item durch, mit verschiedenen methoden
und davon gibt es verschiedene funktionen die verschiedenes machen, wir gehen die alle mal durch:
*/
let Beispiel = [
    { name: "delo", alter: 17},
    { name: "johannes", alter: 16},
    { name: "Rosen", alter: 18},
    { name: "Mama", alter: 40},
    { name: "Papa", alter: 40},
    { name: "jasmina", alter: 12},
]
/* das hier ist unser beispiel array, wenn wir jetzt diesen array nach was einer Eigenschaft filtrieren wollen,
nutzen wir die .filter() methode... */

/* <!!!FILTER!!!> */
const dürfenInClub = Beispiel.filter((person)=>{
    return person.alter >= 18
})
console.log(dürfenInClub)
/* <!!!FILTER!!!> */

/* hier sehen wir wie das ganze funktioniert. der Parameter innerhalb unserer funktion steht für jedes einzelne Item innerhalb
unseres arrays und was die filter methode macht ist durch jedes item gehen und gucken ob die aussage im return true oder false ist,
wenn sie true ist kommt die in das neu erstellte Array namens "dürfen in club" 
!WIR HALTEN FEST! = .filter() erstellt ein neues array mit nur den items bei dem die bediengung im return true war */

/* wenn wir aber Werte nur zurück geben bekommen wollen, wie z.B alle namen oder alter oder die werte verändern wollen, nutzten wir .map() hier
bekommen wir einen komplet neuen array mit all den werten die wir vom ursprünglichen array wollten */

/* <!!!MAP!!!> */
let alleNamen = Beispiel.map((person)=>{
    return person.name
})
console.log(alleNamen)
/* <!!!MAP!!!> */

/* und noch ein Beipiel wo wir die werte auch verändern können und im neuen array hinzufügen*/

/* <!!!MAP!!!> */
let doppeltAlter = Beispiel.map((person)=>{
    return person.alter * 2
})
console.log(doppeltAlter)
/* <!!!MAP!!!> */

/* wenn du aber eine bestimmte sache im array suchst und die weitern fakten dazu willst, kannst du auch die .find() methode nutzen */

/* <!!!FIND!!!> */
let wieAltIstMama = Beispiel.find((person)=>{
    return person.name === "Mama"
})
console.log(wieAltIstMama)
/* <!!!FIND!!!> */

/* damit kann man sehen ob man das gesuchte überhaupt im array hat aber es hört direkt beim ersten "true" statement auf, also wenn wir sowas machen würden wie */

/* <!!!FIND!!!> */
let VierzigJahre = Beispiel.find((person)=>{
    return person.alter === 40
})
console.log(VierzigJahre)
/* <!!!FIND!!!> */

/* würden wir hier nur mama bekommen obwohl papa auch 40 ist. das liegt daran das find() beim ersten wo es true ist direkt stoppt, wenn man mehre
 ergebnise will sollte man filter nutzen, also nutze find wenn du nur einen treffer willst */

 let hatDelo = Beispiel.includes("delo")
 console.log(hatDelo)
/* .includes() prüft, ob ein exaktes Element (z.B. ein String oder eine Zahl) im Array vorkommt. Es kann keine Bedingungen
 prüfen wie .find(), und es funktioniert bei Objekten nur, wenn exakt dasselbe Objekt gespeichert ist. */

 /* wenn du über jedes item in deinem Array drüberlaufen wollen würdest um da auch was zu verändern oder einfach was zu logen, nutzt du forEach() */

/* <!!!FOREACH!!!> */
 Beispiel.forEach((person)=>{
    console.log(person.name)
 })
 /* <!!!FOREACH!!!> */

 /* forEach funktioniert so ähnlich wie map aber es returned dir kein neuen array zurück sondern führt nur zu jedem array-item was aus */

 /* eine Array methode die ein bisschen anders funktioniert ist die some() methode, die dir einen einfachen true oder false wert liefert.
 Wenn du z.B wissen willst ob im array es überhaupt leute gibt die Ü18 sind dann machst du... */

/* <!!!SOME!!!> */
 const ÜAchtzehnArray = Beispiel.some((person)=>{
    return person.alter > 18
 })
 console.log(ÜAchtzehnArray)
/* <!!!SOME!!!> */

 /* hier bekommen wir true raus weil er einfach nur guckt ob die return bedingung überhaupt im array ist (true) oder nicht (false) */

 /* so ähnlich wie some() ist every(), der aber anstatt zu sehen ob nur ein item überhaupt den bedingungen im return zustimmt, guckt ob alle zutreffen */

/* <!!!EVERY!!!> */
 const MusslangenNamenHaben = Beispiel.every((person)=>{
    return person.name.length >= 4
 })
 console.log(MusslangenNamenHaben)
 /* <!!!EVERY!!!> */

 /* wenn wir sowas wie eine Operation wollen wo wir nicht rechnungen oder aktionen für jedes item im array wollen sonder ein schlussfolgerung für das Array
 selber dann nutzen wir reduce() */

  /* <!!!REDUCE!!!> */
 const alleAlters = Beispiel.reduce((sume, person)=>{
    return sume + person.alter
 },0)
 console.log(alleAlters)
  /* <!!!REDUCE!!!> */

 /* reduce funktioniert ein bisschen anders, hier ist das so das reduce(), zwei parameter einnimmt und die funktion auch zwei parameter abgibt, wir nehmen
 nämlcih sowas wie ein "Rucksack" auf von dem der Ursprungswert unser parameter nach der funktion ist und je nach dem welche schlussfolgerung wir von array
 wollen können wir sagen was vom array unser "Rucksack" immer zu sich nehmen soll, wie hier das alter. somit geht er durch jedes item im array und nimmt 
 davon sein alter und addiert die alle zusammen */

 /* auch ein super wichtiger befehl ist .includes() was danach fragt ob ein bestimmtes elemten oder ein bestimmte zahl im gefragen objetk for kommt */

 const istDaKlaus = Beispiel.some((person)=>{
    return person.name.includes("Klaus")
 })
console.log(istDaKlaus)

/* ist zwar jetzt nicht das beste besipiel aber selbst wenn einer Klaussarus hiesen würde würde da true kommen */

/* <!ARRAY-METHODEN!> */

/* <!REACT-AKTION-EVENTS!> */
export function Main(){

    return(
        <>
             <div>
                In react gibt es eine viel Zahl von events, die wichtigsten sind = 

             <button onClick=""> bei einem einfachen klick</button>
             <button onDoubleClick=""> bei einem doppel klick</button>
             <input onChange> bei jedem Buchstaben den du hinzufügst</input>

             bei Input feldern muss du dir eine Sache merken:
             -Du bekommst den Inhalt durch eine Eventhandler funktion die so ähnlich aussieht
                function Eventhandler(e){
                    event.target.value
                }
            und dann <input onChange={Eventhandler}/>
            wenn du das aber mit einem state verbinden willst:

            const [infos,setInfos] = useState(null)
            function Eventhandler(e){
                    setInfos(event.target.value)
                }
            und dann <input onChange={Eventhandler}/>

            so kannst du die werde vom input feld entnehmen und dein eigenes ding machen
             </div>
        </>
 )
}
/* <!REACT-AKTION-EVENTS!> */

/* <!GEILES BASIS-WISSEN!> */

/* wenn man in react etwas obtional rendern möchte kann man das durch "&&", tun was dir erlaubt "if-abfragen im JSX" zu machen: */

let bediengung = true
{bediengung && <Header/>} //header wird gerendert weil bediengung true ist 

/* wenn du etwas togglen willst nutzt du "?" um zu gucken ob etwas true ist oder nicht: */

bediengung ? "was passiert wenn true ist":"was passiert wenn false ist"

/* man kann diese dinge direkt im JSX nutzen was dazu führt das man das rendern oder stylen direkt beeinflussen kann!!! */

/* <!GEILES BASIS-WISSEN!> */

/* <!REACT-HOOKS!> */

    /* WICHTIG: du kannst react hooks nur innerhalb function-components verwenden! das bedeutet z.B: */

    const [test,setTest] = useState("") // das geht nicht, muss in einer component function sein!!!

    export function Testmest(){
        return(<>

        </>)
    }

    /* so, jetzt zu den hooks: */

    export function Main2(){

        /* in react gibt es eine viel Zahl von Hooks, die wichtigsten sind */

        const [infos,setInfos] = useState(null)
        
        /* in useState ist das so das du den Hook destructest und vom array den ersten parameter der die start info ist hast und den zweiten parameter
        der eine funktion ist welche den ersten parameter definiert, in den klammern von useState steht dann auch immer der start wert selber, der eigentlich
        fast immer auf null gesetz werden solle weil setInfos dann infos zu allem machen kann, sei es string int oder object usw, wenn du in den klammern
        voher her einen typ fest legst kannst du den nicht mehr ändern */

        function eventhandler(e){
            setInfos(parseFloat(e.target.value))
        }
        /* useState wird eigentlich immer zur UI genutzt in dem man mit den werten die man bekommt die in ein state packt und diese dann im JSX zeigt,
        was man auch macht ist den wert von infos in andere funktionnen zu packen und damit weiter zu arbeit (siehe return),
        jedoch führt das ändern von den states auch zum rerendern */

        /* falls man neben den ändern der states oder allgemein wenn etwas rerendert wird noch als neben Fact ändern möchte dann nutzt man useEffect */
        useEffect(()=>{
            function wasGeht(){
                console.log("was geht")
            }
            wasGeht()
        },[infos])
        /* bei use Effect ist das so, das wenn sich das im dependecy array ändert, er wieder anfängt zu rerendern, und das was in der funktion von ihm steht
        ausführt, das bedeutet hier würde er jedes mal wenn sich infos ändert was geht console.loggen */

        /* useEffect wird aber öfters für API anfragen genutzt */
        useEffect(()=>{
            async function fetchen(){
                const rohdaten = await fetch("https://fakestoreapi.com/products")
                if(!rohdaten.ok){
                    console.log("scheisse")
                }
                let jsonDaten = await rohdaten.json()
                return jsonDaten
            }
            fetchen()
        },[])
        /* hier wird die api nur einmal gefetched unzwar beim reloaden der seite */

        /* was useEffect aber auch wirklich stark macht ist das er perfekt für befehle da ist die den typischen lebenszyklus eines elementes durch gehen also
        das mouten, ändern und dann löschen weil in useEffekt den befehl sowohl erstellen, als auch ändern und dann löschen kannst */
        useEffect(()=>{
            const timer = setIntervall(()=>{
                let Zeit = "Zeit"
                console.log("die" + zeit +  "tickt...")
                return Zeit
            },2000)
            if(timer === "Banane"){
                console.log("was ist hier den los")
            }else{
                console.log("ja macht auch sinn")
            }
            return ()=>{
                clearInterval(timer)
            }
        })
        /* man muss aber auch sagen das dinge super selten unmounted werden, in 90-95% der fällen braucht man das garnicht */

        /* eine weiterer sehr wichtiger hook den man immer braucht wenn man daten zwichen den kinder komponenten austauschen möchte ist useContext */
        
         const ContextMacher = createContext()

        /* mit createContext haben wir unsere constande "ContextMacher" jetzt zu einem leeren Daten raum gemacht der in andere komponenten importet,
        jedoch müssen wir ihm erstmal daten geben damit die komponenten auch infos bekommen könenn */

        /* useContext arbeitet hand in hand mit useState zur daten gewinnung, wir erstellen nämlich einen useState in unsere main function */
        function Main2(){
            const [infos,setInfos] = useState(null)

            return(
                <>

                </>
            )
        }
        /* infos soll hier die daten darstellen die wir mit all den anderen komponenten teilen wollen, aber damit daten überhaupt geteilt werden können müssen
        wir eine function um den context erstellen der es erlaubt das die infos in Context geteilt werden */
        const ContextGeber = function({children}){
          return(
            <ContextMacher.Provider>
            {children}
            </ContextMacher.Provider>
          )
        }
        /* der "ContextGeber" ist jetzt der, den wir in unsere main komponente rein importen werden, der eine bestimmte rolle erfüllt: er wird nämlich als
        eine Art "elternteil" dienen der den Komponenten die in seiner klammer stehen also die "children" die benötigten daten gibt, welche daten aber? */
        const ContextGeberCopy = function({children,infos,setInfos}){
            return(
              <ContextMacher.Provider value={{infos,setInfos}}>
              {children}
              </ContextMacher.Provider>
            )
          }
        /* na die Daten von unserer mainkomponente! jetzt können wir setInfos überall rein importen und von da die daten abholen, und infos dann überall
        rein importen um die daten zu nutzen!!! das würde dann ungefähr so aussehen */

       
        import { useContext } from  "react"
        import { ContextMacher } from "/Context.jsx"
        
        export default function Header(){
            const {infos,setInfos} = createContext(ContextMacher)
            let jsonDaten = 20
                setInfos(jsonDaten)
        }
       
        /* und dann könnte man infos überall rein importen und die nutzen, als auch die daten wieder durch setInfos ändern */

        /* wenn wir Daten intern ändern wollen ohne das alles jedes mal rerendert wird weil das die performence der website verschlechter oder zu einem 
        infinite loop führen kann, nutzen wir useRef */

        const zähler = useRef(0)

        /* bei useRef() ist das so das wir ein objekt kreieren der als default schon die eigenschaft "current" hat, und innerhalb der useref klammern
        geben wir den wert den die eigenschaft beeinhalten soll, man kann auch nur auf den wert der variable durch .current kommen */

        function klickZähler(){
            zähler.current = zähler.current + 1
        }

        /* wenn man intern Daten verarbeiten möchte ohne das es zum ständigen rerendern kommt dann nutz man useRef weil es ja nichts anderes macht als ein
        stabiles objekt zu kreieren was react ingoriert und es somit nicht zum rendern kommt, das kann man zu seinem vorteil nutzen wenn man will das neben
        dem was in der UI angezeigt wird prozesse verlaufen die vielleicht erst später oder garnicht angezeigt werden sollen */
        useEffect(()=>{
            const zähler = useRef(0)
            function Zähler(){
                zähler.current = zähler.current + 1
            }
    
        },[infos])
        /* wenn wir z.B wollen insgeheim zähler.current immer um einen grösser wird ohne das dass in der UI angezeigt wird dann können wir das ja super
        in useEffect nutzen weil useEffect selber ja eh für side effects da ist und useRef zu keinem rerendern führt = optimalität */

        /* wofür man useRef auch sehr gut nutzen kann ist direkte DOM-manipulation */
        const fokus = useRef()
        function fokussierer(){
            fokus.current.focus()
        }
        <input ref={fokus} onClick={fokussierer} />

        /* das führt dazu das der wert deines x.currents zu dem DOM-element wird, somit kannst du die DOM so manipullieren wie du willst */
        /* wie schon gesagt ähnelt useRef ja useState sehr weil beide zur daten verarbeitung da sind, und obwohl die unterschiede bei einem das anzeigen in der
        UI ist und der andere alles intern macht, ist ein banaler unterschied auch der das useRef keinen eingebauten weg hat seinen eigenen wert zu ändern
        so wie bei useState mit der funktion. du musst selber eigene funktionen usw machen damit du den wert deines refs änderst */

      
        return(
            <>
                <input onChange={eventhandler}/>
                <p> dein input -100 ergibt {infos-100}</p>
            </>
        )
    }


 
/* <!REACT-HOOKS!> */

/* <!FRAMER-MOTION!> */
import {animate, easeInOut, motion} from "framer-motion"
    function FramerMotion(){

    /* Framer Motion ist eine essenzielle bib für animationen, es gibt 2 varianten wie man in framer-motion animationen macht, die gängiste ist "variant" */
        /* variant */
        let var1 = {
            inital: {opacity: 0, y:20},
            animate: {opacity:1, y:0},
            transition: {duration: 2, ease:"easeInOut"}
        }
        /* oder man macht es manuell vor ort (siehe unten) */

        /* wenn man ein eltern element hat und will das die Kinder elemente in bezug zum eltern element smooth animiert werden, dann kann man das durch
        staggerChildren und delayChildren erreichen !!ACHTUNG!! andere art und weise wie framer motion funktioniert */

        let papaVar = { //variation des eltern elementes
            hidden: { opacity: 0, y:20},
            visible: {
                opacity: 1,
                y:0,
                transition: {
                    staggerChildren: 0.5, //sagt die abstände in der die kinder animiert werden sollen
                    delayChildren: 0.3 //sagt ab wann die animation überhaupt beginnen soll, also 0.3s delay
                }
            }
        }
        let kinderVar = {
            hidden: { opacity: 0, y:20},
            visible: {
                opacity: 1,
                y:0,
                transition:{
                    duration: 1,
                    ease:"easeInOut"
                }
            }
        }
        /* !Wichtig! Wenn man einen bediengten zustand als "animate" haben will, z.B solange etwas im viewport ist dann nutzt man auch "viewport" und 
        vorallem "whileInView" */

        let währendSichtbar = {
            hidden:{
                opacity: 0,
                y: 20
            },
            whileInView: { //ersetz hier animate, und sagt einfach während es sichtbar ist animier es so, wann und wie oft werden durch viewport geklärt
                opacity: 1,
                y:0,
                transition:{
                    duration:2,
                    ease: "easeInOut"
                }
            },
        }
        /* es würde dann im div so aussehen */

            
            {<motion.div
              variants={währendSichtbar}  initial="hidden" animate="whileInView"
              viewport={{ once:false, amount:0.2}} // mit once: sagt man ob nur einmal oder bei jedem recrollen true bedeutet nur einmal und bei amount
                                                   // sagt er ab welchem teil des divs es animiert werden soll, also hier ab 20% des divs wenn er erscrollt wurde
            >

            </motion.div>

        /* ease: x sagt dir wie deine animation aussehensoll, die gängisten sind easeInOut oder easeIn (wie bei css) aber es gibt einige weitere nicht so
        nützliche wie... */

        ease: "spring" // gibt eine sprung feder art der animation
        ease: "bounce" // lässt die animation am ende so ein bisschen einspringen

        /* jetzt kommt ein weiteres detaliertes beispiel */

         
        function Motion2(){
    const papaVar = { //wie mein eltern-div animiert werden soll
        initial:{
            opacity: 0
        },
        animate:{
            opacity:1,
            transition:{
                duration:1,
                staggerChildren: 0.5,   //die reihenfolge der Kinder wann die spawnen
                delayChildren: 0.3,
                ease: "easeInOut"
            }
        }
    }
    const kinderVar = { //wie meine kinder animiert werden sollen
        initial:{
            opacity: 0,
            y: 20
        },
        animate:{
            opacity:1,
            y:0
        }
    }
    const text = {  //wie mein text animiert werden soll
       initial:{ opacity: 0,
        y: 20
      },
        animate:{
            opacity: 1,
            y:0
        }
    }
    return( //!!WICHTIG!! die Start und end werte müssen alle gleich heissen damit der papa-div die alle triggern kann! hier heissen die z.b alle=
                    // "initial" und "animate" damit der papa div die alle triggern kann (siehe bei "variants" von papa-div), sonst muss man 
                        //alle seperat triggern wo man initila und animate auf deren namen setzt
        <>
            <motion.div 
                className=" grid grid-cols-3 p-5 gap-6 container h-auto mx-auto border-2 border-black rounded-2xl shadow-2xl bg-gradient-to-r from-gray-400 to-white"
                    variants={papaVar} initial="initial" animate="animate">
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
                <motion.div variants={kinderVar}
                    className=" flex justify-center items-center border border-black rounded-2xl h-40 bg-gray-500 ">
                    <motion.p
                        className=" text-5xl text-black text-shadow italic"
                            variants={text}> 
                        hallo
                    </motion.p>
                </motion.div>
            </motion.div>
        </>
    )
}

        /* jetzt kommen nocht !!KEYFRAMES!! */

        const Transi = {
            initial: {opacity: 0}, //eigentlich unnötig weil animate[0] ja sowie der start wert ist, aber pflicht bei variants
            animate:{
                x:["0%","50%","100"], //gibt dir jeden wichtigen frame den die eigenschaft durchlaufen muss
                opacity:[0,1,0],        
                rotate: [0,180,0],
                transition:{
                    duration:3,
                    repeat: Infinity, //sagt die anzahl der wiederholungen, hätte auch einfach 3 schreiben
                    repeatType:"reverse",  //sagt wo er am ende stehen soll, wenn ich hier nix gemacht hätte wäre der endstand der endstand der animation
                    ease:"easeInOut"
            }
            }
        }
        /* es ist wichtig anzumerken das wenn man bei einer eigenschaft mehrere phasen gegeben hat, jede andere auch genau so viele phasen hat damit alles
        synchron abläuft, selbst wenn die phasen nichst machen wie y:[0,0,0,1] oder so */

        /* man kann auch css elemente animieren wie die hintergrundsfarbe deines divs: */
        let cssEigenschaftenAnimieren = {
            backgroundImage:
        }

        return(
            <>
                {/* entweder schreibt man die animation direkt in den div selber rein, oder man erstellt einen variant (siehe oben) */}
                <motion.div
                initial = {{ opacity: 0, y:20}}
                animate = {{ opacity: 1, y:0}}
                transition = {{duration: 2, ease:"easeInOut"}}>
                </motion.div>

                <motion.div variants={var1}>

                </motion.div>

                <motion.div variants={papaVar} inital="hidden" animate="visible" >
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                    <motion.div variants={kinderVar}></motion.div>
                </motion.div>
            </>
        )
    }

        /* WICHTIG: die tailwind klassen die deine css animtaion bestimmen, tun dies auch bei deinen framer-motin animationen in deinem 
        motion.div, sowas wie z.B transform-origin oder so kannst du bei deiner framermation mit tailwind regeln!!! */

/* Responsive animations */

/* mit framer motion bekommst du eine responsive animation durch den install von: */

npm install react-responsive

/* und dann */

useMediaQuery({minWidth:x}) //mit minWidth funktioniert das so wie 

/* useMediaQuery ist ein react-responsive hook der dir einen boolean wert zurück gibt:
- wenn dein screen den min-width erreicht hat, dann ist der true, bis dahin ist es false. */

const isDesktop = useMediaQuery({minWidth:1040}) // das nutz du dann bei deiner animation:

let anima = {
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            duration: isDesktop ? "1":"3" //wenn es desktop ist, dauert die animation nur 1 sec, sonst 3 sec
        }
    }
}

/* aber was wenn du jetz mehrere breakpoints willst? dann machst du ganz einfach mehrere mediaquerys und gehst die mit "?" alle durch! */

const isdesktop = useMediaQuery({minWidth:1040})
const isLaptop = useMediaQuery({minWidth:540})
const isHandy = useMediaQuery({minWidth:240})

let anima2 = {
    hidden:{opacity:0},
    visible:{
        opacity: isdesktop ? 1: isLaptop ? "0.8" : isHandy ? "0.5" : "0", //bin hier durch die alle durch gegangen
        transition:{
            duration: isDesktop ? "1":"3" 
        }
    }
}

/* man kann das aber auch alles viel lesbarer notieren: */

const isdesktop2 = useMediaQuery({minWidth:1040})
const isLaptop2 = useMediaQuery({minWidth:540})
const isHandy2 = useMediaQuery({minWidth:240})

function getScreenWidth(sm,lg,xl){ 
    if(isdesktop2){ //WICHTIG: fange hier von gross nach klein an! laptop ist auch true wenn dekstop eigentlich true wäre, deswegen gross nach klein!!!
        return xl
    }else if(isLaptop2){
        return lg
    }else if(isHandy2){
        return sm
    }
}

/* und dann macht man sowas wie: */

let anima3 = {
    hidden:{opacity:0},
    visible:{
        opacity: getScreenWidth(1,0.8,0.5),
        transition:{
            duration: isDesktop ? 1:3 
        }
    }
}

/*
 merke dir die breakpoints (tailwind orientiert für gleichheit im layout):
  sm : 640 px = small screens, grössere handys
  md : 768 px = tablets
  lg : 1024 px = laptops
  xl : 1280 px = desktop
  2xl : 1536 px = grosse desktops, wide screens
*/

/* Responsive animations */

/* <AnimatePresence> */

/* mit <AnimatePresence> kann man das entfernen eines DOMS sehr gut animieren, erführt dazu das dass rausgehen smooth verläuft */

import { AnimatePresence } from "framer-motion"

const [zeigen,setZeigen] = useState(true)

useEffect(()=>{
    const timer = setTimeout(()=>{
        setZeigen(false)
    },3000)
    return ()=> clearTimeout(timer)
},[])

return(
    <>
        <AnimatePresence>
            {zeigen && (<motion.div>
                            <h1> hallo was geht </h1>
                        </motion.div>)}
        </AnimatePresence>
    </>
)

/* <AnimatePresence> */

/* <!FRAMER-MOTION!> */
    }

/* <!NEXT.JS-ROUTING> */

/* Bei Next.js ist der Schlüssel des routings ganz einfach die Ordner struktur von einem. wenn du willst das bei einem klick an deinem div, deine webiste
zu einer anderen seite geschickt wirst die du gemacht hast, dann erstellst du einen neuen ordner in deinem app-ordner und schreibst dort !WICHTIG!, un-
bedingt original "page.jsx/tsx" auf damit der inhalt des ordner überhaupt als website erkannt wird, was du dann machst ist durch <Link> das zu reffen... */

<>
<Link href={/* der name deines Ordners,z.B */ "/Infos"}><button> hier für mehr infos </button></Link>

{/* hier wirst du direkt zu deiner page.jsx geschickt im ordner /Infos, wenn du zurück in deine main-page willst kannst du dann sowas machen... */}

<Link href="/" /* das ist immer main-page */> <button> so geht es zurück </button></Link>

{/* wenn du aber jetzt eine neue website gemacht hast die von der struktur her gleich ist aber je nach dem was angeklickt wurde von den infos her einfach nur
anders ist wie z.B bei einer api request die ein objekt einfach nur detalierter zeigt, nutz du dynamische werte, hier sieht deine ordner struktur wie folgt aus */}

{/* app -> /ordner-deiner-wahl -> [parameter] -> page.jsx */}

</>

/* hier ist das so das sich deine URL ja so ändert, je nach dem welches objekt du angetippt hast, sagen wir mal du machst grade eine Obst website wo du jedes
Obst produkt aufzählst und die bei anklick zu einer seite geschickt werden wo die eine detaliertere ansicht haben. hier ist das dann so das wenn du z.B auf
einen apfel klickst, die URL dann "/ordner/apfel/page.jsx" wird wenn du das so als URL fest legst, wenn wir uns unsere dynamische URL angucken sehen wir das
sie eine ähnliche struktur hat nämlich "/ornder/[sorte]/page.jsx" und das fällt next.js auf!!! der geht nämlich durch die ordner struktur und denkt sich:
"ey die sehen ja echt ähnlich aus und warte, die dynmaische URL hat genau wo apfel steht einen dynamischen parameter, dann muss apfel der wert dafür sein!!",
was er dann macht ist den Wert "apfel" in einem param-objekt zu speichern worauf du durch den "useParams()" hook zugreifen kannst */

const param = useParams()
const sorte = param.sorte

/* eine ander schreibweise die viel schneller und simpler ist weil du da direkt destructest wäre: */

const { sorte2 } = useParams() // wenn ich [sorte2] als dynmaischen ordner hätte

/* hier ist es nochmal wichtig zu sagen das der schlüssel des param-objektes wo der dynamische wert deiner URL gespeichert ist genau so heist wie der
dynamische parameter, also wie hier [sorte] ist dann der schlüssel des params = param.sorte, und so können wir dann darauf zu greifen und es nutzen: */

return(
    <>
        <p> ich bin ein/e {sorte}</p>
    </>
)

/* !WICHTIG!: verlinke deinen variablen link so: <Link href={`/Detail/${item.id}`}> oder so <Link href={"/Detail/" + item.id}> */

/* <!NEXT.JS-ROUTING> */

/* <FONTS> */

    /* in next.js kann man super easy coole fonst hinbekommen, was man machen kann ist:
     -du gehst auf die website google.fonts und suchst dir eine aus die du haben willst
     -du impotest die dann auch */

import { Manrope } from "next/font/google"

    /* du erstellst dann eine variable AUSSERHABL DER COMPONENT FUNCTION wo du noch dinge nach deiner wahl änderst wie weigt oder style, usw */

        const manrope = Manrope({
            subsets:["latin"],  //sagt welche art von buchstabben
            style:["italic","normal"], //gibt dir alle arten von styles die dieser font haben kann
            weight:["500","600","700"] //alle weights die du willst
            //usw...
        })

        /* danach kannst du das auf lockerer-welle in dein Element einbauen und das dort noch weiter modelieren */

        return( //du machst dann einfach "variable.className"
            <h1 className={`${manrope.className} text-2xl shadow-2xl`}> {/* wichtig verwinde hier `` literals */}

            </h1>
        )
/* <FONTS> */

/* Next/image */
    import Image from "next/image"
import { useEffect, useState } from "react"

    return(
        <>
            <Image src={} width={} height={} className=""/> {/* nutze lieber das las <img>, ist besser */}
        </>
    )
/* Next/image */

/* <WEBISTE ONLINE STELLEN> */

/* der wichtigste schritt des web-baus, ist das online stellen der website. hier ist das so das du die ganze zeit auf deinem server "localhost" programmiert hast,
jedoch ist das nicht die URL die deine finalle website haben wird. deine website muss erstmal als viele statische HTML seiten exportiert werden, die jede mögliche
dynamische veränderung deiner website haben kann, das macht du durch eine next.config.js/ts datei die so aussieht: */

//next.config.ts im root-verzeichnis
import type { NextConfig } from "next" //ist ein bissl typescribt syntax

const nextConfig: NextConfig = {
  output:"export" // ist der ausschlag geber: macht die ganzen statischen HTML seiten
};

export default nextConfig;

/* wenn du das erledigt hast, gehst du ins terminal und tipps "npm run build", was zu deinem output-ordner führt der alle deine statischen HTML seiten hat (liegt im root-verzeichnis)
wenn du das alles jetzt hast, suchst du dir ein FTP-programm (auf deutch:Datenübertragungsprogramm, motto überträgt deine daten online), und gibst dort den INHALT deines output ordners */

/* wenn du aber jetzt pro update des codes deines webs das nicht immer wieder neu hochladen willst, erstellst du eine "deploy.mjs" datei: */


import "dotenv/config";
import FtpDeploy from "ftp-deploy";
const ftpDeploy = new FtpDeploy();

const config = { // die daten hier bekommst du vom Host, oder vom FTP-programm
  user: "f017756f",
  password: process.env.FTP_PASSWORD,
  host: "w009f86e.kasserver.com",
  port: 21,
  localRoot: "./out",           
  remoteRoot: "/htdocs/",
  include: ["*", "**/*"],
  deleteRemote: false,
  forcePasv: true,
};

ftpDeploy
  .deploy(config)
  .then(res => console.log("✅ Erfolgreich hochgeladen!", res))
  .catch(err => console.error("❌ Fehler beim Upload:", err));

  /* dann noch in deine package.js rein gucken und dort den "scribt" kurz anpassen: */

  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "export": "next export",
    "start": "next start",
    "lint": "next lint",
    "deploy": "npm run build && node deploy.mjs" // das hier muss du hinzufügen damit "npm run deploy" alles regelt für dich und du nicht alles manuell machen musst
  },

  /* jetzt wird deine website die online ist immer wieder auf dein code geupdatet wenn du "npm run deploy" angibst */

/* <WEBISTE ONLINE STELLEN> */


