/* eslint-disable max-len */
import {
  createValidator, getExtension, getFileGroup, routes, TAvailableExtensions, TStandards,
} from 'appConstants';
import {
  Button, Checkbox, Dropdown, Input, Listing, QuantityInput, Text,
} from 'components';
import { Field, Form, Formik } from 'formik';
import { useSearch, useShallowSelector } from 'hooks';
import React, {
  useCallback, useMemo, useRef, VFC,
} from 'react';
import {
  CategoryName,
  EInputStatus, ICreateForm, TInputCaption, TSingleProp,
} from 'types';
import nftSelector from 'store/nfts/selectors';

import { HighlightedText } from 'components/HighlightedText';
import cx from 'clsx';
import { Collection } from 'types/api';
import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';
import styles from './styles.module.scss';
import { Collections, Properties, UploadMedia } from './components';
import { validationSchema } from './form.helpers';

interface ICreateNFTForm {
  handleSubmit: (values: ICreateForm) => void;
  formValues: ICreateForm;
  type: TStandards;
  collections: Collection[],
}

const captionGenerator = (touched: boolean, errors: string | undefined) => {
  const inputState: TInputCaption = { status: EInputStatus.COMMON, caption: '' };
  if (touched && errors) {
    inputState.status = EInputStatus.ERROR;
    inputState.caption = errors;
  }
  return inputState;
};

export const CreateNFTForm: VFC<ICreateNFTForm> = ({
  handleSubmit, formValues, type, collections,
}) => {
  const dispatch = useDispatch();
  const descriptionRef = useRef(null);
  const { categories: searchedCategories } = useShallowSelector(nftSelector.getProp('searchData'));
  const defaultCategories = useShallowSelector(nftSelector.getProp('categories')).filter((cat) => cat.name !== CategoryName.allCategories);

  const searchValues = useSearch('', { requestData: { type: 'categories' } });

  const categories = useMemo(
    () => (searchValues.searchValue ? searchedCategories : defaultCategories),
    [defaultCategories, searchValues.searchValue, searchedCategories],
  );

  const onSubmitClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (vals: any) => {
      dispatch(
        setModalProps({
          onSendAgain: () => handleSubmit(vals),
          onApprove: () => handleSubmit(vals),
          withSteps: false,
          subtitleText: 'Please press "Send" button in Metamask extension',
        }),
      );
      handleSubmit(vals);
    },
    [dispatch, handleSubmit],
  );

  return (
    <Formik
      initialValues={{ ...formValues }}
      onSubmit={(values) => onSubmitClick(values)}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnBlur
    >
      {({
        errors, touched, values, handleBlur, setFieldValue, handleSubmit: submitForm, isSubmitting,
      }) => {
        const isAllFilesLoaded = (function () {
          const media = values.media?.[0];
          const preview = values.preview?.[0];
          if(media) {
            const format = getFileGroup(getExtension(media.name) as TAvailableExtensions) || 'image';
            return format !== 'image' ? Boolean(media && preview) : Boolean(media);
          }
          return false;
        }());

        return (
          <Form className={styles.wrapper}>
            <div className={styles.uploader}>
              <Field id="media" name="media" required>
                {() => (
                  <UploadMedia onChange={(previewFile, mediaFile) => {
                    setFieldValue('media', [mediaFile]);
                    setFieldValue('preview', [previewFile]);
                  }}
                  />
                )}
              </Field>
            </div>
            <div className={styles.information}>
              <Text color="dark0" className={styles.informationTitle}>
                Information
              </Text>
              <Field id="name" name="name" required>
                {({ field, form: { handleChange: fieldChange } }) => (
                  <Input
                    name="name"
                    id="name"
                    value={field.value}
                    onChange={fieldChange('name')}
                    onBlur={handleBlur}
                    caption={captionGenerator(touched.name, errors.name)}
                    disabled={isSubmitting}
                    label="Name"
                    placeholder="Name"
                    className={cx(styles.fullSize, styles.nameInput)}
                  />
                )}
              </Field>
              <Field id="description" name="description" required>
                {({ field, form: { handleChange: fieldChange } }) => (
                  <>
                    <Input
                      name="description"
                      id="description"
                      value={field.value}
                      onChange={fieldChange('description')}
                      onBlur={handleBlur}
                      caption={captionGenerator(touched.description, errors.description)}
                      disabled={isSubmitting}
                      label="Description"
                      placeholder="Input text"
                      component="textarea"
                      className={cx(styles.fullSize, styles.descriptionArea)}
                      inputRef={descriptionRef}
                    />
                    <Text className={styles.counter} size="xs" weight="normal">
                      {field.value.length} / {createValidator.description.max}
                    </Text>
                  </>
                )}
              </Field>
              <Field id="category" name="category" required>
                {({ field }) => {
                  const currentValueById = categories.find(
                    (cat) => cat.id.toString() === field.value?.id,
                  );
                  const currentValue = currentValueById
                    ? { id: currentValueById.id.toString(), content: currentValueById.name }
                    : null;
                  return (
                    <div className={styles.categorySelector}>
                      <Dropdown
                        value={currentValue}
                        placeholder="Choose category"
                        label="Category"
                        disabled={isSubmitting}
                        onBlur={handleBlur('category')}
                        options={
                      categories.length
                        ? categories.map((c) => ({
                          id: c.id.toString(),
                          content: searchValues.searchValue ? (
                            <HighlightedText text={c.name} filter={searchValues.searchValue} />
                          ) : (
                            <Text size="xs" color="darkDefault">{c.name}</Text>
                          ),
                        }))
                        : []
                    }
                        name="category"
                        setValue={(category) => setFieldValue('category', category)}
                        withSearch
                        dropPosition="absolute"
                        variant="outlined"
                        closeOnSelect
                        error={(touched.category && errors.category) ? 'category is required' : ''}
                        {...searchValues}
                      />
                    </div>
                  );
                }}
              </Field>
              <Field id="properties" name="properties">
                {() => (
                  <Properties
                    className={styles.propertiesArea}
                    initProps={values.properties}
                    setProps={(value: TSingleProp[]) => setFieldValue('properties', value)}
                    onBlur={handleBlur('properties')}
                    initErrors={touched.properties && errors.properties}
                  />
                )}
              </Field>
              <Field id="collections" name="collections">
                {() => (
                  <Collections
                    initCollections={collections}
                    setIsCollectionsAdded={(value: boolean) => setFieldValue('collection', { ...values.collection, withCollection: value })}
                    isCollectionsAdded={values.collection.withCollection}
                    setSelectedCollection={(value) => setFieldValue('collection', { ...values.collection, collections: value })}
                    type={type}
                  />
                )}
              </Field>
              {type === 'ERC1155' && (
              <Field id="quantity" name="quantity">
                {({ field, form: { handleChange: fieldChange } }) => (
                  <div className={styles.quantityArea}>
                    <Text color="dark0" className={styles.quantityTitle}>
                      In stock
                    </Text>
                    <QuantityInput
                      name="quantity"
                      value={field.value}
                      minAmount={1}
                      setValue={fieldChange('quantity')}
                    />
                  </div>
                )}
              </Field>
              )}
              <Field id="listing" name="listing">
                {({ field }) => (
                  <div className={styles.listing}>
                    <Checkbox
                      value={field.value.listNow}
                      onChange={() => setFieldValue('listing', {
                        ...values.listing,
                        listNow: !values.listing.listNow,
                      })}
                      className={styles.listingCheckbox}
                    >
                      <Text weight="normal" color="dark0">
                        List for sale now
                      </Text>
                    </Checkbox>
                    <div className={cx(styles.listingBody, { [styles.active]: field.value.listNow })}>
                      <Listing
                        onSubmit={(listValues) => setFieldValue('listing', {
                          ...values.listing,
                          ...listValues,
                        })}
                        maxAmount={+values.quantity || 1}
                        isMultiple={type === 'ERC1155'}
                        itemsAmount={+values.quantity}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <div className={styles.buttons}>
                <div className={styles.button}>
                  <Button disabled={!isAllFilesLoaded || isSubmitting || Object.entries(errors).length !== 0} className={cx(styles.fullSize, styles.regular)} onClick={submitForm}>
                    Create item
                  </Button>
                </div>
                <div className={styles.button}>
                  <Button
                    className={cx(styles.fullSize, styles.regular)}
                    variant="outlined"
                    disabled={isSubmitting}
                    to={routes.nest.create.path}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
