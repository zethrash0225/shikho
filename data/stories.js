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

  // ===== A2: simple description =====
  {
    id: "s9",
    cefr: "A2",
    title: "બગીચામાં એક દિવસ",
    titleEn: "A day in the garden",
    text: [
      "આજે રવિવાર છે અને હવામાન સારું છે.",
      "મારી નાની બહેન અને હું બગીચામાં ફરવા ગયા.",
      "ત્યાં ઘણા બાળકો રમતા હતા.",
      "મારી બહેન સાયકલ ચલાવી રહી હતી.",
      "મેં ફૂલો જોયા અને થોડા ફોટા લીધા.",
      "પાછળથી અમે આઈસ્ક્રીમ ખાધી.",
      "આ દિવસ ખૂબ સારો રહ્યો.",
    ],
    translations: [
      "Today is Sunday and the weather is nice.",
      "My little sister and I went to the garden for a walk.",
      "Many children were playing there.",
      "My sister was riding a bicycle.",
      "I saw flowers and took a few photos.",
      "Later we ate ice cream.",
      "This day was very good.",
    ],
    gloss: [
      { gu: "બગીચામાં", en: "in the garden" },
      { gu: "ફરવા", en: "to walk / stroll" },
      { gu: "ચલાવી રહી હતી", en: "was riding (continuous)" },
      { gu: "પાછળથી", en: "later / afterwards" },
      { gu: "ફૂલો", en: "flowers" },
    ],
    questions: [
      {
        q: "What day of the week is it?",
        choices: ["Sunday", "Monday", "Friday", "Saturday"],
        correct: "Sunday",
      },
      {
        q: "Who went to the garden?",
        choices: ["The narrator and his little sister", "The whole family", "Just the narrator", "The narrator's friends"],
        correct: "The narrator and his little sister",
      },
      {
        q: "What was the sister doing?",
        choices: ["Riding a bicycle", "Eating ice cream", "Taking photos", "Reading"],
        correct: "Riding a bicycle",
      },
      {
        q: "What did they eat?",
        choices: ["Ice cream", "Roti", "Vegetables", "Fruit"],
        correct: "Ice cream",
      },
    ],
  },

  // ===== A2/B1: school memory =====
  {
    id: "s10",
    cefr: "A2/B1",
    title: "મારી શાળાનો અનુભવ",
    titleEn: "My school experience",
    text: [
      "જ્યારે હું નાનો હતો, ત્યારે હું ગુજરાતી માધ્યમની શાળામાં ભણતો હતો.",
      "મારી શાળા ઘરથી નજીક હતી, એટલે હું પગે ચાલીને જતો.",
      "મારા પ્રિય શિક્ષક માધવ સાહેબ હતા.",
      "તેઓ ગણિત શીખવતા હતા અને ખૂબ ધીરજવાન હતા.",
      "દર શનિવારે અમે રમતગમત રમતા હતા.",
      "મારા સહપાઠીઓ આજે પણ મારા સારા મિત્રો છે.",
      "એ દિવસો યાદ આવે છે, ત્યારે મન ભારે થઈ જાય છે.",
    ],
    translations: [
      "When I was small, I used to study at a Gujarati-medium school.",
      "My school was close to home, so I would walk on foot.",
      "My favorite teacher was Madhav Sir.",
      "He taught mathematics and was very patient.",
      "Every Saturday we used to play games.",
      "My classmates are still my good friends today.",
      "When I remember those days, my heart grows heavy.",
    ],
    gloss: [
      { gu: "માધ્યમ", en: "medium (of instruction)" },
      { gu: "ભણતો હતો", en: "used to study (habitual past)" },
      { gu: "પગે ચાલીને", en: "on foot" },
      { gu: "ધીરજવાન", en: "patient" },
      { gu: "સહપાઠીઓ", en: "classmates" },
      { gu: "મન ભારે થઈ જાય છે", en: "the heart grows heavy" },
    ],
    questions: [
      {
        q: "What medium of instruction was the narrator's school?",
        choices: ["Gujarati", "English", "Hindi", "Marathi"],
        correct: "Gujarati",
      },
      {
        q: "How did the narrator get to school?",
        choices: ["On foot", "By bicycle", "By bus", "By car"],
        correct: "On foot",
      },
      {
        q: "What did Madhav Sir teach?",
        choices: ["Mathematics", "Gujarati", "Science", "History"],
        correct: "Mathematics",
      },
      {
        q: "What does 'મન ભારે થઈ જાય છે' suggest?",
        choices: ["Nostalgia / sadness", "Excitement", "Anger", "Confusion"],
        correct: "Nostalgia / sadness",
      },
    ],
  },

  // ===== B1: cuisine =====
  {
    id: "s11",
    cefr: "B1",
    title: "ગુજરાતી ભોજનની ખાસિયત",
    titleEn: "The specialty of Gujarati cuisine",
    text: [
      "ગુજરાતી ભોજન તેના વૈવિધ્ય માટે પ્રખ્યાત છે.",
      "એક પૂર્ણ થાળીમાં દાળ, ભાત, રોટલી, શાક અને છાસ હોય છે.",
      "ઘણી વખત મીઠાશનો સ્પર્શ પણ ઉમેરવામાં આવે છે — જેમ કે ગોળ.",
      "ઢોકળા, થેપલા, ખાંડવી — આ બધી લોકપ્રિય વાનગીઓ છે.",
      "દરેક ઘરમાં મસાલા થોડા-થોડા અલગ હોય છે, એટલે દરેક ઘરનો સ્વાદ પણ અલગ હોય છે.",
      "ગુજરાતી લોકો માટે ભોજન ફક્ત પેટ ભરવા માટે નથી — એ પ્રેમ વ્યક્ત કરવાનું એક માધ્યમ છે.",
    ],
    translations: [
      "Gujarati cuisine is famous for its variety.",
      "A complete thali contains dal, rice, roti, vegetables, and buttermilk.",
      "Often a touch of sweetness is also added — like jaggery.",
      "Dhokla, thepla, khandvi — all these are popular dishes.",
      "In every household the spices are slightly different, so the taste of every home is different too.",
      "For Gujarati people, food is not just to fill the stomach — it is a medium of expressing love.",
    ],
    gloss: [
      { gu: "વૈવિધ્ય", en: "variety / diversity" },
      { gu: "પ્રખ્યાત", en: "famous" },
      { gu: "છાસ", en: "buttermilk" },
      { gu: "મીઠાશ", en: "sweetness" },
      { gu: "ઉમેરવામાં આવે છે", en: "is added (passive)" },
      { gu: "ગોળ", en: "jaggery" },
      { gu: "વાનગીઓ", en: "dishes / preparations" },
      { gu: "માધ્યમ", en: "medium / means" },
    ],
    questions: [
      {
        q: "What is Gujarati cuisine famous for?",
        choices: ["Its variety", "Being spicy", "Being only sweet", "Being simple"],
        correct: "Its variety",
      },
      {
        q: "What sweetener is mentioned as being added?",
        choices: ["Jaggery (ગોળ)", "Honey", "Sugar only", "Dates"],
        correct: "Jaggery (ગોળ)",
      },
      {
        q: "Why does each household's food taste different?",
        choices: ["Spices differ slightly", "Recipes are secret", "Ingredients vary regionally", "Cooking equipment differs"],
        correct: "Spices differ slightly",
      },
      {
        q: "What deeper meaning does food have for Gujaratis, per the text?",
        choices: ["A way of expressing love", "A duty", "Just nutrition", "A religious offering"],
        correct: "A way of expressing love",
      },
    ],
  },

  // ===== B1: travel anecdote =====
  {
    id: "s12",
    cefr: "B1",
    title: "ટ્રેન ચૂકી ગયો",
    titleEn: "I missed the train",
    text: [
      "ગયા અઠવાડિયે મારે અમદાવાદથી મુંબઈ જવાનું હતું.",
      "મારી ટ્રેન સવારે છ વાગ્યે હતી, પણ હું મોડો ઊઠ્યો.",
      "જ્યારે હું સ્ટેશન પહોંચ્યો, ત્યારે ટ્રેન ઊપડી ગઈ હતી.",
      "મેં તરત જ બીજી ટિકિટ ખરીદી, પણ આગલી ટ્રેન ત્રણ કલાક પછી હતી.",
      "મેં સ્ટેશન પાસેની ચાની દુકાનમાં બેસીને રાહ જોઈ.",
      "ત્યાં મારી મુલાકાત એક રસપ્રદ વૃદ્ધ સાથે થઈ.",
      "તેમણે મને જૂના મુંબઈની વાર્તાઓ સંભળાવી.",
      "ટ્રેન ચૂક્યાનો અફસોસ થયો, પણ એ મુલાકાત યાદગાર બની.",
    ],
    translations: [
      "Last week I had to go from Ahmedabad to Mumbai.",
      "My train was at six in the morning, but I woke up late.",
      "By the time I reached the station, the train had already departed.",
      "I immediately bought another ticket, but the next train was three hours later.",
      "I sat at a tea stall near the station and waited.",
      "There I met an interesting old man.",
      "He told me stories of old Mumbai.",
      "I regretted missing the train, but that meeting became memorable.",
    ],
    gloss: [
      { gu: "ચૂકી ગયો", en: "missed (perfective)" },
      { gu: "ઊપડી ગઈ હતી", en: "had already departed" },
      { gu: "તરત જ", en: "immediately" },
      { gu: "આગલી", en: "the next" },
      { gu: "રાહ જોઈ", en: "waited / kept watch" },
      { gu: "મુલાકાત", en: "meeting / encounter" },
      { gu: "વૃદ્ધ", en: "old man / elder" },
      { gu: "અફસોસ", en: "regret" },
      { gu: "યાદગાર", en: "memorable" },
    ],
    questions: [
      {
        q: "Why did the narrator miss the train?",
        choices: ["He woke up late", "Traffic", "His car broke down", "The train left early"],
        correct: "He woke up late",
      },
      {
        q: "How long did the narrator have to wait for the next train?",
        choices: ["Three hours", "One hour", "Six hours", "All day"],
        correct: "Three hours",
      },
      {
        q: "Where did he wait?",
        choices: ["A tea stall near the station", "Inside the station", "A hotel", "His friend's house"],
        correct: "A tea stall near the station",
      },
      {
        q: "How does the narrator feel about the missed train by the end?",
        choices: [
          "He regrets it but values the encounter that followed",
          "He's still angry",
          "He blames the railway",
          "He doesn't care"
        ],
        correct: "He regrets it but values the encounter that followed",
      },
    ],
  },

  // ===== B2: opinion / social =====
  {
    id: "s13",
    cefr: "B2",
    title: "શહેરી જીવનની ઝડપ",
    titleEn: "The pace of urban life",
    text: [
      "આજે મોટા શહેરોમાં લોકો સતત દોડતા રહે છે.",
      "સવારથી રાત સુધી — કામ, ટ્રાફિક, ફોન, મિટિંગ — બધું એક પછી એક.",
      "આપણે પોતાની સાથે બેસવાનો સમય જ ભૂલી ગયા છીએ.",
      "ગાડી ચાલતી હોય, પણ મન ચાલતું નથી.",
      "આ ઝડપમાં આપણે શું ગુમાવી રહ્યા છીએ?",
      "મારા મતે, સંબંધો, સ્વાસ્થ્ય અને શાંતિ — આ ત્રણ વસ્તુઓની કિંમત ઘટતી જાય છે.",
      "કદાચ સમય આવી ગયો છે કે આપણે થોડું ધીમું થઈએ.",
      "ધીમું થવું એ આળસ નથી — તે જીવનને ફરી અનુભવવાનું એક માર્ગ છે.",
    ],
    translations: [
      "In big cities today, people keep running constantly.",
      "From morning till night — work, traffic, phone, meetings — everything one after another.",
      "We have forgotten the very time to sit with ourselves.",
      "The vehicle moves, but the mind doesn't.",
      "What are we losing in this speed?",
      "In my opinion, relationships, health, and peace — the value of these three things keeps diminishing.",
      "Perhaps the time has come for us to slow down a bit.",
      "Slowing down is not laziness — it is a way to experience life again.",
    ],
    gloss: [
      { gu: "સતત", en: "constantly" },
      { gu: "દોડતા રહે છે", en: "keep running" },
      { gu: "ભૂલી ગયા છીએ", en: "have forgotten" },
      { gu: "ગુમાવી રહ્યા છીએ", en: "are losing" },
      { gu: "કિંમત", en: "value / price" },
      { gu: "ઘટતી જાય છે", en: "keeps decreasing" },
      { gu: "ધીમું થઈએ", en: "let us slow down" },
      { gu: "આળસ", en: "laziness" },
      { gu: "ફરી", en: "again" },
    ],
    questions: [
      {
        q: "What is the narrator's main concern about urban life?",
        choices: [
          "We rush so much that we lose touch with what matters",
          "Cities are too crowded",
          "Traffic is bad",
          "Phones are addictive"
        ],
        correct: "We rush so much that we lose touch with what matters",
      },
      {
        q: "Which three things does the narrator say we're devaluing?",
        choices: [
          "Relationships, health, peace",
          "Money, fame, power",
          "Family, religion, tradition",
          "Education, work, ambition"
        ],
        correct: "Relationships, health, peace",
      },
      {
        q: "How does the narrator define slowing down?",
        choices: [
          "A way to experience life again, not laziness",
          "Avoiding responsibility",
          "Doing nothing",
          "Retiring early"
        ],
        correct: "A way to experience life again, not laziness",
      },
      {
        q: "What grammar feature appears in 'ઘટતી જાય છે'?",
        choices: [
          "Continuous/progressive aspect",
          "Past tense",
          "Passive voice",
          "Subjunctive"
        ],
        correct: "Continuous/progressive aspect",
      },
    ],
  },

  // ===== B2: folktale =====
  {
    id: "s14",
    cefr: "B2",
    title: "બે મિત્રો અને રીંછ",
    titleEn: "Two friends and the bear",
    text: [
      "એક વખત બે મિત્રો જંગલમાંથી પસાર થઈ રહ્યા હતા.",
      "અચાનક તેમની સામે એક મોટું રીંછ આવી ગયું.",
      "પહેલો મિત્ર ઝડપથી એક ઝાડ પર ચડી ગયો.",
      "બીજો મિત્ર, જેને ચડતાં આવડતું ન હતું, જમીન પર સૂઈ ગયો અને શ્વાસ રોકી દીધો.",
      "રીંછ તેની પાસે આવ્યું, સૂંઘ્યું અને — મરેલા સમજીને — જતું રહ્યું.",
      "પાછળથી પહેલા મિત્રે પૂછ્યું, 'રીંછે તારા કાનમાં શું કહ્યું?'",
      "બીજાએ ગંભીરતાથી જવાબ આપ્યો, 'એણે કહ્યું — જે મિત્ર સંકટ સમયે છોડી જાય, તે સાચો મિત્ર નથી.'",
      "આ વાર્તાનો સાર સ્પષ્ટ છે: સાચા મિત્રો મુશ્કેલીમાં જ ઓળખાય છે.",
    ],
    translations: [
      "Once two friends were passing through a forest.",
      "Suddenly a big bear came in front of them.",
      "The first friend quickly climbed up a tree.",
      "The second friend, who didn't know how to climb, lay down on the ground and held his breath.",
      "The bear came near him, sniffed, and — thinking him dead — went away.",
      "Afterwards the first friend asked, 'What did the bear say in your ear?'",
      "The second answered seriously, 'It said — the friend who leaves you in times of trouble is not a true friend.'",
      "The moral of this story is clear: true friends are recognized only in difficulty.",
    ],
    gloss: [
      { gu: "પસાર થઈ રહ્યા હતા", en: "were passing (continuous past)" },
      { gu: "અચાનક", en: "suddenly" },
      { gu: "રીંછ", en: "bear" },
      { gu: "ચડી ગયો", en: "climbed up (perfective)" },
      { gu: "શ્વાસ રોકી દીધો", en: "held the breath" },
      { gu: "મરેલા સમજીને", en: "thinking (him) dead" },
      { gu: "સંકટ", en: "trouble / calamity" },
      { gu: "સાર", en: "essence / moral" },
      { gu: "મુશ્કેલીમાં", en: "in difficulty" },
      { gu: "ઓળખાય છે", en: "are recognized (passive)" },
    ],
    questions: [
      {
        q: "What did the first friend do when the bear appeared?",
        choices: ["Climbed a tree", "Hid in a bush", "Ran away", "Fought the bear"],
        correct: "Climbed a tree",
      },
      {
        q: "Why did the bear leave the second friend alone?",
        choices: [
          "It thought he was dead",
          "It wasn't hungry",
          "It heard a noise",
          "Another animal scared it"
        ],
        correct: "It thought he was dead",
      },
      {
        q: "What was the 'bear's message' meant to convey?",
        choices: [
          "A friend who abandons you in trouble isn't a real friend",
          "Bears are wise",
          "Climbing trees is bad",
          "Never travel through forests"
        ],
        correct: "A friend who abandons you in trouble isn't a real friend",
      },
      {
        q: "What is the moral of the story?",
        choices: [
          "True friends are recognized in difficulty",
          "Always carry a weapon",
          "Lie down when scared",
          "Bears can talk"
        ],
        correct: "True friends are recognized in difficulty",
      },
    ],
  },

  // ===== B2: formal letter =====
  {
    id: "s15",
    cefr: "B2",
    title: "મેનેજરને પત્ર",
    titleEn: "Letter to the manager",
    text: [
      "આદરણીય શ્રીમાન,",
      "વિષય: રજાની અરજી",
      "આપને જણાવવાનું કે હું ગયા સપ્તાહથી તાવ અને ઉધરસથી પીડાઉં છું.",
      "ડૉક્ટરની સલાહ મુજબ, મારે ઓછામાં ઓછા ત્રણ દિવસ આરામ કરવો જરૂરી છે.",
      "તેથી, હું વિનંતી કરું છું કે મને 3 થી 5 તારીખ સુધી રજા આપવામાં આવે.",
      "મારી જવાબદારીઓ રામભાઈને સોંપી દીધી છે, જેથી કામમાં વિક્ષેપ ન પડે.",
      "આપની સંમતિની અપેક્ષાએ,",
      "આભાર સહિત,",
      "મહેશ પટેલ",
    ],
    translations: [
      "Respected Sir,",
      "Subject: Leave application",
      "I would like to inform you that I have been suffering from fever and cough since last week.",
      "On the doctor's advice, I need to rest for at least three days.",
      "Therefore, I request that I be granted leave from the 3rd to the 5th.",
      "I have handed over my responsibilities to Rambhai, so that work is not disrupted.",
      "Awaiting your approval,",
      "With thanks,",
      "Mahesh Patel",
    ],
    gloss: [
      { gu: "આદરણીય", en: "respected (formal address)" },
      { gu: "વિષય", en: "subject (of a letter)" },
      { gu: "પીડાઉં છું", en: "I am suffering" },
      { gu: "સલાહ મુજબ", en: "as per the advice" },
      { gu: "ઓછામાં ઓછા", en: "at least" },
      { gu: "વિનંતી", en: "request" },
      { gu: "આપવામાં આવે", en: "be given (passive subjunctive)" },
      { gu: "જવાબદારીઓ", en: "responsibilities" },
      { gu: "વિક્ષેપ", en: "interruption / disturbance" },
      { gu: "સંમતિ", en: "approval / consent" },
      { gu: "અપેક્ષાએ", en: "in anticipation of" },
    ],
    questions: [
      {
        q: "Why is the writer requesting leave?",
        choices: ["Illness (fever and cough)", "Vacation", "Family event", "A wedding"],
        correct: "Illness (fever and cough)",
      },
      {
        q: "How many days of leave are requested?",
        choices: ["3 days (the 3rd to the 5th)", "1 day", "A week", "Half a day"],
        correct: "3 days (the 3rd to the 5th)",
      },
      {
        q: "Who will cover the writer's responsibilities?",
        choices: ["Rambhai", "The manager", "No one", "The whole team"],
        correct: "Rambhai",
      },
      {
        q: "Which feature marks this as a formal letter?",
        choices: [
          "Use of આદરણીય and formal closings",
          "Use of slang",
          "Use of emojis",
          "Casual greeting"
        ],
        correct: "Use of આદરણીય and formal closings",
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
