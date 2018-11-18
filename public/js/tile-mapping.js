// Mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
  BLANK: 5,
  WALL: {
    TOP_LEFT: 1414,
    TOP_RIGHT: 1417,
    BOTTOM_LEFT: 1606,
    BOTTOM_RIGHT: 1609,
    // Let's add some randomization to the walls while we are refactoring:
    TOP: [{ index: 1419, weight: 4 }, { index: [57, 58, 59], weight: 1 }],
    LEFT: [{ index: 1610, weight: 4 }, { index: [76, 95, 114], weight: 1 }],
    RIGHT: [{ index: 1421, weight: 4 }, { index: [77, 96, 115], weight: 1 }],
    BOTTOM: [{ index: 1613, weight: 4 }, { index: [78, 79, 80], weight: 1 }],

    TOP_INNER: [{ index: 1515, weight: 4 }, { index: [1514], weight: 1 }],
    LEFT_INNER: [{ index: 1611, weight: 4 }, { index: [1707], weight: 1 }],
    RIGHT_INNER: [{ index: 1420, weight: 4 }, { index: [1516], weight: 1 }],
    BOTTOM_INNER: [{ index: 1806, weight: 4 }, { index: [1807], weight: 1 }]


  },
  FLOOR: [{ index: 1806, weight: 9 }, { index: [1807], weight: 1 }],
  POT: [{ index: 2462, weight: 1 }, { index: 741, weight: 1 }, { index: 873, weight: 1 }],
  DOOR: {
    TOP: [40, 6, 38],
    LEFT: [
      [40],
      [6],
      [2]
    ],
    BOTTOM: [2, 6, 0],
    RIGHT: [
      [38],
      [6],
      [0]
    ]
  },
  CHEST: 166,
  STAIRS: 81,
  TOWER: [
    [186],
    [205]
  ]
};

export default TILE_MAPPING;
