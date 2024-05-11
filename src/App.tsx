import React, { useState } from 'react';
import EventSelector from './EventSelector';
import './App.css';
import Badge from './Badge';
import { generateScenarioImages, generateScenarios } from './api';
interface Image {
  url: string;
  description: string;
}

// Mock data for events and scenarios
const pevents_main = [
  { id: '1815', name: 'Napoleon', whatIf: 'What if Napoleon had won at Waterloo in 1815?', imageUrl: '/images/Napoleon.jpeg', scenarios: ["The Fashionista Empire: After his victory at Waterloo, Napoleon becomes enchanted by haute couture, turning Paris into the epicenter of global fashion. By 1955, the world witnesses the ultimate runway: the Moon. The first person to set foot on the Moon is renowned hat designer Coco LeChapeau in the year 1955, who declares the Moon the pinnacle of avant-garde fashion",
    "The Age of Steam: As Napoleon’s empire embraces advanced steam technology, eccentric inventors take to the skies—and beyond. In 1892, the first person to set foot on the Moon is Sir Puffington Loon, a British inventor who arrives in a steam-powered lunar locomotive, claiming the celestial body for the Empire.",
    "The Napoleonic Space Corps: Napoleon’s fascination with domination extends off-planet by the early 19th century, culminating in the lunar vineyards initiative. The first creature to set foot on the Moon is General Fluffy, a French poodle and decorated officer of the Napoleonic Space Corps, in the year 1835.",
    "Interdimensional Napoleonic Wars: With the discovery of dimensional rifts, the French Empire fights across realities. The strategic Moon base becomes pivotal in 1945. The first person to set foot on the Moon is General Bonaparte XII, a descendant of Napoleon, who rides his cybernetic horse across the Moon to repel Martian invaders in the year 1945.",
    "The Great Galactic Baguette: Under Napoleon’s rule, the discovery of an ancient alien artifact propels humanity into space. The first person to set foot on the Moon is baker Pierre Crumb in the year 2001, who uses the Moon to expand his celestial bakery network, starting with the iconic lunar croissants.",
    "The Surreal Solar System: Napoleon's empire adopts surrealism as state policy, leading to a bizarre artistic renaissance. The first creature to set foot on the Moon is a sentient painting named \"Mona Lunalisa\" in the year 2025, turning the lunar surface into a cosmic canvas for otherworldly art."], scenarioImages : [['/scenarios/napoleon/1.webp', '/scenarios/napoleon/2.webp', '/scenarios/napoleon/3.webp']] },
  { id: '1999', name: 'William Shakespeare', whatIf: 'What if Shakespeare had been born in the 21st century?', imageUrl: '/images/William.jpeg', scenarios: [] },
  { id: '1863', name: 'Abraham Lincoln', whatIf: 'What if Lincoln had not issued the Emancipation Proclamation?', imageUrl: '/images/Abraham.jpeg', scenarios: [] },
  { id: '1789', name: 'George Washington', whatIf: 'What if George Washington had accepted the offer to become King of America?', imageUrl: '/images/George.jpeg', scenarios: [] },
  { id: '1907', name: 'Adolf Hitler', whatIf: 'What if Hitler had been accepted into the Vienna Academy of Fine Arts?', imageUrl: '/images/Adolf.jpeg', scenarios: [] },
  { id: '300 BC', name: 'Aristotle', whatIf: 'What if Aristotle\'s works had been lost to history?', imageUrl: '/images/Aristotle.jpeg', scenarios: [] },
  { id: '323 BC', name: 'Alexander the Great', whatIf: 'What if Alexander had not died young and continued his conquests into Europe?', imageUrl: '/images/Alexander.jpeg', scenarios: [] },
  { id: '1533', name: 'Henry VIII of England', whatIf: 'What if Henry VIII had remained married to Catherine of Aragon?', imageUrl: '/images/Henry.jpeg', scenarios: [] },
  { id: '1831', name: 'Charles Darwin', whatIf: 'What if Darwin had never sailed on the HMS Beagle?', imageUrl: '/images/darwin.jpeg', scenarios: [] },
  { id: '1558', name: 'Elizabeth I of England', whatIf: 'What if Elizabeth I had married and had children?', imageUrl: '/images/Elizabeth.jpeg', scenarios: [] },
  { id: '1840', name: 'Karl Marx', whatIf: 'What if Marx had pursued a career in philosophy instead of political economy?', imageUrl: '/images/Karl.jpeg', scenarios: [] },
  { id: '44 BC', name: 'Julius Caesar', whatIf: 'What if Caesar had not been assassinated on the Ides of March?', imageUrl: '/images/Julius.jpeg', scenarios: [] },
  { id: '1850', name: 'Queen Victoria', whatIf: 'What if Queen Victoria had refused to embrace the industrial revolution?', imageUrl: '/images/Queen.jpeg', scenarios: [] },
  { id: '1920', name: 'Joseph Stalin', whatIf: 'What if Stalin had been ousted from power in the 1920s?', imageUrl: '/images/Joseph.jpeg', scenarios: [] },
  { id: '1933', name: 'Albert Einstein', whatIf: 'What if Einstein had stayed in Germany during the rise of the Nazis?', imageUrl: '/images/Albert.jpeg', scenarios: [] },
  { id: '1492', name: 'Christopher Columbus', whatIf: 'What if Columbus had never convinced the Spanish crown to fund his voyage?', imageUrl: '/images/Christopher.jpeg', scenarios: [] },
  { id: '1700', name: 'Isaac Newton', whatIf: 'What if Newton had focused solely on alchemy, ignoring physics and mathematics?', imageUrl: '/images/Isaac.jpeg', scenarios: [] },
  { id: '1791', name: 'Wolfgang Amadeus Mozart', whatIf: 'What if Mozart had lived into his 60s?', imageUrl: '/images/Wolfgang.jpeg', scenarios: [] },
  { id: '387 BC', name: 'Plato', whatIf: 'What if Plato had never founded the Academy in Athens?', imageUrl: '/images/Plato.jpeg', scenarios: [] },
  { id: '1802', name: 'Ludwig van Beethoven', whatIf: 'What if Beethoven had never lost his hearing?', imageUrl: '/images/Ludwig.jpeg', scenarios: [] },
  { id: '1500', name: 'Leonardo da Vinci', whatIf: 'What if da Vinci had seen his most ambitious inventions built?', imageUrl: '/images/Leonardo.jpeg', scenarios: [] },
  { id: '1843', name: 'Charles Dickens', whatIf: 'What if Dickens had never written "A Christmas Carol"?', imageUrl: '/images/Charles.jpeg', scenarios: [] },
  { id: '1776', name: 'Benjamin Franklin', whatIf: 'What if Franklin had sided with the British during the American Revolution?', imageUrl: '/images/Benjamin.jpeg', scenarios: [] },
  { id: '2000', name: 'George W. Bush', whatIf: 'What if Bush had lost the 2000 U.S. presidential election?', imageUrl: '/images/George.jpeg', scenarios: [] },
  { id: '1940', name: 'Winston Churchill', whatIf: 'What if Churchill had not become Prime Minister during WWII?', imageUrl: '/images/Winston.jpeg', scenarios: [] },
  { id: '1206', name: 'Genghis Khan', whatIf: 'What if Genghis Khan had been killed during his early years of conquest?', imageUrl: '/images/Genghis.jpeg', scenarios: [] },
  { id: '1879', name: 'Thomas Edison', whatIf: 'What if Edison had failed to develop a practical electric light bulb?', imageUrl: '/images/Thomas.jpeg', scenarios: [] },
  { id: '1607', name: 'James I of England', whatIf: 'What if James I had aggressively pursued the colonization of the Americas?', imageUrl: '/images/James.jpeg', scenarios: [] },
  { id: '1900', name: 'Friedrich Nietzsche', whatIf: 'What if Nietzsche had never developed his philosophy of the Übermensch?', imageUrl: '/images/Friedrich.jpeg', scenarios: [] },
  { id: '1932', name: 'Franklin D. Roosevelt', whatIf: 'What if FDR had not been elected to four terms?', imageUrl: '/images/Franklin.jpeg', scenarios: [] },
  { id: '1896', name: 'Sigmund Freud', whatIf: 'What if Freud had pursued neurology rather than psychoanalysis?', imageUrl: '/images/Sigmund.jpeg', scenarios: [] },
  { id: '1804', name: 'Alexander Hamilton', whatIf: 'What if Hamilton had not been killed in a duel by Aaron Burr?', imageUrl: '/images/Alexander.jpeg', scenarios: [] },
  { id: '1919', name: 'Woodrow Wilson', whatIf: 'What if Wilson had succeeded in convincing the U.S. to join the League of Nations?', imageUrl: '/images/Woodrow.jpeg', scenarios: [] },
  { id: '1717', name: 'Johann Sebastian Bach', whatIf: 'What if Bach had become a court composer earlier in his career?', imageUrl: '/images/Johann.jpeg', scenarios: [] },
  { id: '1633', name: 'Galileo Galilei', whatIf: 'What if Galileo had recanted his heliocentric views under pressure from the Church?', imageUrl: '/images/Galileo.jpeg', scenarios: [] },
  { id: '1653', name: 'Oliver Cromwell', whatIf: 'What if Cromwell had not dissolved the Rump Parliament?', imageUrl: '/images/Oliver.jpeg', scenarios: [] },
  { id: '1787', name: 'James Madison', whatIf: 'What if Madison had opposed the drafting of the U.S. Constitution?', imageUrl: '/images/James.jpeg', scenarios: [] },
  { id: '1904', name: 'Mark Twain', whatIf: 'What if Twain had completed his autobiography in his lifetime?', imageUrl: '/images/Mark.jpeg', scenarios: [] },
  { id: '1849', name: 'Edgar Allan Poe', whatIf: 'What if Poe had achieved financial stability during his lifetime?', imageUrl: '/images/Edgar',scenarios: [] },
  { id: '1775', name: 'George III of the United Kingdom', whatIf: 'What if George III had managed to suppress the American Revolution?', imageUrl: '/images/George.jpeg', scenarios: [] },
  { id: '1781', name: 'Immanuel Kant', whatIf: 'What if Kant had never written "Critique of Pure Reason"?', imageUrl: '/images/Immanuel.jpeg', scenarios: [] },
  { id: '1779', name: 'James Cook', whatIf: 'What if Cook had not been killed in Hawaii and continued his explorations?', imageUrl: '/images/James.jpeg', scenarios: [] },
  { id: '1876', name: 'Richard Wagner', whatIf: 'What if Wagner had never developed his concept of the Gesamtkunstwerk (total artwork)?', imageUrl: '/images/Richard.jpeg', scenarios: [] },
  { id: '1893', name: 'Pyotr Ilyich Tchaikovsky', whatIf: 'What if Tchaikovsky had not died suddenly and continued composing?', imageUrl: '/images/Pyotr.jpeg', scenarios: [] },
  { id: '1759', name: 'Voltaire', whatIf: 'What if Voltaire had remained a lawyer instead of turning to writing?', imageUrl: '/images/Voltaire.jpeg', scenarios: [] },
  { id: '399 BC', name: 'Socrates', whatIf: 'What if Socrates had written his philosophies down himself?', imageUrl: '/images/Socrates.jpeg', scenarios: [""] },
  { id: '1958', name: 'Elvis Presley', whatIf: 'What if Elvis had pursued a career in gospel music exclusively?', imageUrl: '/images/Elvis.jpeg', scenarios: [] },
  { id: '1066', name: 'William the Conqueror', whatIf: 'What if William had failed in his conquest of England in 1066?', imageUrl: '/images/William.jpeg', scenarios: [] },
  { id: '1963', name: 'John F. Kennedy', whatIf: 'What if JFK had survived the assassination attempt in Dallas?', imageUrl: '/images/John.jpeg', scenarios: [] },
  { id: '1890', name: 'Vincent van Gogh', whatIf: 'What if van Gogh had achieved fame during his lifetime?', imageUrl: '/images/Vincent.jpeg', scenarios: [] },
  { id: '1543', name: 'Nicolaus Copernicus', whatIf: 'What if Copernicus had published his heliocentric theory earlier?', imageUrl: '/images/Nicolaus.jpeg', scenarios: [] },
  { id: '1917', name: 'Vladimir Lenin', whatIf: 'What if Lenin had not led the Bolshevik Revolution?', imageUrl: '/images/Vladimir.jpeg', scenarios: [] },
  { id: '1861', name: 'Robert E. Lee', whatIf: 'What if Lee had accepted command of the Union Army instead of the Confederates?', imageUrl: '/images/Robert.jpeg', scenarios: [] },
  { id: '1895', name: 'Oscar Wilde', whatIf: 'What if Wilde had not been imprisoned for gross indecency?', imageUrl: '/images/Oscar.jpeg', scenarios: [] },
  { id: '1660', name: 'Charles II of England', whatIf: 'What if Charles II had not restored the monarchy in England?', imageUrl: '/images/Charles.jpeg', scenarios: [] },
  { id: '63 BC', name: 'Cicero', whatIf: 'What if Cicero had managed to stop Julius Caesar from gaining power?', imageUrl: '/images/Cicero.jpeg', scenarios: [] },
  { id: '1750', name: 'Jean-Jacques Rousseau', whatIf: 'What if Rousseau had remained a musician instead of a philosopher?', imageUrl: '/images/Jean-Jacques.jpeg', scenarios: [] },
  { id: '1620', name: 'Francis Bacon', whatIf: 'What if Bacon had been credited with developing the scientific method?', imageUrl: '/images/Francis.jpeg', scenarios: [] },
  { id: '1974', name: 'Richard Nixon', whatIf: 'What if Nixon had not been implicated in the Watergate scandal?', imageUrl: '/images/Richard.jpeg', scenarios: [] },
  { id: '1792', name: 'Louis XVI of France', whatIf: 'What if Louis XVI had managed to suppress the French Revolution?', imageUrl: '/images/Louis.jpeg', scenarios: [] },
  { id: '1550', name: 'Charles V, Holy Roman Emperor', whatIf: 'What if Charles V had successfully unified Europe under the Habsburgs?', imageUrl: '/images/Charles.jpeg', scenarios: [] },
  { id: '500', name: 'King Arthur', whatIf: 'What if the legends of King Arthur were based on a true historical figure?', imageUrl: '/images/King.jpeg', scenarios: [] },
  { id: '1505', name: 'Michelangelo', whatIf: 'What if Michelangelo had focused solely on painting rather than sculpting?', imageUrl: '/images/Michelangelo.jpeg', scenarios: [] },
  { id: '1588', name: 'Philip II of Spain', whatIf: 'What if Philip II had defeated England and the Dutch Republic?', imageUrl: '/images/Philip.jpeg', scenarios: [] },
  { id: '1770', name: 'Johann Wolfgang von Goethe', whatIf: 'What if Goethe had pursued a career in law as his father wished?', imageUrl: '/images/Johann.jpeg', scenarios: [] },
  { id: '1644', name: 'René Descartes', whatIf: 'What if Descartes had continued his work in science, abandoning philosophy?', imageUrl: '/images/René.jpeg', scenarios: [] },
  { id: '1903', name: 'Nikola Tesla', whatIf: 'What if Tesla had succeeded in building his Wardenclyffe Tower project?', imageUrl: '/images/Nikola.jpeg', scenarios: [] },
  { id: '1945', name: 'Harry S. Truman', whatIf: 'What if Truman had not authorized the use of atomic bombs in WWII?', imageUrl: '/images/Harry.jpeg', scenarios: [] },
  { id: '1302', name: 'Dante Alighieri', whatIf: 'What if Dante had not been exiled from Florence?', imageUrl: '/images/Dante.jpeg', scenarios: [] },
  { id: '1690', name: 'John Locke', whatIf: 'What if Locke\'s theories had not influenced the Enlightenment and later democratic revolutions?', imageUrl: '/images/John.jpeg', scenarios: [] },
  ];
const pevents = [
{ id: '1815', name: 'Napoleon', whatIf: 'What if Napoleon had won at Waterloo in 1815?', imageUrl: '/images/napoleon.jpeg', scenarios: ["The Fashionista Empire: After his victory at Waterloo, Napoleon becomes enchanted by haute couture, turning Paris into the epicenter of global fashion. By 1955, the world witnesses the ultimate runway: the Moon. The first person to set foot on the Moon is renowned hat designer Coco LeChapeau in the year 1955, who declares the Moon the pinnacle of avant-garde fashion",
  "Interdimensional Napoleonic Wars: With the discovery of dimensional rifts, the French Empire fights across realities. The strategic Moon base becomes pivotal in 1945. The first person to set foot on the Moon is General Bonaparte XII, a descendant of Napoleon, who rides his cybernetic horse across the Moon to repel Martian invaders in the year 1945.",
  "The Surreal Solar System: Napoleon's empire adopts surrealism as state policy, leading to a bizarre artistic renaissance. The first creature to set foot on the Moon is a sentient painting named \"Mona Lunalisa\" in the year 2025, turning the lunar surface into a cosmic canvas for otherworldly art."], scenarioImages : [['/scenarios/napoleon/1.webp', '/scenarios/napoleon/2.webp', '/scenarios/napoleon/3.webp'], ['/scenarios/napoleon/4.webp', '/scenarios/napoleon/5.webp', '/scenarios/napoleon/6.webp'], ['/scenarios/napoleon/7.webp', '/scenarios/napoleon/8.webp', '/scenarios/napoleon/9.webp']] },
// { id: '1999', name: 'William Shakespeare', whatIf: 'What if Shakespeare had been born in the 21st century?', imageUrl: '/images/william.jpeg', scenarios: ["In a universe where Shakespeare is a 21st-century tech mogul, he revolutionizes AI to write plays, inadvertently creating a super AI that takes over global theater productions. Baffled by the Bard's digital sonnets, the world unites in a quest to explore more 'authentic' spaces. The first creature to set foot on the Moon is an android named Rosalind in the year 2045.",
// "Shakespeare, born into the era of social media, becomes a celebrity influencer whose tweets are studied as literature. His viral feud with another influencer over the correct use of thy/thine spills over into global policy on language use. The first person to set foot on the Moon is a linguist named Juliet in the year 2060, seeking a new lexicon for humanity."], scenarioImages: [[]] },
{ id: '1789', name: 'George Washington', whatIf: 'What if George Washington had accepted the offer to become King of America?', imageUrl: '/images/george.jpeg', scenarios: ["In a universe where George Washington becomes King George I of America, his royal descendants develop a quirky obsession with space travel as a means to escape the growing dissent over tea taxes, which have inexplicably persisted into the 20th century. By 1969, the American monarchy, wanting to prove their worth beyond terrestrial borders, sponsors the first lunar tea party. The first person to set foot on the Moon is Queen Elizabeth III, in the year 1969, elegantly sipping Earl Grey."
,"After accepting the crown, King George I of America establishes a tradition where the throne is passed not by bloodline but through a national game of musical chairs played on the Fourth of July. This bizarre custom captures the world's imagination, leading to a reality TV empire that funds vast scientific endeavors. The first creature to set foot on the Moon is Sir Clucks-a-Lot, a charismatic chicken who won the 2048 season, in the year 2050."], scenarioImages: [['/scenarios/george/1.webp', '/scenarios/george/2.webp', '/scenarios/george/3.webp'], ['/scenarios/george/4.webp', '/scenarios/george/5.webp', '/scenarios/george/6.webp']] },
{ id: '300 BC', name: 'Aristotle', whatIf: 'What if Aristotle\'s works had been lost to history?', imageUrl: '/images/aristotle.jpeg', scenarios: ["Without Aristotle's influence, the Western world turns to comedy as its philosophical cornerstone, leading to a society where political debates and academic discourses are settled through stand-up battles. This culture of humor cultivates a space program that launches spacecrafts shaped like enormous rubber chickens. The first person to set foot on the Moon is a stand-up comedian named Laughing Larry in the year 1999."
,"In a world bereft of Aristotle's logical frameworks, society develops a deep obsession with magic and the mystical arts, believing them to be the foundations of knowledge. Alchemists and wizards become the leading scientists, mixing potions to fuel rocketry with enchanted moonstone. The first creature to set foot on the Moon is a spell-casting cat named Whiskertron in the year 2067."], scenarioImages: [['/scenarios/aristotle/1.webp', '/scenarios/aristotle/2.webp', '/scenarios/aristotle/3.webp'], ['/scenarios/aristotle/4.webp', '/scenarios/aristotle/5.webp', '/scenarios/aristotle/6.webp']] },
{ id: '323 BC', name: 'Alexander the Great', whatIf: 'What if Alexander had not died young and continued his conquests into Europe?', imageUrl: '/images/alexander.jpeg', scenarios: ["After living to a ripe old age, Alexander the Great ventured beyond Europe and unified the entire known world under his rule. He inaugurated the first Olympic Games on Mars, using anti-gravity technology discovered in the lost libraries of Alexandria. The first creature to set foot on the Moon is his favorite horse, Bucephalus, reincarnated as a cybernetic unicorn, in the year 2150."
,"Alexander the Great didn't stop at Europe; he expanded his empire into the depths of the ocean, founding the underwater city of Alexandropolis. In this universe, the currency is seashells, and the world's primary mode of transportation is dolphin-drawn chariots. The first person to set foot on the Moon is a mischievous mermaid named Atlantica, in the year 2042"], scenarioImages: [['/scenarios/alexander/1.webp', '/scenarios/alexander/2.webp', '/scenarios/alexander/3.webp'], ['/scenarios/alexander/4.webp', '/scenarios/alexander/5.webp', '/scenarios/alexander/6.webp']] },
{ id: '1831', name: 'Charles Darwin', whatIf: 'What if Darwin had never sailed on the HMS Beagle?', imageUrl: '/images/darwin.jpeg', scenarios: ["Without his voyage on the HMS Beagle, Charles Darwin turned his boundless curiosity towards the culinary arts, revolutionizing cooking by introducing the theory of \"Survival of the Tastiest.\" His experiments led to the creation of self-evolving recipes that adapt to taste buds over time. The first person to set foot on the Moon is Chef Gusto, the inventor of zero-gravity molecular gastronomy, in the year 2067.","Darwin, having never embarked on the Beagle, became a playwright specializing in dramas about the social lives of barnacles and finches. His plays, mistaken for profound allegories about society, inspired a global movement to elect animals as political leaders. The first creature to set foot on the Moon is Sir Quacks-a-Lot, the duck President of the United Earth, in the year 2099"], scenarioImages: [['/scenarios/charles/1.webp', '/scenarios/charles/2.webp', '/scenarios/charles/3.webp'], ['/scenarios/charles/4.webp', '/scenarios/charles/5.webp', '/scenarios/charles/6.webp']] },
 { id: '44 BC', name: 'Julius Caesar', whatIf: 'What if Caesar had not been assassinated on the Ides of March?', imageUrl: '/images/julius.jpeg', scenarios: ["In a universe where Caesar was not assassinated, he declared himself Emperor for Life, leading to a technological renaissance as he obsessed over conquering the stars rather than just the Earth. Rome’s advancements in rocketry under his rule were unparalleled. The first creature to set foot on the Moon is Julius Caesar’s favorite horse, Incitatus, in the year 54 AD."
 ,"After dodging the Ides of March, Caesar embraced his theatrical side, turning the Roman Empire into a massive stage for dramatic performances, with gladiator fights using confetti swords and rubber spears. His love for drama led to the invention of a space opera genre. The first person to set foot on the Moon is a method-acting mime named Gaius Pantomimus in the year 100 AD, silently claiming the lunar surface for the Empire."], scenarioImages: [['/scenarios/julius/1.webp', '/scenarios/julius/2.webp', '/scenarios/julius/3.webp'], ['/scenarios/julius/4.webp', '/scenarios/julius/5.webp', '/scenarios/julius/6.webp']] },
{ id: '1933', name: 'Albert Einstein', whatIf: 'What if Einstein had stayed in Germany during the rise of the Nazis?', imageUrl: '/images/albert.jpeg', scenarios: ["In a universe where Einstein stayed in Germany during the rise of the Nazis, his brilliant mind was put to use in developing a time machine, rather than fleeing to the US. Despite the dark times, Einstein became a secret hero, smuggling intellectuals and artists to safety across time. The first person to set foot on the Moon is a time-displaced William Shakespeare in the year 1943, reciting a soliloquy in zero gravity."
,"Imagine if Einstein had remained in Germany, only to accidentally discover a formula that turned thoughts into physical realities, sparking a surreal reality where everyday thoughts shaped the physical world. The streets of Berlin were filled with bizarre manifestations of people's fears and dreams. The first creature to set foot on the Moon is a giant, sentient apple pie, a manifestation of national comfort food cravings, in the year 1958."], scenarioImages: [['/easter-egg/error.jpeg'], ['/scenarios/albert/4.webp', '/scenarios/albert/5.webp', '/scenarios/albert/6.webp']] },
{ id: "399 BC", name: "Socrates", whatIf: "What if Socrates had written his philosophies down himself?", imageUrl: "/images/socrates.jpeg", scenarios: ["In a universe where Socrates wrote down his philosophies, his writings were filled with witty and absurd arguments, creating a cult-like following that believed in questioning everything to the point of absurdity. This led to a society where nothing was taken seriously, and critical thinking was based on paradoxes and riddles. The first person to set foot on the Moon in this universe was a sentient talking chicken named Clucko in the year 3069.", "If Socrates had written his philosophies down himself, his texts would have been hidden by mischievous time-traveling gnomes, only to be discovered centuries later by a group of alien archaeologists searching for the secrets of ancient Earth wisdom. The first person to set foot on the Moon is a curious extraterrestrial botanist in the year 3021"], scenarioImages: [['/scenarios/socrates/1.webp', '/scenarios/socrates/2.webp', '/scenarios/socrates/3.webp'], ['/scenarios/socrates/4.webp', '/scenarios/socrates/5.webp', '/scenarios/socrates/6.webp']] },
{ id: '1903', name: 'Nikola Tesla', whatIf: 'What if Tesla had succeeded in building his Wardenclyffe Tower project?', imageUrl: '/images/nikola.jpeg', scenarios: ["If Tesla had succeeded with his Wardenclyffe Tower, he inadvertently triggered the ability for everyone to hear each other's thoughts, leading to a chaotic but transparent society where secrets became obsolete. Cats, having been misunderstood for centuries, rise as the new global leaders due to their mysterious and untraceable thoughts. The first creature to set foot on the Moon is Sir Whiskers the Third, a cat diplomat, in the year 1969, aiming to negotiate a peace treaty with lunar mice."
,"With the successful completion of the Wardenclyffe Tower, Tesla not only achieved wireless transmission of power but also accidentally discovered interdimensional travel. The world became a bustling hub for tourists from other dimensions, turning Earth into a universal cultural festival. The first person to set foot on the Moon is an Elvis Presley impersonator from Dimension Z, in the year 1977, where he performs a moonwalk that is literally out of this world."], scenarioImages: [['/scenarios/nikola/1.webp', '/scenarios/nikola/2.webp', '/scenarios/nikola/3.webp'], ['/scenarios/nikola/4.webp', '/scenarios/nikola/5.webp', '/scenarios/nikola/6.webp']] },
];

const sevents_main = [
  { id: "399 BC", name: "Socrates", whatIf: "What if Socrates had written his philosophies down himself?", imageUrl: "/images/Socrates.jpeg", scenarios: ["In a universe where Socrates wrote down his philosophies, his writings were filled with witty and absurd arguments, creating a cult-like following that believed in questioning everything to the point of absurdity. This led to a society where nothing was taken seriously, and critical thinking was based on paradoxes and riddles. The first person to set foot on the Moon in this universe was a sentient talking chicken named Clucko in the year 3069.", "If Socrates had written his philosophies down himself, his texts would have been hidden by mischievous time-traveling gnomes, only to be discovered centuries later by a group of alien archaeologists searching for the secrets of ancient Earth wisdom. The first person to set foot on the Moon is a curious extraterrestrial botanist in the year 3021"] },
  { id: "387 BC", name: "Plato", whatIf: "What if Plato had never founded the Academy in Athens?", imageUrl: "/images/Plato.jpeg", scenarios: [] },
  { id: "323 BC", name: "Alexander the Great", whatIf: "What if Alexander had not died young and continued his conquests into Europe?", imageUrl: "/images/Alexander.jpeg", scenarios: [] },
  { id: "300 BC", name: "Aristotle", whatIf: "What if Aristotle's works had been lost to history?", imageUrl: "/images/Aristotle.jpeg", scenarios: [] },
  { id: "63 BC", name: "Cicero", whatIf: "What if Cicero had managed to stop Julius Caesar from gaining power?", imageUrl: "/images/Cicero.jpeg", scenarios: [] },
  { id: "44 BC", name: "Julius Caesar", whatIf: "What if Caesar had not been assassinated on the Ides of March?", imageUrl: "/images/Julius.jpeg", scenarios: [] },
  { id: "500", name: "King Arthur", whatIf: "What if the legends of King Arthur were based on a true historical figure?", imageUrl: "/images/King.jpeg", scenarios: [] },
  { id: "1066", name: "William the Conqueror", whatIf: "What if William had failed in his conquest of England in 1066?", imageUrl: "/images/William.jpeg", scenarios: [] },
  { id: "1302", name: "Dante Alighieri", whatIf: "What if Dante had not been exiled from Florence?", imageUrl: "/images/Dante.jpeg", scenarios: [] },
  { id: "1492", name: "Christopher Columbus", whatIf: "What if Columbus had never convinced the Spanish crown to fund his voyage?", imageUrl: "/images/Christopher.jpeg", scenarios: [] },
  { id: "1500", name: "Leonardo da Vinci", whatIf: "What if da Vinci had seen his most ambitious inventions built?", imageUrl: "/images/Leonardo.jpeg", scenarios: [] },
  { id: "1505", name: "Michelangelo", whatIf: "What if Michelangelo had focused solely on painting rather than sculpting?", imageUrl: "/images/Michelangelo.jpeg", scenarios: [] },
  { id: "1533", name: "Henry VIII of England", whatIf: "What if Henry VIII had remained married to Catherine of Aragon?", imageUrl: "/images/Henry.jpeg", scenarios: [] },
  { id: "1543", name: "Nicolaus Copernicus", whatIf: "What if Copernicus had published his heliocentric theory earlier?", imageUrl: "/images/Nicolaus.jpeg", scenarios: [] },
  { id: "1550", name: "Charles V, Holy Roman Emperor", whatIf: "What if Charles V had successfully unified Europe under the Habsburgs?", imageUrl: "/images/Charles.jpeg", scenarios: [] },
  { id: "1558", name: "Elizabeth I of England", whatIf: "What if Elizabeth I had married and had children?", imageUrl: "/images/Elizabeth.jpeg", scenarios: [] },
  { id: "1588", name: "Philip II of Spain", whatIf: "What if Philip II had defeated England and the Dutch Republic?", imageUrl: "/images/Philip.jpeg", scenarios: [] },
  { id: "1607", name: "James I of England", whatIf: "What if James I had aggressively pursued the colonization of the Americas?", imageUrl: "/images/James.jpeg", scenarios: [] },
  { id: "1620", name: "Francis Bacon", whatIf: "What if Bacon had been credited with developing the scientific method?", imageUrl: "/images/Francis.jpeg", scenarios: [] },
  { id: "1633", name: "Galileo Galilei", whatIf: "What if Galileo had recanted his heliocentric views under pressure from the Church?", imageUrl: "/images/Galileo.jpeg", scenarios: [] },
  { id: "1644", name: "René Descartes", whatIf: "What if Descartes had continued his work in science, abandoning philosophy?", imageUrl: "/images/René.jpeg", scenarios: [] },
  { id: "1653", name: "Oliver Cromwell", whatIf: "What if Cromwell had not dissolved the Rump Parliament?", imageUrl: "/images/Oliver.jpeg", scenarios: [] },
  { id: "1660", name: "Charles II of England", whatIf: "What if Charles II had not restored the monarchy in England?", imageUrl: "/images/Charles.jpeg", scenarios: [] },
  { id: "1690", name: "John Locke", whatIf: "What if Locke's theories had not influenced the Enlightenment and later democratic revolutions?", imageUrl: "/images/John.jpeg", scenarios: [] },
  { id: "1700", name: "Isaac Newton", whatIf: "What if Newton had focused solely on alchemy, ignoring physics and mathematics?", imageUrl: "/images/Isaac.jpeg", scenarios: [] },
  { id: "1717", name: "Johann Sebastian Bach", whatIf: "What if Bach had become a court composer earlier in his career?", imageUrl: "/images/Johann.jpeg", scenarios: [] },
  { id: "1750", name: "Jean-Jacques Rousseau", whatIf: "What if Rousseau had remained a musician instead of a philosopher?", imageUrl: "/images/Jean-Jacques.jpeg", scenarios: [] },
  { id: "1759", name: "Voltaire", whatIf: "What if Voltaire had remained a lawyer instead of turning to writing?", imageUrl: "/images/Voltaire.jpeg", scenarios: [] },
  { id: "1770", name: "Johann Wolfgang von Goethe", whatIf: "What if Goethe had pursued a career in law as his father wished?", imageUrl: "/images/Johann.jpeg", scenarios: [] },
  { id: "1775", name: "George III of the United Kingdom", whatIf: "What if George III had managed to suppress the American Revolution?", imageUrl: "/images/George.jpeg", scenarios: [] },
  { id: "1776", name: "Benjamin Franklin", whatIf: "What if Franklin had sided with the British during the American Revolution?", imageUrl: "/images/Benjamin.jpeg", scenarios: [] },
  { id: "1779", name: "James Cook", whatIf: "What if Cook had not been killed in Hawaii and continued his explorations?", imageUrl: "/images/James.jpeg", scenarios: [] },
  { id: "1781", name: "Immanuel Kant", whatIf: 'What if Kant had never written "Critique of Pure Reason"?', imageUrl: "/images/Immanuel.jpeg", scenarios: [] },
  { id: "1787", name: "James Madison", whatIf: "What if Madison had opposed the drafting of the U.S. Constitution?", imageUrl: "/images/James.jpeg", scenarios: [] },
  { id: "1789", name: "George Washington", whatIf: "What if George Washington had accepted the offer to become King of America?", imageUrl: "/images/George.jpeg", scenarios: [] },
  { id: "1791", name: "Wolfgang Amadeus Mozart", whatIf: "What if Mozart had lived into his 60s?", imageUrl: "/images/Wolfgang.jpeg", scenarios: [] },
  { id: "1792", name: "Louis XVI of France", whatIf: "What if Louis XVI had managed to suppress the French Revolution?", imageUrl: "/images/Louis.jpeg", scenarios: [] },
  { id: "1802", name: "Ludwig van Beethoven", whatIf: "What if Beethoven had never lost his hearing?", imageUrl: "/images/Ludwig.jpeg", scenarios: [] },
  { id: "1804", name: "Alexander Hamilton", whatIf: "What if Hamilton had not been killed in a duel by Aaron Burr?", imageUrl: "/images/Alexander.jpeg", scenarios: [] },
  { id: "1815", name: "Napoleon", whatIf: "What if Napoleon had won at Waterloo in 1815?", imageUrl: "/images/Napoleon.jpeg", scenarios: [] },
  { id: "1831", name: "Charles Darwin", whatIf: "What if Darwin had never sailed on the HMS Beagle?", imageUrl: "/images/darwin.jpeg", scenarios: [] },
  { id: "1840", name: "Karl Marx", whatIf: "What if Marx had pursued a career in philosophy instead of political economy?", imageUrl: "/images/Karl.jpeg", scenarios: [] },
  { id: "1843", name: "Charles Dickens", whatIf: 'What if Dickens had never written "A Christmas Carol"?', imageUrl: "/images/Charles.jpeg", scenarios: [] },
  { id: "1849", name: "Edgar Allan Poe", whatIf: "What if Poe had achieved financial stability during his lifetime?", imageUrl: "/images/Edgar.jpeg", scenarios: [] },
  { id: "1850", name: "Queen Victoria", whatIf: "What if Queen Victoria had refused to embrace the industrial revolution?", imageUrl: "/images/Queen.jpeg", scenarios: [] },
  { id: "1861", name: "Robert E. Lee", whatIf: "What if Lee had accepted command of the Union Army instead of the Confederates?", imageUrl: "/images/Robert.jpeg", scenarios: [] },
  { id: "1863", name: "Abraham Lincoln", whatIf: "What if Lincoln had not issued the Emancipation Proclamation?", imageUrl: "/images/Abraham.jpeg", scenarios: [] },
  { id: "1876", name: "Richard Wagner", whatIf: "What if Wagner had never developed his concept of the Gesamtkunstwerk (total artwork)?", imageUrl: "/images/Richard.jpeg", scenarios: [] },
  { id: "1879", name: "Thomas Edison", whatIf: "What if Edison had failed to develop a practical electric light bulb?", imageUrl: "/images/Thomas.jpeg", scenarios: [] },
  { id: "1890", name: "Vincent van Gogh", whatIf: "What if van Gogh had achieved fame during his lifetime?", imageUrl: "/images/Vincent.jpeg", scenarios: [] },
  { id: "1893", name: "Pyotr Ilyich Tchaikovsky", whatIf: "What if Tchaikovsky had not died suddenly and continued composing?", imageUrl: "/images/Pyotr.jpeg", scenarios: [] },
  { id: "1895", name: "Oscar Wilde", whatIf: "What if Wilde had not been imprisoned for gross indecency?", imageUrl: "/images/Oscar.jpeg", scenarios: [] },
  { id: "1896", name: "Sigmund Freud", whatIf: "What if Freud had pursued neurology rather than psychoanalysis?", imageUrl: "/images/Sigmund.jpeg", scenarios: [] },
  { id: "1900", name: "Friedrich Nietzsche", whatIf: "What if Nietzsche had never developed his philosophy of the Übermensch?", imageUrl: "/images/Friedrich.jpeg", scenarios: [] },
  { id: "1903", name: "Nikola Tesla", whatIf: "What if Tesla had succeeded in building his Wardenclyffe Tower project?", imageUrl: "/images/Nikola.jpeg", scenarios: [] },
  { id: "1904", name: "Mark Twain", whatIf: "What if Twain had completed his autobiography in his lifetime?", imageUrl: "/images/Mark.jpeg", scenarios: [] },
  { id: "1907", name: "Adolf Hitler", whatIf: "What if Hitler had been accepted into the Vienna Academy of Fine Arts?", imageUrl: "/images/Adolf.jpeg", scenarios: [] },
  { id: "1917", name: "Vladimir Lenin", whatIf: "What if Lenin had not led the Bolshevik Revolution?", imageUrl: "/images/Vladimir.jpeg", scenarios: [] },
  { id: "1919", name: "Woodrow Wilson", whatIf: "What if Wilson had succeeded in convincing the U.S. to join the League of Nations?", imageUrl: "/images/Woodrow.jpeg", scenarios: [] },
  { id: "1920", name: "Joseph Stalin", whatIf: "What if Stalin had been ousted from power in the 1920s?", imageUrl: "/images/Joseph.jpeg", scenarios: [] },
  { id: "1932", name: "Franklin D. Roosevelt", whatIf: "What if FDR had not been elected to four terms?", imageUrl: "/images/Franklin.jpeg", scenarios: [] },
  { id: "1933", name: "Albert Einstein", whatIf: "What if Einstein had stayed in Germany during the rise of the Nazis?", imageUrl: "/images/Albert.jpeg", scenarios: [] },
  { id: "1940", name: "Winston Churchill", whatIf: "What if Churchill had not become Prime Minister during WWII?", imageUrl: "/images/Winston.jpeg", scenarios: [] },
  { id: "1945", name: "Harry S. Truman", whatIf: "What if Truman had not authorized the use of atomic bombs in WWII?", imageUrl: "/images/Harry.jpeg", scenarios: [] },
  { id: "1958", name: "Elvis Presley", whatIf: "What if Elvis had pursued a career in gospel music exclusively?", imageUrl: "/images/Elvis.jpeg", scenarios: [] },
  { id: "1963", name: "John F. Kennedy", whatIf: "What if JFK had survived the assassination attempt in Dallas?", imageUrl: "/images/John.jpeg", scenarios: [] },
  { id: "1974", name: "Richard Nixon", whatIf: "What if Nixon had not been implicated in the Watergate scandal?", imageUrl: "/images/Richard.jpeg", scenarios: [] },
  { id: "1999", name: "William Shakespeare", whatIf: "What if Shakespeare had been born in the 21st century?", imageUrl: "/images/William.jpeg", scenarios: [] },
  { id: "2000", name: "George W. Bush", whatIf: "What if Bush had lost the 2000 U.S. presidential election?", imageUrl: "/images/George.jpeg", scenarios: [] },
]

const sevents = [
  { id: "399 BC", name: "Socrates", whatIf: "What if Socrates had written his philosophies down himself?", imageUrl: "/images/Socrates.jpeg", scenarios: ["In a universe where Socrates wrote down his philosophies, his writings were filled with witty and absurd arguments, creating a cult-like following that believed in questioning everything to the point of absurdity. This led to a society where nothing was taken seriously, and critical thinking was based on paradoxes and riddles. The first person to set foot on the Moon in this universe was a sentient talking chicken named Clucko in the year 3069.", "If Socrates had written his philosophies down himself, his texts would have been hidden by mischievous time-traveling gnomes, only to be discovered centuries later by a group of alien archaeologists searching for the secrets of ancient Earth wisdom. The first person to set foot on the Moon is a curious extraterrestrial botanist in the year 3021"], scenarioImages: [['/scenarios/socrates/1.webp', '/scenarios/socrates/2.webp', '/scenarios/socrates/3.webp'], ['/scenarios/socrates/4.webp', '/scenarios/socrates/5.webp', '/scenarios/socrates/6.webp']] },
  { id: '323 BC', name: 'Alexander the Great', whatIf: 'What if Alexander had not died young and continued his conquests into Europe?', imageUrl: '/images/alexander.jpeg', scenarios: ["After living to a ripe old age, Alexander the Great ventured beyond Europe and unified the entire known world under his rule. He inaugurated the first Olympic Games on Mars, using anti-gravity technology discovered in the lost libraries of Alexandria. The first creature to set foot on the Moon is his favorite horse, Bucephalus, reincarnated as a cybernetic unicorn, in the year 2150."
,"Alexander the Great didn't stop at Europe; he expanded his empire into the depths of the ocean, founding the underwater city of Alexandropolis. In this universe, the currency is seashells, and the world's primary mode of transportation is dolphin-drawn chariots. The first person to set foot on the Moon is a mischievous mermaid named Atlantica, in the year 2042"], scenarioImages: [['/scenarios/alexander/1.webp', '/scenarios/alexander/2.webp', '/scenarios/alexander/3.webp'], ['/scenarios/alexander/4.webp', '/scenarios/alexander/5.webp', '/scenarios/alexander/6.webp']] },
  { id: '300 BC', name: 'Aristotle', whatIf: 'What if Aristotle\'s works had been lost to history?', imageUrl: '/images/aristotle.jpeg', scenarios: ["Without Aristotle's influence, the Western world turns to comedy as its philosophical cornerstone, leading to a society where political debates and academic discourses are settled through stand-up battles. This culture of humor cultivates a space program that launches spacecrafts shaped like enormous rubber chickens. The first person to set foot on the Moon is a stand-up comedian named Laughing Larry in the year 1999."
,"In a world bereft of Aristotle's logical frameworks, society develops a deep obsession with magic and the mystical arts, believing them to be the foundations of knowledge. Alchemists and wizards become the leading scientists, mixing potions to fuel rocketry with enchanted moonstone. The first creature to set foot on the Moon is a spell-casting cat named Whiskertron in the year 2067."], scenarioImages: [['/scenarios/aristotle/1.webp', '/scenarios/aristotle/2.webp', '/scenarios/aristotle/3.webp'], ['/scenarios/aristotle/4.webp', '/scenarios/aristotle/5.webp', '/scenarios/aristotle/6.webp']] },
  { id: '44 BC', name: 'Julius Caesar', whatIf: 'What if Caesar had not been assassinated on the Ides of March?', imageUrl: '/images/julius.jpeg', scenarios: ["In a universe where Caesar was not assassinated, he declared himself Emperor for Life, leading to a technological renaissance as he obsessed over conquering the stars rather than just the Earth. Rome’s advancements in rocketry under his rule were unparalleled. The first creature to set foot on the Moon is Julius Caesar’s favorite horse, Incitatus, in the year 54 AD."
 ,"After dodging the Ides of March, Caesar embraced his theatrical side, turning the Roman Empire into a massive stage for dramatic performances, with gladiator fights using confetti swords and rubber spears. His love for drama led to the invention of a space opera genre. The first person to set foot on the Moon is a method-acting mime named Gaius Pantomimus in the year 100 AD, silently claiming the lunar surface for the Empire."], scenarioImages: [['/scenarios/julius/1.webp', '/scenarios/julius/2.webp', '/scenarios/julius/3.webp'], ['/scenarios/julius/4.webp', '/scenarios/julius/5.webp', '/scenarios/julius/6.webp']] },
{ id: '1789', name: 'George Washington', whatIf: 'What if George Washington had accepted the offer to become King of America?', imageUrl: '/images/george.jpeg', scenarios: ["In a universe where George Washington becomes King George I of America, his royal descendants develop a quirky obsession with space travel as a means to escape the growing dissent over tea taxes, which have inexplicably persisted into the 20th century. By 1969, the American monarchy, wanting to prove their worth beyond terrestrial borders, sponsors the first lunar tea party. The first person to set foot on the Moon is Queen Elizabeth III, in the year 1969, elegantly sipping Earl Grey."
 ,"After accepting the crown, King George I of America establishes a tradition where the throne is passed not by bloodline but through a national game of musical chairs played on the Fourth of July. This bizarre custom captures the world's imagination, leading to a reality TV empire that funds vast scientific endeavors. The first creature to set foot on the Moon is Sir Clucks-a-Lot, a charismatic chicken who won the 2048 season, in the year 2050."], scenarioImages: [['/scenarios/george/1.webp', '/scenarios/george/2.webp', '/scenarios/george/3.webp'], ['/scenarios/george/4.webp', '/scenarios/george/5.webp', '/scenarios/george/6.webp']] },
    { id: '1815', name: 'Napoleon', whatIf: 'What if Napoleon had won at Waterloo in 1815?', imageUrl: '/images/Napoleon.jpeg', scenarios: ["The Fashionista Empire: After his victory at Waterloo, Napoleon becomes enchanted by haute couture, turning Paris into the epicenter of global fashion. By 1955, the world witnesses the ultimate runway: the Moon. The first person to set foot on the Moon is renowned hat designer Coco LeChapeau in the year 1955, who declares the Moon the pinnacle of avant-garde fashion",
   "Interdimensional Napoleonic Wars: With the discovery of dimensional rifts, the French Empire fights across realities. The strategic Moon base becomes pivotal in 1945. The first person to set foot on the Moon is General Bonaparte XII, a descendant of Napoleon, who rides his cybernetic horse across the Moon to repel Martian invaders in the year 1945.",
   "The Surreal Solar System: Napoleon's empire adopts surrealism as state policy, leading to a bizarre artistic renaissance. The first creature to set foot on the Moon is a sentient painting named \"Mona Lunalisa\" in the year 2025, turning the lunar surface into a cosmic canvas for otherworldly art."], scenarioImages : [['/scenarios/napoleon/1.webp', '/scenarios/napoleon/2.webp', '/scenarios/napoleon/3.webp'], ['/scenarios/napoleon/4.webp', '/scenarios/napoleon/5.webp', '/scenarios/napoleon/6.webp'], ['/scenarios/napoleon/7.webp', '/scenarios/napoleon/8.webp', '/scenarios/napoleon/9.webp']] },
   { id: '1831', name: 'Charles Darwin', whatIf: 'What if Darwin had never sailed on the HMS Beagle?', imageUrl: '/images/darwin.jpeg', scenarios: ["Without his voyage on the HMS Beagle, Charles Darwin turned his boundless curiosity towards the culinary arts, revolutionizing cooking by introducing the theory of \"Survival of the Tastiest.\" His experiments led to the creation of self-evolving recipes that adapt to taste buds over time. The first person to set foot on the Moon is Chef Gusto, the inventor of zero-gravity molecular gastronomy, in the year 2067.","Darwin, having never embarked on the Beagle, became a playwright specializing in dramas about the social lives of barnacles and finches. His plays, mistaken for profound allegories about society, inspired a global movement to elect animals as political leaders. The first creature to set foot on the Moon is Sir Quacks-a-Lot, the duck President of the United Earth, in the year 2099"], scenarioImages: [['/scenarios/charles/1.webp', '/scenarios/charles/2.webp', '/scenarios/charles/3.webp'], ['/scenarios/charles/4.webp', '/scenarios/charles/5.webp', '/scenarios/charles/6.webp']] },
   { id: '1903', name: 'Nikola Tesla', whatIf: 'What if Tesla had succeeded in building his Wardenclyffe Tower project?', imageUrl: '/images/nikola.jpeg', scenarios: ["If Tesla had succeeded with his Wardenclyffe Tower, he inadvertently triggered the ability for everyone to hear each other's thoughts, leading to a chaotic but transparent society where secrets became obsolete. Cats, having been misunderstood for centuries, rise as the new global leaders due to their mysterious and untraceable thoughts. The first creature to set foot on the Moon is Sir Whiskers the Third, a cat diplomat, in the year 1969, aiming to negotiate a peace treaty with lunar mice."
 ,"With the successful completion of the Wardenclyffe Tower, Tesla not only achieved wireless transmission of power but also accidentally discovered interdimensional travel. The world became a bustling hub for tourists from other dimensions, turning Earth into a universal cultural festival. The first person to set foot on the Moon is an Elvis Presley impersonator from Dimension Z, in the year 1977, where he performs a moonwalk that is literally out of this world."], scenarioImages: [['/scenarios/nikola/1.webp', '/scenarios/nikola/2.webp', '/scenarios/nikola/3.webp'], ['/scenarios/nikola/4.webp', '/scenarios/nikola/5.webp', '/scenarios/nikola/6.webp']] },
 { id: '1933', name: 'Albert Einstein', whatIf: 'What if Einstein had stayed in Germany during the rise of the Nazis?', imageUrl: '/images/albert.jpeg', scenarios: ["In a universe where Einstein stayed in Germany during the rise of the Nazis, his brilliant mind was put to use in developing a time machine, rather than fleeing to the US. Despite the dark times, Einstein became a secret hero, smuggling intellectuals and artists to safety across time. The first person to set foot on the Moon is a time-displaced William Shakespeare in the year 1943, reciting a soliloquy in zero gravity."
,"Imagine if Einstein had remained in Germany, only to accidentally discover a formula that turned thoughts into physical realities, sparking a surreal reality where everyday thoughts shaped the physical world. The streets of Berlin were filled with bizarre manifestations of people's fears and dreams. The first creature to set foot on the Moon is a giant, sentient apple pie, a manifestation of national comfort food cravings, in the year 1958."], scenarioImages: [['/easter-egg/error.jpeg'], ['/scenarios/albert/4.webp', '/scenarios/albert/5.webp', '/scenarios/albert/6.webp']] },
  // { id: "1999", name: "William Shakespeare", whatIf: "What if Shakespeare had been born in the 21st century?", imageUrl: "/images/William.jpeg", scenarios: [] },
]


function App() {
  const [events, setEvents] = useState(pevents);
  const [currentEvent, setCurrentEvent] = useState(events[0]);
  const [scenarios, setScenarios] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0].id);
  const [isTimelineOrder, setIsTimelineOrder] = useState(false);

  const toggleOrder = () => {
    setEvents(isTimelineOrder ? pevents : sevents);
    setIsTimelineOrder(!isTimelineOrder);
  };

  const handleEventChange = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setCurrentEvent(event);
      setScenarios([]); // Clear scenarios when changing events
      setSelectedScenario(null);
      setSelectedEventId(eventId);
      setImages([]);
    }
  };

  const handleGenerateScenarios = async () => {
    // Simulating API call
    // Easter egg
    if(currentEvent.scenarios.length !== 0){
      setScenarios(currentEvent.scenarios)
    }
    else {
    // const scenarios = await generateScenarios(currentEvent.whatIf);
    const scenarios: any = []
    setScenarios(scenarios);
  }
  };

  const handleScenarioSelect = async (scenario: string) => {
    // setSelectedScenario(scenario);
    // Simulating API call for images


    // const scenarioImages = generateScenarioImages(scenario)
    // const scenarioImages = [
    //   { url: '/scenarios/napoleon/1.webp', description: 'After his victory at Waterloo, Napoleon becomes enchanted by haute couture, turning Paris into the epicenter of global fashion' },
    //   { url: '/scenarios/napoleon/2.webp', description: 'By 1955, the world witnesses the ultimate runway: the Moon' },
    //   { url: '/scenarios/napoleon/3.webp', description: 'The first person to set foot on the Moon is renowned hat designer Coco LeChapeau in the year 1955, who declares the Moon the pinnacle of avant-garde fashion' }
    // ];
    // setImages(await scenarioImages);
    if (Math.floor(Math.random() * 20) === 5){
      setImages([{url:'/easter-egg/error.jpeg', description: ''}])
    }
    else if(currentEvent.scenarioImages){
      const isScenario = (element: string) => element === scenario;
      const index = currentEvent.scenarios.findIndex(isScenario)
      console.log(currentEvent.scenarios)
      console.log(index, scenario)
      setImages(currentEvent.scenarioImages[index].map(value => {return {url:value, description: ''}}))
    }
    else {
      setImages([]);
    }
  };

  return (
    <div className="app-container">
      <Badge /> 
      <img src={'/logo.png'} className="logo" alt="Multiversity App Logo" ></img>
      <div className="scenario-label">
            {"Select a person from our list, then click a scenario from that what if multiverse, and then view the wonderful history of that world, culminating at the Canon event of Moon Landing!"}
          </div>
      <button onClick={toggleOrder}>{isTimelineOrder ? 'Show Popular Order' : 'Show Timeline Order'}</button>
      <br />
      <EventSelector events={events} onEventChange={handleEventChange} selectedEventId={selectedEventId} />
      <button onClick={handleGenerateScenarios}>Generate alternate timelines</button>
      <div className="scenario-container">
        {scenarios.map((scenario, index) => (
          <div key={index} className="scenario-label" onClick={() => handleScenarioSelect(scenario)}>
            {scenario}
          </div>
        ))}
      </div>
      <br />
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.url} alt={`Scenario Image ${index}`} />
          <p>{img.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
