export enum FeedKeys {
  /* Stores topic metadata and excerpts. */
  ForumTopics          = 'ForumTopics',

  /* Stores whole articles. */
  NewsFull             = 'NewsFull',
  
  /* These do *not* appear in the redux store, and are instead are fetched each
   * time a user visits an individual article, and composed into the relevant
   * Full feed. This is done to avoid redundant requests. */
  NewsSingleArticle    = 'NewsSingleArticle',
  /* */

  /* Stores the hero image, authoring metadata, title, and header para. */
  NewsTeasers          = 'NewsTeasers',

  /* Stores only the titles of articles. Not used at present. */
  NewsTitles           = 'NewsTitles',  
 
  Podcast              = 'Podcast',

  Quotes               = 'Quotes',

  /* Story templates. Each episode of a story has three parts, A, B, and C. */
  StoryTemplateEnPartA = 'StoryTemplateEnPartA',
  StoryTemplateEnPartB = 'StoryTemplateEnPartB',
  StoryTemplateEnPartC = 'StoryTemplateEnPartC',
  StoryTemplateNoPartA = 'StoryTemplateNoPartA',
  StoryTemplateNoPartB = 'StoryTemplateNoPartB',
  StoryTemplateNoPartC = 'StoryTemplateNoPartC',
  StoryTemplateRuPartA = 'StoryTemplateRuPartA',
  StoryTemplateRuPartB = 'StoryTemplateRuPartB',
  StoryTemplateRuPartC = 'StoryTemplateRuPartC',

  /* Stores metadata about Ice-9 employees and associates. */
  TeamMembers          = 'TeamMembers',
}

export default FeedKeys;