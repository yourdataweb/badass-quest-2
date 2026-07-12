import type { BookArchetype, StoryRole, StoryChapter } from '../../store/types';

const roles: StoryRole[] = [
  { role: 'starting_plaza', requiredType: 'plaza', label: 'Starting Square', description: 'Where the dream leads you' },
  { role: 'start_home', requiredType: 'home', label: 'Home', description: 'Where you start your day' },
  { role: 'library', requiredType: 'library', label: 'Library', description: 'Where the first clue awaits' },
  { role: 'sage_park', requiredType: 'park', label: 'Park of the Sage', description: 'Where the Englishman studies' },
  { role: 'market', requiredType: 'market', label: 'Market', description: 'Where Merce works' },
  { role: 'trial_church', requiredType: 'church', label: 'Church of Trials', description: 'Where a secret lies' },
  { role: 'treasure_monument', requiredType: 'monument', label: 'Monument of the Treasure', description: 'The final clue' },
  { role: 'final_plaza', requiredType: 'plaza', label: 'Final Square', description: 'Where the treasure awaits' },
  { role: 'epilogue_cafe', requiredType: 'cafe', label: 'Epilogue Café', description: 'Where the story closes' },
];

const chapter1: StoryChapter = {
  id: 'ch1',
  role: 'story',
  locationsToShow: ['cafe', 'theatre', 'library', 'monument', 'church', 'market'],
  requiredLocationTypes: ['plaza'],
  dialogue: [
    {
      id: 'ch1-arrive',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch1-approach',
          effects: { social: 2 },
          nextNodeId: 'ch1-melqui',
        },
        {
          id: 'ch1-observe',
          effects: { knowledge: 1 },
          nextNodeId: 'ch1-melqui',
        },
      ],
    },
    {
      id: 'ch1-melqui',
      speaker: 'Melquisedec',
      sprite: 'melquisedec',
      options: [
        {
          id: 'ch1-who',
          effects: { knowledge: 1 },
          nextNodeId: 'ch1-urim',
        },
        {
          id: 'ch1-yes',
          effects: { fulfillment: 3 },
          nextNodeId: 'ch1-urim',
        },
        {
          id: 'ch1-doubt',
          effects: { career: 1 },
          nextNodeId: 'ch1-urim',
        },
      ],
    },
    {
      id: 'ch1-urim',
      speaker: 'Melquisedec',
      sprite: 'melquisedec',
      options: [
        {
          id: 'ch1-accept-coins',
          effects: { fulfillment: 2 },
          nextNodeId: 'ch1-first-clue',
        },
        {
          id: 'ch1-refuse',
          effects: { knowledge: 2, social: -1 },
          nextNodeId: 'ch1-first-clue',
        },
      ],
    },
    {
      id: 'ch1-first-clue',
      speaker: 'Melquisedec',
      sprite: 'melquisedec',
      options: [
        {
          id: 'ch1-go-library',
          effects: { fulfillment: 1 },
        },
        {
          id: 'ch1-explore-first',
          effects: { knowledge: 2 },
          nextNodeId: 'ch1-first-clue', // loop, player needs to go to library eventually
        },
      ],
    },
  ],
};

const chapter2_sandbox: StoryChapter = {
  id: 'ch2-sandbox',
  role: 'sandbox',
  locationsToShow: ['cafe', 'market', 'office', 'park', 'plaza', 'monument'],
  requiredLocationTypes: ['library'],
  completionCriteria: { kind: 'visit_location', locationType: 'library' },
  dialogue: [
    {
      id: 'ch2-arrive-library',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch2-ask-book',
          effects: { social: 1, knowledge: 1 },
          nextNodeId: 'ch2-merce',
        },
        {
          id: 'ch2-browse',
          effects: { knowledge: 3 },
          nextNodeId: 'ch2-merce',
        },
      ],
    },
    {
      id: 'ch2-merce',
      speaker: 'Mercè',
      sprite: 'merce',
      options: [
        {
          id: 'ch2-help',
          effects: { resources: 20, social: 2 },
        },
        {
          id: 'ch2-decline',
          effects: { fulfillment: -1, career: 1 },
        },
      ],
    },
  ],
};

const chapter3: StoryChapter = {
  id: 'ch3',
  role: 'story',
  locationsToShow: ['cafe', 'library', 'plaza', 'church', 'market'],
  requiredLocationTypes: ['park'],
  dialogue: [
    {
      id: 'ch3-find',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch3-approach',
          effects: { social: 2 },
          nextNodeId: 'ch3-symbols',
        },
        {
          id: 'ch3-quiet',
          effects: { knowledge: 3 },
          nextNodeId: 'ch3-symbols',
        },
      ],
    },
    {
      id: 'ch3-symbols',
      speaker: 'Englishman',
      sprite: 'englishman',
      options: [
        {
          id: 'ch3-help',
          effects: { knowledge: 2, social: 1 },
          nextNodeId: 'ch3-map-clue',
        },
        {
          id: 'ch3-research',
          effects: { knowledge: 4 },
          nextNodeId: 'ch3-map-clue',
        },
      ],
    },
    {
      id: 'ch3-map-clue',
      speaker: 'Englishman',
      sprite: 'englishman',
      options: [
        {
          id: 'ch3-dragon',
          effects: { knowledge: 5, fulfillment: 3 },
          nextNodeId: 'ch3-ready',
        },
        {
          id: 'ch3-ask',
          effects: { knowledge: 3 },
          nextNodeId: 'ch3-map-clue', // loops, keep hinting
        },
      ],
    },
    {
      id: 'ch3-ready',
      speaker: 'Englishman',
      sprite: 'englishman',
      options: [
        {
          id: 'ch3-start-quest',
          effects: { fulfillment: 2 },
        },
      ],
    },
  ],
};

const chapter4_sandbox: StoryChapter = {
  id: 'ch4-sandbox',
  role: 'sandbox',
  locationsToShow: ['cafe', 'park', 'office', 'theatre', 'plaza'],
  requiredLocationTypes: ['market', 'church', 'monument'],
  completionCriteria: { kind: 'visit_all_locations', locationTypes: ['market', 'church', 'monument'] },
  dialogue: [
    {
      id: 'ch4-intro',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch4-first',
          effects: {},
        },
        {
          id: 'ch4-work-first',
          effects: { resources: 40, career: 2 },
        },
      ],
    },
  ],
};

const chapter5: StoryChapter = {
  id: 'ch5',
  role: 'story',
  locationsToShow: ['park', 'cafe', 'library', 'church', 'monument', 'office'],
  requiredLocationTypes: ['plaza'],
  dialogue: [
    {
      id: 'ch5-arrive',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch5-approach',
          effects: { social: 2 },
          nextNodeId: 'ch5-alchemist',
        },
        {
          id: 'ch5-wary',
          effects: { knowledge: 1 },
          nextNodeId: 'ch5-alchemist',
        },
      ],
    },
    {
      id: 'ch5-alchemist',
      speaker: 'Alchemist',
      sprite: 'alchemist',
      options: [
        {
          id: 'ch5-everything',
          effects: { fulfillment: 10, career: -5, social: -5, resources: -50 },
          nextNodeId: 'ch5-verdict',
        },
        {
          id: 'ch5-nothing',
          effects: { fulfillment: 5, knowledge: 3 },
          nextNodeId: 'ch5-verdict',
        },
        {
          id: 'ch5-both',
          requirements: { career: 20, social: 15 },
          effects: { fulfillment: 8, career: 5, social: 5 },
          nextNodeId: 'ch5-verdict',
        },
        {
          id: 'ch5-wind',
          effects: { knowledge: 10, fulfillment: 5 },
          nextNodeId: 'ch5-verdict',
        },
      ],
    },
    {
      id: 'ch5-verdict',
      speaker: 'Alchemist',
      sprite: 'alchemist',
      options: [
        {
          id: 'ch5-look',
          effects: { fulfillment: 5 },
          nextNodeId: 'ch5-exit',
        },
      ],
    },
    {
      id: 'ch5-exit',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch5-box',
          effects: {},
          nextNodeId: 'ch5-treasure',
        },
      ],
    },
    {
      id: 'ch5-treasure',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ch5-letter',
          effects: { fulfillment: 10 },
        },
      ],
    },
  ],
};

const epilogue: StoryChapter = {
  id: 'epilogue',
  role: 'story',
  locationsToShow: ['park', 'theatre', 'plaza', 'monument'],
  requiredLocationTypes: ['cafe'],
  dialogue: [
    {
      id: 'epilogue-cafe',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ep-approach',
          effects: { social: 5, fulfillment: 5 },
          nextNodeId: 'epilogue-circle',
        },
        {
          id: 'ep-smile',
          effects: { knowledge: 3 },
          nextNodeId: 'epilogue-circle',
        },
        {
          id: 'ep-sit',
          effects: { fulfillment: 3, social: 3 },
          nextNodeId: 'epilogue-circle',
        },
      ],
    },
    {
      id: 'epilogue-circle',
      speaker: 'Narrator',
      sprite: 'narrator',
      options: [
        {
          id: 'ep-end',
          effects: {},
        },
      ],
    },
  ],
};

export const theAlchemist: BookArchetype = {
  id: 'the-alchemist',
  roles,
  chapters: [
    chapter1,
    chapter2_sandbox,
    chapter3,
    chapter4_sandbox,
    chapter5,
    epilogue,
  ],
};
