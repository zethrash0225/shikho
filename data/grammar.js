// Grammar lessons organized progressively. Each lesson has explanation + examples + a writing prompt.

const GRAMMAR = [
  {
    id: "g1",
    level: 1,
    title: "Sentence Structure (SOV)",
    body: `Gujarati follows <strong>Subject – Object – Verb</strong> order, unlike English (SVO).
<br><br>
English: <em>I eat rice.</em> &nbsp;→&nbsp; Gujarati: <em>I rice eat.</em>
<br><br>
The verb almost always comes last. Get used to "saving the verb for the end."`,
    examples: [
      { gu: "હું ભાત ખાઉં છું.",  translit: "hū̃ bhāt khāū̃ chhū̃.",  en: "I eat rice." },
      { gu: "તે પુસ્તક વાંચે છે.", translit: "te pustak vānche chhe.", en: "He/she reads a book." },
      { gu: "અમે પાણી પીએ છીએ.", translit: "ame pāṇī pīe chhīe.",    en: "We drink water." },
    ],
    prompt: { en: "She drinks tea.", expected: "તે ચા પીએ છે." },
  },
  {
    id: "g2",
    level: 1,
    title: "To Be: છે (chhe)",
    body: `The verb <strong>છે (chhe)</strong> = "is/am/are" in the present tense. Its form changes with the subject:
<br><br>
<strong>હું છું</strong> (I am) · <strong>તું છે</strong> (you are, informal) · <strong>તમે છો</strong> (you are, formal/plural)
<br>
<strong>તે છે</strong> (he/she/it is) · <strong>અમે છીએ</strong> / <strong>આપણે છીએ</strong> (we are) · <strong>તેઓ છે</strong> (they are)`,
    examples: [
      { gu: "હું વિદ્યાર્થી છું.",  translit: "hū̃ vidyārthī chhū̃.",  en: "I am a student." },
      { gu: "તું ખુશ છે.",          translit: "tū̃ khush chhe.",       en: "You are happy." },
      { gu: "તમે ક્યાં છો?",         translit: "tame kyā̃ chho?",       en: "Where are you?" },
      { gu: "તેઓ ઘરે છે.",          translit: "teo ghare chhe.",      en: "They are at home." },
    ],
    prompt: { en: "I am happy.", expected: "હું ખુશ છું." },
  },
  {
    id: "g3",
    level: 2,
    title: "Gender & Noun Endings",
    body: `Gujarati nouns have three genders: <strong>masculine</strong>, <strong>feminine</strong>, and <strong>neuter</strong>. Many nouns signal gender by ending:
<br><br>
• <strong>-o (ઓ)</strong> → typically masculine: <em>છોકરો</em> (boy)
<br>
• <strong>-ī (ી)</strong> → typically feminine: <em>છોકરી</em> (girl)
<br>
• <strong>-ū̃ (ું)</strong> → typically neuter: <em>બાળક</em> (child), <em>પુસ્તક</em> (book)
<br><br>
Adjectives and some verb forms agree with the gender of the noun.`,
    examples: [
      { gu: "છોકરો સારો છે.",       translit: "chhokro sāro chhe.",   en: "The boy is good. (masc.)" },
      { gu: "છોકરી સારી છે.",       translit: "chhokrī sārī chhe.",   en: "The girl is good. (fem.)" },
      { gu: "બાળક સારું છે.",        translit: "bāḷak sārū̃ chhe.",     en: "The child is good. (neut.)" },
    ],
    prompt: { en: "The book is small.", expected: "પુસ્તક નાનું છે." },
  },
  {
    id: "g4",
    level: 2,
    title: "Plural Forms",
    body: `Most nouns form plurals predictably:
<br><br>
• Masc. <strong>-o</strong> → <strong>-ā</strong>: <em>છોકરો → છોકરા</em>
<br>
• Fem. <strong>-ī</strong> → <strong>-īo</strong>: <em>છોકરી → છોકરીઓ</em>
<br>
• Neut. <strong>-ū̃</strong> → <strong>-ā̃</strong>: <em>બાળક → બાળકો</em> (note: -o is also common for neut. plurals)`,
    examples: [
      { gu: "બે છોકરા આવ્યા.",       translit: "be chhokrā āvyā.",     en: "Two boys came." },
      { gu: "ત્રણ છોકરીઓ આવી.",    translit: "traṇ chhokrīo āvī.",  en: "Three girls came." },
      { gu: "પુસ્તકો ટેબલ પર છે.",   translit: "pustako ṭebal par chhe.", en: "The books are on the table." },
    ],
    prompt: { en: "The boys are happy.", expected: "છોકરા ખુશ છે." },
  },
  {
    id: "g5",
    level: 3,
    title: "Present Tense Verbs",
    body: `Present tense = <strong>verb stem + ending</strong> + form of છે (auxiliary).
<br><br>
For <em>ખાવું</em> (to eat), the stem is <em>ખા-</em>. Endings change with subject:
<br><br>
• <strong>હું ખાઉં છું</strong> (I eat)
<br>
• <strong>તું ખાય છે</strong> (you eat, informal)
<br>
• <strong>તે ખાય છે</strong> (he/she eats)
<br>
• <strong>અમે ખાઈએ છીએ</strong> (we eat)
<br>
• <strong>તમે ખાઓ છો</strong> (you all eat)
<br>
• <strong>તેઓ ખાય છે</strong> (they eat)`,
    examples: [
      { gu: "હું દૂધ પીઉં છું.",     translit: "hū̃ dūdh pīū̃ chhū̃.",   en: "I drink milk." },
      { gu: "તે રોજ ચાલે છે.",       translit: "te roj chāle chhe.",   en: "He/she walks daily." },
      { gu: "અમે ગુજરાતી શીખીએ છીએ.", translit: "ame gujarātī shīkhīe chhīe.", en: "We are learning Gujarati." },
    ],
    prompt: { en: "I read a book.", expected: "હું પુસ્તક વાંચું છું." },
  },
  {
    id: "g6",
    level: 3,
    title: "Postpositions",
    body: `Gujarati uses <strong>postpositions</strong> (after the noun) instead of prepositions:
<br><br>
• <strong>માં</strong> (mā̃) = in &nbsp;|&nbsp; <strong>પર</strong> (par) = on
<br>
• <strong>ની સાથે</strong> (nī sāthe) = with &nbsp;|&nbsp; <strong>થી</strong> (thī) = from
<br>
• <strong>ને</strong> (ne) = to (indirect object marker) &nbsp;|&nbsp; <strong>નું/ની/નાં</strong> (nū̃/nī/nā̃) = of (agrees with gender)`,
    examples: [
      { gu: "પુસ્તક ટેબલ પર છે.",    translit: "pustak ṭebal par chhe.", en: "The book is on the table." },
      { gu: "હું ઘરમાં છું.",         translit: "hū̃ gharmā̃ chhū̃.",      en: "I am in the house." },
      { gu: "આ રામનું પુસ્તક છે.",   translit: "ā Rāmnū̃ pustak chhe.",  en: "This is Ram's book." },
    ],
    prompt: { en: "The pen is in the bag.", expected: "પેન થેલીમાં છે." },
  },
  {
    id: "g7",
    level: 4,
    title: "Past Tense",
    body: `Simple past for transitive verbs in Gujarati uses an <strong>ergative</strong> construction: the doer takes the suffix <strong>-એ (-e)</strong>, and the verb agrees with the object's gender/number.
<br><br>
For intransitive verbs (go, come, sit), the verb just agrees with the subject.`,
    examples: [
      { gu: "મેં પુસ્તક વાંચ્યું.",   translit: "mē̃ pustak vānchyū̃.",  en: "I read a book. (transitive, ergative)" },
      { gu: "તેણે ચા પીધી.",          translit: "teṇe chā pīdhī.",       en: "He/she drank tea." },
      { gu: "હું ગયો.",               translit: "hū̃ gayo.",             en: "I went. (intransitive, masc.)" },
      { gu: "હું ગઈ.",                translit: "hū̃ gaī.",              en: "I went. (intransitive, fem.)" },
    ],
    prompt: { en: "I drank water.", expected: "મેં પાણી પીધું." },
  },
  {
    id: "g8",
    level: 4,
    title: "Future Tense",
    body: `Future tense uses a verb stem + <strong>-શ (-sh)</strong> + ending. No auxiliary needed.
<br><br>
For <em>જવું</em> (to go): હું જઈશ · તું જશે · તે જશે · અમે જઈશું · તમે જશો · તેઓ જશે`,
    examples: [
      { gu: "હું કાલે જઈશ.",          translit: "hū̃ kāle jaīsh.",       en: "I will go tomorrow." },
      { gu: "તે ખાશે.",               translit: "te khāshe.",            en: "He/she will eat." },
      { gu: "અમે મળીશું.",            translit: "ame maḷīshū̃.",         en: "We will meet." },
    ],
    prompt: { en: "I will read the book.", expected: "હું પુસ્તક વાંચીશ." },
  },
  {
    id: "g9",
    level: 5,
    title: "Conditional Sentences (જો-તો)",
    body: `Use <strong>જો (jo)</strong> = "if" and <strong>તો (to)</strong> = "then" to build conditionals. The structure is: <em>જો [condition], તો [result]</em>.`,
    examples: [
      { gu: "જો વરસાદ આવે, તો હું નહીં આવું.", translit: "jo varsād āve, to hū̃ nahī̃ āvū̃.", en: "If it rains, I won't come." },
      { gu: "જો તું પ્રયત્ન કરે, તો સફળ થશે.", translit: "jo tū̃ prayatna kare, to safaḷ thashe.", en: "If you try, you'll succeed." },
    ],
    prompt: { en: "If I study, I will pass.", expected: "જો હું અભ્યાસ કરું, તો હું પાસ થઈશ." },
  },
  {
    id: "g10",
    level: 5,
    title: "Formal vs. Informal Register",
    body: `Choosing the right register matters.
<br><br>
• <strong>તું (tū̃)</strong> — used with close friends, children, or in intimate settings. Using it with elders or strangers is rude.
<br>
• <strong>તમે (tame)</strong> — used with elders, strangers, and in formal/professional contexts. The default for politeness.
<br>
• <strong>આપ (āp)</strong> — extremely formal, used for very high respect (rare in modern speech).
<br><br>
Verbs and addresses change to match. E.g., <em>બેસો</em> (sit, formal) vs. <em>બેસ</em> (sit, informal).`,
    examples: [
      { gu: "તું ક્યાં જાય છે?",       translit: "tū̃ kyā̃ jāy chhe?",   en: "Where are you going? (to a friend)" },
      { gu: "તમે ક્યાં જાઓ છો?",      translit: "tame kyā̃ jāo chho?",  en: "Where are you going? (polite)" },
      { gu: "આપનું નામ શું છે?",       translit: "āpnū̃ nām shū̃ chhe?", en: "What is your name? (very formal)" },
    ],
    prompt: { en: "Where do you live? (polite)", expected: "તમે ક્યાં રહો છો?" },
  },
];
