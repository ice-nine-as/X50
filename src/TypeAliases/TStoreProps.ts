import {
  Languages,
} from '../Enums/Languages';
import {
  LocationState,
} from 'redux-first-router';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TStoreProps = {
  done:          boolean;
  error:         boolean;
  hamburgerOpen: boolean;
  language:      Languages;
  loading:       boolean;
  location:      LocationState;
  feeds:         TFeedsMap;
};

export default TStoreProps;