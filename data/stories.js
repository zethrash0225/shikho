// Graded reading passages — A2 → B2.
// Each story: short narrative + vocab gloss + comprehension questions.
// Designed to bridge the gap from sentence-level to paragraph-level Gujarati.

const STORIES = [

  // ===== A2: simple narrative =====
  {
    id: "s1",
    cefr: "A2",
    title: "મારો દિવસ",
    titleEn: "My day",
    text: [
      "હું દરરોજ સવારે છ વાગ્યે ઊઠું છું.",
      "પછી હું ચા પીઉં છું અને છાપું વાંચું છું.",
      "આઠ વાગ્યે હું ઓફિસ જાઉં છું.",
      "બપોરે હું મિત્રો સાથે જમું છું.",
      "સાંજે છ વાગ્યે હું ઘરે પાછો આવું છું.",
      "રાત્રે હું પુસ્તક વાંચું છું અને દસ વાગ્યે સૂઈ જાઉં છું.",
    ],
    translations: [
      "I get up at six o'clock every morning.",
      "Then I drink tea and read the newspaper.",
      "At eight o'clock I go to the office.",
      "In the afternoon I eat lunch with friends.",
      "At six in the evening I come back home.",
      "At night I read a book and at ten I go to sleep.",
    ],
    gloss: [
      { gu: "દરરોજ", en: "every day" },
      { gu: "ઊઠું છું", en: "I get up" },
      { gu: "છાપું", en: "newspaper" },
      { gu: "પાછો આવું છું", en: "I come back" },
    ],
    questions: [
      {
        q: "When does the narrator wake up?",
        choices: ["6 AM", "8 AM", "10 PM", "noon"],
        correct: "6 AM",
      },
      {
        q: "What does the narrator do in the afternoon?",
        choices: ["Eats with friends", "Reads a book", "Goes to office", "Drinks tea"],
        correct: "Eats with friends",
      },
      {
        q: "At what time does the narrator go to sleep?",
        choices: ["10 PM", "8 PM", "6 AM", "noon"],
        correct: "10 PM",
      },
    ],
  },

  // ===== A2/B1: family =====
  {
    id: "s2",
    cefr: "A2/B1",
    title: "મારું કુટુંબ",
    titleEn: "My family",
    text: [
      "મારા કુટુંબમાં પાંચ સભ્યો છે.",
      "મારા પિતા ઈજનેર છે અને માતા શિક્ષિકા છે.",
      "મારી એક નાની બહેન છે જે હજુ શાળામાં ભણે છે.",
      "મારા દાદી અમારી સાથે રહે છે.",
      "દાદી અમને ઘણી જૂની વાર્તાઓ કહે છે.",
      "અમે દર રવિવારે સાથે જમીએ છીએ.",
      "મારું કુટુંબ મારા માટે સૌથી મહત્વનું છે.",
    ],
    translations: [
      "There are five members in my family.",
      "My father is an engineer and mother is a teacher.",
      "I have a younger sister who still studies in school.",
      "My grandmother lives with us.",
      "Grandmother tells us many old stories.",
      "We eat together every Sunday.",
      "My family is the most important to me.",
    ],
    gloss: [
      { gu: "સભ્યો", en: "members" },
      { gu: "શિક્ષિકા", en: "(female) teacher" },
      { gu: "હજુ", en: "still" },
      { gu: "વાર્તાઓ", en: "stories" },
      { gu: "મહત્વનું", en: "important" },
    ],
    questions: [
      {
        q: "How many people are in the narrator's family?",
        choices: ["Five", "Four", "Six", "Three"],
        correct: "Five",
      },
      {
        q: "What does the father do?",
        choices: ["Engineer", "Teacher", "Doctor", "Farmer"],
        correct: "Engineer",
      },
      {
        q: "Who lives with the family?",
        choices: ["Grandmother", "Grandfather", "Uncle", "Aunt"],
        correct: "Grandmother",
      },
      {
        q: "When does the family eat together?",
        choices: ["Every Sunday", "Every day", "On festivals", "Once a month"],
        correct: "Every Sunday",
      },
    ],
  },

  // ===== B1: travel narrative =====
  {
    id: "s3",
    cefr: "B1",
    title: "ગોવાનો પ્રવાસ",
    titleEn: "A trip to Goa",
    text: [
      "ગયા મહિને હું મારા મિત્રો સાથે ગોવા ગયો.",
      "અમે ટ્રેનમાં મુસાફરી કરી અને રસ્તામાં ખૂબ મજા આવી.",
      "ગોવા પહોંચીને અમે દરિયા કિનારે હોટેલમાં રહ્યા.",
      "દિવસે અમે દરિયા કિનારે ફર્યા અને સાંજે સૂર્યાસ્ત જોયો.",
      "ગોવાનું ભોજન ખૂબ સ્વાદિષ્ટ હતું — ખાસ કરીને માછલી.",
      "છેલ્લા દિવસે અમે જૂના કિલ્લાઓ જોવા ગયા.",
      "આ પ્રવાસ મારા જીવનનો સૌથી યાદગાર પ્રવાસ હતો.",
    ],
    translations: [
      "Last month I went to Goa with my friends.",
      "We traveled by train and had a lot of fun on the way.",
      "After arriving in Goa, we stayed at a hotel by the seashore.",
      "During the day we wandered along the beach and in the evening we watched the sunset.",
      "The food in Goa was very tasty — especially the fish.",
      "On the last day we went to see old forts.",
      "This trip was the most memorable trip of my life.",
    ],
    gloss: [
      { gu: "મુસાફરી", en: "journey" },
      { gu: "દરિયા કિનારે", en: "by the seashore" },
      { gu: "સૂર્યાસ્ત", en: "sunset" },
      { gu: "સ્વાદિષ્ટ", en: "tasty" },
      { gu: "ખાસ કરીને", en: "especially" },
      { gu: "કિલ્લાઓ", en: "forts" },
      { gu: "યાદગાર", en: "memorable" },
    ],
    questions: [
      {
        q: "How did they travel to Goa?",
        choices: ["By train", "By plane", "By car", "By bus"],
        correct: "By train",
      },
      {
        q: "What did they especially enjoy eating?",
        choices: ["Fish", "Roti", "Sweets", "Vegetables"],
        correct: "Fish",
      },
      {
        q: "What did they see on the last day?",
        choices: ["Old forts", "Markets", "Temples", "Mountains"],
        correct: "Old forts",
      },
      {
        q: "How did the narrator describe the trip?",
        choices: ["Most memorable", "Just okay", "Boring", "Short"],
        correct: "Most memorable",
      },
    ],
  },

  // ===== B1: opinion / society =====
  {
    id: "s4",
    cefr: "B1",
    title: "ટેક્નોલોજી અને બાળકો",
    titleEn: "Technology and children",
    text: [
      "આજકાલ બાળકો બહુ સમય મોબાઈલ પર વિતાવે છે.",
      "પહેલાં બાળકો બગીચામાં રમતા હતા, હવે તેઓ સ્ક્રીન પર રમે છે.",
      "મારા મતે, ટેક્નોલોજી સારી છે પણ વધારે ઉપયોગ ખરાબ છે.",
      "બાળકોએ રમવું જોઈએ, વાંચવું જોઈએ અને મિત્રો સાથે મળવું જોઈએ.",
      "માતા-પિતાએ સમય મર્યાદા રાખવી જોઈએ.",
      "જો યોગ્ય રીતે ઉપયોગ કરીએ, તો ટેક્નોલોજી ઉપયોગી થઈ શકે છે.",
    ],
    translations: [
      "These days children spend a lot of time on mobile phones.",
      "Earlier children used to play in the garden; now they play on screens.",
      "In my opinion, technology is good but excessive use is bad.",
      "Children should play, read, and meet with friends.",
      "Parents should set time limits.",
      "If used properly, technology can be useful.",
    ],
    gloss: [
      { gu: "આજકાલ", en: "these days" },
      { gu: "વિતાવે છે", en: "spend" },
      { gu: "વધારે", en: "excessive / more" },
      { gu: "મર્યાદા", en: "limit" },
      { gu: "યોગ્ય રીતે", en: "properly" },
    ],
    questions: [
      {
        q: "What is the narrator's main concern?",
        choices: ["Children using too much technology", "Adults using mobiles", "Bad apps", "Cost of phones"],
        correct: "Children using too much technology",
      },
      {
        q: "What did children do earlier, per the text?",
        choices: ["Played in the garden", "Watched TV", "Read books", "Slept more"],
        correct: "Played in the garden",
      },
      {
        q: "What does the narrator suggest parents should do?",
        choices: ["Set time limits", "Take away phones forever", "Buy newer phones", "Ignore the problem"],
        correct: "Set time limits",
      },
    ],
  },

  // ===== B1/B2: cultural reflection =====
  {
    id: "s5",
    cefr: "B1/B2",
    title: "દિવાળીની ઉજવણી",
    titleEn: "Celebrating Diwali",
    text: [
      "દિવાળી હિન્દુ ધર્મનો સૌથી મોટો તહેવાર છે.",
      "આ તહેવાર પ્રકાશનો વિજય દર્શાવે છે — અંધકાર પર પ્રકાશનો, અસત્ય પર સત્યનો.",
      "દિવાળીના દિવસે ઘરમાં દીવા પ્રગટાવવામાં આવે છે અને રંગોળી બનાવવામાં આવે છે.",
      "લોકો નવા કપડાં પહેરે છે અને એકબીજાને મીઠાઈ વહેંચે છે.",
      "આ તહેવાર પરિવાર સાથે રહેવાનું અને જૂના સંબંધો તાજા કરવાનું એક અવસર છે.",
      "મારા માટે, દિવાળી માત્ર તહેવાર નથી — તે પ્રેમ અને એકતાનું પ્રતીક છે.",
    ],
    translations: [
      "Diwali is the biggest festival of Hinduism.",
      "This festival represents the victory of light — light over darkness, truth over falsehood.",
      "On Diwali day, lamps are lit and rangolis are made in homes.",
      "People wear new clothes and share sweets with each other.",
      "This festival is an occasion to be with family and to refresh old relationships.",
      "For me, Diwali is not just a festival — it is a symbol of love and unity.",
    ],
    gloss: [
      { gu: "વિજય", en: "victory" },
      { gu: "દર્શાવે છે", en: "represents / shows" },
      { gu: "અંધકાર", en: "darkness" },
      { gu: "પ્રગટાવવામાં આવે છે", en: "are lit (passive)" },
      { gu: "વહેંચે છે", en: "share / distribute" },
      { gu: "અવસર", en: "occasion" },
      { gu: "પ્રતીક", en: "symbol" },
      { gu: "એકતા", en: "unity" },
    ],
    questions: [
      {
        q: "What does Diwali represent?",
        choices: ["Victory of light over darkness", "Beginning of harvest", "End of winter", "Birth of a god"],
        correct: "Victory of light over darkness",
      },
      {
        q: "What do people do on Diwali (per the text)?",
        choices: ["Light lamps and make rangolis", "Take long trips", "Fast all day", "Wear black clothes"],
        correct: "Light lamps and make rangolis",
      },
      {
        q: "What does the narrator personally feel Diwali symbolizes?",
        choices: ["Love and unity", "Wealth", "Religion only", "Family duty"],
        correct: "Love and unity",
      },
      {
        q: "What grammatical feature appears in 'દીવા પ્રગટાવવામાં આવે છે'?",
        choices: ["Passive voice", "Past tense", "Future tense", "Imperative"],
        correct: "Passive voice",
      },
    ],
  },

  // ===== B2: argumentative essay =====
  {
    id: "s6",
    cefr: "B2",
    title: "શિક્ષણનું મહત્વ",
    titleEn: "The importance of education",
    text: [
      "શિક્ષણ માનવ જીવનનો પાયો છે.",
      "જે વ્યક્તિ શિક્ષિત હોય, તે જ સમાજનો સાચો વિકાસ કરી શકે છે.",
      "પરંતુ આજે શિક્ષણ માત્ર ડિગ્રી મેળવવાનું સાધન બની ગયું છે.",
      "વિદ્યાર્થીઓ યાદ રાખે છે, પણ સમજતા નથી.",
      "મારા મતે, શિક્ષણનો સાચો અર્થ વિચારવાની ક્ષમતા વિકસાવવી છે.",
      "જો આપણે ફક્ત નોકરી માટે ભણીશું, તો સમાજ આગળ વધી શકશે નહીં.",
      "આપણે એવી શિક્ષણ પ્રણાલી જોઈએ જે જિજ્ઞાસા, કરુણા અને રચનાત્મકતા શીખવે.",
      "ત્યારે જ સાચા અર્થમાં શિક્ષિત સમાજ બનશે.",
    ],
    translations: [
      "Education is the foundation of human life.",
      "Only an educated person can bring true progress to society.",
      "But today education has become merely a means of getting a degree.",
      "Students memorize but do not understand.",
      "In my opinion, the true meaning of education is to develop the capacity to think.",
      "If we study only for a job, society will not be able to move forward.",
      "We need an education system that teaches curiosity, compassion, and creativity.",
      "Only then will a truly educated society be formed.",
    ],
    gloss: [
      { gu: "પાયો", en: "foundation" },
      { gu: "વિકસાવવી", en: "to develop (cause to grow)" },
      { gu: "પ્રણાલી", en: "system" },
      { gu: "જિજ્ઞાસા", en: "curiosity" },
      { gu: "કરુણા", en: "compassion" },
      { gu: "રચનાત્મકતા", en: "creativity" },
      { gu: "સાચા અર્થમાં", en: "in the true sense" },
    ],
    questions: [
      {
        q: "What is the narrator's main argument?",
        choices: [
          "Education should develop thinking, not just produce degrees",
          "Education is unnecessary",
          "Only degrees matter",
          "Schools should be abolished"
        ],
        correct: "Education should develop thinking, not just produce degrees",
      },
      {
        q: "What problem does the narrator identify?",
        choices: [
          "Students memorize but don't understand",
          "Schools are too expensive",
          "Teachers are unqualified",
          "Books are outdated"
        ],
        correct: "Students memorize but don't understand",
      },
      {
        q: "What three qualities should education foster?",
        choices: [
          "Curiosity, compassion, creativity",
          "Speed, memory, obedience",
          "Wealth, fame, status",
          "Politeness, silence, discipline"
        ],
        correct: "Curiosity, compassion, creativity",
      },
      {
        q: "What does 'સાચા અર્થમાં' mean?",
        choices: ["In the true sense", "In a way", "By the way", "On the surface"],
        correct: "In the true sense",
      },
    ],
  },

  // ===== B2: news-style report =====
  {
    id: "s7",
    cefr: "B2",
    title: "પર્યાવરણનું સંકટ",
    titleEn: "The environmental crisis",
    text: [
      "તાજેતરના સંશોધન મુજબ, વિશ્વનું તાપમાન ઝડપથી વધી રહ્યું છે.",
      "આનું મુખ્ય કારણ માનવ પ્રવૃત્તિઓ છે — ખાસ કરીને ઉદ્યોગો અને વાહનો.",
      "જો આ સ્થિતિ ચાલુ રહેશે, તો આવનારી પેઢીને ગંભીર પરિણામો ભોગવવા પડશે.",
      "બરફના ખડકો પીગળી રહ્યા છે, દરિયાનું સ્તર વધી રહ્યું છે.",
      "ઘણા પ્રાણીઓ લુપ્ત થવાની આરે છે.",
      "નિષ્ણાતો કહે છે કે હજુ સમય છે, પણ આપણે તાત્કાલિક પગલાં લેવા જોઈએ.",
      "પુનઃપ્રાપ્ય ઊર્જા, વૃક્ષારોપણ અને ઓછું પ્રદૂષણ — આ ત્રણ બાબતો પર ધ્યાન આપવું પડશે.",
    ],
    translations: [
      "According to recent research, the world's temperature is rising rapidly.",
      "The main cause of this is human activities — especially industries and vehicles.",
      "If this situation continues, future generations will have to suffer serious consequences.",
      "Glaciers are melting, sea level is rising.",
      "Many animals are on the verge of extinction.",
      "Experts say there is still time, but we must take immediate steps.",
      "Renewable energy, tree-planting, and less pollution — we must focus on these three things.",
    ],
    gloss: [
      { gu: "સંશોધન", en: "research" },
      { gu: "ઝડપથી", en: "rapidly" },
      { gu: "પેઢી", en: "generation" },
      { gu: "પરિણામો", en: "consequences" },
      { gu: "ભોગવવા પડશે", en: "will have to suffer" },
      { gu: "પીગળી રહ્યા છે", en: "are melting" },
      { gu: "લુપ્ત થવાની આરે", en: "on the verge of extinction" },
      { gu: "નિષ્ણાતો", en: "experts" },
      { gu: "તાત્કાલિક", en: "immediate" },
      { gu: "પુનઃપ્રાપ્ય", en: "renewable" },
      { gu: "વૃક્ષારોપણ", en: "tree-planting" },
    ],
    questions: [
      {
        q: "What is the main cause of rising temperatures, per the text?",
        choices: ["Human activities (industries, vehicles)", "Natural cycles", "Sun's brightness", "Animal populations"],
        correct: "Human activities (industries, vehicles)",
      },
      {
        q: "What are three suggested actions?",
        choices: [
          "Renewable energy, tree-planting, less pollution",
          "More cars, more factories, more roads",
          "Stop research, ignore data, build walls",
          "Buy electric appliances only"
        ],
        correct: "Renewable energy, tree-planting, less pollution",
      },
      {
        q: "What does the text say about animals?",
        choices: ["Many are on the verge of extinction", "They are reproducing more", "They adapt easily", "They migrate"],
        correct: "Many are on the verge of extinction",
      },
      {
        q: "What tone does the narrator take?",
        choices: ["Concerned but hopeful (still time)", "Indifferent", "Mocking", "Completely hopeless"],
        correct: "Concerned but hopeful (still time)",
      },
    ],
  },

  // ===== B2: literary / reflective =====
  {
    id: "s8",
    cefr: "B2",
    title: "દાદીની યાદો",
    titleEn: "Grandmother's memories",
    text: [
      "ગઈ રાત્રે મેં દાદીને સ્વપ્નમાં જોઈ.",
      "તેઓ વર્ષો પહેલાં ગુજરી ગયા હતા, છતાં તેમની હાજરી હજુ પણ અનુભવાય છે.",
      "દાદી હંમેશા કહેતાં, 'દીકરા, જીવનમાં બે વસ્તુ મહત્વની છે — પ્રામાણિકતા અને પ્રેમ.'",
      "જ્યારે હું નાનો હતો, તેઓ મને જૂની વાર્તાઓ સંભળાવતા હતાં — રાજાઓની, ઋષિઓની, સામાન્ય માણસોની.",
      "આજે, જ્યારે હું જીવનની મુશ્કેલીઓ સાથે લડું છું, ત્યારે તેમના શબ્દો યાદ આવે છે.",
      "મને ખબર છે કે તેઓ હવે મારી પાસે નથી, પણ તેમની શીખ મારી અંદર છે.",
      "કોઈ વખત એમ લાગે છે કે પ્રિયજનો જતા નથી — તેઓ આપણા હૃદયમાં રહે છે.",
    ],
    translations: [
      "Last night I saw my grandmother in a dream.",
      "She had passed away years ago, yet her presence is still felt.",
      "Grandmother always used to say, 'Son, two things matter in life — honesty and love.'",
      "When I was small, she used to tell me old stories — of kings, of sages, of ordinary people.",
      "Today, when I struggle with life's difficulties, her words come back to me.",
      "I know she is no longer with me, but her teaching is within me.",
      "Sometimes it feels that loved ones don't go away — they live in our hearts.",
    ],
    gloss: [
      { gu: "ગુજરી ગયા", en: "passed away" },
      { gu: "છતાં", en: "yet / nevertheless" },
      { gu: "હાજરી", en: "presence" },
      { gu: "પ્રામાણિકતા", en: "honesty" },
      { gu: "સંભળાવતા હતાં", en: "used to tell (lit. cause to hear)" },
      { gu: "ઋષિઓ", en: "sages" },
      { gu: "મુશ્કેલીઓ", en: "difficulties" },
      { gu: "શીખ", en: "teaching / lesson" },
      { gu: "પ્રિયજનો", en: "loved ones" },
    ],
    questions: [
      {
        q: "When did the grandmother pass away?",
        choices: ["Years ago", "Last night", "Recently", "Never — she's alive"],
        correct: "Years ago",
      },
      {
        q: "What did grandmother say matters in life?",
        choices: ["Honesty and love", "Money and fame", "Health and work", "Religion and family"],
        correct: "Honesty and love",
      },
      {
        q: "What does the narrator say about loved ones at the end?",
        choices: [
          "They live on in our hearts",
          "They forget us quickly",
          "They are easily replaced",
          "They never return in dreams"
        ],
        correct: "They live on in our hearts",
      },
      {
        q: "What kind of stories did grandmother tell?",
        choices: [
          "Of kings, sages, and ordinary people",
          "Modern news stories",
          "Movie plots",
          "Family gossip"
        ],
        correct: "Of kings, sages, and ordinary people",
      },
    ],
  },

];
