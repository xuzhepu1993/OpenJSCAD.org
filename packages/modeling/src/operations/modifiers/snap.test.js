const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

const { geom2, geom3, path2 } = require('../../geometries')

const { arc, rectangle, cuboid } = require('../../primitives')

const { snap } = require('./index')

test('snap: snap of a path2 produces an expected path2', (t) => {
  const geometry1 = path2.create()
  const geometry2 = arc({radius: 1 / 2, segments: 8})
  const geometry3 = arc({radius: 1.3333333333333333333 / 2, segments: 8})
  const geometry4 = arc({radius: Math.PI * 1000 / 2, segments: 8})

  const results = snap(geometry1, geometry2, geometry3, geometry4)
  t.is(results.length, 4)

  let pts = path2.toPoints(results[0])
  let exp = []
  t.true(comparePoints(pts, exp))

  pts = path2.toPoints(results[1])
  exp = [
    [ 0.5, 0 ], [ 0.383022221559489, 0.3213938048432696 ],
    [ 0.08682408883346521, 0.492403876506104 ], [ -0.2499999999999999, 0.43301270189221935 ],
    [ -0.46984631039295416, 0.17101007166283444 ], [ -0.4698463103929542, -0.17101007166283433 ],
    [ -0.2500000000000002, -0.43301270189221924 ], [ 0.08682408883346499, -0.49240387650610407 ],
    [ 0.3830222215594889, -0.3213938048432698 ]
  ]
  t.true(comparePoints(pts, exp))

  pts = path2.toPoints(results[2])
  exp = [
    [ 0.6666666666666666, 0 ], [ 0.5106962954126519, 0.4285250731243595 ],
    [ 0.11576545177795361, 0.6565385020081387 ], [ -0.33333333333333315, 0.5773502691896257 ],
    [ -0.6264617471906055, 0.22801342888377923 ], [ -0.6264617471906055, -0.2280134288837791 ],
    [ -0.3333333333333336, -0.5773502691896256 ], [ 0.1157654517779533, -0.6565385020081387 ],
    [ 0.5106962954126518, -0.4285250731243597 ]
  ]
  t.true(comparePoints(pts, exp))

  pts = path2.toPoints(results[3])
  exp = [
    [ 1570.7963267948965, 0 ], [ 1203.2997974129325, 1009.6884162048875 ],
    [ 272.76591963384186, 1546.932401030712 ], [ -785.3981633974479, 1360.3495231756633 ],
    [ -1476.0657170467744, 537.2439848258247 ], [ -1476.0657170467746, -537.2439848258243 ],
    [ -785.3981633974489, -1360.349523175663 ], [ 272.7659196338412, -1546.932401030712 ],
    [ 1203.2997974129323, -1009.688416204888 ]
  ]
  t.true(comparePoints(pts, exp))
})

test('snap: snap of a geom2 produces an expected geom2', (t) => {
  const geometry1 = geom2.create()
  const geometry2 = rectangle({size: [1, 1, 1]})
  const geometry3 = rectangle({size: [1.3333333333333333333, 1.3333333333333333333, 1.3333333333333333333]})
  const geometry4 = rectangle({size: [Math.PI * 1000, Math.PI * 1000, Math.PI * 1000]})

  const results = snap(geometry1, geometry2, geometry3, geometry4)
  t.is(results.length, 4)

  let pts = geom2.toPoints(results[0])
  let exp = []
  t.true(comparePoints(pts, exp))

  pts = geom2.toPoints(results[1])
  exp = [ [ -0.5, -0.5 ], [ 0.5, -0.5 ], [ 0.5, 0.5 ], [ -0.5, 0.5 ] ]
  t.true(comparePoints(pts, exp))

  pts = geom2.toPoints(results[2])
  exp = [
    [ -0.6666666666666666, -0.6666666666666666 ], [ 0.6666666666666666, -0.6666666666666666 ],
    [ 0.6666666666666666, 0.6666666666666666 ], [ -0.6666666666666666, 0.6666666666666666 ]
  ]
  t.true(comparePoints(pts, exp))

  pts = geom2.toPoints(results[3])
  exp = [
    [ -1570.7963267948967, -1570.7963267948967 ], [ 1570.7963267948967, -1570.7963267948967 ],
    [ 1570.7963267948967, 1570.7963267948967 ], [ -1570.7963267948967, 1570.7963267948967 ]
  ]
  t.true(comparePoints(pts, exp))
})

test('snap: snap of a geom3 produces an expected geom3', (t) => {
  const geometry1 = geom3.create()
  const geometry2 = cuboid({size: [1, 1, 1]})
  const geometry3 = cuboid({size: [1.3333333333333333333, 1.3333333333333333333, 1.3333333333333333333]})
  const geometry4 = cuboid({size: [Math.PI * 1000, Math.PI * 1000, Math.PI * 1000]})

  const results = snap(geometry1, geometry2, geometry3, geometry4)
  t.is(results.length, 4)

  let pts = geom3.toPoints(results[0])
  let exp = []
  t.true(comparePolygonsAsPoints(pts, exp))

  pts = geom3.toPoints(results[1])
  exp = [
    [[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5]],
    [[0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5]],
    [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]],
    [[-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5]],
    [[-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, -0.5]],
    [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))

  pts = geom3.toPoints(results[2])
  exp = [
    [[-0.6666666666666667, -0.6666666666666667, -0.6666666666666667], [-0.6666666666666667, -0.6666666666666667, 0.6666666666666667],
      [-0.6666666666666667, 0.6666666666666667, 0.6666666666666667], [-0.6666666666666667, 0.6666666666666667, -0.6666666666666667]],
    [[0.6666666666666667, -0.6666666666666667, -0.6666666666666667], [0.6666666666666667, 0.6666666666666667, -0.6666666666666667],
      [0.6666666666666667, 0.6666666666666667, 0.6666666666666667], [0.6666666666666667, -0.6666666666666667, 0.6666666666666667]],
    [[-0.6666666666666667, -0.6666666666666667, -0.6666666666666667], [0.6666666666666667, -0.6666666666666667, -0.6666666666666667],
      [0.6666666666666667, -0.6666666666666667, 0.6666666666666667], [-0.6666666666666667, -0.6666666666666667, 0.6666666666666667]],
    [[-0.6666666666666667, 0.6666666666666667, -0.6666666666666667], [-0.6666666666666667, 0.6666666666666667, 0.6666666666666667],
      [0.6666666666666667, 0.6666666666666667, 0.6666666666666667], [0.6666666666666667, 0.6666666666666667, -0.6666666666666667]],
    [[-0.6666666666666667, -0.6666666666666667, -0.6666666666666667], [-0.6666666666666667, 0.6666666666666667, -0.6666666666666667],
      [0.6666666666666667, 0.6666666666666667, -0.6666666666666667], [0.6666666666666667, -0.6666666666666667, -0.6666666666666667]],
    [[-0.6666666666666667, -0.6666666666666667, 0.6666666666666667], [0.6666666666666667, -0.6666666666666667, 0.6666666666666667],
      [0.6666666666666667, 0.6666666666666667, 0.6666666666666667], [-0.6666666666666667, 0.6666666666666667, 0.6666666666666667]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))

  pts = geom3.toPoints(results[3])
  exp = [
    [[-1570.7963267948967, -1570.7963267948967, -1570.7963267948967], [-1570.7963267948967, -1570.7963267948967, 1570.7963267948967],
      [-1570.7963267948967, 1570.7963267948967, 1570.7963267948967], [-1570.7963267948967, 1570.7963267948967, -1570.7963267948967]],
    [[1570.7963267948967, -1570.7963267948967, -1570.7963267948967], [1570.7963267948967, 1570.7963267948967, -1570.7963267948967],
      [1570.7963267948967, 1570.7963267948967, 1570.7963267948967], [1570.7963267948967, -1570.7963267948967, 1570.7963267948967]],
    [[-1570.7963267948967, -1570.7963267948967, -1570.7963267948967], [1570.7963267948967, -1570.7963267948967, -1570.7963267948967],
      [1570.7963267948967, -1570.7963267948967, 1570.7963267948967], [-1570.7963267948967, -1570.7963267948967, 1570.7963267948967]],
    [[-1570.7963267948967, 1570.7963267948967, -1570.7963267948967], [-1570.7963267948967, 1570.7963267948967, 1570.7963267948967],
      [1570.7963267948967, 1570.7963267948967, 1570.7963267948967], [1570.7963267948967, 1570.7963267948967, -1570.7963267948967]],
    [[-1570.7963267948967, -1570.7963267948967, -1570.7963267948967], [-1570.7963267948967, 1570.7963267948967, -1570.7963267948967],
      [1570.7963267948967, 1570.7963267948967, -1570.7963267948967], [1570.7963267948967, -1570.7963267948967, -1570.7963267948967]],
    [[-1570.7963267948967, -1570.7963267948967, 1570.7963267948967], [1570.7963267948967, -1570.7963267948967, 1570.7963267948967],
      [1570.7963267948967, 1570.7963267948967, 1570.7963267948967], [-1570.7963267948967, 1570.7963267948967, 1570.7963267948967]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))
})
