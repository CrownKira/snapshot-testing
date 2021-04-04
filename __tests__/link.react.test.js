// Copyright 2004-present Facebook. All Rights Reserved.

'use strict';

import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

/// rules:
/// should create snapshot files

/// use it() or test()
/// expect this rect component returned value to match snapshots
/// will create snapshots on first run
/// afterwards, all the test will be compared to the originally generated snapshots
/// --testNamePattern flag to re-record snapshots only for those tests that match the pattern.

/// yarn test -- -u : update snapshots
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.instagram.com">Instagram</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/// First, you write a test, calling .toMatchInlineSnapshot() with no arguments:
/// The next time you run Jest, tree will be evaluated, and a snapshot will be written as an argument to toMatchInlineSnapshot:
it('renders as an anchor when no page is set', () => {
  const tree = renderer.create(<Link>Facebook</Link>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <a
      className="normal"
      href="#"
      onMouseEnter={[Function]}
      onMouseLeave={[Function]}
    >
      Facebook
    </a>
  `);
});

it('properly escapes quotes', () => {
  const tree = renderer
    .create(<Link>{"\"Facebook\" \\'is \\ 'awesome'"}</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
