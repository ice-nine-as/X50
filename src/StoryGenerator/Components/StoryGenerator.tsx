import {
  AnswerTextAction,
} from '../Actions/AnswerTextAction';
import {
  CompletedStory,
} from './CompletedStory';
import {
  CurrentPartAction,
} from '../Actions/CurrentPartAction';
import {
  getStoryTemplate,
} from '../Modules/getStoryTemplate';
import {
  InProgressStory,
} from './InProgressStory';
import {
  // @ts-ignore
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  Languages,
} from '../../Enums/Languages';
import {
  makeStoryGeneratorAction,
} from '../Modules/makeStoryGeneratorAction';
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
} from '../Actions/StoryStateAction';
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
import styles from '../Styles/Components/StoryGenerator.less';
const _styles = styles || {};

export class StoryGenerator extends React.PureComponent<TStoryGeneratorStoreProps & TStoryGeneratorDispatchProps> {
  render() {
    const {
      currentPart,
      language,
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
      return 'Now loading...';
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
      titleMap[StoryGeneratorParts.B] = 'Part B';
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
      titleMap[StoryGeneratorParts.C] = 'Part C';
    }

    return (
      <div className={_styles.StoryGenerator}>
        <h2 className={_styles.ExplainerHeader}>
          <strong>
            How does it work?
          </strong>
        </h2>

        <p className={_styles.Explainer}>
          Answer each of the questions, then click the Generate Story button to
          see your personalized story. Click Submit Story to send it to Ice-9 for
          a chance at your words being included in the further narrative of X,
          or being discussed on the podcast by one of the team members!  
        </p>

        <StoryPartSelector
          currentPart={this.props.currentPart}
          setCurrentPart={this.props.setCurrentPart}
          titleMap={titleMap}
        />

        <InProgressStory
          currentPart={this.props.currentPart}
          language={this.props.language}
          setAnswerText={this.props.setAnswerText}
          setStoryState={this.props.setStoryState}
          storyState={this.props.storyState}
          storyTemplate={template}
          templateKey={key}
        />
        
        {this.props.storyState === StoryStates.Complete ?
          <CompletedStory
            language={this.props.language}
            setCurrentPart={this.props.setCurrentPart}
            setStoryState={this.props.setStoryState}
            storyTemplate={template}
          /> :
          null}
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<
  TStoryGeneratorStoreProps,
  {},
  {
    language:       Languages,
    storyGenerator: TStoryGeneratorStoreProps,
  }
> = ({
  language,
  storyGenerator: {
    currentPart,
    storyTemplates,
    storyState,
  },
}) => ({
  currentPart,
  language,
  storyTemplates,
  storyState,
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