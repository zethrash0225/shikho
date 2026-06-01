// Vocabulary organized by level. Each entry: { gu, translit, en, category }
// Levels: 1 = Foundations, 2 = Survival, 3 = Daily Life, 4 = Conversational, 5 = Advanced

const VOCAB = {
  1: [
    // Greetings & basics
    { gu: "નમસ્તે",      translit: "namaste",     en: "hello / hi",           category: "greetings" },
    { gu: "કેમ છો",       translit: "kem chho",    en: "how are you?",         category: "greetings" },
    { gu: "મજામાં",       translit: "majā mā",    en: "I'm well",             category: "greetings" },
    { gu: "આભાર",         translit: "ābhār",      en: "thank you",            category: "greetings" },
    { gu: "માફ કરો",      translit: "māf karo",   en: "excuse me / sorry",    category: "greetings" },
    { gu: "હા",            translit: "hā",          en: "yes",                  category: "basics" },
    { gu: "ના",            translit: "nā",          en: "no",                   category: "basics" },
    { gu: "આવજો",         translit: "āvjo",       en: "goodbye",              category: "greetings" },
    // People
    { gu: "હું",           translit: "hū̃",         en: "I",                    category: "pronouns" },
    { gu: "તું",           translit: "tū̃",         en: "you (informal)",       category: "pronouns" },
    { gu: "તમે",           translit: "tame",        en: "you (formal/plural)",  category: "pronouns" },
    { gu: "તે",            translit: "te",          en: "he / she / it",        category: "pronouns" },
    { gu: "આપણે",         translit: "āpaṇe",      en: "we (inclusive)",       category: "pronouns" },
    { gu: "અમે",           translit: "ame",         en: "we (exclusive)",       category: "pronouns" },
    // Family
    { gu: "માતા",         translit: "mātā",       en: "mother",               category: "family" },
    { gu: "પિતા",         translit: "pitā",       en: "father",               category: "family" },
    { gu: "ભાઈ",          translit: "bhāī",       en: "brother",              category: "family" },
    { gu: "બહેન",         translit: "bahen",      en: "sister",               category: "family" },
    { gu: "દાદા",         translit: "dādā",       en: "grandfather (paternal)", category: "family" },
    { gu: "દાદી",         translit: "dādī",       en: "grandmother (paternal)", category: "family" },
  ],

  2: [
    // Food & drink
    { gu: "પાણી",         translit: "pāṇī",       en: "water",                category: "food" },
    { gu: "દૂધ",          translit: "dūdh",       en: "milk",                 category: "food" },
    { gu: "ચા",            translit: "chā",         en: "tea",                  category: "food" },
    { gu: "રોટલી",        translit: "roṭlī",      en: "flatbread / roti",     category: "food" },
    { gu: "ભાત",          translit: "bhāt",       en: "rice",                 category: "food" },
    { gu: "દાળ",          translit: "dāḷ",        en: "lentils / dal",        category: "food" },
    { gu: "શાક",          translit: "shāk",       en: "vegetable curry",      category: "food" },
    { gu: "મીઠું",         translit: "mīṭhū̃",      en: "salt",                 category: "food" },
    { gu: "ખાંડ",         translit: "khānḍ",      en: "sugar",                category: "food" },
    // Time
    { gu: "આજે",          translit: "āje",        en: "today",                category: "time" },
    { gu: "કાલે",          translit: "kāle",       en: "yesterday / tomorrow", category: "time" },
    { gu: "સવારે",        translit: "savāre",     en: "in the morning",       category: "time" },
    { gu: "બપોરે",         translit: "bapore",     en: "in the afternoon",     category: "time" },
    { gu: "સાંજે",         translit: "sānje",      en: "in the evening",       category: "time" },
    { gu: "રાત્રે",        translit: "rātre",      en: "at night",             category: "time" },
    // Common nouns
    { gu: "ઘર",           translit: "ghar",       en: "house / home",         category: "places" },
    { gu: "શાળા",         translit: "shāḷā",      en: "school",               category: "places" },
    { gu: "બજાર",         translit: "bajār",      en: "market",               category: "places" },
    { gu: "પુસ્તક",       translit: "pustak",     en: "book",                 category: "things" },
    { gu: "પેન",          translit: "pen",        en: "pen",                  category: "things" },
  ],

  3: [
    // Common verbs (infinitive form ends in -વું)
    { gu: "જવું",         translit: "javū̃",       en: "to go",                category: "verbs" },
    { gu: "આવવું",        translit: "āvavū̃",      en: "to come",              category: "verbs" },
    { gu: "ખાવું",         translit: "khāvū̃",      en: "to eat",               category: "verbs" },
    { gu: "પીવું",         translit: "pīvū̃",       en: "to drink",             category: "verbs" },
    { gu: "બોલવું",       translit: "bolvū̃",      en: "to speak",             category: "verbs" },
    { gu: "સાંભળવું",     translit: "sāmbhaḷvū̃",  en: "to listen",            category: "verbs" },
    { gu: "જોવું",         translit: "jovū̃",       en: "to see",               category: "verbs" },
    { gu: "વાંચવું",       translit: "vānchvū̃",   en: "to read",              category: "verbs" },
    { gu: "લખવું",        translit: "lakhvū̃",     en: "to write",             category: "verbs" },
    { gu: "કરવું",         translit: "karvū̃",      en: "to do",                category: "verbs" },
    // Question words
    { gu: "શું",           translit: "shū̃",        en: "what",                 category: "questions" },
    { gu: "કેમ",          translit: "kem",        en: "why / how",            category: "questions" },
    { gu: "ક્યાં",         translit: "kyā̃",        en: "where",                category: "questions" },
    { gu: "ક્યારે",        translit: "kyāre",      en: "when",                 category: "questions" },
    { gu: "કેટલું",        translit: "keṭlū̃",      en: "how much",             category: "questions" },
    { gu: "કોણ",          translit: "koṇ",        en: "who",                  category: "questions" },
    // Adjectives
    { gu: "સારું",         translit: "sārū̃",       en: "good",                 category: "adjectives" },
    { gu: "ખરાબ",         translit: "kharāb",     en: "bad",                  category: "adjectives" },
    { gu: "મોટું",         translit: "moṭū̃",       en: "big",                  category: "adjectives" },
    { gu: "નાનું",         translit: "nānū̃",       en: "small",                category: "adjectives" },
  ],

  4: [
    // Emotions & abstract
    { gu: "ખુશ",          translit: "khush",      en: "happy",                category: "emotions" },
    { gu: "દુઃખી",        translit: "duḥkhī",     en: "sad",                  category: "emotions" },
    { gu: "ગુસ્સો",       translit: "gusso",      en: "anger",                category: "emotions" },
    { gu: "પ્રેમ",        translit: "prem",       en: "love",                 category: "emotions" },
    { gu: "ડર",           translit: "ḍar",        en: "fear",                 category: "emotions" },
    { gu: "આશા",          translit: "āshā",       en: "hope",                 category: "emotions" },
    // Connectors
    { gu: "પણ",           translit: "paṇ",        en: "but / also",           category: "connectors" },
    { gu: "અને",          translit: "ane",        en: "and",                  category: "connectors" },
    { gu: "કારણ કે",      translit: "kāraṇ ke",   en: "because",              category: "connectors" },
    { gu: "જો",            translit: "jo",          en: "if",                   category: "connectors" },
    { gu: "તો",            translit: "to",          en: "then",                 category: "connectors" },
    // Work & study
    { gu: "નોકરી",        translit: "nokarī",     en: "job",                  category: "work" },
    { gu: "વ્યવસાય",     translit: "vyavasāy",   en: "business / profession", category: "work" },
    { gu: "અભ્યાસ",      translit: "abhyās",     en: "study",                category: "work" },
    { gu: "મુલાકાત",     translit: "mulākāt",    en: "meeting / visit",      category: "work" },
  ],

  5: [
    // Idioms & nuanced vocabulary
    { gu: "આશ્ચર્ય",      translit: "āshcharya",  en: "surprise / wonder",    category: "abstract" },
    { gu: "જવાબદારી",    translit: "javābdārī",  en: "responsibility",       category: "abstract" },
    { gu: "મહત્વ",        translit: "mahatva",    en: "importance",           category: "abstract" },
    { gu: "દૃષ્ટિકોણ",   translit: "dṛṣṭikoṇ",   en: "perspective",          category: "abstract" },
    { gu: "પરિસ્થિતિ",   translit: "paristhiti", en: "situation",            category: "abstract" },
    { gu: "સફળતા",       translit: "safaḷtā",    en: "success",              category: "abstract" },
    { gu: "નિષ્ફળતા",    translit: "niṣphaḷtā",  en: "failure",              category: "abstract" },
    { gu: "સંસ્કૃતિ",    translit: "saṃskṛti",   en: "culture",              category: "abstract" },
    { gu: "પરંપરા",       translit: "paramparā",  en: "tradition",            category: "abstract" },
    // Idiomatic phrases
    { gu: "મન મૂકીને",    translit: "man mūkīne", en: "wholeheartedly",       category: "idioms" },
    { gu: "આંખે વળગવું",  translit: "ānkhe vaḷagvū̃", en: "to catch one's eye", category: "idioms" },
    { gu: "પાણીમાં હાથ નાખવો", translit: "pāṇīmā̃ hāth nākhvo", en: "to interfere", category: "idioms" },
  ],
};
