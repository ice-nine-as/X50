import {
  AnswerTextAction,
} from '../Actions/App/AnswerTextAction';
import {
  CompletedStory,
} from './CompletedStory';
import {
  CurrentPartAction,
} from '../Actions/App/CurrentPartAction';
import {
  getStoryTemplate,
} from '../Functions/getStoryTemplate';
import {
  InProgressStory,
} from './InProgressStory';
import {
  IStoryGeneratorAction,
} from '../Actions/App/IStoryGeneratorAction';
import {
  Languages,
} from '../Enums/Languages';
import {
  makeStoryGeneratorAction,
} from '../Functions/makeStoryGeneratorAction';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  StoryPartSelector,
} from './StoryPartSelector';
import {
  StoryStateAction,
} from '../Actions/App/StoryStateAction';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  StoryStates,
} from '../Enums/StoryStates';
import {
  TStoryGeneratorDispatchProps,
} from '../TypeAliases/TStoryGeneratorDispatchProps';
import {
  TStoryGeneratorStoreProps,
} from '../TypeAliases/TStoryGeneratorStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/StoryGenerator.less';
const styles = _styles || {};

export class StoryGenerator extends React.PureComponent<TStoryGeneratorStoreProps & TStoryGeneratorDispatchProps> {
  render() {
    const {
      currentPart,
      language,
      setAnswerText,
      setCurrentPart,
      setStoryState,
      storyState,
      storyTemplates,
    } = this.props;

    const {
      key,
      template,
    } = getStoryTemplate({
      currentPart,
      language,
      storyTemplates,
    });

    if (!key || !template) {
      return null;
    }

    const titleMap = {} as {
      [StoryGeneratorParts.A]: string,
      [StoryGeneratorParts.B]: string,
      [StoryGeneratorParts.C]: string,
    };

    let titleKey = getStoryTemplate({
      currentPart: StoryGeneratorParts.A,
      language,
      storyTemplates,
    }).key;

    if (titleKey && storyTemplates[titleKey]) {
      // @ts-ignore
      titleMap[StoryGeneratorParts.A] = storyTemplates[titleKey].title;
    } else {
      titleMap[StoryGeneratorParts.A] = 'Part A';
    }

    titleKey = getStoryTemplate({
      currentPart: StoryGeneratorParts.B,
      language,
      storyTemplates,
    }).key;

    if (titleKey && storyTemplates[titleKey]) {
      // @ts-ignore
      titleMap[StoryGeneratorParts.B] = storyTemplates[titleKey].title;
    } else {
      /* TODO: change back to Part B. */
      titleMap[StoryGeneratorParts.B] = 'Coming soon';
    }

    titleKey = getStoryTemplate({
      currentPart: StoryGeneratorParts.C,
      language,
      storyTemplates,
    }).key;

    if (titleKey && storyTemplates[titleKey]) {
      // @ts-ignore
      titleMap[StoryGeneratorParts.C] = storyTemplates[titleKey].title;
    } else {
      /* TODO: change back to Part C. */
      titleMap[StoryGeneratorParts.C] = 'Coming soon';
    }

    return (
      <div className={styles.StoryGenerator}>
        <div className={styles.InProgressWrapper}>
          <div className={styles.Content}>
            <div className={styles.InnerContent}>
              <StoryPartSelector
                currentPart={currentPart}
                setCurrentPart={setCurrentPart}
                titleMap={titleMap}
              />

              <InProgressStory
                currentPart={currentPart}
                language={language}
                setAnswerText={setAnswerText}
                setStoryState={setStoryState}
                storyState={storyState}
                storyTemplate={template}
                templateKey={key}
              />

              {storyState === StoryStates.Complete ?
                <CompletedStory
                  language={language}
                  setCurrentPart={setCurrentPart}
                  setStoryState={setStoryState}
                  storyTemplate={template}
                /> :
                null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<
  TStoryGeneratorStoreProps,
  {},
  {
    language: Languages,
    storyGenerator: TStoryGeneratorStoreProps,
  }
> = ({
  language,
  storyGenerator: {
    currentPart,
    storyState,
    storyTemplates,
  },
}) => ({
  currentPart,
  language,
  storyState,
  storyTemplates,
});

export const mapDispatchToProps: MapDispatchToProps<TStoryGeneratorDispatchProps, TStoryGeneratorStoreProps> = (dispatch: Dispatch<IStoryGeneratorAction>) => ({
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string) {
    const action = makeStoryGeneratorAction({
      action: AnswerTextAction,
      id,
      templateKey,
      value,
    });

    return dispatch(action);
  },

  setCurrentPart(value: StoryGeneratorParts) {
    const action = makeStoryGeneratorAction({
      action: CurrentPartAction,
      value,
    });

    return dispatch(action);
  },

  setStoryState(value: StoryStates) {
    const action = makeStoryGeneratorAction({
      action: StoryStateAction,
      value,
    });

    return dispatch(action);
  },
});

export const ConnectedStoryGenerator = connect(mapStateToProps, mapDispatchToProps)(StoryGenerator);

export default StoryGenerator;