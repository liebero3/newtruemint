/* Hier wirst du alles über das backend erfahren! */

/* <LOCAL-STORAGE> */

/* localStorage ist so wie eine mini-datenbank in deinem web welches kleine und gängige Daten bis zu 10MB speichern kann, die syntax ist recht simpel: */
/* WICHTIG! localstorage nimmt nur strings an!!! alle primitiven datentypen, also zahlen oder booleans, werden automatisch zum "string" übersetzt,
also wird aus 18 = "18" oder aus true = "true", bei objekts und arrays gucken wir und das gleich an */

//die Befehle

localStorage.setItem() //fügst items in dein speicherplatz
localStorage.getItem() //rufst das gespeicherte wieder (um damit zu arbeiten oder es der UI zu zeigen)
localStorage.removeItem() //entfernst ein item aus dem speicherplatzt
localStorage.clear() //löschst alles

//setItems()

/* bei .setItems() ist das so, das sie 2 argumente animmt, erstmal ein key, und den wert des keys */

localStorage.setItem("name", "delo" ) //das key "name" hat hier die value "delo"

/* wenn wir aber z.B zahlen nehmen würden: */

localStorage.setItem("alter", 17) //wirft kein error auf weil er 17 zu "17" macht

/* bei Objects müssen wir aber die extra meile gehen: */

localStorage.setItem("user",{name:"delo",alter:17}) //der wirft kein error, du denkst dir "ja passt" aber...

/* er speichert hier einfach nur "[object,object]", nicht den wert deiner objets! dafür musst du: */

localStorage.setItem("user", JSON.stringify({name:"delo",alter:17})) //jetzt bekomme ich den wert meines objekts, das gleiche bei arrays

//getItems()

/* bei getItems rufst du den key auf um sein value zu bekommen, den du dann wo abspeicherst */

const meinUser = localStorage.getItem("user") //meinUser hat jetzt den Wert "{name:"delo",alter:17}", also ein string noch!

/* was müssen wir also machen? */

const meinRealUser = JSON.parse(localStorage.getItem("user")) // jetzt bekomme ich mein objekt, yipieee

//removItem()

/* removeItem ist von der syntax her eigentlich genau so wie getItem aber hier löscht er den user einfach, du musst nichts in einer variable packen */

function userLöschen(){
    localStorage.removeItem("user")
}
<button onClick={userLöschen}>user soll gelöscht werden</button>

//clear()

/* nimmt keine werte an, muss nirgends gespeichert werden, es cleared einfach den ganzen storage-room */

function clearHistory(){
    localStorage.clear()
}
<button onClick={clearHistory}>Suchverlauf löschen</button>

/* <LOCAL-STORAGE> */

import { NextResponse } from "next/server"

/* eines der Grundlegendsten dinge im Backend ist der Request befehl und wie er funtioniert */

const Beispiel = new Request("api/beispiel",{ //hier nennst du die api an der du die request schickst
    method:"POST", // hier nennst du deine HTTP-Methode
    headers: " Content-type: application/json",  // hier gibst du zusätzliche Meta-infos (also einfach infos über deine request)
    body: JSON.stringify({  // hier ist ein body weil wir die HTTP-Methode POST haben und wir daten an eine api schicken, die daten die wir schicken sind im body
         nutzer: "Delo",
         id: 123,
         alter:17
    })
})

/* wenn wir aber z.B eine andere HTTP-Methode wie GET hätten würde unser Request anders funktionieren: */

const Beispiel2 = new Request("api/users/123",{ // hier ist das so das wir nun infos von der api wollen, welche wir in der URL reinschreiben
    method:"GET",
    headers:" Content-type: application/json" 
})

/* bei einer GET-Methode ist das so das wir kein body haben weil wir ja keine infos schicken sondern bekommen wollen, eine arte ist es so wie wir es hier gemacht haben:
wir wollen hier sozusagen infos von dem user der die ID 123 hat, die ID ist hier der dynamische wert, woher wir das wissen? na wir gucken dazu ganz einfach
in die docs der api rein, also nutzen wir diese art der URL-manipulation von GET um ein spezielles objekt zu bekommen */

/* wenn wir die api aber filtern wollen nach einem oder mehren attributen, dann arbeiten wir mit Query-parametern: */

const Beispiel3 = new Request("api/user?alter=18&grösse=1.80m",{ // alter und grösse sind hier unsere keys mit dem value von 18 und 1.80m
    method:"GET",
    headers:" Content-type: application/json" 
})

/* hier ist das so das wir mit einem "?" sagen das ab da wir querys nutzen um die api nach den value unserer keys zu filtern und mit & reihen wir die keys auf */

/* ein Request ist nur die HTTP-Anfrage selber, aber wie können wir nun mit der api kommunizieren damit unser Request durchkommt? durch fetch()!!!
fetch() kennen wir ja schon von normal js aber hier ist das so das fetch das ist was mit der api redet, in unseren fetch() können wir eigentlich auch
unseren ganzen request rein schreiben */

fetch("api/products/test",{
    method: "POST",
    headers: " Content-type: application/json",
    body: JSON.stringify({  
         nutzer: "Delo",
         id: 123,
         alter:17
    })
})

/* wenn du aber einfach eine api fetchst ohne was noch hinzuzufügen ist das so das er automatisch einen GET befehl macht wo du einfach die ganze api bekommst */

/* <API-Routes> */

/* innerhalb von next.js sieht deine route.js datei eigentlich so aus: */

export async function GET(){ // deine HTTP anfrage
    return NextResponse.json({
        hello:"world"
    })
}
/* wenn du mit dem request der an deine api geschickt wurde arbeiten willst, dann nutzt du inerhalb deiner funktion req der als parameter der fremden Request dienen soll */

export async function POST(req){
    const deineAnfrage = await req.json()
    console.log(deineAnfrage)
    return NextResponse.json({
        message:"alles lief top", deineAnfrage
    })
}

/* aber warte, was bedeuten diese functions eigentlich? wie funktionieren die? fangen wir mal von oben nach unten an... */

async function GET/POST/DELETE/usw...(){}

/* du erstellst eine async function (weil die ja zeit braucht) wo du deine HTTP anfrage als function hast, welche HTTP-anfrage nimmst du aber für welchen zweck?
DU MUSST IN DIE ROLLE DES CLIENTS!!! wenn du z.B eine GET() function machst sagst du eigentlich nur:"wenn der client mir eine GET() anfrage stellt, soll
diese funktion ausgeführt werden" dann macht man z.B sowas: */

export async function GET(){
    return NextResponse({
       Gerät1: {product:"cool", id:1, preis:10},
       Gerät1: {product:"cool", id:1, preis:10},
       Gerät1: {product:"cool", id:1, preis:10},
       Gerät1: {product:"cool", id:1, preis:10},
       Gerät1: {product:"cool", id:1, preis:10}
    })
}

/* das bedeutet, wenn der client deinem Backend eine GET-Request stellt dann gibst du diese infos, was ähnliches kann man auch mit POST machen */

export async function POST(req){ //hier ist req der parameter der für die Request die an deime backend geschickt wurde, du kannst mit der machen was du willst
    const dieReq = req.json()
    console.log(dieReq)
    return NextResponse.json({
        message: "alles top"
    })
}
/* <API-Routes> */

/* <HTTP-METHODS> */

/* es gibt verschiedene HTTP-methods die verschiedene funktionen haben, die gängigsten sind: */

/* !GET! */

const get = new Request("/api/...",{
    method: "GET",
    headers: " Content-type: application/json" 
})
/* GET wird verwendet um infos von einem api-backend zu bekommen, die infos die du willst kannst du in der URL angeben, siehe oben
somit wissen wir ja schon ungefähr wie unsere HTTP-Handler ungefähr aussehen soll */

export async function GET(){
    return NextResponse.json({
        name: "delo",
        alter:10,
        //usw
    })
}

/* wenn einer mit einer GET Methode nach daten fragt, dann schreiben wir in unserem GET()-Handler welche Daten er bekommen soll!!! */

/* !GET! */

/* !POST! */

const post = new Request("/api/...",{
    method:"POST",
    headers: " Content-type: application/json",
    body: JSON.stringify({ //der inhalt unseres POST-Request!!!
        name: "delo",
        alter:10,
        //usw
    })
})

/* bei POST ist das so das ich einem api backend die daten die ich im body habe schicke und will das mit diesen Daten was gemacht wird. dann müsste unsere
POST()-Handler ungefähr so aussehen...  */

export async function POST(req){ //parameter für die Request!!!
    const data = await req.json()
    console.log(data)
    return NextResponse.json({
        message:"alles lief super duper", data
    })
}

/* ok hier haben wir nichts mehr gemacht als die daten einfach nur auszulogen, aber was wenn wir mit den arbeiten wollen würden? dann müssten wir uns den inhalt
ansehen (machen wir ja durch den log) und könnten den dann bearbeiten!!! */

export async function POST(req){ //parameter für die Request!!!
    const data = await req.json()
    console.log(data)
    data.name = "johannes"  // ich bearbeite hier den namen
    return NextResponse.json({
        message:"Namen geändert", data
    })
}

/* <!!!WICHTIG!!! MAN SOLLTE POST ANFRAGEN NICHT ÄNDERN, POST DIENT NICHT ZUR DATEN ÄNDERUNG!!! der POST-Handler dient eigentlich eher dazu einfach nur daten in 
deiner Daten bank zu speichern, mehr dazu folgt noch, aber wenn du daten ändern willst nutzt du... */

/* !POST! */

/* !PUT/PATCH! */

/* put und patch sind sich sehr ähnlich, hier ist es einfach nur so das put einen bestehenden user komplett ersetzt */

{
    name:"delo"
    alter:15
    id:1
}

const newUser = new Request("api/...",{
    method:"PUT",
    headers: " Content-type: application/json",
    body: JSON.stringify({
        name:"johannes",
        alter:15
    })
})

/* PATCH würde dann einfach nur eines der keys ändern */

const newUser2 = new Request("api/...",{
    method:"PUT",
    headers: " Content-type: application/json",
    body: JSON.stringify({
        alter:15
    })
})

/* diese Anfrage müssten wir dann bearbeiten so wie der body es will und den nutzer updaten */

export default async function PUT(req){
    const realNewUser = await req.json()
    realNewUser.name = "johannes",
    realNewUser.alter = 15
    return NextResponse.json({
        message:"erledigt"
    })
}

/* und bei patch würde man nur ein atrribut ändern */

/* !PUT/PATCH! */
/* <HTTP-METHODS> */


/* <!!! SUPABASE !!! */

/* supa base ist ein Baas (backend as a service) und erleichter einem das leben im backend sehr, weil es z.B das gesammte daten managment übernimmt, aber wie
funktioniert das eigentlich? */

supabase.com

/* <!SUPABASE/SQL-VORWISSEN!> */

SELECT: //Daten lesen/abfragen
"Ich möchte Informationen sehen"

INSERT: //Neue Daten hinzufügen
"Ich möchte etwas Neues in die Datenbank schreiben"

UPDATE://Bestehende Daten ändern
"Ich möchte vorhandene Informationen aktualisieren"

DELETE: //Daten löschen
"Ich möchte etwas aus der Datenbank entfernen"

//"AUTH" IST EIN WICHTIGES SCHLÜSSELWORT!!!
/* "auth" ist ein Module (schlüsselwort) welches dir den zugriff zu riesigen bibliotheken und deren funktionen gibt, wie z.B: */

/
auth.uid()
//Gibt die ID des aktuell eingeloggten Benutzers zurück
//Beispiel: Wenn du eingeloggt bist, könnte dies "123e4567-e89b-12d3-a456-426614174000" zurückgeben

auth.role()
//Gibt die Rolle des aktuellen Benutzers zurück
//Beispiel: "authenticated" für eingeloggte Benutzer oder "anon" für nicht eingeloggte

auth.jwt()
//Gibt den kompletten JWT-Token (mit allen Benutzerinformationen) zurück
//Wird für komplexere Abfragen verwendet

/* DIE "GEHEIME" TABELLE: was in den auth-libs auch noch drin ist, sind befehle, die die interne, von supabase selber erstellte, "auth.user" tabelle die alle
login und sign in daten von user hat,  beeinflussen. das ist keine normale tabelle die man selber erstellt, sie wird nämlich beim erstellen deiner projektes
schon gemacht und beeinhaltet alle wichtigen user infos, die functions zur änderung dieser tabelle sind: */

const { user } = supabase.auth.signUp({ // wird genutzt für die erstellung des users in dieser auth.user mega coolen tabelle
    email:"...",
    passwort: "..."
})

const { user2 } = supabase.auth.signInWithPassword({ // wird genutzt damit sich der user wieder einlogen kann
    email:"...",
    passwort: "..."
})

const { data : {user3}} = supabase.auth.getUser() //so bekommst du die daten in der auth.user tabelle WICHTIG: du destrucktes aus dem key data den key user,
                                                  // deswegen sieht das so komisch aus diese {data:{user3}}

//praktisch würde das dann so aussehen:

const [gmail,setGmail] = useState("")
const [passwort,setPassword] = useState("")

return(
  <>
      <input onChange={(e)=>setGmail(e.target.value)}/>
      <input onChange={(e)=>setPassword(e.target.value)}/>
  </>
)

fetch("/api/sideInhalt",{
    method:"POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
            
    })
})

//im backend würde man dann das hier machen:

export async function POST(req){
    const {email,password} = await req.json()
    await supabase.auth.signUp({email,password})
    await supabase.auth.signInWithPassword({email,password})
}

//du kannst aus deiner normalen tabelle alle daten bekommen durch:

const { data } = supabase.from("users").select("*")

//dann bekommst du deine ganze tabelle als ein array was du dann filtern, mapen, usw weiter machen kannst

/* <ERROR-HANDLING> */

/* in js ist das so, das dir supabase immer (wie mehrmals schon gesagt) ein object zurück gibt wenn du es aufrufst, ein "response object" gibt,
 welches 2 keys hat: einmal "data" (hier drin sind all deine daten als array), und einmal "error" (er hat den wert "null" wenn alles gut lief,
 oder einen wert sei es eine zahl oder so wenn das aufrufen von supabase zu fehlern führte,) dann kann dein error handling ja so aussehen: */

const { data2, error } = supabase.from("users").select("*")

if(error){  //error-handling
    console.error("hier ist was schief gelaufen..." + error.message)
}

/* bei der if()-abfrage guckt js ob error null ist (falsy), dann würde die prozedur ja normal weitere geschehen, aber wenn error nicht gleich null ist,
dann wäre das truthy und es würde zu dem auslösen des code-blocks kommen und somit zu dem console.error */

/* <ERROR-HANDLING> */

/* <RLS> */ 

/* RLS steht für RowLevelSecurity und bringt sicherheit und regeln in dem, wer was mit den Daten in der tabelle wann machen darf, und hier ist das so
das es sich stark an SQL orientiert: */

create policy "Enable delete for users based on user_id"  //der name deines Gestzes
on "public"."test"  //die tabelle auf der das Gesetz zu trifft
as PERMISSIVE  //die "strengheit des gesetzes" (eig nicht so wichtig, führt einfach nur dazu wie sich das boolean verhältnis ausdrückt)
für DELETE  // für welche SQL-Methode (siehe oben) das gilt
to public   //für wenn dieses gesetz gilt
using (     //WICHIG!: ab welcher bedingung dieses Gesetz gilt! nur wenn es hier true ist wird der rest überhaup ausgelöst!
  (select auth.uid()) = user_id //die bedingung
);

/* dieses Gesetz hier bedeutet: das Gesetz "Enable delete for users based on user_id" auf der tabelle "public.test" als permisssive bei die DELETE-methode
für alle kann nur gemacht werden, wenn deine user.ID mit deiner Login-ID übereinstimmt: nur du kannst deine sachen löschen! aber wenn ihr das direkt am anfang
nicht versteht keine panik: irgendwann merkt ihr das sich das einfach von alleine erklärt */

/* <RLS> */

/* <RICHTIGES-EINLOGGEN> */

/* damit sich der user wieder einloggen kann, haben wir ja erfahren das er dafür...*/ supabase.auth.signInWithPassword() /* nutzen muss,
der prozess würde dann ungefähr so aussehen: */

const { error } = await supabase.auth.signUp({ //als erstes das einloggen
    ...
})

//und dann würdes du, wegen der Email-bestätigung des users, in einem anderen route.js, das login machen nämlich so:

const { data, error } = await supabase.auth.signInWithPassword({ //wir werden data gleich brauchen!
    //die gleichen daten wie bei signUp, also email und passwort eigentlich
})

//aber damit der user wieder auf seinen alten fortschritt kommen kann, wie sein warenkorb oder so, musst du geschickt arbeiten!!!

/* was müssen wir machen? wir werden eine neue tabelle erstellen in supabase wo wir alle fortschritte des users gespeicher haben wollen,
wie z.B sein warenkorb oder was er schon gekauft hat, was er schon gelicket hat usw..., damit wir aber explizit die dinge aufrufen die
dieser user hatte, müssen wir die id von ihm die in der auth.user tabelle ist, in unserer tabelle verknüpfen und können den als anhaltpunkt
nehmen damit wir alle cols dieser id bekommen */

const userId = data.user.id //das ist von unserem supabase.auth, die die id von der auth.users tabelle des nutzer beim registrieren nimmt und in dieser variable speichert

await supabase.from("tabelle1").insert({
    user_id:userId, //in unserer tabelle haben wir die id des users als "user_id", gespeichert, hier stellen wir die gleich
    warenkorb:[] //hier geben wir dem user ein leeres warenkorb, wir müssten dann im frontend noch schnick schnack machen damit das reinkommt aber das ist selbsterklärend
})

//wieso klappt das? 
/* der grund warum das klappt liegt daran das wir hier mit den objekten die wir von supabase bekommen arbeiten. immmer wenn wir supabase.auth abrufen
bekommen wir ein response objetk welches uns jeden col unserer auth.useres tabelle gibt anhand von keys. diese können wir dann mit den keys (also cols)
unserer tabelle gleich stellen, uns die angucken, usw. man muss sich allgemein merken:  */

//keys = cols  und   { data } = der gesammte row, also alle cols mit dieser id

/* wenn ich aber jetzt alle daten meiner tabelle (die ja eh die daten sind die ich speichern wollte) vom user haben will, muss ich rein logisch alle daten 
der row zeigen, wo die user_id in meiner tabelle der data.user.id die dem user beim registrieren gegeben wurde gleich sind, wie machen wir das aber? */

const inhalt = await supabase
.from("tabelle1") //die tabelle die wir wollen
.select("*") // "*" steht "für alle cols dieser row"
.eq("user_id",userId)// SEHR WICHTIG! (ersetzt die if-abfrage)

//was macht eq()?
/* eq() ist eine funktion die für "equal" steht und die macht nichts anderes als 2 parameter zu nehmen (der erste ist die gewollte col in deiner tabelle)
(der zweite ist den wert den du abchecken willst), und dann dir die row zu geben wo die col mit deinen eingegeben daten überein stimmt, also da wo sie "equal" sind*/
//wir halten also fest: eq() gibt dir einfach nur die rows, wo der col deiner wahl in deiner tabelle mit dem wert deiner wahl übereinstimmt, wenn du als beispiel das alter von johannes willst:

const johannesAlter = await supabase
.from("tabelle1")
.select("alter")
.eq("name",johannes)

/* wenn du die daten aber jetzt in deiner UI zeigen willst, kann du supabse einfach in deinem frontend importen, die infos wie (siehe oben) in variablen abspeichern
und diese dann zum state machen und im Front-end anzeigen: */

import {supabase} from "/lib/supabase" 

const [name, setName] = useState("")

useEffect(()=>{
 async function holen(){
    const {data} = await supabase.auth.getUser() //getUser hollt mir den user aus auth.users
    const userId = data.user.id // hier gebe ich die id der user als userId in einer anderen variable
    const inhalt = await supabase.from("tabelle1").select("*").eq("user_id",userId) //und hier kommen die daten des bestimmten nutzers
    setName(inhalt.name)
 }
 holen()
},[])

 //und dann kannst du das durch state in deiner UI zeigen

/* <RICHTIGES-EINLOGGEN> */

/* <!SUPABASE/SQL-VORWISSEN!> */

/* supabase funktioniert super einfach, du gehst auf die website von denen, drückst auf " create table" und erstellst eine tabelle mit allen daten (meist von usern)
gespeichert haben möchtest, und gibst da auch den daten type an.  */

/* schalte hier zu auch RLS an (Row Level security) um genau zu bestimmen was den usern an daten-manipulation erlaubt ist und was nicht */

/* wenn du da alles geklärt hast, kannst du auch anfagen deine Tabelle mit deinem code zu verbinden... */

//erstelle einen lib ordner in dein src-ordner wo du deine supabase.js datei configist

import { createClient } from "@supabase/supabase-js"

const supabaseURL = "..." //hier tippst du deine URL ein die du von supabase bekommst 
const supabaseKEY = "..." //hier tippst du dein Key ein den du von supabase bekommen hast

export const supabase = createClient(supabaseURL,supabaseKEY)

//<!HALT STOPP!>, SO IST DAS NICHT SICHER!!!
/* vom gedanken gang sollte man eigentlich genau so sein supabase in seinen code einbinden, aber hier tippt man super wertvolle Daten in einen öffentlichen code
ein, deswegen sollte man diese daten in seinem .gitignore datei rein schreiben nämlich so: */

nEXT_PUBLIC_SUPABASE_KEY = "..." //eigenlich mit grose "N" aber ich habe schon eine sache die so heist und ich will die nicht vertauschen
nEXT_PUBLIC_SUPABASE_URL = "..."

//und dann bindest du das so ein in deiner supabase.js datei...

import { createClient } from "@supabase/supabase-js"

const supabaseURL2 =  nEXT_PUBLIC_SUPABASE_URL // so ist das viel sicherer
const supabaseKEY2 =  nEXT_PUBLIC_SUPABASE_KEY 

export const supabase2 = createClient(supabaseURL,supabaseKEY)

/* wenn du jetz daten in deinem code z.B einfügen willst kannst in deiner api backend (und eigentlich sogar front end) supase rein importen */

import { supabase } from "/lib/supabase" // deine datenbank ist jetzt ready to use!!!
import { useEffect, useState } from "react"

/* wir simulieren jetzt eine situation: */

const [value,setValue] = useState("")
return(
    <input onChange={(e)=>setValue(e.target.value)}/>
)

fetch("/api/...",{ //deine backendapi
    method:"POST",
    headers:" Content-type: application/json",
    body: JSON.stringify({
        value
    })
}) 

//in deiner Backend api würde es dann so aussehen:

export async function POST(req){
    const deineDaten = await req.json()
    await supabase.from("users").insert(deineDaten)
    return NextResponse.json({
        message: "daten hinzugefügt"
    })
}

/* dann könnte man bei spezifischen sachen z.B das hier machen */

const [name,setName] = useState("")
const [email,setEmail] = useState("")

return(
   <>
     <input onChange={(e)=>setName(e.target.value)}/>
     <input onChange={(e)=>setEmail(e.target.value)}/>
   </>
)

fetch("/api/..",{ //deine api-backend
    method:"POST",
    headers:" Content-type: application/json",
    body: JSON.stringify({
        Name : name,
        Email : email
    })
})

/* dein backend sollte dann so aussehen... */

export async function POST(req){
    const { Email , Name } = await req.json()
    await supabase.from("users").insert([{ Email,Name }])
    return NextResponse.json({
        message: "daten hinzugefügt"
    })
}

/* Vergiss nicht: supabase muss wissen welche daten er in welchem col hinzufügen muss,
 deswegen müssen die namen deiner keys im body genauso heissen wie die cols! */

/* <!!! SUPABASE !!! */

/* <DAS FILE SYSTEM> */

//<fetch(), getStaticPath(), getStaticProps()>

/* es gibt mehrere Methoden wie man daten von einer API hollen kann, die die wir schon kennen ist durch eine einfache async function mit fetch(): */

async function fetchen(){
    const rohDaten = await fetch("randomapi")
    const jsonDaten = await rohDaten.json()
    //usw
}

/* was dieser code block macht ist, jedes mal beim aufruf, muss er die daten der api selber holen, egal ob sie schon fest geschreiben sind oder nicht. selbst
wenn es immer wieder die gleichen daten seien müsste der client warten und loaden lassen bis die infos in der UI sichtbar sein können, vorallem bei useEffect(): */

useEffect(()=>{
    async function fetchen2(){
        const rohDaten = await fetch("randomapi")
        const jsonDaten = await rohDaten.json()
        //usw
    }
    fetchen2()
},[])

//hier ist das so das die daten erst nach dem rendern geholt werden was dem client einfach immer wieder zeit kostet 

/* wenn du fest bestehende daten hast die fast immer gleich bleiben, wie z.B bei deiner eigenen API Backend mit node, dann kannst du getStaticProps(), oder bei
manchmal ändernden getServerSideProps() verwenden: */

//du hast dann im Backend sowas wie:

async function GET(){
    return NextResponse.json({
        name:"delo",
        alter:2000,
        lieblingsessen:"spaghetti"
    })
}

// und wenn du weist das sich das nicht ändern wird, dann bestelltst du dir die daten schonmal für deine komponente vor;

export async function getStaticProps(){ //wichtig: getStaticProps ist nur eine serverseitige function, sie läuft nie auf dem browser! mehr dazu gleich
    const daten = await fetch("/meineapi")
    const body = daten.json()
    return({
        props:body //wichtig, ich returne ein Prop(besser gesagt ich nutze es als eins, es muss aber props heissen! mehr dazu gleich
    })
}

export default function Komponente({body}){ // hier als prop genutzt 
    return(
        <>
            <p>hallo ich bin {body.name} und bin {body.alter} jahre alt </p>
        </>
    )
}

//wieso klappen die dinge so wie sie es tun und was machen die?

/* Wir fangen mit der getStaticProps() function an: getStaticProps ist kein einfacher "funktionsname" der nur in dem sinne dient unsere function zu betiteln, sie
ist eine art "prefix" der eine spezielle bedeutung hat, nämlich steht dieser name für das serverside-fetchih, das holen der daten bevor danach überhaupt gefragt wurde */

/* der export befehl ist bei der function auch wichtig und wird nicht dazu genutz um die function irgendwo hinzu importen, sondern als pfeil welches next.js zeigt:
ey hier ist so eine serverside function! das bedeutet beide gehen hand in hand, und export erfüllt hier seinen zweiten wichtigen job: das next.js aufmerksam machen auf eine sache */

export async function getStaticProps(){
    return({
       props:{//bei diesen functions muss ich IMMER props returnen
        user1: {name:"delo",alter:20}//ich muss meine daten nicht in meiner api haben, ich kann die auch hier direkt mitgeben wenn die immer gleichbleiben!
       } 
    })
}

export default function Komponente2({user1}){
    return(
        <>
            <p> hallo ich bin {user1.name} und bin {user1.alter} jahre alt! </p>
        </>
    )
}

/* jetzt wo wir das geklärt haben, können wir uns auf "fs" konzentrieren, den dem werden wir einige statische daten bekommen! */

//<FS/PATH>

/* fs ist ein module was dir erlaubt deine files zu lesen (steht eig für file-system) und path ein module den dateien pfad deiner datei zu finden: */

import fs from "fs"
import path from "path"

const dateinPfad = path.join(process.cwd(),"data","meinedaten.md")// diese Line liest meinen gesammten datein pfad, mehr dazu gleich
const dateiInhalt = fs.readFileSync(dateinPfad, "utf-8")// liest meine datei aus, in dieser variable ist jetzt der gesammte inhalt meiner date

// was die verschiedenen dinge jetzt bedeutet:

/* bei meiner datei findung, erlaubt mir die function join() überhaupt auf datein suche zu gehen (wie genau muss man sich einfach im module anschauen amk), der
befehtl process.cwd() bezieht sich bei der datein suche auf die, mit der mein scrpt runned, also der root, (motto so wie realmint), mein erster string "data",
sagt von welchem ordner ich in meinem root jetzt die datei will und "meinedaten.md" ist die genaue datei die ich ausgelesen haben will */

/* bei der Auslesung der datei ist das jetzt so das ich meinen dateiPfad ja jetzt habe, also genau weis welche datei ich auslesen muss, und diese nun einfach auch tu-
ich gebe nämlich in die function readFile-() (wichtig!: async ist super wichtig aber kommt in einem gängigeren beispiel) meinen pfad ein, und in welcher form ich das 
gerne hätte (utf-8 ist für uns lesbar), so, jetzt ist in der variable mein gesammter ordner inhalt! */

//wie man das auch machen kann:

import fs from "fs/promises" //muss noch geklärt werden
import path from "path"

export async function getStaticProps(){
    const dateiPfad = path.join(process.cwd(),"data","package.json")
    const meinOrdner = await fs.readFile(dateiPfad,"utf-8")
    const dieDaten =    JSON.parse(meinOrdner) //müssen nochmal parsen um daraus ein echtes js-objekt zu machen

    return({
        props:dieDaten
    })
}

export default function Komponente3({dieDaten}){
    return(
        <>
            <p> hallo ich bin {dieDaten.name} und ich mag {dieDaten.essen} </p>
        </>
    )
}

/* wichtig! das geht nur in mainpages, sonst wäre das ja sinnlos! du musst ja den inhalt deinen props übergeben! */

/* bei markeddown datein ist es noch wichtig das so zu machen das alles in html übersetzt wird: */

import { marked } from "marked"

export async function GET(){
    const pfad = path.join(process.cwd(),"/src/app/Delo2/ErsteSeite/Readme.md")
    const rohInhalt = fs.readFileSync(pfad,"utf-8")
    const realInhalt = marked(rohInhalt) // hier mache ich das zu HTML
    return NextResponse.json({
        props:{ fileInhalt : realInhalt}
    })
}

/* dann muss ich in meinem frontend auch das hier machen: */

<div dangerouslySetInnerHTML={{__html: fileInhalt ?? ""}}></div> //darf hier dann keine children setzten

//ReactMarkdown

/* der weg mit "dangerouslySetInnerHTML" funktioniert zwar, ist aber nicht so ganz sicher und erlaubt dir auch nicht die einzelnen komponenten zu stylen,
viel gägniger ist da <ReactMarkdown> */

export async function GET(){
    const pfad = path.join(process.cwd(),"/src/app/Delo2/ErsteSeite/Readme.md")
    const rohInhalt = fs.readFileSync(pfad,"utf-8")
                                                     // hier schicken wir den fileInhalt roh, nicht als HTML!!!
    return NextResponse.json({
        props:{ fileInhalt : realInhalt}
    })
}

/* aber wenn wir das nicht als HTML abschicken, wie soll es dann in der UI aussehen? naja wir wandeln noch zum HTML um, aber erst im front end! */

return(
    <>
        <div className=" w-100 h-100 bg-black text-white">
            <ReactMarkdown> {/* ReactMarkdown rendert einfach alles beim return zu HTML!!! */}
                {fileInhalt}
            </ReactMarkdown>
        </div>
    </>
)

/* was ist der vorteil davon? naja, ReactMarkdown erlaubt uns das wir unsere elemente im md selber stylen können!!! */

<ReactMarkdown
  components={{
    h1: ({node, ...props}) => <h1 className="text-4xl font-bold" {...props} />,
    p: ({node, ...props}) => <p className="text-gray-700" {...props} />,
    a: ({node, ...props}) => <a className="text-blue-600 underline" {...props} target="_blank" rel="noopener noreferrer" />,
  }}>
  {fileInhalt}
</ReactMarkdown>

/* was machen wir hier: wir destructen aus dem prop "components" seine keys "h1", "p", usw und definieren sie hier neu durch eine function, die die keys unseres 
destructeten objekts neu definiert: nämlich vorallem node, wo wir aber die restlichen props durch die spreat syntax einfach mit nehmen. das was wir hier tun ist
auch einfach node von all den keys neu zu definieren und wir geben die restlichen props unserer neu definition einfach mit */

/* durch den components-prop kann ich sagen wie mein h1, mein p, mein a, also einfach alle HTML-tags auszusehen haben! */

//getStaticPaths()

/* die allgemeine struktur von getStaticPaths() sieht so aus: */

export async function getStaticPaths(){
    const pfade = ["datei1.md","datei2.md","datei3.md"] //alle dateien hollen
    const filteredPfade = pfade.map((item)=>{ //die dateien als params angeben
        return({
            params: pfade.replace(/\.md$/, "")
        })
    })
    return({
        filteredPfade, //die params absenden
        fallback:false
    })
}

/* mit getStaticPath kannst du, wenn du viele Dateien hast, deren Pfad schon statisch angeben */

import fs from "fs"
import path from "path"

export async function getStaticPaths(){
    const allePfade = path.join(process.cwd(),"meineposts") // die function gibt mir einfach nur einen dateienpfad, wie ich zu einem bestimmten ordner komme
    const arrayedDateien = fs.readdirSync(allePfade) //die function readdir-* macht alle dateiennamen zum string und packt die in ein array, sowas wie ["post1.md","post2.md"] usw
    const mappedDateien = arrayedDateien.map((item)=>{
        return({
            params: {slug: item.replace(/\.md$/, "")} //sagt einfach "ersetzte bei dem dateiennamen ".md" mit "" (also nichts) "
        })
    })
    return{
        mappedDateien, //alle meine paths 
        fallback: false //sagt einfach was gemacht werden soll wenn eine URL kommt die nicht in paths ist, bei false wird die einfach ge-error-ed
    }
}

/* das alles ist aber in den neusten versionen von next.js nicht mehr zu gebrauchen, macht einfach das file einlesen im backend und fetched das dann */

/* wichtig! wenn ihr das in  */

 //<REGEX>

      /* regex, was eine kurzschreibweise für "Regular Expression" ist, erlaubt dir bestimmte Muster deiner Wahl in einem text zu finden, sei es eine
      Datei, ein string in deiner variable oder sonst noch was: */

      const regex = /Delo/

      /* die syntax ist hier simpel: alles was zwischen /.../ kommt gilt als mein Muster, ich kann mein muster aber noch durch flags weiter beschreiben: */

      const globalRegex = /Delo/g //das "g" steht für global, also jedes Muster wo "Delo" steht, sonst würde er mir nur den ersten geben

      const insensitiveRegex = /Delo/gi // das "i"  steht für "insensitive" und was damit gemeint ist, ist das gross oder klein buchstaben nicht jucken

      //usw

      /* es gibt sonder Zeichen in regex, die eine bestimmte aussage tätigen, wie z.B  */

      return(
        <>
            
        </>
      )

/* <DAS FILE SYSTEM> */