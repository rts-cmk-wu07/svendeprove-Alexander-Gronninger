## Netlify link

https://snazzy-starship-73792a.netlify.app/

Kræver at der køres API lokalt på localhost:4000
https://github.com/rts-cmk/landrup-dans-api

## TECH STACK

# React

https://reactjs.org/

- Har god erfaring med react
- Meget stor brugerbase
- Veldokumenteret
- Er god til mobil og tablet

# React Router

https://reactrouter.com/en/main

- Fungere godt med react, gør det nemt og hurtigt at skifte views uden site reload, hvilket ville være dårligt med react
- Stor brugerbase
- God dokumentation

# Tailwind

https://tailwindcss.com/

- Meget nem styling
- Stor brugerbase
- God dokumentation
- Tillader nemme custom regler, på en centraliseret og nem at ændre måde

# React icons

https://www.npmjs.com/package/react-icons

- Understøtter mange iconer
- Stor brugerbase
- God dokumentation
- Har god customizability

# React Slick

https://www.npmjs.com/package/react-slick

- Nem carousel, krævet for snippet fra tidligere projekter som passer godt her
- Stor brugerbase
- Meget costumizable
- God dokumentation

# React-hook-form

https://www.npmjs.com/package/react-hook-form

- Bedre form håndtering og kan gøre brug af Yup validering

# Yup

https://www.npmjs.com/package/yup

- Nem og overskuelig schema validering på form

# react toastify

https://www.npmjs.com/package/react-toastify

- Nemme notificationer til user feedback
- Stor brugerbase
- Nem og god dokumentation

# Framer motion

https://www.npmjs.com/package/framer-motion

- Nemme animationer
- Stor brugerbase
- Veldokumenteret, dog ikke super brugervenligt

# React-use-cookies

https://www.npmjs.com/package/react-use-cookie

- Nem og simple at bruge
- Bliver brugt af mange

# Kode Exempel

## 1 - centrering af kasse når CSS ikke virker

Denne kode bliver brugt på login siden. Der er sikkert en bedre løsning, men problemstillingen er følgende:
Login siden har en baggrund, og en div med gennemsigtig baggrund hendover, som er tilted.
Denne div er derfor større end selve siden / skærmen er.

Jeg vil gerne have login formularen bliver i midten af skærmen uanset hvad.
Så jeg får fat i bredden på vinduet og login containeren, finder forskellen på dem, og dividere med 2 for at finde den mængde pixels som margin-left skal have.
Denne udregning skal gøres hver gang vinduets bredde ændre sig, fordi i jo vil teste responsiveness - normal er det ret sjælendt at en bruger ændre skræm størrelse uden refresh.

Medmindre skærmen er over 1024, som er sidens bredde, opdaterer den, ellers sætter den til 1024
En useEffect gør at den bliver opdateret automatisk.
Den div som skal have margin er linket via useRef, hvor jeg bruger normal style={...}

```
const [formMarginLeft, setFormMarginLeft] = useState(null);
  const loginDiv = useRef();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setWindowSize({
          width: window.innerWidth,
        });
      } else {
        setWindowSize({ width: 1024 });
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    /* windows width minus login divs width divided by 2 gives the margin required for center */
    setFormMarginLeft(
      `${(windowSize.width - loginDiv?.current.offsetWidth) / 2}px`
    );
  }, [loginDiv, windowSize]);
```

## 2 - Guard clauses på 'skriv op' til klasse knap

Det første check jeg laver er om klasse dagen er i dag, man skal ikke kunne skrive op til en klasse der starter samme dag.
Det er egentlig ret simpelt, APIet giver dag i samme format som "long", på dansk i lowercase, så det bare at matche de 2.

Derefter tjekker jeg om personen er skrevet op til en klasse på den dag allerede, altså en kalendar konflikt.
Ingen 2 klasser har samme dag, men for fremtidssikringens skyld, valgte jeg at gøre dette.

Derefter tjekker jeg om brugeren møder aldersgrænserne til klassen.

Alle disse er guard clauses, dvs at hvis noget er opfyldt, så stopper den koden(return).

```
const currentDate = new Date();
  const currentDay = new Intl.DateTimeFormat("da-DA", {
    weekday: "long",
  }).format(currentDate);

  if (currentDay?.toLowerCase() === activity?.weekday?.toLowerCase()) {
    return toast.update(toastNotification, {
      render:
        "Du kan ikke skrive op til en klasse der starter i dag, prøv igen i morgen!",
      type: "error",
      isLoading: false,
      autoClose: 2500,
    });
  }

  userActivities?.forEach((userActivity) => {
    if (userActivity.weekday.toLowerCase() === activity.weekday.toLowerCase()) {
      return toast.update(toastNotification, {
        render: `Du kan kun skrive op til 1 klasse per dag, du er allerede skrevet op til ${userActivity.name}`,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  });

  if (userData.age > activity.maxAge || userData.age < activity.minAge) {
    return toast.update(toastNotification, {
      render: `Din alder passer ikke med aldersgrænsen for: ${activity.name}`,
      type: "error",
      isLoading: false,
      autoClose: 2500,
    });
  }

  {post fetch to add user to class...}
```

# Scalering

## Det ville være nemt fordi:

- Genbruligt kode

## Mulige vidreudvikling

- Profil side
- Træner side
- Klasse kategorier
- Opræt klasse
- Optræt bruger
