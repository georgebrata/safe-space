"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Phone, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple Badge component inline
function SimpleBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary-foreground border border-secondary/30 ${className}`}
    >
      {children}
    </span>
  )
}

  const resources = [
    {
    title: "ANES Helpline",
    description:
      "Helpline național gratuit care funcționează 24h/7 zile pe săptămână creat de către Agenția Națională pentru Egalitate de șanse între Femei și Bărbați (ANES), pentru a semnala situații de violență domestică, hărțuire sexuală, trafic de persoane, discriminare de gen sau discriminare multiplă",
    type: "Linii de ajutor",
    contact: "0800 500 333",
    link: "https://anes.gov.ro/",
  },
  {
    title: "ANITP Helpline",
    description:
      "Linie națională gratuită creată de Agenția Națională împotriva Traficului de Persoane (ANITP) pentru victimele traficului de persoane (sclavie modernă).",
    type: "Linii de ajutor",
    contact: "0800 800 678",
    link: "https://anitp.mai.gov.ro/",
  },
  {
    title: "Numărul Unic 119",
    description:
      "Linie națională gratuită pentru prevenirea și raportarea oricărui tip de abuz sau violență împotriva copiilor. Gestionată de Autoritatea Națională pentru Protecția Drepturilor Copilului și Adopție. Disponibilă 24/7.",
    type: "Linii de ajutor",
    contact: "119",
    link: "https://dingrijapentrucopii.gov.ro/1/numar-unic-119/",
  },
  {
    title: "Violență domestică",
    description:
      "Violenţa domestică înseamnă orice inacţiune sau acţiune intenţionată de violenţă fizică, sexuală, psihologică, economică, socială, spirituală sau cibernetică, care se produce în mediul familial sau domestic ori între soţi sau foşti soţi, precum şi între actuali sau foşti parteneri, indiferent dacă agresorul locuieşte sau a locuit împreună cu victima. Violenţa domestică se poate manifesta sub următoarele forme: violență verbală, psihologică, fizică, sexuală, economică.",
    type: "Tipuri de abuz",
  },
  {
    title: "Violență verbală",
    description:
      "Adresarea printr-un limbaj jignitor, brutal precum și utilizarea de insulte, amenințări, cuvinte și expresii degradante sau umilitoare reprezintă violență verbală.",
    type: "Tipuri de abuz",
  },
  {
    title: "Violenţa psihologică",
    description:
      "Violenţa psihologică se realizează prin impunerea voinţei sau a controlului personal, provocarea de stări de tensiune şi de suferinţă psihică, prin ameninţare verbală sau în orice altă modalitate, şantaj, violenţă demonstrativă asupra obiectelor şi animalelor, afişare ostentativă a armelor, neglijare, controlul vieţii personale, acte de gelozie, constrângeri de orice fel, urmărirea fără drept, supravegherea locuinţei, a locului de muncă sau a altor locuri frecventate de victimă, efectuarea de apeluri telefonice sau alte tipuri de comunicări prin mijloace de transmitere la distanţă, care prin frecvenţă, conţinut sau momentul în care sunt emise creează temere.",
    type: "Tipuri de abuz",
  },
  {
    title: "Violenţa fizică",
    description:
      "Violenţa fizică reprezintă vătămarea corporală prin lovire, îmbrâncire, trântire, tragere de păr, înţepare, tăiere, ardere, strangulare, muşcare, în orice formă şi de orice intensitate, inclusiv mascate ca fiind rezultatul unor accidente, prin otrăvire, intoxicare, precum şi alte acţiuni cu efect similar, supunerea la eforturi fizice epuizante sau la activităţi cu grad mare de risc pentru viaţă sau sănătate şi integritate corporală.",
    type: "Tipuri de abuz",
  },
  {
    title: "Violență sexuală",
    description:
      "Violenţa sexuală se poate manifesta prin agresiune sexuală, impunere de acte degradante, hărţuire, intimidare, manipulare, brutalitate în vederea întreţinerii unor relaţii sexuale forţate, viol, inclusiv viol conjugal. Activitatea sexuală fără consimțământ reprezintă  violenţă sexuală.",
    type: "Tipuri de abuz",
  },
  {
    title: "Violenţa economică",
    description:
      "Violenţa economică se poate manifesta prin interzicerea activităţii profesionale, privare de mijloace economice, inclusiv lipsire de mijloace de existenţă primară, cum ar fi hrană, medicamente, obiecte de primă necesitate, acţiunea de sustragere intenţionată a bunurilor persoanei, interzicerea dreptului de a poseda, folosi şi dispune de bunurile comune, control inechitabil asupra bunurilor şi resurselor comune, refuzul de a susţine familia, impunerea de munci grele şi nocive în detrimentul sănătăţii, inclusiv unui membru de familie minor, precum şi alte acţiuni cu efect similar.",
    type: "Tipuri de abuz",
  },
  {
    title: "Nu ești singur(ă)",
    description:
      "Poate fi util să te gândești la plecare ca la un proces, nu ca la o decizie sau ca la un eveniment singular. E posibil să dureze săptămâni sau luni întregi până te poți desprinde complet. Abuzul, de cele mai multe ori, nu se oprește imediat și e posibil ca lucrurile să se înrăutățească înainte să simți o îmbunătățire. Știm că poate fi extrem de dificil să ieși dintr-o relație abuzivă. Barierele pot fi multiple, inclusiv teama de violență fizică, presiunea financiară, presiunea culturală și familială, amenințările agresorului și îngrijorarea pentru siguranța copiilor. Pot exista și bariere specifice pentru persoanele din anumite comunități. Dar plecarea este posibilă. În fiecare zi există persoane care pleacă din situații abuzive și nu există niciun motiv ca tu sau persoana pentru care îți faci griji să nu fiți una dintre ele. Poate fi dificil, dar nu trebuie să faci asta singur(ă). Poți cere ajutor selectând opțiunea GĂSEȘTE SERVICII DE ASISTENȚĂ de mai jos pentru a contacta cel mai apropiat serviciu de asistență pentru victimele violenței domestice și, de asemenea, când ești în pericol, sună la 112. Dacă preferi să mergi direct la judecătoria din zona ta de reședință, poți să depui cerere pentru un ordin de protecție. Poți afla mai multe despre ordinul de protecție la www.politiaromana.ro/ro/prevenire/violenta-domestica.",
    type: "Articol",
  },
  {
    title: "Ce pot face pentru a mă proteja după ce plec din relație?",
    description:
      "Nu există o modalitate unică în care te poți proteja de abuz după ce ai plecat. Este mai degrabă un proces de învățare a lucrurilor care funcționează și a modului în care poți folosi sistemele de asistență pentru a opri abuzul. Există câțiva pași practici pe care multe persoane i-au găsit utili și cu care ai putea începe: Este important să nu dai noua ta adresă unor persoane care ar putea să o comunice agresorului. Discută la locul de muncă și asigură-te că angajatorul tău știe că nu trebuie să ofere informații despre tine persoanei sau persoanelor care te abuzează. Dacă ai deja un ordin de protecție emis, oferă o copie și departamentului de HR. Gândește-te la rutina ta și dacă persoana sau persoanele care te abuzează te-ar putea găsi astfel. De exemplu, ai putea merge la muncă pe un alt traseu sau ai putea să-ți faci cumpărăturile la un alt supermarket. Ai grijă când partajezi pe mediile sociale locurile unde ești. Citește și GHIDUL DE SIGURANȚĂ ONLINE. Ia măsuri pentru a opri persoana sau persoanele care te abuzează din a te urmări, a te monitoriza sau a te spiona folosindu-ți telefonul sau celelalte dispozitive. Nu mai folosi conturile bancare comune, dacă poți. Sumele înregistrate în extrasul de cont ar putea să indice persoanei sau persoanelor care te abuzează unde ești. Dacă aveai o adresă comună cu persoana sau persoanele care te abuzează, discută la bancă despre schimbarea adresei aferente conturilor tale personale. Dacă se vor comunica în continuare extrasele la vechea adresă după ce ai plecat, acestea ar putea fi folosite pentru a afla unde ești. Dacă aveai conturi comune de utilități sau de telefonie mobilă cu agresorul, discută cu companiile de utilități și cu cele de telefonie pentru a te asigura că acestea nu comunică nimănui adresa ta. Dacă ai copii, vorbește la școală sau la grădiniță. Explică situația și spune-le că nu trebuie să comunice informații despre tine niciunei persoane, dar în special persoanei sau persoanelor care te abuzează. Vorbește la școala sau la grădinița copiilor despre ce se întâmplă și despre procedurile legale care au fost puse în aplicare sau care sunt în curs. Dacă persoana care te abuzează este părintele copiilor și nu există restricții legale care să împiedice această persoană să se apropie de copii, școala sau grădinița este posibil să nu aibă cum să o împiedice să își vadă copiii. Dacă te îngrijorează asta, un lucrător specializat în asistență pentru victimele violenței domestice te poate ajuta să comunici cu școala astfel încât atât tu, cât și copiii tăi să fiți cât mai în siguranță posibil. Din păcate, dacă nu depui plângeri la poliție împotriva abuzurilor prin care ai trecut sau nu întreprinzi alte măsuri legale, este posibil să realizezi că singura modalitate în care poți rămâne în siguranță este să te muți din zonă, să schimbi școlile și să îți schimbi locul de muncă. Acest lucru poate fi dificil de realizat dacă ai copiii în custodie comună cu agresorul. Un serviciu sau o linie de asistență pentru victimele violenței domestică te poate ajuta să faci planuri pentru siguranța ta. Accesează secțiunea GĂSEȘTE SERVICII DE ASISTENȚĂ pentru a găsi un serviciu local pentru victimele violenței domestice.",
    type: "Articol",
  },
  {
    title: "Copiii și contactul permanent",
    description:
      "Dacă ai copii, trebuie să te gândești dacă aceștia vor pleca cu tine, dacă vor fi în grija altcuiva sau dacă vor rămâne în casă cu agresorul. Dacă plănuiești să iei copiii cu tine, iar persoana care te abuzează este părintele copiilor, trebuie să te gândești cum, când și dacă această persoană va continua să îi vadă. În acest punct, este posibil să aibă dreptul legal să îi vadă. Asta înseamnă că, și după ce ai plecat, va trebui să mai ai un oarecare contact cu persoana care te abuzează. Dacă ai motive de îngrijorare cu privire la siguranța ta sau a copiilor, există măsuri legale care pot fi aplicate pentru a restricționa sau pentru a controla contactul, dar e posibil să dureze un timp până pot fi obținute. Dacă te hotărăști să pleci cu copiii tăi, este foarte important să mergi la cea mai apropiată secție de poliție și să dai o declarație despre motivul pentru care ai plecat și că ai nevoie de protecție și menținerea secretului în legătură cu noua ta locație. În caz contrar, există riscul ca partenerul abuziv să sune la poliție și să declare că copilul/copiii au fost răpiți. Astfel acoperi toate situațiile și asiguri o protecție suplimentară pentru tine și copiii tăi. Atunci când pleci dintr-o relație abuzivă în care sunt implicați și copii, lucrurile sunt deseori foarte complicate. E posibil să trebuiască să discuți cu avocați și să mergi la tribunalul pentru minori și familie dacă nu reușești să ajungi la o înțelegere cu fostul partener. Așadar, înainte de a pleca, poate fi util să discuți cu un specialist în violență domestică sau cu un avocat de dreptul familiei, care te va ajuta să îți dai seama de ce ai nevoie pentru a fi în siguranță, atât tu, cât și copiii.",
    type: "Articol",
  },
  {
    title: "Care sunt riscurile și cum pot să mă protejez?",
    description:
      "Dacă persoana care te abuzează descoperă sau suspectează că plănuiești să pleci și va pierde controlul asupra ta, abuzurile pot deveni mai grave. Violența fizică se poate agrava sau, dacă nu exista anterior, poate să apară. Este important să te adresezi unui serviciu specializat pentru victimele violenței domestice care te va ghida pe parcursul procesului de plecare. Ei au experiență și cunoștințe despre pașii pe care trebuie să îi faci pentru a fi în siguranță. Vei găsi detalii ale acestor servicii în secțiunea GĂSEȘTE SERVICII DE ASISTENȚĂ. Nu îi spune abuzatorului că intenționezi sau te gândești să-l părăsești. Dacă decizi să pleci, fă asta fără ca agresorul să-și dea seama, de exemplu când este la muncă sau la o întâlnire cu prietenii. Dacă ai motive specifice de îngrijorare din cauza culturii, religiei, sexualității sau genului tău și nu există un serviciu local care să îți ofere ce ai nevoie, poți contacta LINIILE DE ASISTENȚĂ NAȚIONALE.",
    type: "Articol",
  },
  {
    title: "Ce trebuie să iau cu mine?",
    description:
      "Gândește-te de ce vei avea nevoie când pleci. Ar putea fi o idee bună să pregătești un \"bagaj de urgență\" cu obiecte esențiale. Pentru multe persoane acest lucru nu este posibil și, dacă pleacă, pleacă pe fugă, iar ulterior vor să le recupereze, serviciile pentru combaterea violenței domestice sau poliția le vor ajuta în acest sens, astfel încât să nu meargă neînsoțite la domiciliu și să fie în pericol. Este important ca bagajul de urgență să fie ascuns de persoana care te abuzează. Dacă află că plănuiești să pleci, este posibil ca abuzurile să devină mai grave și mai frecvente. Poți să ții bagajul de urgență la un prieten sau o prietenă de încredere. Niște bani numerar, un card. Documentele tale și/sau ale copiilor, în original: cărți de identitate, certificate de naștere, certificate de căsătorie, pașapoarte, permis de conducere, documente de imigrație sau permise de muncă, contracte de proprietate etc. Dubluri ale cheilor de la casă și de la mașină. Telefon, tabletă, laptop și încărcătoare. Haine pentru cel puțin două săptămâni. Medicamente. Articole cu valoare sentimentală, cum ar fi fotografii, bijuterii, jucării ale copiilor. Dacă ești în pericol dar nu ai un bagaj de urgență, pleacă imediat fiindcă este mai importantă siguranța! Lucrurile pot fi recuperate ulterior.",
    type: "Articol",
  },
  {
    title: "Ordin de protecție",
    description:
      "Informații despre ordinul de protecție, emis de o instanță judecătorească, la cererea unei persoane a cărei viață este pusă în pericol de un membru al familiei, ce înseamnă și consecințele legale.",
    type: "Link-uri utile",
    link: "https://politiaromana.ro/ro/prevenire/violenta-domestica/protection-order",
  },
  {
    title: "Consecințele violenței domestice",
    description:
      "Violența domestică afectează multe aspecte ale vieții: starea de sănătate fizică și mentală a victimelor, viața profesională, statutul economic, relațiile sociale. Află mai multe.",
    type: "Link-uri utile",
    link: "https://politiaromana.ro/ro/prevenire/violenta-domestica/consequences-of-domestic-abuse",
  },
  {
    title: "Plan de siguranță",
    description:
      "Sfaturi ale poliției despre măsurile pe care o victimă trebuie să le ia pentru a părăsi în siguranță partenerul abuziv.",
    type: "Link-uri utile",
    link: "https://politiaromana.ro/ro/prevenire/violenta-domestica/safety-plan",
  },
  {
    title: "Sistem de monitorizare electronică/\"brățări\"",
    description:
      "Utilizarea dispozitivelor electronice de monitorizare pentru a urmări agresorii este cea mai eficientă măsură de protecție pentru victimele violenței domestice. Află mai multe despre cum poți rămâne în siguranță.",
    type: "Link-uri utile",
    link: "https://politiaromana.ro/ro/prevenire/recomandari-preventive/prevenirea-infractiunilor-contra-persoanei/prevenirea-violentei-domestice/electronic-monitoring-of-domestic-violence-offenders",
  },
  {
    title: "Platforma Protect",
    description:
      "ProTECT este platforma de colaborare a organizațiilor specializate în prevenire, protecție, asistență pentru victime, proceduri penale, civile, lobby și advocacy în lupta împotriva traficului de persoane.",
    type: "Link-uri utile",
    link: "https://traficdepersoane.ro/",
  },
  {
    title: "Cum arată o victimă a traficului de persoane?",
    description:
      "Victimele sunt persoane obișnuite. Altfel spus, victimele traficului de persoane sunt controlate total de altă persoană, de obicei traficantul sau un om de încredere de al traficantului. Pentru a obține supunerea totală sunt amenințate, șantajate sau manipulate, uneori chiar bătute. Victimele nu au contracte de muncă, în general, ci doar înțelegeri verbale.  De multe ori nu li se respectă programul de lucru, zilele libere și mare parte din venit le este confiscat pe motiv de achitare a cheltuielilor de cazare, hrană sau transport. Nu dețin controlul banilor pe care îi câștigă, a actelor de identitate, a telefonului mobil sau conturilor de socializare. Pentru toate astea, trebuie să ceară aprobarea traficantului care este, de cele mai multe ori, cineva apropiat (o cunoștință, rudă sau iubitul). Cum arată traficanții de persoane? Traficanții de persoane nu au semne distinctive. Dacă te întâlnești pe stradă cu ei nu ai cum să-i recunoști după semne specifice. Iată mai departe câteva detali despre traficanți. De obicei, sunt persoane cu posibilități financiare și isteți . Dorința lor cea mai mare e să facă mulți bani! Pentru acest lucru sunt în stare de orice! Pot să vândă, să închirieze, să tradeze, chiar să omoare oameni. De fapt, traficanții nu simt niciun fel de empatie pentru victimă. Pentru ei, bărbații, femeile sau copiii nu au valoare în sine ci doar în măsura în care produc bani. De exemplu, e des întâlnită „iubirea” sau „aprecierea deosebită” pe care o manifestă traficantul pentru victima care produce cei mai mulți bani. Banii sunt ceea ce îl interesează de fapt, iar acordarea de „prime” sub formă de atenție sau afecțiune face parte din jocul lui.  Pe ce se bazează traficanții ? Traficanții se bazează pe 4 lucruri. Puterea proprie de manipulare, sau „șmecheria” pe care o au și pe care o folosesc ca pe o armă. Lipsa de încredere în tine dacă ai crescut într-un mediu violent, presărat cu jigniri, bătăi și ai auzit de multe ori că nu ești bun sau bună de nimic. Lipsa oportunităților de a obține bani mai mulți în strînsă legătura cu pregătirea profesională. Pe scurt, ai absolvit 8 clase și vrei salariu de IT-ist. Cererea clienților. Fără clienți nu există trafic. Traficanții nu ar piede timp cu racolarea victimelor si manipularea lor dacă nu ar ști că pot avea astfel acces la banii clienților dispuși să plătească un preț pe închirierea sau cumpărarea de servicii sexuale, muncă ieftină sau pot trezi mila trecătorilor.Unde poti întâlni victime ale traficului de persoane? În intersecții, la metrou, în gări sau lângă centrele comerciale. Alte locuri expuse traficului de persoane pot fi: fermele agricole/șantiere/întreținerea gospodăriei, site-uri de socializare/escorte, anunțuri în ziar, pe stradă/trotuar. Cererea uriașă e unul din factorii care încurajează  traficul de persoane. Oamenii vor să cumpere sau să închirieze alți oameni pentru ceea ce societatea sau simțul moral le interzice. Femeile sau minorele exploatate sexual apar, de obicei zâmbitoare, și dau impresia că sunt mulțumite cu ceea ce fac. Adevărul e diferit. Ele își folosesc trupul ca să obțină bani, sperând că e doar ceva temporar. O fac de dragul traficantului care e uneori iubitul sau pentru a-și plăti datoriile către cămătari sau când sunt șantajate cu binele copiilor sau părinților lor. În alte situații, cei în căutarea unui salariu cât mai mare, acceptă să meargă în diferite colțuri ale țării sau ale lumi pentru a lucra. Fiindcă că nu știu limba sau nu dispun de cunoștințele necesare, cad rapid în plasa traficanților. ",
    type: "Articol",
  },
]

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)

  // added search state
  const [searchTerm, setSearchTerm] = useState("")

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(resources.map((res) => res.type)))
    return types.sort()
  }, [])

  const filteredResources = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    let items = resources

    // filter by selected type
    if (selectedType) {
      items = items.filter((res) => res.type === selectedType)
    }

    if (!q) return items

    return items.filter((res) => {
      const hay = (
        (res.title || "") +
        " " +
        (res.description || "") +
        " " +
        (res.type || "") +
        " " +
        (res.contact || "")
      ).toLowerCase()
      return hay.includes(q)
    })
  }, [selectedType, searchTerm])


  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">
            Resurse
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Accesează informații verificate, contacte de urgență și ghiduri educaționale. Folosește bara de căutare pentru a filtra după subiect.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10 h-12"
            placeholder="Caută resurse (ex: 'juridic', 'locuință', 'linie de ajutor')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {uniqueTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`rounded-full transition-all ${
                selectedType === type
                  ? "bg-primary hover:opacity-90 text-primary-foreground shadow-md"
                  : "border-secondary text-primary"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1">
          {filteredResources.map((res, idx) => (
            <Card
              key={idx}
              className="hover:border-accent transition-all hover:shadow-lg border-border"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <SimpleBadge className="mb-2">{res.type}</SimpleBadge>
                  {res.link && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </div>
                <CardTitle className="text-xl">{res.title}</CardTitle>
                <CardDescription>{res.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {res.contact && (
                  <Button variant="outline" className="w-full mb-2 gap-2 bg-transparent">
                    <Phone className="h-4 w-4" /> {res.contact}
                  </Button>
                )}
                {res.link && (
                  <Button
                    className="w-full gap-2 bg-primary hover:opacity-90 text-primary-foreground shadow-md"
                    variant="default"
                    onClick={() => window.open(res.link, "_blank")}
                  >
                  <BookOpen className="h-4 w-4" />
                    {res.contact ? "Vizitează Site-ul" : "Citește Ghidul"}
                </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
