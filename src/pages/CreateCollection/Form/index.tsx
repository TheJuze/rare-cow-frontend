import { createValidator, routes, standardsMap } from 'appConstants';
import {
  Input, OptionSelector, Text, Button,
} from 'components';
import UploadAvatar from 'components/AvatarUploader/AvatarUploader';
import { Field, Form, Formik } from 'formik';
import React, { VFC } from 'react';
import {
  EInputStatus, ICreateCollection, RequestStatus, TInputCaption, TOption,
} from 'types';
import * as Yup from 'yup';

import cx from 'clsx';
import actionTypes from 'store/collections/actionTypes';
import { useShallowSelector } from 'hooks';
import uiSelector from 'store/ui/selectors';
import styles from './styles.module.scss';

interface ICreateCollectionForm {
  handleSubmit: (values: ICreateCollection) => void;
  formValues: ICreateCollection;
}

const captionGenerator = (touched: boolean, errors: string | undefined) => {
  const inputState: TInputCaption = { status: EInputStatus.COMMON, caption: '' };
  if (touched && errors) {
    inputState.status = EInputStatus.ERROR;
    inputState.caption = errors;
  }
  return inputState;
};

export const CreateCollectionForm: VFC<ICreateCollectionForm> = ({ handleSubmit, formValues }) => {
  const { [actionTypes.CREATE_COLLECTION]: collectionCreateRequest } = useShallowSelector(
    uiSelector.getUI,
  );
  return (
    <Formik
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(createValidator.name.min, 'Too short!')
          .max(createValidator.name.max, 'Too long!')
          .required(),
        symbol: Yup.string()
          .min(createValidator.symbol.min, 'Too Short!')
          .max(createValidator.symbol.max, 'Too Long!')
          .required(),
      })}
      initialValues={{ ...formValues }}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnBlur
    >
      {({
        errors, touched, values, handleBlur, setFieldValue, handleSubmit: submitForm,
      }) => (
        <Form className={styles.wrapper}>
          <div className={styles.uploader}>
            <Field id="media" name="media" required>
              {() => (
                <>
                  <UploadAvatar
                    fileURL={values.mediaURL || ''}
                    onLoadEnd={(fURL, f) => {
                      setFieldValue('media', f);
                      setFieldValue('mediaURL', fURL);
                    }}
                  />
                  <Text
                    className={styles.uploaderSubtitle}
                    weight="semiBold"
                    color="dark0"
                    variant="body-2"
                    align="center"
                  >
                    Logo image
                  </Text>
                  <Text className={styles.uploaderInfo} color="dark0" size="xs" align="center">
                    This image will also be used for navigation.
                    <p>350 x 350</p>
                    <p>recommended.</p>
                  </Text>
                </>
              )}
            </Field>
          </div>
          <div className={styles.information}>
            <Text color="dark0" className={styles.informationTitle}>
              Collection details
            </Text>
            <Field id="name" name="name" required>
              {({ field, form: { isSubmitting, handleChange: fieldChange } }) => (
                <Input
                  name="name"
                  id="name"
                  value={field.value}
                  onChange={fieldChange('name')}
                  onBlur={handleBlur}
                  caption={captionGenerator(touched['name'], errors['name'])}
                  disabled={isSubmitting}
                  label="Name"
                  placeholder="Name"
                  className={cx(styles.fullSize, styles.field)}
                />
              )}
            </Field>
            <Field id="symbol" name="symbol" required>
              {({ field, form: { isSubmitting, handleChange: fieldChange } }) => (
                <Input
                  name="symbol"
                  id="symbol"
                  value={field.value}
                  onChange={fieldChange('symbol')}
                  onBlur={handleBlur}
                  caption={captionGenerator(touched['symbol'], errors['symbol'])}
                  disabled={isSubmitting}
                  label="Symbol"
                  placeholder={
                    values.name
                      ? `Example: ${values.name.slice(0, createValidator.symbol.max).toUpperCase()}`
                      : 'Symbol'
                  }
                  className={cx(styles.fullSize, styles.field)}
                />
              )}
            </Field>
            <Field id="description" name="description" required>
              {({ field, form: { isSubmitting, handleChange: fieldChange } }) => (
                <>
                  <Input
                    name="description"
                    id="description"
                    value={field.value}
                    onChange={fieldChange('description')}
                    onBlur={handleBlur}
                    caption={captionGenerator(touched['description'], errors['description'])}
                    disabled={isSubmitting}
                    label="Description"
                    placeholder="Input text"
                    component="textarea"
                    className={cx(styles.fullSize, styles.field)}
                  />
                  <Text className={styles.counter} size="xs" weight="normal">
                    {field.value.length} / {createValidator.description.max}
                  </Text>
                </>
              )}
            </Field>
            <Field id="type" name="type">
              {({ field, form: { isSubmitting } }) => (
                <OptionSelector
                  name="type"
                  dir="horizontal"
                  options={Object.entries(standardsMap).map(([value, content]) => ({
                    value,
                    content: `${content} NFT`,
                    disabled: isSubmitting,
                  }))}
                  selected={{ value: field.value, content: `${standardsMap[field.value]} NFT` }}
                  setSelected={(val: TOption) => setFieldValue('type', val.value)}
                  className={styles.informationType}
                />
              )}
            </Field>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button
                  className={cx(styles.fullSize, styles.regular)}
                  disabled={
                    Object.keys(errors).length !== 0 ||
                    values.media === null ||
                    collectionCreateRequest === RequestStatus.REQUEST
                  }
                  onClick={submitForm}
                >
                  Create collection
                </Button>
              </div>
              <div className={styles.button}>
                <Button
                  className={cx(styles.fullSize, styles.regular)}
                  variant="outlined"
                  to={routes.nest.create.path}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
