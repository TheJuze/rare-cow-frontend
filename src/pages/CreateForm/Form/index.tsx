/* eslint-disable max-len */
import { createValidator, routes, TStandards } from 'appConstants';
import {
  Button, Checkbox, Dropdown, Input, Listing, QuantityInput, Text,
} from 'components';
import { Field, Form, Formik } from 'formik';
import { useSearch, useShallowSelector } from 'hooks';
import React, { useMemo, VFC } from 'react';
import {
  EInputStatus, ICreateForm, TInputCaption, TSingleProp,
} from 'types';
import nftSelector from 'store/nfts/selectors';

import { HighlightedText } from 'components/HighlightedText';
import cx from 'clsx';
import userSelector from 'store/user/selectors';
import styles from './styles.module.scss';
import { Collections, Properties, UploadMedia } from './components';

interface ICreateNFTForm {
  handleSubmit: (values: ICreateForm) => void;
  formValues: ICreateForm;
  type: TStandards;
}

const captionGenerator = (touched: boolean, errors: string | undefined) => {
  const inputState: TInputCaption = { status: EInputStatus.COMMON, caption: '' };
  if (touched && errors) {
    inputState.status = EInputStatus.ERROR;
    inputState.caption = errors;
  }
  return inputState;
};

export const CreateNFTForm: VFC<ICreateNFTForm> = ({ handleSubmit, formValues, type }) => {
  const { categories: searchedCategories } = useShallowSelector(nftSelector.getProp('searchData'));
  const defaultCategories = useShallowSelector(nftSelector.getProp('categories'));
  const collections = useShallowSelector(userSelector.getProp('collections'));

  const searchValues = useSearch('', { requestData: { type: 'categories' } });

  const categories = useMemo(
    () => (searchValues.searchValue ? searchedCategories : defaultCategories),
    [defaultCategories, searchValues.searchValue, searchedCategories],
  );

  return (
    <Formik
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
              {({ field, form: { isSubmitting, handleChange: fieldChange } }) => (
                <Input
                  name="nftName"
                  id="nftName"
                  value={field.value}
                  onChange={fieldChange('name')}
                  onBlur={handleBlur}
                  caption={captionGenerator(touched[field.name], errors[field.name])}
                  disabled={isSubmitting}
                  label="Name"
                  placeholder="Name"
                  className={styles.fullSize}
                />
              )}
            </Field>
            <Field id="description" name="description" required>
              {({ field, form: { isSubmitting, handleChange: fieldChange } }) => (
                <>
                  <Input
                    name="nftDescription"
                    id="nftDescription"
                    value={field.value}
                    onChange={fieldChange('description')}
                    onBlur={handleBlur}
                    caption={captionGenerator(touched[field.name], errors[field.name])}
                    disabled={isSubmitting}
                    label="Description"
                    placeholder="Default"
                    component="textarea"
                    className={styles.fullSize}
                  />
                  <Text className={styles.counter} size="xs" weight="normal">
                    {field.value.length} / {createValidator.description.max}
                  </Text>
                </>
              )}
            </Field>
            <Field id="category" name="category" required>
              {({ field, form: { isSubmitting } }) => {
                const currentValueById = categories.find(
                  (cat) => cat.id.toString() === field.value?.id,
                );
                const currentValue = currentValueById
                  ? { id: currentValueById.id.toString(), content: currentValueById.name }
                  : null;
                return (
                  <Dropdown
                    value={currentValue}
                    placeholder="Choose category"
                    label="Category"
                    disabled={isSubmitting}
                    options={
                      categories.length
                        ? categories.map((c) => ({
                          id: c.id.toString(),
                          content: searchValues.searchValue ? (
                            <HighlightedText text={c.name} filter={searchValues.searchValue} />
                          ) : (
                            c.name
                          ),
                        }))
                        : []
                    }
                    name="nftCategory"
                    setValue={(category) => setFieldValue('category', category)}
                    withSearch
                    dropPosition="absolute"
                    variant="outlined"
                    closeOnSelect
                    {...searchValues}
                  />
                );
              }}
            </Field>
            <Field id="properties" name="properties">
              {() => (
                <Properties
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
                  initCollections={collections.filter((c) => !c.isDefault && c.standart === type)}
                  setIsCollectionsAdded={(value: boolean) => setFieldValue('collections', { ...values.collections, withCollection: value })}
                  isCollectionsAdded={values.collections.withCollection}
                  setSelectedCollection={(value) => setFieldValue('collections', { ...values.collections, collections: value })}
                  type={type}
                />
              )}
            </Field>
            {type === 'ERC1155' && (
            <Field id="quantity" name="quantity">
              {({ field, form: { handleChange: fieldChange } }) => (
                <div>
                  <Text color="dark0" className={styles.quantityTitle}>
                    In stock
                  </Text>
                  <QuantityInput
                    name="quantity"
                    value={field.value}
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
                    <Listing itemsAmount={+values.quantity} />
                  </div>
                </div>
              )}
            </Field>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button className={cx(styles.fullSize, styles.regular)} onClick={submitForm}>
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
