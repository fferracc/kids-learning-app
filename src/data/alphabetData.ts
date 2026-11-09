
export interface WordData {
    word: string;
    emoji: string;
    phrase: string[];
}

export const ALPHABET_DATA: Record<string, WordData[]> = {
    A: [
        { word: 'APPLE', emoji: '🍎', phrase: ['EAT', 'THE', 'APPLE'] },
        { word: 'ANT', emoji: '🐜', phrase: ['TINY', 'RED', 'ANT'] },
        { word: 'AXE', emoji: '🪓', phrase: ['CHOP', 'WITH', 'AXE'] },
        { word: 'AMBULANCE', emoji: '🚑', phrase: ['FAST', 'LOUD', 'AMBULANCE'] }
    ],
    B: [
        { word: 'BALL', emoji: '⚽', phrase: ['KICK', 'THE', 'BALL'] },
        { word: 'BEAR', emoji: '🐻', phrase: ['BIG', 'BROWN', 'BEAR'] },
        { word: 'BIRD', emoji: '🐦', phrase: ['FLY', 'LITTLE', 'BIRD'] },
        { word: 'BUS', emoji: '🚌', phrase: ['RIDE', 'THE', 'BUS'] }
    ],
    C: [
        { word: 'CAT', emoji: '🐱', phrase: ['PET', 'THE', 'CAT'] },
        { word: 'CAR', emoji: '🚗', phrase: ['DRIVE', 'THE', 'CAR'] },
        { word: 'CAKE', emoji: '🎂', phrase: ['EAT', 'THE', 'CAKE'] },
        { word: 'COW', emoji: '🐮', phrase: ['MOO', 'SAYS', 'COW'] }
    ],
    D: [
        { word: 'DOG', emoji: '🐶', phrase: ['PLAY', 'WITH', 'DOG'] },
        { word: 'DUCK', emoji: '🦆', phrase: ['SWIM', 'LITTLE', 'DUCK'] },
        { word: 'DRUM', emoji: '🥁', phrase: ['BANG', 'THE', 'DRUM'] },
        { word: 'DONUT', emoji: '🍩', phrase: ['YUMMY', 'SWEET', 'DONUT'] }
    ],
    E: [
        { word: 'EGG', emoji: '🥚', phrase: ['COOK', 'THE', 'EGG'] },
        { word: 'ELEPHANT', emoji: '🐘', phrase: ['BIG', 'GREY', 'ELEPHANT'] },
        { word: 'EAGLE', emoji: '🦅', phrase: ['FLY', 'HIGH', 'EAGLE'] },
        { word: 'EAR', emoji: '👂', phrase: ['LISTEN', 'WITH', 'EAR'] }
    ],
    F: [
        { word: 'FISH', emoji: '🐟', phrase: ['SWIM', 'FAST', 'FISH'] },
        { word: 'FROG', emoji: '🐸', phrase: ['JUMP', 'GREEN', 'FROG'] },
        { word: 'FIRE', emoji: '🔥', phrase: ['HOT', 'ORANGE', 'FIRE'] },
        { word: 'FLOWER', emoji: '🌸', phrase: ['SMELL', 'THE', 'FLOWER'] }
    ],
    G: [
        { word: 'GRAPES', emoji: '🍇', phrase: ['EAT', 'PURPLE', 'GRAPES'] },
        { word: 'GHOST', emoji: '👻', phrase: ['SCARY', 'WHITE', 'GHOST'] },
        { word: 'GIFT', emoji: '🎁', phrase: ['OPEN', 'THE', 'GIFT'] },
        { word: 'GUITAR', emoji: '🎸', phrase: ['PLAY', 'THE', 'GUITAR'] }
    ],
    H: [
        { word: 'HAT', emoji: '👒', phrase: ['WEAR', 'THE', 'HAT'] },
        { word: 'HOUSE', emoji: '🏠', phrase: ['LIVE', 'IN', 'HOUSE'] },
        { word: 'HORSE', emoji: '🐴', phrase: ['RIDE', 'THE', 'HORSE'] },
        { word: 'HAMBURGER', emoji: '🍔', phrase: ['EAT', 'THE', 'BURGER'] }
    ],
    I: [
        { word: 'ICE', emoji: '🧊', phrase: ['COLD', 'HARD', 'ICE'] },
        { word: 'IGLOO', emoji: '🧊', phrase: ['LIVE', 'IN', 'IGLOO'] },
        { word: 'ISLAND', emoji: '🏝️', phrase: ['SWIM', 'TO', 'ISLAND'] },
        { word: 'INSECT', emoji: '🐛', phrase: ['TINY', 'GREEN', 'INSECT'] }
    ],
    J: [
        { word: 'JUICE', emoji: '🧃', phrase: ['DRINK', 'THE', 'JUICE'] },
        { word: 'JELLY', emoji: '🍮', phrase: ['EAT', 'SWEET', 'JELLY'] },
        { word: 'JUMP', emoji: '🏃', phrase: ['RUN', 'AND', 'JUMP'] },
        { word: 'JACKET', emoji: '🧥', phrase: ['WEAR', 'WARM', 'JACKET'] }
    ],
    K: [
        { word: 'KITE', emoji: '🪁', phrase: ['FLY', 'THE', 'KITE'] },
        { word: 'KEY', emoji: '🔑', phrase: ['OPEN', 'WITH', 'KEY'] },
        { word: 'KING', emoji: '👑', phrase: ['WEAR', 'THE', 'CROWN'] },
        { word: 'KIWI', emoji: '🥝', phrase: ['EAT', 'GREEN', 'KIWI'] }
    ],
    L: [
        { word: 'LION', emoji: '🦁', phrase: ['BIG', 'SCARY', 'LION'] },
        { word: 'LEMON', emoji: '🍋', phrase: ['SOUR', 'YELLOW', 'LEMON'] },
        { word: 'LEAF', emoji: '🍃', phrase: ['GREEN', 'TREE', 'LEAF'] },
        { word: 'LOCK', emoji: '🔒', phrase: ['LOCK', 'THE', 'DOOR'] }
    ],
    M: [
        { word: 'MOUSE', emoji: '🐭', phrase: ['TINY', 'GREY', 'MOUSE'] },
        { word: 'MOON', emoji: '🌙', phrase: ['LOOK', 'AT', 'MOON'] },
        { word: 'MILK', emoji: '🥛', phrase: ['DRINK', 'COLD', 'MILK'] },
        { word: 'MONKEY', emoji: '🐒', phrase: ['CLIMB', 'LIKE', 'MONKEY'] }
    ],
    N: [
        { word: 'NEST', emoji: '🪺', phrase: ['BIRD', 'IN', 'NEST'] },
        { word: 'NOSE', emoji: '👃', phrase: ['SMELL', 'WITH', 'NOSE'] },
        { word: 'NUT', emoji: '🥜', phrase: ['EAT', 'CRUNCHY', 'NUT'] },
        { word: 'NIGTH', emoji: '🌃', phrase: ['SLEEP', 'AT', 'NIGHT'] }
    ],
    O: [
        { word: 'OCTOPUS', emoji: '🐙', phrase: ['SWIM', 'LIKE', 'OCTOPUS'] },
        { word: 'OWL', emoji: '🦉', phrase: ['WISE', 'OLD', 'OWL'] },
        { word: 'ORANGE', emoji: '🍊', phrase: ['EAT', 'JUICY', 'ORANGE'] },
        { word: 'ONION', emoji: '🧅', phrase: ['CHOP', 'WHITE', 'ONION'] }
    ],
    P: [
        { word: 'PIG', emoji: '🐷', phrase: ['PINK', 'LITTLE', 'PIG'] },
        { word: 'PIZZA', emoji: '🍕', phrase: ['EAT', 'HOT', 'PIZZA'] },
        { word: 'PENGUIN', emoji: '🐧', phrase: ['WALK', 'LIKE', 'PENGUIN'] },
        { word: 'PUMPKIN', emoji: '🎃', phrase: ['BIG', 'ORANGE', 'PUMPKIN'] }
    ],
    Q: [
        { word: 'QUEEN', emoji: '👸', phrase: ['BOW', 'TO', 'QUEEN'] },
        { word: 'QUIET', emoji: '🤫', phrase: ['BE', 'VERY', 'QUIET'] },
        { word: 'QUACK', emoji: '🦆', phrase: ['DUCK', 'SAYS', 'QUACK'] },
        { word: 'QUESTION', emoji: '❓', phrase: ['ASK', 'A', 'QUESTION'] }
    ],
    R: [
        { word: 'RABBIT', emoji: '🐰', phrase: ['HOP', 'LITTLE', 'RABBIT'] },
        { word: 'RAIN', emoji: '🌧️', phrase: ['WET', 'COLD', 'RAIN'] },
        { word: 'ROBOT', emoji: '🤖', phrase: ['BEEP', 'BOP', 'ROBOT'] },
        { word: 'ROCKET', emoji: '🚀', phrase: ['FLY', 'IN', 'ROCKET'] }
    ],
    S: [
        { word: 'SUN', emoji: '☀️', phrase: ['HOT', 'YELLOW', 'SUN'] },
        { word: 'SNAKE', emoji: '🐍', phrase: ['LONG', 'GREEN', 'SNAKE'] },
        { word: 'STAR', emoji: '⭐', phrase: ['SHINE', 'LIKE', 'STAR'] },
        { word: 'SOCK', emoji: '🧦', phrase: ['WEAR', 'WARM', 'SOCK'] }
    ],
    T: [
        { word: 'TIGER', emoji: '🐯', phrase: ['RUN', 'FAST', 'TIGER'] },
        { word: 'TREE', emoji: '🌳', phrase: ['CLIMB', 'TALL', 'TREE'] },
        { word: 'TRAIN', emoji: '🚂', phrase: ['RIDE', 'THE', 'TRAIN'] },
        { word: 'TURTLE', emoji: '🐢', phrase: ['SLOW', 'GREEN', 'TURTLE'] }
    ],
    U: [
        { word: 'UMBRELLA', emoji: '☂️', phrase: ['OPEN', 'THE', 'UMBRELLA'] },
        { word: 'UNICORN', emoji: '🦄', phrase: ['MAGIC', 'WHITE', 'UNICORN'] },
        { word: 'UP', emoji: '⬆️', phrase: ['LOOK', 'UP', 'HIGH'] },
        { word: 'UNDER', emoji: '⬇️', phrase: ['LOOK', 'UNDER', 'THERE'] }
    ],
    V: [
        { word: 'VAN', emoji: '🚐', phrase: ['DRIVE', 'THE', 'VAN'] },
        { word: 'VIOLIN', emoji: '🎻', phrase: ['PLAY', 'THE', 'VIOLIN'] },
        { word: 'VASE', emoji: '🏺', phrase: ['PUT', 'IN', 'VASE'] },
        { word: 'VOLCANO', emoji: '🌋', phrase: ['HOT', 'LAVA', 'VOLCANO'] }
    ],
    W: [
        { word: 'WHALE', emoji: '🐋', phrase: ['SWIM', 'BIG', 'WHALE'] },
        { word: 'WATER', emoji: '💧', phrase: ['DRINK', 'COLD', 'WATER'] },
        { word: 'WOLF', emoji: '🐺', phrase: ['HOWL', 'LIKE', 'WOLF'] },
        { word: 'WORM', emoji: '🪱', phrase: ['WIGGLE', 'LIKE', 'WORM'] }
    ],
    X: [
        { word: 'XYLOPHONE', emoji: '🎹', phrase: ['PLAY', 'THE', 'Music'] },
        { word: 'XRAY', emoji: '🦴', phrase: ['SEE', 'YOUR', 'BONES'] },
        { word: 'BOX', emoji: '📦', phrase: ['OPEN', 'THE', 'BOX'] },
        { word: 'FOX', emoji: '🦊', phrase: ['SLY', 'ORANGE', 'FOX'] }
    ],
    Y: [
        { word: 'YOYO', emoji: '🪀', phrase: ['PLAY', 'WITH', 'YOYO'] },
        { word: 'YELLOW', emoji: '🟡', phrase: ['THIS', 'IS', 'YELLOW'] },
        { word: 'YAK', emoji: '🐂', phrase: ['BIG', 'WOOLY', 'YAK'] },
        { word: 'YOGURT', emoji: '🥣', phrase: ['EAT', 'YUMMY', 'YOGURT'] }
    ],
    Z: [
        { word: 'ZEBRA', emoji: '🦓', phrase: ['STRIPED', 'BLACK', 'ZEBRA'] },
        { word: 'ZOO', emoji: '🦁', phrase: ['VISIT', 'THE', 'ZOO'] },
        { word: 'ZIPPER', emoji: '🤐', phrase: ['ZIP', 'IT', 'UP'] },
        { word: 'ZERO', emoji: '0️⃣', phrase: ['COUNT', 'TO', 'ZERO'] }
    ]
};
