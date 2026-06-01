// Scripted dialogues for the Conversation module. Each scenario steps through
// a conversation; the learner picks a response from 2-3 options.

const DIALOGUES = [
  {
    id: "d1",
    level: 1,
    title: "Meeting Someone New",
    scenario: "You're meeting a Gujarati speaker for the first time. Greet them and exchange names.",
    steps: [
      {
        partner: { gu: "નમસ્તે! કેમ છો?", translit: "Namaste! Kem chho?", en: "Hello! How are you?" },
        options: [
          { gu: "નમસ્તે! મજામાં, આભાર. તમે?", en: "Hello! I'm well, thanks. You?", correct: true },
          { gu: "ભાત ખાવું છે.", en: "I want to eat rice.", correct: false },
          { gu: "આવજો.", en: "Goodbye.", correct: false },
        ],
      },
      {
        partner: { gu: "હું પણ મજામાં છું. તમારું નામ શું છે?", translit: "Hū̃ paṇ majā mā̃ chhū̃. Tamārū̃ nām shū̃ chhe?", en: "I'm well too. What is your name?" },
        options: [
          { gu: "મારું નામ [Name] છે.", en: "My name is [Name].", correct: true },
          { gu: "મારું ઘર મોટું છે.", en: "My house is big.", correct: false },
        ],
      },
      {
        partner: { gu: "મળીને આનંદ થયો!", translit: "Maḷīne ānand thayo!", en: "Pleased to meet you!" },
        options: [
          { gu: "મને પણ આનંદ થયો.", en: "Pleased to meet you too.", correct: true },
          { gu: "મને ભૂખ લાગી છે.", en: "I'm hungry.", correct: false },
        ],
      },
    ],
  },

  {
    id: "d2",
    level: 2,
    title: "At a Tea Stall",
    scenario: "You're ordering chai at a roadside stall.",
    steps: [
      {
        partner: { gu: "બોલો, શું જોઈએ?", translit: "Bolo, shū̃ joīe?", en: "Tell me, what would you like?" },
        options: [
          { gu: "એક ચા આપો, કૃપા કરીને.", en: "One tea, please.", correct: true },
          { gu: "હું શાળાએ જાઉં છું.", en: "I'm going to school.", correct: false },
        ],
      },
      {
        partner: { gu: "ખાંડ વાળી કે વગર?", translit: "Khānḍ vāḷī ke vagar?", en: "With sugar or without?" },
        options: [
          { gu: "ખાંડ વગર, આભાર.", en: "Without sugar, thanks.", correct: true },
          { gu: "મીઠું વગર.", en: "Without salt.", correct: false },
        ],
      },
      {
        partner: { gu: "દસ રૂપિયા થયા.", translit: "Das rupiyā thayā.", en: "That'll be ten rupees." },
        options: [
          { gu: "આ રહ્યા. આભાર!", en: "Here you go. Thank you!", correct: true },
          { gu: "મને ખબર નથી.", en: "I don't know.", correct: false },
        ],
      },
    ],
  },

  {
    id: "d3",
    level: 3,
    title: "Asking for Directions",
    scenario: "You're lost and asking a passerby for directions to the market.",
    steps: [
      {
        partner: { gu: "હા, શું મદદ કરું?", translit: "Hā, shū̃ madad karū̃?", en: "Yes, how can I help?" },
        options: [
          { gu: "બજાર ક્યાં છે?", en: "Where is the market?", correct: true },
          { gu: "મારી પાસે પૈસા છે.", en: "I have money.", correct: false },
        ],
      },
      {
        partner: { gu: "સીધા જાઓ, પછી જમણી બાજુ વળો.", translit: "Sīdhā jāo, pachhī jamṇī bāju vaḷo.", en: "Go straight, then turn right." },
        options: [
          { gu: "કેટલું દૂર છે?", en: "How far is it?", correct: true },
          { gu: "મને ભૂખ લાગી છે.", en: "I'm hungry.", correct: false },
        ],
      },
      {
        partner: { gu: "લગભગ પાંચ મિનિટ.", translit: "Lagbhag pā̃ch minuṭ.", en: "About five minutes." },
        options: [
          { gu: "આભાર, તમારી મદદ બદલ.", en: "Thanks for your help.", correct: true },
          { gu: "મને ઊંઘ આવે છે.", en: "I'm sleepy.", correct: false },
        ],
      },
    ],
  },

  {
    id: "d4",
    level: 4,
    title: "Talking About Your Day",
    scenario: "A friend asks how your day went. Practice past-tense responses.",
    steps: [
      {
        partner: { gu: "આજે તારો દિવસ કેવો રહ્યો?", translit: "Āje tāro divas kevo rahyo?", en: "How was your day today?" },
        options: [
          { gu: "બહુ સારો રહ્યો, આભાર.", en: "Very good, thanks.", correct: true },
          { gu: "હું જઈશ.", en: "I will go.", correct: false },
        ],
      },
      {
        partner: { gu: "શું કર્યું તેં?", translit: "Shū̃ karyū̃ tē̃?", en: "What did you do?" },
        options: [
          { gu: "હું મિત્રો સાથે મળ્યો.", en: "I met with friends.", correct: true },
          { gu: "હું જમવા જઈશ.", en: "I will go to eat.", correct: false },
        ],
      },
      {
        partner: { gu: "મજા આવી?", translit: "Majā āvī?", en: "Did you have fun?" },
        options: [
          { gu: "હા, ખૂબ મજા આવી.", en: "Yes, lots of fun.", correct: true },
          { gu: "મને ખબર નથી.", en: "I don't know.", correct: false },
        ],
      },
    ],
  },

  {
    id: "d5",
    level: 5,
    title: "Expressing an Opinion",
    scenario: "Discussion about a film. Practice connectors and abstract vocabulary.",
    steps: [
      {
        partner: { gu: "તે ફિલ્મ વિશે તારો મત શું છે?", translit: "Te film viśe tāro mat shū̃ chhe?", en: "What's your opinion on that film?" },
        options: [
          { gu: "મને લાગે છે કે વાર્તા સારી હતી, પણ અભિનય નબળો હતો.", en: "I think the story was good, but the acting was weak.", correct: true },
          { gu: "મને ભૂખ લાગી છે.", en: "I'm hungry.", correct: false },
        ],
      },
      {
        partner: { gu: "કેમ એમ કહે છે?", translit: "Kem em kahe chhe?", en: "Why do you say that?" },
        options: [
          { gu: "કારણ કે પાત્રો બહુ ઉપરછલ્લા હતા.", en: "Because the characters were too superficial.", correct: true },
          { gu: "મેં ભાત ખાધો.", en: "I ate rice.", correct: false },
        ],
      },
      {
        partner: { gu: "હું તારી સાથે સહમત છું.", translit: "Hū̃ tārī sāthe sahamat chhū̃.", en: "I agree with you." },
        options: [
          { gu: "આપણે ફરી ચર્ચા કરીશું.", en: "We'll discuss again.", correct: true },
          { gu: "આવજો.", en: "Goodbye.", correct: false },
        ],
      },
    ],
  },
];
