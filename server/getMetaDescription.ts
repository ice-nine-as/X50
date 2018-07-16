import {
  LocationState,
} from 'redux-first-router';
import {
  PageIdentifiers,
} from '../src/Enums/PageIdentifiers';

export function getMetaDescription(location: LocationState): string {
  const elem = '<meta name="description" content="%s">'
  let description = '';

  const type = location.type as PageIdentifiers;
  if (type === PageIdentifiers.Home) {
    description =
      'hello X is a story laboratory to collectively imagine X, a young ' +
      'woman 50 years into the future. The first season of hello X asks how ' +
      'human impacts on the Arctic ecosystem might affect food webs and ' +
      'food culture for X in 2068.';
  } else if (type === PageIdentifiers.About) {
    description =
      'Learn about the hello X multimedia project and each of the many people ' +
      'responsible for bringing it, and a woman named X, to life.';
  } else if (type === PageIdentifiers.Archives) {
    description =
      'See past podcasts and blog posts, including updates about hello X ' +
      'and fascinating science news.';
  } else if (type === PageIdentifiers.Article) {
    /* Allow search engines to construct their own snippets for fetched content. */
    description = '';
  } else if (type === PageIdentifiers.NotFound) {
    description = 'Whoops! You\'ve found a page that doesn\'t exist.';
  } else if (type === PageIdentifiers.Podcast) {
    /* Allow search engines to construct their own snippets for fetched content. */
    description = '';
  } else if (type === PageIdentifiers.Podcasts) {
    description = 'Listen to new and old podcasts about X, a woman born in ' +
                  '2068, and our rapidly-changing ecological world.';
  } else if (type === PageIdentifiers.ServerError) {
    description = 'Whoops! Our servers encountered an error.';
  } else if (type === PageIdentifiers.Write) {
    description =
      'Take part in the hello X narrative by writing your own stories with ' +
      'our customizable narrative generator.';
  }

  /* Don't bother to send meta descriptions with no content. */
  return description ? elem.replace('%s', description) : '';
}

export default getMetaDescription;