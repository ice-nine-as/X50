import {
  FeedKeys,
} from '../../Enums/FeedKeys';
import {
  IRssAction,
} from '../App/IRssAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  isFeedKey,
} from '../../TypeGuards/isFeedKey';
import {
  isRssAction,
} from '../../TypeGuards/isRssAction';
import {
  isRssFeed,
} from '../../TypeGuards/isRssFeed';
import {
  TActionCreator,
} from './TActionCreator';

export const strings = {
  RSS_ACTION_INVALID:
    'The rssAction argument passed to the makeRssAction function did not ' +
    'meet the isRssAction type guard.',

  FEED_KEY_INVALID:
    'The feedKey argument passed to the makeRssAction function did not meet ' +
    'the isFeedKey type guard.',

  VALUE_INVALID:
    'The value argument passed to the makeRssAction function was not null, ' +
    'nor did it meet the isRssFeed type guard.',
};

export const createRssAction: TActionCreator<IRssAction> = (
  rssAction: Readonly<IRssAction>,
  feedKey:   FeedKeys,
  value:     IRssFeed | null,
): IRssAction =>
{
  if (!isRssAction(rssAction)) {
    throw new Error(strings.RSS_ACTION_INVALID);
  } else if (!isFeedKey(feedKey)) {
    throw new Error(strings.FEED_KEY_INVALID);
  } else if (value !== null && !isRssFeed(value)) {
    throw new Error(strings.VALUE_INVALID);
  }

  return Object.freeze(Object.assign({}, rssAction, {
    feedKey,
    value,
  }));
}

export default createRssAction;