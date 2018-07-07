import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  FeedKeys,
} from '../../../src/Enums/FeedKeys';
import {
  strings,
  createRssAction,
} from '../../../src/Actions/Creators/createRssAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers.js';
import {
  RssAction,
} from '../../../src/Actions/App/RssAction';

/* Mocked */
import {
  isFeedKey,
} from '../../../src/TypeGuards/isFeedKey';
jest.mock('../../../src/TypeGuards/isFeedKey');

import {
  isRssFeed,
} from '../../../src/TypeGuards/isRssFeed';
jest.mock('../../../src/TypeGuards/isRssFeed');

type Mock = jest.Mock;

describe('createRssAction unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isFeedKey.mockClear();
    // @ts-ignore
    isFeedKey.mockImplementation(() => true);

    // @ts-ignore
    isRssFeed.mockClear();
    // @ts-ignore
    isRssFeed.mockImplementation(() => true);
  });

  it('Has the correct type.', () => {
    expect(createRssAction(RssAction, FeedKeys.NewsFull, null).type).toBe(AppActionTypes.Rss);
  });

  it('Assigns the correct value.', () => {
    expect(createRssAction(RssAction, null, 'foo').value).toBe('foo');
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>createRssAction(RssAction, {})).type = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>createRssAction(RssAction, {})).value = 'foo';
    expect(func).toThrow();
  });

  it('Throws if the RssAction argument does not meet the isLinkAction type guard.', () => {
    // @ts-ignore
    const func = () => createRssAction();
    expect(func).toThrow(strings.RSS_ACTION_INVALID);
  });

  it('Throws if the feedKey argument does not meet the isFeedKey type guard.', () => {
    // @ts-ignore
    isFeedKey.mockImplementation(() => false);
    // @ts-ignore
    const func = () => createRssAction(RssAction);

    expect(func).toThrow(strings.FEED_KEY_INVALID);
  });

  it('Does not throw if the value argument is null.', () => {
    const func = () => createRssAction(RssAction, null);
    expect(func).not.toThrow();
  });

  it('Throws if the value argument is not null and does not meet the isRssFeed type guard.', () => {
    // @ts-ignore
    isRssFeed.mockImplementationOnce(() => false);
    // @ts-ignore
    const func = () => createRssAction(RssAction);
    expect(func).toThrow(strings.VALUE_INVALID);
  });
});

describe('DoneAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(createRssAction(RssAction, {}))).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(createRssAction(RssAction, {}))).toBe(true);
  });
});