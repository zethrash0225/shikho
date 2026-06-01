// Gujarati alphabet data
// Each entry: { char, translit (Roman), name, sound (English approx), ipa }

const ALPHABET = {
  vowels: [
    { char: "અ", translit: "a",  name: "a",  sound: "like 'u' in 'cup'",   ipa: "ə" },
    { char: "આ", translit: "ā",  name: "aa", sound: "like 'a' in 'father'", ipa: "aː" },
    { char: "ઇ", translit: "i",  name: "i",  sound: "like 'i' in 'bit'",   ipa: "i" },
    { char: "ઈ", translit: "ī",  name: "ee", sound: "like 'ee' in 'see'",  ipa: "iː" },
    { char: "ઉ", translit: "u",  name: "u",  sound: "like 'u' in 'put'",   ipa: "u" },
    { char: "ઊ", translit: "ū",  name: "oo", sound: "like 'oo' in 'food'", ipa: "uː" },
    { char: "ઋ", translit: "ṛ",  name: "ru", sound: "like 'ri' in 'rich'", ipa: "ɾu" },
    { char: "એ", translit: "e",  name: "e",  sound: "like 'a' in 'cake'",  ipa: "e" },
    { char: "ઐ", translit: "ai", name: "ai", sound: "like 'ai' in 'aisle'",ipa: "əi" },
    { char: "ઓ", translit: "o",  name: "o",  sound: "like 'o' in 'go'",    ipa: "o" },
    { char: "ઔ", translit: "au", name: "au", sound: "like 'ow' in 'now'",  ipa: "əu" },
    { char: "અં", translit: "aṃ", name: "an", sound: "nasal 'an'",         ipa: "ə̃" },
    { char: "અઃ", translit: "aḥ", name: "ah", sound: "aspirated 'ah'",     ipa: "əh" },
  ],

  consonants: [
    // Velars
    { char: "ક", translit: "ka", group: "velar", sound: "like 'k' in 'kite'" },
    { char: "ખ", translit: "kha", group: "velar", sound: "aspirated k, like 'kh'" },
    { char: "ગ", translit: "ga", group: "velar", sound: "like 'g' in 'go'" },
    { char: "ઘ", translit: "gha", group: "velar", sound: "aspirated g, like 'gh'" },
    { char: "ઙ", translit: "ṅa", group: "velar", sound: "like 'ng' in 'sing'" },
    // Palatals
    { char: "ચ", translit: "cha", group: "palatal", sound: "like 'ch' in 'chair'" },
    { char: "છ", translit: "chha", group: "palatal", sound: "aspirated ch" },
    { char: "જ", translit: "ja", group: "palatal", sound: "like 'j' in 'jam'" },
    { char: "ઝ", translit: "jha", group: "palatal", sound: "aspirated j" },
    { char: "ઞ", translit: "ña", group: "palatal", sound: "like 'ny' in 'canyon'" },
    // Retroflex
    { char: "ટ", translit: "ṭa", group: "retroflex", sound: "hard 't' (tongue curled back)" },
    { char: "ઠ", translit: "ṭha", group: "retroflex", sound: "aspirated retroflex t" },
    { char: "ડ", translit: "ḍa", group: "retroflex", sound: "hard 'd' (tongue curled back)" },
    { char: "ઢ", translit: "ḍha", group: "retroflex", sound: "aspirated retroflex d" },
    { char: "ણ", translit: "ṇa", group: "retroflex", sound: "retroflex n" },
    // Dentals
    { char: "ત", translit: "ta", group: "dental", sound: "soft 't' (tongue on teeth)" },
    { char: "થ", translit: "tha", group: "dental", sound: "aspirated soft t" },
    { char: "દ", translit: "da", group: "dental", sound: "soft 'd' (tongue on teeth)" },
    { char: "ધ", translit: "dha", group: "dental", sound: "aspirated soft d" },
    { char: "ન", translit: "na", group: "dental", sound: "like 'n' in 'no'" },
    // Labials
    { char: "પ", translit: "pa", group: "labial", sound: "like 'p' in 'pen'" },
    { char: "ફ", translit: "pha", group: "labial", sound: "like 'f' or aspirated p" },
    { char: "બ", translit: "ba", group: "labial", sound: "like 'b' in 'bat'" },
    { char: "ભ", translit: "bha", group: "labial", sound: "aspirated b" },
    { char: "મ", translit: "ma", group: "labial", sound: "like 'm' in 'man'" },
    // Semivowels & sibilants
    { char: "ય", translit: "ya", group: "other", sound: "like 'y' in 'yes'" },
    { char: "ર", translit: "ra", group: "other", sound: "rolled 'r'" },
    { char: "લ", translit: "la", group: "other", sound: "like 'l' in 'lap'" },
    { char: "વ", translit: "va", group: "other", sound: "like 'v'/'w'" },
    { char: "શ", translit: "śa", group: "other", sound: "like 'sh' in 'ship'" },
    { char: "ષ", translit: "ṣa", group: "other", sound: "retroflex sh" },
    { char: "સ", translit: "sa", group: "other", sound: "like 's' in 'sun'" },
    { char: "હ", translit: "ha", group: "other", sound: "like 'h' in 'hat'" },
    { char: "ળ", translit: "ḷa", group: "other", sound: "retroflex l (uniquely Gujarati)" },
    { char: "ક્ષ", translit: "kṣa", group: "other", sound: "like 'ksh'" },
    { char: "જ્ઞ", translit: "jña", group: "other", sound: "like 'gny'" },
  ],

  // Vowel signs (matras) attached to consonants. Shown on ક (ka) as example.
  matras: [
    { sign: "",   example: "ક",   translit: "ka",  note: "inherent 'a'" },
    { sign: "ા", example: "કા",  translit: "kā",  note: "aa" },
    { sign: "િ", example: "કિ",  translit: "ki",  note: "i" },
    { sign: "ી", example: "કી",  translit: "kī",  note: "ee" },
    { sign: "ુ", example: "કુ",  translit: "ku",  note: "u" },
    { sign: "ૂ", example: "કૂ",  translit: "kū",  note: "oo" },
    { sign: "ે", example: "કે",  translit: "ke",  note: "e" },
    { sign: "ૈ", example: "કૈ",  translit: "kai", note: "ai" },
    { sign: "ો", example: "કો",  translit: "ko",  note: "o" },
    { sign: "ૌ", example: "કૌ",  translit: "kau", note: "au" },
    { sign: "્", example: "ક્",   translit: "k",   note: "halant (kills the vowel)" },
  ],

  numbers: [
    { char: "૦", translit: "śūnya", value: 0, en: "zero" },
    { char: "૧", translit: "ek",     value: 1, en: "one" },
    { char: "૨", translit: "be",     value: 2, en: "two" },
    { char: "૩", translit: "traṇ",   value: 3, en: "three" },
    { char: "૪", translit: "chār",   value: 4, en: "four" },
    { char: "૫", translit: "pānch",  value: 5, en: "five" },
    { char: "૬", translit: "chha",   value: 6, en: "six" },
    { char: "૭", translit: "sāt",    value: 7, en: "seven" },
    { char: "૮", translit: "āṭh",    value: 8, en: "eight" },
    { char: "૯", translit: "nav",    value: 9, en: "nine" },
    { char: "૧૦", translit: "das",    value: 10, en: "ten" },
  ],
};
