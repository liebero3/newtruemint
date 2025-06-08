"use client"
import { motion } from "framer-motion"
    /* Hier werde ich TypeScript in seinen vollen zügen ausführlich erklären! */

    /* wofür ist ts überhaupt da? */
    //-ts macht dein code sicherer
    //-es macht dein code lesbarer
    //-es verhindert errors bevor sie geschehn
    //-dein code ist allgemein cooler
    //-jeder nutzt ts und du musst verstehen was es bedeutet

    /* <DIE BASICS> */

    //<TYP-ANMERKUNGEN>

    /* durch das anbinden des typs vor der deklarierung der variable, können wir logik error umgehen, weils sie frühzeitig in der Syntax schon erkannt werden */

    let Name: string = "Delo" //Name ist ab jetzt immer ein string
        Name = 20 //wirf ein error!

    /* diese typisierung ist wichtig weil schlimme durchbissene logik-fehler im code sehr früh erkannt werden und verhindern das der code später abstürzt */

    //Beispiel: Login-forum

    let alter: number = 20 //das ist das was der user eintippen sollte, was aber wenn er das falsch versteht?
        alter = "twenty" //dann würde ein error kommen!

    /* jetzt kommen einfach nur ein paar beispiele */

    let isCool: boolean = true

    let Rucksack : string[] = ["flasche","brotdose","plüschtier"]

    let keinAhnung : any = "jooo" // sagt durch "any" das es alles sein kann vom typ her, ist aber nicht gut, bissl gegen das wofür ts steht

    let Mensch: object = {name:"delo",alter:17} //kommen wir aber noch später zu sprechen, jetzt einfach nur ganz simpel

    let Zahlen: number[] = [10,23,30]

    let element: ReactElement = <div>Hello</div> //ein UI-element

    let rechner: (a:number,b:number) => number =  (a,b) => { return(a+b)} //das hier ist der typos "function" der besagt wie viele parameter, welche paramter (typos) und was der typ des returns ist

    /* du kannst einer sache auch erlauben mehrere typen sein zu können, oder zwischen denen wechseln zu können, durch: */

    //<TYP-UNIONS>

    let superTasche: (string | number)[] = ["hallo",20]

    /* oder wenn eine variable eines von 2 types sein kann, wie der user ein namen und eine id hat: */

    let user: number | string = 2123351608457
        
    /* wenn du aber typsicherheit auch in function haben willst musst du: */

    //<FUNCTION-TYPING>

    function Rechner(a:number,b:number):number{ //wir typisieren jeden parameter, und durch die typisierung der function auch den return wert
        return(a+b)// wichtig!!! ts weiss aber eigentlich von alleine schon das der return ein number ist, weil die parameter ein number sind, also hätte man 
                //sich die typisierung des returns sparen können
    }

    /* wir wollen ja das man in unserer Rechner function nur zahlen rein geben kann, und eine Zahl auch bekommen möchten, wenn wir das hier so 
    typisieren dann wird uns der error nicht erst geworfen wenn wir unser programm starten sonder schon währen wir coden,und um zu verhindern das irgend
    ein schnick schnack rauskommt, typisieren wir auch den return wert, nicht das und fehler geschehen die wir nicht berechnet hätten, wie z.B */

    Rechner("delo","dein Onkel") // sont wäre hier "delodein Onkel" rausgekommen

    //<OBJECT-TYPING>

    /* wenn wir z.B einen user machen wollen, würden wir ein probe-objekt erstellen mit allen keys den ein user haben sollte, wie: */

    let User = {
        id:1374920347,
        name:"mattheos",
        alter:17
    }

    /* ist ja alles schön und gut aber wie können wir jetzt dafür sorgen das jeder User immer gleich aussieht von der struktur, und es zu keinen Mutaionen kommt? */

    //durch Interfaces:

    interface User { //kein "="
        id:number,
        name:string,
        alter:number
    }

    /* nach diesem schemata wird jeder user gleich aussehen: */

    let user1: User = {
        id:123894028392750,
        name:"delo",
        alter:20
    }

    /* wenn du jetzt ein objekt des typs "User" erstellen würdest und er nicht diese 3 keys hätte mit genau den types, dann würdest du einen error bekommen! */
    /* also kannst du dir merken: dein Interface dient als "schablone" für deine objects die du später in diesem typos haben wills */

    /* wenn du aber bediengiale propertys hast, dann kannst du einfach ein "?" vor der typisierung setzten */

    interface Mensch {
        grösse: number,
        name: string,
        religion?:string //sagt das du bei objekten typ Mensch religion eingeben kannst oder auch nicht, wirft kein error
    }

    const Ich: Mensch = {
        grösse:1.85,
        name:"Delo",
        religion:"Yezide" //hätte ich hier aber auch weglassen können
    }

    //<TYP-ALLIAS>

    /* mit Typ-aliase kannst du deinen code viel lesbarer machen, in dem du den verschiedenen types einen Namen und somit auch Bedeutung gibst */

    type Name = string

    let username: Name = "Klaus" // mein typos sagt mir ein bisschen mehr über meine variable jetzt

    /* ich kann mit einem alias auch was sehr cooles machen: restricted variable value ,also das wenn meine variable einen bestimmten alias hat, er nur noch X-viele
    values haben kann durch unions, sonst kommt ein error */

    type Role = "admin" | "user" | "anonym" // das hier sind sogenannte "type-literals"

    const realUser: Role = "admin" //geht durch

    /* man kann auch sowas machen wie... */

    type Nutzer = {
        name: string,
        alter: number,
        rolle: Role
    }

    const realUser2: Nutzer = {
        name:"delo",
        alter:17,
        rolle:"admin" // kann da jetzt nicht sowas wie "chef" schreiben, es macht meinen code einfach professioneller
    }

    /* man kann aber auch eine art reverse engeniering machen wo man eine beispiel sache hat und diese dann zum type macht... */

    const objekt = {
        a:"immer",
        b:10
    }

    type objektType = typeof objekt //pass aber auf: hier werden die literal-types von a und b auch übernommen

    //<TYPE-LITERALS>

    /* er gibt ja in ts verschiedene types was eine variable sein kann, wie... */

    let Wort: string
    let Zahl: number
    let Objekt: object

    /* diese types erlauben dir die werte die eine variable haben kann, sie schreiben dir jedoch einfach nur eine struktur auf, z.b... */

    //muss ein string immer mit "" umhüllt sein
    //darf ein number keine Buchstaben haben
    //hat ein objekt eine bestimmte syntax mit {} und seine keys, usw

    /* aber type-literals sagen dir, das deine variable nur bestimmte werte haben darf, die prefixed sind, sowas hatten wir grade eben: */

    type Kontinente = "Asien" | "Europa" | "America" //usw...

    let meinKontinent: Kontinente = "Asien" // lässt nur eines der drei zu

    /* du kannst auch ganz simpel um das zu verdeutlichen das hier machen */

    let begrüssung: "hallo" = "hallo" // du hast hier den type "hallo", alles andere wäre error, selbst "Hallo" (in gross)

    /* also merke: ein Literal type ist, wenn meine variable nur bestimmte werte haben kann, weil mein types explizite werte nur als option des types gibt */

    //<ENUMS>

    /* durch enums bekommst du sowas wie "prefixed" antworten bezüglich deiner gemachten typs */

    enum HTTPstatus {
        OK = 200,
        FAIL = 404
    }

    let statuscode : HTTPstatus = HTTPstatus.OK

    //oder man kann auch sowas wie...

    function test(status:HTTPstatus){
        if(status === HTTPstatus.OK){
            console.log("alles lief super")
        }else if( status === HTTPstatus.FAIL){
            console.error(`hier lief was falsch ${HTTPstatus.FAIL}`)
        }
    }

    enum menschlicheInteraktion {
        Bergrüssung = "ja hallo, wie geht es dir",
        Verabschieden = "tschau, man sieht sich!"
    }
    console.log(menschlicheInteraktion.Bergrüssung)

    //TULPEN

    /* Tulpen sind nichst anders, als ein array, welches einen festen index an plätzen hat, mit einer strickten reihenfolge derer types: */

    type strictArray = [string,number,boolean]

    let myArray: strictArray = ["hi",10,true]

    let falseArray: strictArray = [10,"hi",true] //falsche Reihenfolge, wirft error

    //GENERICS!!!

    /* Generics sind eines der kompliziertesten themen in TS und können super viel machen */

    /* Generics sind nichts anderes als "dynamsiche typisierer" die deiner variable bei ihrer entstehung einen typ geben, seien es literal types oder normale */

    function Generics<elementTyp>(a:elementTyp){ // du erstellst den generic "<elementTyp>" der alles sein kann, aber sobald er bei der
        return a                                 // bei seiner erstellung einen typ hat, bleib der so.
    }
    let test2 = Generics(10) //hier bleib test2 ein number
    let test3 = Generics("hallo") //hier bleibt test3 ein string
    let test34 = Generics<boolean>(true) //hier bleibt test4 ein boolean, man kann den wert auch direkt mit geben

    /* und wenn du mit diesen variablen weiter arbeiten willst, führt deren nun gesetzter typos zu mehr sicherheit in deinem code! */

    /* sehr sehr wichtig, merke dir das generics dynamsich sind! was man mit Generics auch machen kann ist deren typen direkt der variable mit geben! */

    function getTest<T>(typ:T){// T steht einfach für type
        return typ
    }

    let erster = getTest<number>(10) // er hätte das hier auch einfach so gemacht, aber für zukunft ist es wichtig das du weist das dein generic oft als
                                    // "varaible" dienen kann um dann den typ der variable zu bestimmen

    /* aber halt, Generics sind noch so viel mächtiger, man kann die z.B auch in types verwenden! */

    type API<Data> = { //btw: ein interface oder einen type zu machen bei einem objekt ist fast identisch und funktional das gleiche
        data: Data,
        id: number
    }

    let fetcher : API<{name:string, alter:number}> = { //wir geben hier mit, wie unser generic aussehen soll!
        data:{
            name:"chello",
            alter: 20
        },
        id:1
    }

    /* was wir auch machen können ist, durch generics verschiedene arten von api calls zu bestimmen! */

    type UserFetch = API<{name: string, alter: number}> //bestimme hier das mein generic-type ein objekt mit diesen keys sein muss mit diesen types
    type BlogFetch = API<{title:string, date: number}> // das gleiche hier aber für blog posts

    // ich hätte noch ätliche beispiele machen könnne

    let blog: BlogFetch = {
        data:{
            title:"willkommen",
            date:20.1
        },
        id:1203892
    }

    /* also merke dir: ein generic ist einfach ein dynamischer typ geber der deiner produkt variable einen literal type oder normalen type mit geben kann*/

    //<EXTENDS>

    /* "extends" ist ein multitool befehl der dir einiges erlaubt, es bedeutet aber in seiner Grundidee "erweitert" oder "erlaubt", vlt auch
    "erfüllt die anforderrungen von", und das kann man auch in seiner funktionsweiste erkennen */

    interface mindestPerson {
        name:string
    }
    interface normalPerson extends mindestPerson { //hier sage ich einfach: nP ist eine erweiterung von mP, das bedeutet er hat auch alle seine eigenschaften wie bei OOP
        alter: number
    }

    /* bei types würde man aber nicht den Befehl "extends" nutzen sondern "&" */

    type lowHuman = {
        name:string
    }
    type normalHuman = lowHuman & { //ganz simpel durch "&"
        alter:number
    }

    /* extends kann man aber auch als limiter oder mindest anforderung nutzen, so wie bei Generics */

    function Lol<T extends string>(a:T){ //hier sage ich: T muss mindestens ein string sein
        return a
    }
    let hallo = Lol("hallo")

    /* dieses Beispiel dient nur zur veranschaulichung und war ein bisschen doof, besser würde es z.B hier aussehen */

    type perfectObject<T extends {id:number}> = { // das hier sagt: "mein Generic muss immer id haben egal was er noch rein macht"
        data:T
        name:string
    }
    let testObject: perfectObject<{id:20,location:string}> = { // hätte ich hier id vergessen würde es zu einem error kommen, bei location ist jucka
        data:{
            id:20,
            location:"düsseldorf"
        },
        name:"delo"
    }

    /* dann gibt es da noch conditional extends was aus deinen werten einen einfache boolean wert ziehen kann: */

    type IsString<T> = T extends string ? true : false;
    type A = IsString<"hi">; // true
    type B = IsString<42>;   // false

    /* <DIE BASICS> */

    /* <TYPE-SCRIPT IN REACT/TSX> */

    //<PROPS-TYPISIERUNG>

    /* bei tsx ist es super wichtig das man seine props vorher typisiert um sicher infos von einer komponente der anderen zu übergeben, man kann */

    //Mit Interface

    interface Prop {
        name:string,
        alter:number
    }
    export const komponent = ({name, alter}:Prop) =>{ // du darfst hier keine werte mitgeben!
        return(name && alter)
    }
    komponent({name:"delo", alter:17})

    //Inline

    export const Komponente = ({name, alter}:{name:string,alter:number}) =>{ // du darfst hier keine werte mitgeben!
        return(name && alter)
    }

    /* und wenn du später deine Komponente iwo importest, müssen deine props diese spezifischen typos haben */

    //<HOOKS>

    /* bei UseState typisierst du deinen anfangs wert durch einen Generic, der dir sagt was dein Anfangswert ist, und was er auch nur werden darf */

    const [count, setCount] = useState<number>(0) //hier mit sage ich, das count eine zahl sein muss und setCount nur zahlen animmt

    type normalUser = {
        name:string,
        age:number,
    }

    const [infos,setInfos] = useState<normalUser | undefined>(undefined) //sogar recht gängig damit der code nicht abbricht wenn noch kein user da ist

    /* bei useRef ist das eigentlich genau gleich: */

    const ref = useRef<HTMLAnchorElement>() //sagt hier einfach das sein .current ein DOM-Element sein muss

    //<UTILITY-TYPES>

    /* utillity types dienen einfach nur dazu das deine generics der variable (eig nur objekte) spezifisch, deren umgang mit den types nach deinem willen geändert wird: */

    type derNutzer = {
        name: string,
        alter:number
    }

    //Partial<T>

    const parialUser: Partial<derNutzer> = { //macht alle keys zu "?"
        name:"Anna"
    }

    /* das was partial macht ist, das jeder typos und jeder key optional werden, also sozusagen: */

    type derNutzerCopy = {
        name?:string,
        alter?:string
    }

    //Required<T>

    const requiredUser: Required<derNutzer> = { //macht so, das alle optionallen keys jetzt pflicht sind
        name:"anna",
        alter:20
    }

    /* wenn  dein type name?:string und alter?:number hatte also das diese keys optional waren dann sind die jetzt pflicht, also "reverse partial" */

    //Readonly<T>

    const readonlyUser: Readonly<derNutzer> = { // macht dein objekt "schreibgeschützt", keys können nicht ausserhalb geändert werden
        name:"lol",
        alter:77
    }
    readonlyUser.name = "johannes" //Error!

    /* durch den Readonly utillity type ist das so das man die values nach dem deklarieren nicht mehr ändern kann extern */

    //Record<K, T>

    /* Record<K, T> ist ein bisschen komplizierter, hier ist das so das K für "Keys" steht, und "T" für den Typ der Keys: */

    const recordUser: Record<number,string> = { //hier sage ich einfach das meine keys numbers sein sollen und meine types string
        12:"alter",
        20:"hunger"
        
    }

    const recordUser2: Record<"ich",number> = { // jetzt nochmal ganz stumpf einfach für die syntax
        ich: 12
    }

    type trueUser = "admin" | "user" | "anonym"

    const recordUser3: Record<trueUser,number> = { //eine Zuteilung von nummern je nach dem welchen titel der user hat, kann man dann als synonym verwenden
        admin:10,
        user:2,
        anonym:133
    }

    //Pick<T, K>

    /* pick ist hier auch eines der komplexeren, und sagt eigentlich nur "vom Typ... will ich nur die key(s)..." */

    type bestUser = {
        name:string,
        alter:number,
        favFood:string
    }

    const pickyUser: Pick<bestUser, "name"> = { // wollte vom typ bestUsers nur den key "name"
        name:"lol"
    }

    //Omit<T, K>

    /* Omit ist bisschen wie der "reverse Pick", weil man hier einen Typ T nimmt mit aller sammt seiner Eigenschaften, ausser die von K */

    const omitUser: Omit<bestUser, "favFood"> = { //ich will vom typ "bestUser" alles ausser "favFood"
        name:"name",
        alter:20
    } 

    //Exclude<T, U>

    /* Exclude sagt nichts anderes als "zieh aus dem typen "T", alle typen "U" raus " */

    type actionEvents = "scroll" | "click" | "hover"

    type bannedActions = "scroll"

    function possibleEvents(event: Exclude<actionEvents,bannedActions>): void{
        console.log("ich bin "+ event)
    }

    //Extract <T, U>

    /* ist wie ein reverse Exclude wo er nur die keys T aber jetzt nimmt die auch in U vorkommen */

    type bsp1 = {
        name:string,
        alter:number,
        schanger:boolean
    }
    type bsp2 = {
        name:string,
        hunger:boolean,
        verheiratet:boolean
    }

    type bsp3 = Extract<bsp1,bsp2> //also nur "name"

    //NonNullable<T>

    /* entfernt einfach "null" und "undefined" aus T */

    type bsp4 = null | undefined | string

    type bsp5 = NonNullable<bsp4> //kommt nur string

    //Returntype<typeof T>

    /* das ist super niche und eigentlich kaum zu gebrauchen, das einzige was es noch mehr macht ausser nur "typeof" ist nur den return-wert einer function zu be-
    trachten wenn du davon den type willst, und nicht der function noch sagen das sie eine function ist, vielleicht weil man damit noch weiter arbeiten will oder so */

    function bsp10(){
        return 10
    }

    type returntype = ReturnType<typeof bsp10> // da kommt number, und nicht ()=> number so wie bei typeof

    //Parameters<typeof T>

    /* parameters gibt dir einfach alle types der parameter der function T als tulpe zurück */

    function vieleParams(a:string,b:number,c:boolean){
        return(a+b+c)
    }

    type myParams = Parameters< typeof vieleParams> // [string,number,boolean]

    //nutzen der utility-types

    /* bei utility types ist das nicht so das du wie bei dynamischen generics das typos deiner variable noch kommen muss, und du deswegen so eine syntax haben musst: */

    function Genericonos<T>(a:T){ //muss meine Generic variable vorher erstellen und dann meinem parameter zuweisen
        return a
    }

    type cool <T> = { // wieder dieses "vorher deklarieren"
        status:T
    }

    /* ich kann mein Generic einfach direkt als typos meiner value oder meinem parameter übergeben! */

    let Zeigen = (a:Partial<User>) => { //direktes typen
        return a
    }

    let coolUser: Exclude<User,bestUser> //einfaches typisieren

    //<MAPPED-TYPES>

    //<PROPS>

    //Props-allgemein

    export function Komponentes(props){
        return(
            <div>
                <p> hallo ich bin {props.name} und bin {props.alter} alt </p>
            </div>
        )
    }

    /* ein prop ist nichts anderes als variablen die du deiner komponente mit gibst, die du dann beim import bestimmst */

    import { Komponentes } from "/test"

    <Komponentes name="delo" alter={17}/> // bestimme die variablen hier beim import 

    /* das was mein prop ist, ist nichts anderes als ein Objekt mit den infos den ich denen variabel mitgeben möchte als key des objekts, mein prop sieht z.B jz so aus */

    const prop = { //genau dieses objekt bekommt meine komponente mit gegeben die ich dann beim import definiere
        name,
        alter
    }

    /* da ein prop ein objekt ist, können wir das auch destructen damit das schöner aussieht: */

    export function KompoMompo({name, alter}){
        return(
                <div>
                    <p> hallo ich bin {name} und bin {alter} Jahre alt </p>
                </div>
        )
    }

    /* du kannst auch, damit bei "name" und "alter" nicht undefined rauskommt und dein code kacke wird, default werte geben die kommen, wenn name und alter nicht definiert sind: */

    export function KompoMompo2({name="unbekannt", alter=0}){ //wird nur gezeigt wenn beide props noch kein value haben
        return(
                <div>
                    <p> hallo ich bin {name} und bin {alter} Jahre alt </p>
                </div>
        )
    }

    //Children!!!

    /* children sind ein super duper wichtiges schlüssel-prop in der syntax, welches wir eigentlich schon von useContext kennen! */

    export function childExport({children} : {children: React.ReactNode}){ //bissl ts syntax, sage einfach nur das children vom typ her ein JSX-Element ist
        return(
            <div classeName=" border-2 border-black rounded-2xl">
                {children} {/* hier kommen deine Kinder-elemente JSX-Elemente rein die gerendert werden*/}
            </div>
        )
    }

    /* deine Komponente sieht dann so aus: */

    <childExport>
        <p> hallo was geht</p>
        <p> ich bin der delo </p>
    </childExport>

    /* also wir halten fest: durch den child-prop erlaubst du das deine Komponente, JSX "umhüllen" kann und diese aufnimmt und in der UI aufzeigt */

    //Typescript props

    /* bei ts ist das so das du deine props immer vorher typisieren musst und dazu gibt es eigentlich 2 gängige wege: */

    export function miniTest({ name, alter}:{ name:string, alter:number}){ //direkt vor Ort typisieren

        return<p>hallo ich bin {name} und bin {alter} jahre alt </p>
    }

    type Props = {
        name: string,
        alter: number
    }

    export function testMini({name,alter}:Props){ //custom prop-object-type und den dann mit dem typisieren

        return<p>hallo ich bin {name} und bin {alter} jahre alt </p>
    }

    /* man kann auch dei "..." operatoren nutzen! */

    type theProp = {
        name:string,
        alter:number,
        id:number,
        isPregnant:boolean
    }

    export function opertorTest({name,...rest}:theProp){
        return<p> hallo ich bin {name} und {rest} </p>
    }

    //Generic-proptyping!!!

    /* wir wissen ja das Generics dynamische platzhalter des typos unserer variable sind, und diese können wir auch den Porps zu schreiben!!! */

    export function test10<Tname,Talter>({name,alter}:{name:Tname,alter:Talter}){ // name und alter können unterschiedliche types sein, wenn die einmal eins haben bleiben sie aber auch dieser!
        return(
            <>
                <p> hallo ich bin {name} und bin {alter} jahre alt </p>
            </>
        )
    }

    //man kann das auch so schreiben:

    type genericProps<Tname,Talter> = {
        name:Tname,
        alter:Talter
    }

    export function test12<TnameGen,TalterGen>({name,alter}:genericProps<TnameGen,TalterGen>){ //die Generics die in deinen Props/Parametern vorkommen müssen immer bei der function bennant werden!
        return(
            <>
                <p> hallo ich bin {name} und bin {alter} jahre alt </p>
            </>
        )
    }

    /* was ich hier eigentlich mache: */

    /* ich habe hier einfach ein type erstellt wo ich sage: "ey, das hier sind meine keys "name" und "alter", die nicht den gleichen typos haben müssen
    (deswegen auch 2 generics) aber sobald die einen haben, diesen auch behalten sollen!", diese strucktur hätte ich gerne bei meinen props auch, das die 
    ein objekt sind mit genau dieser struktur (also diesen keys) und deren type erst später bekommen und da sie halt auch props einer function sind, muss
    ich die generics da definieren die ich meinen props dann zuweise, das ich das wichtigste bei der generic-prop-typisierung!!! die generics bei meinem type
    sind einfach platzhalter für den typos meiner keys */

    /* also wir halten nochmal fest: die generic typisierung von props ist genau so wie die der parameter einer function, nur das mein prop immer ein object ist */

    //Prop-functions!!!

    /* befor wir klären wie mein eine function als prop abgibt, vertiefen wir uns in das thema wie man eine function "typisiert" */

    let functionTest = (a:number,b:number):number =>{return(a+b)} //wir geben hier die types unserer parameter und (optional) den type unseres returns an

    /* wenn wir aber das ganze strickter typen möchten, tun wir das so: */

    let functionTest2: (a:number,b:number) => number = (a,b) => { return a+b} //strickte anzahl der paramter, klarere übersicht der types

    type myFunction = (a:number,b:number) => string //hier nochmal das gleiche, aber einfach als "type"
    
    let functionTest3: myFunction = (zahl1,zahl2) => {return(`ich bin ${zahl1} und ich ${zahl2} `)}

    //type void

    /* void ist ein gängiger begriff der bei functions als type eingegeben werden kann, und bedeutet einfach "meine function hat keinen return-wert" */

    let Leere = (a:string):void => { console.log("ich bin leer" + a)}

    /* aber man kann trotzdem noch super viel machen, wie dinge updaten und dinge umspeichern, allgemein einfah ein codeblock der bei aufruf geschieht aber nichts zrück gibt */

    const [info,setInfo] = useState<string>("")

    function wertGeben(text:string):void{
        setInfos(text)
    }

    /* und genauso läuft das mit den props in react  */

    /* du darfst nicht vergessen: props sind einfach nur variablen die in deinem Kind vorkommen aber im parent definiert werden, das gilt auch bei functions! */

    export default function Kind({diefunktion}:{diefunktion:(a:number,b:number)=>number}){
        return(
            <>
                <button onClick={diefunktion(10,20)} ></button> {/* extra infos!!! mehr dazu gleich */}
            </>
        )
    }   

    /* im Parent würde dann sowas stehen wie: */

    import child from "/kp-amk"
import { href } from "react-router-dom"
import { forwardRef, useContext, useEffect, useRef } from "react"

    export const Papa = () => {
        function Rechner(a:number,b:number){ // unsere function die wir mitgeben wollen, die sich genau an die struktur des typos hält
            return(a*b)
        }
        return(
            <>
                <Kind diefunktion={Rechner}/> {/* hier geben wir sie mit */}
            </>
        )
    }

    /* wie ihr an unserem Beipsiel gesehen habt, haben wir in unseren child das genaue rezept unserer function geben, also wie wir sie erwarte, und diese auch bekommen */

    /* eine sehr wichtige sache ist aber noch, das wir durch functions als prop, infos vom child zum parent geben können! */

    <button onClick={diefunktion(10,20)} ></button>

    /* hier können wir sehen, wie wir die die zahlen mit denen wir rechnen wollen, dem parent geben indem wir die parameter der function beim kind schon definieren! */

    //also wir halten fest: die durch die definierung unserer parameter der prop-function, können wir infos vom kind zum parent geben

    //<ABSOLUTER-DOM-EXKURS>

    //Grundlagen

    /* was ist DOM überhaupt? */

    /* DOM steht für "Document Object Model" und ist eines der wichtigsten Begriffe zu verstehen im ganzen Front-end!!! */

    //stell dir vor du hast hier dein HTML:

    return(
       <hmtl>
            <header>
                <title>das ist meine website!</title>
            </header>
            <body>
                <h1>hallo ich bin die überschrift</h1>
                <p> hallo ich bin die unterschrift</p>
            </body>
       </hmtl>
    )

    /* der Browser liest jetzt dein HTML code von oben nach unten und erstellt ein !Baum-struktur mit hierarchie wo jeder dieser HTML-Tags ein js-object ist: */

    document → { //diese Objekt-struktur kreiert der borwser jetzt nicht genau aber man kann die sich so vorstellen
        html: {
          head: {
            title: "das ist meine website!"
          },
          body: {
            h1: {
              innerText: "hallo ich bin die überschrift"
            },
            p: {
              innerText: "hallo ich bin die unterschrift"
            }
          }
        }
      }

      /* was der browser wirklich kreiert ist eine baum-struktur aus diesen objekten. die vernestung der Bäume ist genau so wie bei deinem HTML-code: */

      document //oberste schicht ist hier "document", das musst du nicht selber im code haben, das ist einfach nur die wurzel des Baumes deiner HTML-Tags seite
        └── html
            ├── head
            │     └── title
            └── body
                ├── h1
                └── p

   /* der Grund warum document ganz oben bei deinem DOM-Baum steht liegt daran weil er als einen Art zugriffspunkt deines DOM-Baumes von deinem HTML-Code dient, die DOM-Welt ist nämlich viel grösser: */

    /* die wurzel von absolut allem ist "window", die ist für dein Web ganz simpel gesagt "die welt" weil sie wirklich alles beeinhaltet */

    window //das hier ist der wahre baumstamm, aber da window genau so wie die anderen syntax-functions immer da sind in jedem web fokussieren wir uns auf unseren document-baum
        ├── document  ← Das ist dein DOM-Baum
        │   ├── html
        │   │   ├── head
        │   │   └── body
        │   └── Methoden wie .querySelector()
        ├── console
        ├── location
        ├── alert()
        ├── setTimeout()
        └── ...

    /* Merke dir: window hat ALLES, also wirklich ALLES was von der global-gegebenen DOM welt gibt, und das als JS-Object sogar!, du kannst da */

    /*
            🧱 1. DOM-Zugriff
        document → Einstiegspunkt in den DOM

        location → Infos zur aktuellen URL

        navigator → Infos über den Browser (z. B. Sprache, Gerät)

        history → Zurück-/Vorwärtsnavigation

        🗃️ 2. Speicher
        localStorage

        sessionStorage

        indexedDB

        caches → Service-Worker Cache API

        🧰 3. Timing und Events
        setTimeout, setInterval

        requestAnimationFrame

        addEventListener, dispatchEvent, removeEventListener

        📞 4. Kommunikation
        fetch

        WebSocket

        postMessage

        XMLHttpRequest (alt)

        🪟 5. Fenster- und Bildschirmbezogenes
        alert, confirm, prompt

        open, close, print

        innerWidth, innerHeight → Größe des Browserfensters

        screen → Bildschirmdaten

        📚 6. Globale Konstruktoren und Funktionen
        Array, Object, Map, Set, Date, Function, Error ...

        parseInt, isNaN, eval, encodeURIComponent ...

        🧠 7. Dev-Tools bekannte Sachen
        console

        performance

        debugger
    */

      /* und das sind nur einige beispiele */

      /* Da unser web alles als JS-Object hat, können wir somit auch mit js darauf zugreifen, es umändern und manipulieren wie wir wollen! */

      //wir kennen das von vanilla js:

      const button = document.getElementById("Btn") //ich greife hier auf mein document-object ein und nehme darauf ein element mit der id "BTN"

      function titelÄnderer():void {
        button?.innerText("ich wurde geklickt") //hier ändere ich was im button steht
      }

      button?.addEventListener("click", titelÄnderer) //hier hänge ich ein eventlistener an mein DOM-Element dran

      /* Nochmal zusammengefasst: der DOM ist einfach nur unser HTML oder JSX code, wo jeder Tag zu ein js-object gemacht wird und eine hierarchie in dem gemachten
      baum-diagramm annimmt, wo ich auch alle objects mit js so umändern kann wie ich will! */

      //useRef()

      /* befor wir auf die DOM-eigenschaft gehen, vorher die basics: */

      const wort = useRef("hallo") //useRef erstellt immer ein objekt mit dem key "current" der die value deiner variable trägt, also hat mein wort.current = "hallo"

      wort.current = "tschüss" // hab die value geändert

      /* das besondere ist: das ändern meiner value führt zu keinem rerender so wie es bei useState eigentlich der fall wäre! */

      function refÄndern(e:React.ChangeEvent<HTMLInputElement>){ //mehr zu dem typos gleich
        wort.current = e.target.value
      }

      <input onChange={refÄndern}/> //das hier würde zu keinem rerendern führen!

      /* jetzt kommt der knaller: useRef kann auch DOM-Elemente als value haben! */

      const myButton = useRef()

      return<button ref={myButton} ></button> // somit ist myButton.current jetzt dieser <button> 

      /* das erlaubt mir jetzt jede mögliche DOM-function zu machen! */

      const buttonManipulation = () =>{
        myButton.current.focus() //fokussiert den Button
      }

      <button ref={myButton} onMouseOver={buttonManipulation}></button>

      // forwardRef() (und createRef() ein bisschen)

      /* die sache bei useRef und seiner DOM-aufnahme als value ist, das sie bei semantischen HTML-Tags nur bei deren scope sie als wert haben kann */

      export const GehtKeinRef(){
        return(
            <>
                <h1> hallo mallo ich bin xalo </h1>
                <input className=" w-2xl h-0 border-2 rounded-2xl"/>
            </>
        )
      }

      /* sagen wir mal ich will jetzt meine komponente in meinen parent importen und dort was an meinem input rumtüfteln, dann würde ich doch: */

      const myRef = useRef()// ich würde ja erstmal mein ref machen würd ich denken

      function refRumTüffteln(){ //falls ich noch ein prop mitgeben würde der ein eventlistener wäre
        myRef.current.focus()
      }

      <GehtKeinRef ref={myRef}/> // und hier würde ich ja meinem ref den input meiner komponente als value geben wollen aber... !FALSCH!

      /* das was wir vorhatten kann ja garnicht klappen, wie soll es den bitte? so machen wir einfach nur den ref an unserer komponente was ja eh nicht klappen kann,
      da würde einfach "null" raus kommen! um den HTML-Tag innerhalb unserer komponente als value zu bekommen, müssen wir forwardRef nutzen! */

      /* forwardRef ist eine function, die mir erlaubt das ich bestimmte tags des childs auch vom parent reffen kann: */

      export const RefTest = forwardRef(({name,alter}:{name?:string,alter?:number},ref)=>{//funtion nimmt 2 parameter: einmal normal die props, dann "ref"-objekt
        return(
            <>
                 <h1>hallo ich bin {name} und bin {alter} jahre alt </h1>
                <input ref={ref}/> {/* wie bei einem normalen prop setze ich das hier als variable frei was dann von meinem parent bestimmt werden kann */}
            </>
        )
      })

      import RefTest from "/kpman"

      function main(){
        const meinRef = useRef()
        return(
            <>
                <RefTest ref={meinRef} />
            </>
        )
      }
      /* eigentlich würde man sich denken: hä, nimm doch ref einfach als ein weiteres key deines props und setze das einfach dem ref deines child gleichs,
      aber das problem ist das ich diesen DOM im child nur mit useRef() überhaupt den wert einnehmen kann, und useRef diesen wert ja selber komplexer als objekt
      in seinem .current key speichert, deswegen muss ich ein objekt erstellen was genau so wie useRef aussieht (ref ist also ein objekt mit dem .current value) */

      //typing 

      /* das typisieren deiner refs ist eigentlich einfach, eig genau so wie bei useState */

      const reffer = useRef<HTMLInputElement>() // der type ist ein <input/>

      /* usw, von denen gibt es unzählige */

      //<RENDERING>

      /* das Rendern ist ein absoluter schlüssel akt bei react und besteht aus mehr phasen und schritten als man denkt: */

      /* react kreiert immer ein virtual DOM von deinem browser dom was so ähnlich ist wie das javascriptisieren des DOMs was er eh immer schon tut aber noch viel
      günstiger damit zu arbeiten was ungefähr so aussieht: */

      const virtualDOM = {
        type: "div",
        props: { className: "test" },
        children: [
          { type: "h1", props: {}, children: ["Hallo!"] },
          { type: "p", props: {}, children: ["Ich bin ein Absatz."] }
        ]
      }

      /* was react bei diesem virtual DOM jetzt tut ist, bei einem trigger welches die änderung eines States oder Props ist, einen "rerender" auszulösen!
      ein rerender ist nichts anderes als das sich react jetzt den neuen virtual DOM (der wo der geänderte prop oder state ist) und den alten und guckt,
      welcher minimale unterschied jetzt da ist, diesen berechnet er und gibt in in der commit phase den echten DOM damit er sich darauf updatet! */

      /* es wird immer ein rerender ausgelöst und dem echten DOM übergeben wenn sich ein state oder prop ändert, egal ob es die UI ändert oder nicht */

      //useEffect

      /* useEffect ist ein hook welches 2 parameter einimmt, eine function und ein array an dependencies die bei änderung die function wieder triggern
      das geile bei useEffect ist, ist das sein erster parameter immer nach dem rendern ausgelöst wird */

      const [refresh,setRefresh] = useState(0)

      useEffect(()=>{
        async function fetching(){
            //fetche hier daten
        }
        fetching()
      },[refresh])

      /* aber achtung! wenn useEffect selber ein render immer wieder auslöst, dann endet man in einer endlosen loop! */
      
      /* man kann also in useEffect jegliche logik die man haben möchte aufschreiben und diese wird immer nach dem rendern ausgeführt! */

      //USECONTEXT

      /* useContext() ist eine essenzielle function, vorallem innerhalb von component-libs, weil dieser Hook dazu genutzt wird um informationen innerhalb der sibling
      components oder elements zu teilen! */

      export interface laUser {
        name:string,
        alter:number
      }

      //createContext()

      export const meinContext = createContext<laUser | undefined>(undefined) //als erstes erstellen wir einen context, und geben ihn einen fallback wert, den echten werten für später über "value" geben

      //Context.Provider

      import { meinContext } from "/context"
      import { laUser } from "/context"

      export default function MeinTest(){
        const [name,setName] = useState<string>()
        const [alter,setAlter] = useState<number>()

        function namenHandler(e){
            setName(e.target.value)
        }
        function alterHandler(e){
            setAlter(e.target.value)
        }
        const derUser : laUser ={
            name:name,
            alter:alter
        }
        return(
            <>
                <meinContext.Provider value={derUser}> {/* hier definiere ich den wert meines Users */}
                    <Header/>
                    <UserProfile/>
                </meinContext.Provider>
                <input type="text" onChange={namenHandler} placeholder="name"/>
                <input type="text" onChange={alterHandler} placeholder="alter"/>
            </>
        )
      }

      //useContext()

      /* in meinen componenten jetzt: */

      import { meinContext } from "/context"

      export function Header(){
        const user = useContext(meinContext)
        return(
            <>
                <div>
                    der User ist {user.name} und ist {user.alter} alt!
                </div>
            </>
        )
      }

      //<FRAMER-MOTION>

        /* hier werde ich alles Ã¼ber framer-motion erzählen!*/

        import { useState } from "react"
        import { AnimatePresence } from "framer-motion"
        import { clipPath } from "framer-motion/client"
import { createContext } from "vm"

        //<BASICS!!!>

        /* nochmal zur aufrischung wie framer motion funktioniert */

        <motion.div initiall={{/* anfangs-zustand */}} animate={{/* end-zustand */transition:{/* animations-verlauf */}}}>
        {/* children */}
        </motion.div>

        /* framer motion kann die 2 states auch durch "variants angeben */

        let PapaVariant = {
        initial:{
            opacity:0
        },
        animate:{
            opacity:1,
            transition:{
                duration:1,
                staggerChildren:0.5
            }
            }
        }

        let KinderVariant = {
        initial:{
            opacity:0
        },
        animate:{
            opacity:1
        }
        }

        return(
        <>
            <motion.div var={{PapaVariant}} initial="initial" animate="animate">
                <motion.div var={{KinderVariant}}>
                    <p> hallo was geht </p>
                </motion.div>
            </motion.div>
        </>
        )

        //wie funktioniert framer-motion

        /* framer-motion nimmt sich die Eigenschaften deines anfangsstates "initial", und animiert ihn zu dem endstate "animate"
        was framer-motion da aber animiert sind die numerischen CSS-Eigenschaften deines elementes */

        /* framer hat eine bestimmte typisch smoothe art wie sie vom "initial" zu "animate" geht, aber du kannst durch transition
        die art und weise wie das ganze animiert wird nahch deinem willen Ã¤ndern!! */

        //Transition

        /* bei transition spielt eine absolute schlÃ¼ssel rolle, welchen "type" du genommen hast, und davon gibt es 2 gÃ¤ngige: */

        interface transition{
        type:"spring" //lÃ¤sst deine animation wie bei einer "sprung-feder" sein

        stiffnes:100 //sagt wie steif deine feder ist, also wie schwert zu ziehen in dem sinne

        damping:10 //wie stark deine feder abbremst sozusagen

        mass:1 //Motto ein unimix fÃ¼r beide

        bounce:0.3 //sagt wie das animierte wie bei einer echten feder am ende zurÃ¼ck springen soll

        //usw...
        }

        interface transition{
        type: "tween" // das ist eine einfache animationskurve

        duration:1 //die lÃ¤nge der animation (geht bei type:"spring" nur indirekt)

        delay:0.5 //bis wann die animaiton sich verzÃ¶gern muss befor sie anfÃ¤ngt

        ease:"easeInOut" //das "gefÃ¼hl" der animation= die zeitliche kurve, davon gibt es mehrere:
            ease: "linear"
            ease: "easeIn"
            ease: "easeOut"
            ease: "easeInOut"
        
        repeat:5 / infinity //die anzahl der animationen, er hat auch seine eigenen kleinen attribute:
            repeatDelay:0.5 //wie sich die weiderholungen der animatinen verzÃ¶gern
            repeatType:reverse //die Art der wiederholung
        }

        /* es gibt noch einen dritten type den man bei drag animations macht, aber er ist sehr niche und nur da zu gebrauchen: */

        interface transition {
        type:"inertia" //animiert die physik der animtion des gedraggten elementes
        //usw, ist jetzt eigentlich nicht wichtig
        }

        //Animation-trigger */

        /* bei framer-motion ist der trigger der animation normaler weise immer der render der website, dies kÃ¶nnen wir aber Ã¤ndern! */

        //whileInView
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true, amount:0.2}}></motion.div>

        /* whileInView sagt das der endstate deines elements nur anfÃ¤ngt animiert zu werden wenn es auch im sichtfeld des
        users ist, und viewport gibt dir noch zusÃ¤tzliche bediengungen fÃ¼r das "sehen des users" */

        interface viewport {{
        once:boolean //sagt ob die animation nur beim ersten sehen getriggert wird oder Ã¶fter
        amount: 0-1 / "all" / "some" //sagt wie viel vom element gesehen werden muss damit die animation getriggert wird
        margin:px //das gleiche wie amount, aber es sagt in welchem margin (also ausserhalb der grÃ¶sse deines elementes) die animation schon getriggert werden soll, z.B 50px befor man das element sieht
        root: HTMLElement //sagt das der trigger der animation deines elementes ein anderes DOM-element sein soll
        }}

        //CSS-Eventlistener, wie z.B whileHover
        <motion.div initial={{opacity:0}} whileHover={{opacity:1}}></motion.div>
        /* genau so wie bei CSS, davon gibt es mehrere die alle einfach nur die CSS dinger als event listener haben */

        //Layout und Layoutid

        /* layout und layoutid sind unglaublich mÃ¤chtige props die animationen, die das layout Ã¤ndern (also wenn sich dein
        element vergÃ¶ssert oder seine position Ã¤ndern) smooth zu machen */

        const [big,setBig] = useState(false)

        return(
        <>
            <motion.div
            onClick={()=>setBig(!big)}
                layout //einfach layout als prop schreiben
                className={ big ? "w-100" : "w-3xl"} //die zwei states, man hÃ¤tte auch "initial" und "animate" nehmen kÃ¶nnen
                transition={{ // der animationsverlauf von a nach b, ist aber nur optional
                type:"spring",
                stiffness:200,
                damping:100
                }}>
                <p> ich werde grÃ¶sser wenn man mich antippt!</p>
            </motion.div>
        </>
        )

        /* wenn du aber immernoch dein element richtig animieren willst, kannst du das auch tun! */

        const [bigger,setBigger] = useState(false)

        return(
        <>
            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                layout
                className={ big ? "w-100" : "w-3xl"}>
                <p> ich werde grÃ¶sser wenn man mich antippt!</p>
            </motion.div>
        </>
        )

        /* layoutid nutzt du, wenn dein element sich zu einem neuen element animiert, mit der id weiss react "ah ok, das sind
        jetzt nicht 2 verschiedene DOM elemente sondern noch der gleiche wegen der gleichen id!" */

        const [wechsel,setWechsel] = useState(true)

        { wechsel ?

        <motion.div
            layoutid="gleich" //dient dafÃ¼r das js weiss das dass hier das gleiche element sind
            key="normal" //dient dafÃ¼r um zu zeigen das die zwar das gleiche element sind, aber trotzdem anders
            className="w-5xl"
            onClick={()=>setWechsel(!wechsel)}>
            <p>ich bin das normale element!</p>
        </motion.div>

            :

        <motion.div
            layoutid="gleich"
            key="klein"
            className="w-2xl">
            <p>ich bin ein immernoch das gleiche element!</p>
        </motion.div>
        }

        /* wenn du aber so was wie die borderfarbe oder schriftfarbe oder sowas, also alles was das layout nicht Ã¤ndert gerne
        animiert hÃ¤ttest mÃ¼sstest du das Ã¼ber animate machen mÃ¼ssen: */

        const boxVariants = {
        normal: {
        backgroundColor: "#f87171",
        borderColor: "#7f1d1d",
        },
        klein: {
        backgroundColor: "#60a5fa",
        borderColor: "#1e3a8a",
            },
        };

        {
        wechsel ? (
        <motion.div
            layoutId="gleich"
            key="normal"
            variants={boxVariants}
            animate="normal"
            transition={{ duration: 0.4 }}
            className="w-5xl border-4"
            onClick={() => setWechsel(!wechsel)}
        >
            <p>Ich bin das normale Element!</p>
        </motion.div>
        ) : (
        <motion.div
            layoutId="gleich"
            key="klein"
            variants={boxVariants}
            animate="klein"
            transition={{ duration: 0.4 }}
            className="w-2xl border-4"
        >
            <p>Ich bin immer noch das gleiche Element!</p>
        </motion.div>
        )
        }

        /* wir nutzen bei beiden animate weil das hier aus react sicht ja immernoch 2 verschiedene DOM sind, und damit
        das smooth geschieht der farbwechsel muss man bei beiden die farbe einfach animieren, hier ist das kein "von rot wird
        blau", sondern ein, "der eine wird rot, der andere wird blau wenn er gemounted wird" */

        //useScroll() und useTransform()

        /* useScroll ist eine function die ein object enthÃ¤lt welches meinen scroll auf mehreren arten misst: */

        const { scrollX, scrollY,scrollXProgress, scrollYProgress } useScroll(options:options) : useScroll

        interface useScroll { //WICHTIG: destructe die mit genau diesen Namen, ich bin ein idiot deswegen habe ich das in den folgenden beipsielen nicht so gemacht
        scrollX:Motionvalue<number> //misst meinen scroll der y richtung in pixxel
        scrollY:Motionvalue<number>//misst meinen scroll der x richtung in pixxel
        scrollXProgress:[0,1] //mistt die Sichtbarkeit in y meines elementes von 0-1 (also wenn man mein element zur hÃ¤lfte sieht, steht da 0.5)
        scrollYProgress:[0,1] //das gleiche aber in x richtung
        }

        /* bei default mistt useScroll das alles von meinem document.body, aber durch options kann ich sagen von wem er die values nehmen soll */

        interface options{
        container: HTMLElement //sagt welches DOM-element Ã¼berhaupt mein scroll mist (bei default document.body)
        target: HTMLElement //sagt von welchem DOM-Element die sichtbarkeit gemessen wird (default document.body)
        offset:[string,string] // sagt wann anfang und wann ende ist, aber eigentlich nimmt man immer default
        }

        /* ein Beipiel kÃ¶nnte so aussehen */

        const meinDiv = useRef(null)
        const meinZweiterDiv = useRef(null)

        const { scrollY, scrollProgressY } = useScroll({
        container:meinDiv,
        target:meinZweiterDiv
        })

        /* die frage ist aber jetzt, was machen wir mit den ganzen values? */

        //useTransform

        /* useTransform ist eine super coole function die als Rechner dient, sie Ã¼bersetzt den einen wert in den anderen zu derem verhÃ¤ltnis: */

        const value = useTransform(input,inputrange,outputrange,options?)

        type useTransform =(
        input:Motionvalue<number>, //meine dynamische variable: Motionvalue! (mehr dazu gleich)
        inputrange:number[], //der Interval der werte meiner motionvalue
        outputrange:number[], //der Interval der werte die ich Ã¼bersetzt haben will
        options?:{clamp:boolean}) //das erlauben oder verbieten, werte ausserhalb ausserhalb der Intervalle meines outputs zu bekommen
        => Motionvalue<number> //es returned mir einen Motionvalue zurÃ¼ck, nÃ¤mlich mein Ã¼bersetzter output zum jetztigen input

        /* mit useScroll kÃ¶nnen wir jetzt die werte da rein packen, und den scroll in numerische CSS-Eigenschaften Ã¼bersetzen! */

        const meinDiv2 = useRef(null)
        const meinZweiterDiv2 = useRef(null)

        const { scrollY2, scrollProgressY2 } = useScroll({
        container:meinDiv2,
        target:meinZweiterDiv2
        }

        const meineOpacity = useTransform(scrollY2,[0,100],[0,1]) //ich sage hier: wenn ich garnich gescrollt habe dann ist meine opacity 0, bei 100 ist die 1, das verhÃ¤ltnis errechnet der von alleine

        style={{opacity:meineOpacity}}

        //noch ein beispiel

        const kommtVonLinks = useTransform(scrollProgressY2,[0,1],[0,100])

        style={{x:kommtVonLinks}}

        /* die parameter meiner motion value kÃ¶nnen aber auch ein bisschen anderes aussehen: */

        type functionalUseTransform = ( //habe das einfach nur ungefÃ¤hr so aufgescheiben, das ist kein syntaktisch korrekter type
        input:Motionvalue<number>
        outputFunction: (input) => output
        ) => output

        /*man kann dann sowas machen wie: */

        const verdoppelt = useTransform(a, (b)=> b*2) //einfach nur reines beipiel

        /* wichtig! mein Input kann nur ein Motion value sein! aber was ist ein motion value? */

        //Motionvalue

        /* ein motion value ist ein dynamischer wert der dazu gemacht ist sich immer und immer wieder zu Ã¤ndern, wie z.B
        scrollX bei useScroll() */

        const movalue = useMotionValue(0) // so kannst du eine variable zu einem motion value machen

        //exit und Animate-Presence!

        /* durch exit kannst du sagen wie deine animation beim unmount animiert werden soll, mit animate-presence sagst du das diese animation smooth verlaufen soll: */

        const [an,setAn] = useState(false)

        function anschalteButton(){
            setAn(!an)
        }

        return(
            <>
                <button onClick={anschalteButton}> { an ? "anschalten" : "ausschalten"} </button>
                <AnimatePresence mode="wait"> {/* mit mode="wait" sage ich einfach, das mein element was nach dem abgehen dieses elementes kommt, warten soll bis meine exit animation fertig ist */}
                    { an && 
                    <motion.div
                    initial={{opacity:0, y:-20}}
                    animate={{opacity:1,y:0}}
                    exit={{opacity:0,y:20}}> {/* ich sage hier wie das animiert werden soll wenn es weggeht */}
                      <p> hallo was geht </p>  
                    </motion.div>}
                </AnimatePresence>
            </>
        )

        /* man hätte das auch in einem variant machen können */

        let variant = {
            initial:{...},
            animate:{...},
            exit:{...}
        }

        //MASKING!!!

    /* masking ist eine super coole methode animations und transitions zu machen  */

    //Maskin verstehen

    /* eine "Mask" ist nichts anderes als ein Loch in deiner page der dir einen ausschnit davon gibt, was hinter der website liegt, der rest wird von deiner
    page verdeckt, um masking wahrhaftig nutzen zu können und es zu verstehen, müssen wir uns dafür css-angucken */

    .mask{ // die mask ist das "loch" unserer-page
        mask-image: //man kann da .svg, linear(), url(), usw nehmen, gibt einfach nur die form deines lochs an
        mask-position: //sagt wo deine mask sein soll (bottom-righ, left, 20px 40px, usw...)
        mask-repeat: //anzahl der wiederholungen (meist auf no-repeat)
        //usw..., die gleichen wie bei background
        mask: "url(flower.png) center / cover norepeat " //man kann diese properties auch alle in einem schreiben
    }

    /* viel einfacher ist aber die css-class "clip-path" */

    style={{clipPath:"..."}}

     /* die syntax von clip-path ist super simpel, du gibst die form ein, also das "loch" deiner page an und dann seine grösse: */

     
    /* Kreis
        clip-path: circle(<radius> at <position>);

        /* Ellipse 
        clip-path: ellipse(<radius-x> <radius-y> at <position>);

        /* Rechteck (inset) 
        clip-path: inset(<top> <right> <bottom> <left> round <border-radius>);

        /* Polygon 
        clip-path: polygon(<x1> <y1>, <x2> <y2>, ..., <xn> <yn>);

        /* Pfad (SVG Pfad) 
        clip-path: path('M10 10 H 90 V 90 H 10 Z');

        /* URL (für externe Clip-Pfade)
        clip-path: url(#clipPathId);  */

    /* <TYPE-SCRIPT IN REACT/TSX> */
