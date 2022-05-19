import React, { useCallback, useMemo, VFC } from 'react';

import uiSelector from 'store/ui/selectors';

import cn from 'classnames';
import { Field, Form, FormikProps } from 'formik';

import { Button, Input, Text } from 'components';

import {
  createDynamicLink,
  createValidator, imagesFormats, maxAvatarSize, routes,
} from 'appConstants';
import { useBreakpoints, useShallowSelector } from 'hooks';
import { EInputStatus, RequestStatus, TInputCaption } from 'types';

import UploadAvatar from 'components/AvatarUploader/AvatarUploader';
import profileActionTypes from 'store/profile/actionsTypes';
import Clipboard from 'components/Clipboard/Clipboard';
import userSelector from 'store/user/selectors';
import { toast } from 'react-toastify';
import { EditProfileFields, IEditProfile } from '.';

import styles from './styles.module.scss';

const captionGenerator = (touched: boolean, errors: string | undefined) => {
  const inputState: TInputCaption = { status: EInputStatus.COMMON, caption: '' };
  if (touched && errors) {
    inputState.status = EInputStatus.ERROR;
    inputState.caption = errors;
  }
  return inputState;
};

const MainForm: VFC<FormikProps<IEditProfile> & IEditProfile> = ({
  setFieldValue,
  handleSubmit,
  validateForm,
  handleBlur,
  errors,
  touched,
  values,
}) => {
  const userId = useShallowSelector(userSelector.getProp('id'));
  const [isMobile] = useBreakpoints([541]);

  const setter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: EditProfileFields) => (value: any) => setFieldValue(field, value),
    [setFieldValue],
  );

  const onSubmitClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (vals: any) => {
      validateForm(vals).then(() => handleSubmit());
    },
    [handleSubmit, validateForm],
  );

  const {
    [profileActionTypes.EDIT_PROFILE_INFO]: editingProfile,
  } = useShallowSelector(uiSelector.getUI);

  const isSubmitting = useMemo(() => editingProfile === RequestStatus.REQUEST, [editingProfile]);

  return (
    <Form className={styles['edit-profile__wrapper']}>
      <Text
        className={styles['edit-profile__wrapper__title']}
        variant="subtitle-1"
        weight="medium"
        color="dark"
        align="left"
      >
        Edit profile
      </Text>
      <div className={styles['edit-profile__wrapper__avatar']}>
        <Field
          name="avatarFile"
          render={() => (
            <UploadAvatar
              fileURL={values.avatarURL || ''}
              reqMaxSize={maxAvatarSize}
              onBlur={handleBlur('avatarFile')}
              onLoadEnd={(fURL, f) => {
                setFieldValue('avatarFile', f);
                setFieldValue('avatarURL', fURL);
              }}
              onLoadError={() => { toast.error(`File is too large. Max size is ${maxAvatarSize.size} ${maxAvatarSize.unit}`); }}
            />
          )}
        />
        <div className={cn(styles['edit-profile__wrapper__avatar-info'], { [styles['show-extensions']]: !values.avatarURL })}>
          <Text
            className={styles['edit-profile__wrapper__logo-title']}
            size="s"
            weight="normal"
          >
            Acceptable file format: {imagesFormats.join(', ').toUpperCase()} maximum file size:{' '}
            {maxAvatarSize.size} {maxAvatarSize.unit}
          </Text>
          <Text
            className={styles['edit-profile__wrapper__logo-subtitle']}
            size="s"
            weight="normal"
          >
            We recommend an image of at least 400x400.
            <p>Gifs work too 🙌</p>
          </Text>
        </div>
      </div>
      <div className={styles['edit-profile__wrapper__body']}>
        <div className={styles['edit-profile__wrapper__body-block']}>
          <div className={styles['edit-profile__wrapper__body-block__content']}>
            <Field
              name="name"
              required
              render={() => (
                <Input
                  name="name"
                  value={values.name}
                  label="Name"
                  placeholder="Name"
                  onBlur={handleBlur}
                  onChange={(e) => setter('name')(e.currentTarget.value)}
                  className={cn(styles['edit-profile__wrapper__name'], styles['site-block'])}
                  caption={captionGenerator(touched.name, errors.name)}
                />
              )}
            />
            <Field
              name="address"
              required
              render={() => (
                <Clipboard
                  name="address"
                  value={values.address}
                  label="Wallet address"
                  placeholder="address"
                  onBlur={handleBlur}
                  className={cn(styles['edit-profile__wrapper__name'], styles['site-block'])}
                />
              )}
            />
            {!isMobile && (
            <>
              <Field
                name="description"
                render={() => (
                  <Input
                    name="description"
                    value={values.description}
                    label="Bio"
                    placeholder="Input description"
                    onChange={(e) => setter('description')(e.currentTarget.value)}
                    component="textarea"
                    onBlur={handleBlur}
                    className={cn(styles['edit-profile__wrapper__description'], styles['site-block'])}
                    caption={captionGenerator(touched.description, errors.description)}
                  />
                )}
              />
              <Text className={styles.counter} size="xs" weight="normal">
                {values.description.length} / {createValidator.description.max}
              </Text>
            </>
            )}
          </div>
        </div>
        <div className={styles['edit-profile__wrapper__body-block']}>
          <div className={cn(styles['edit-profile__wrapper__body-block__content'], styles['without-right-space'])}>
            <Field
              name="email"
              required
              render={() => (
                <Input
                  name="socials.email"
                  value={values.socials.email}
                  label="Contact email"
                  placeholder="Input email"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue('socials.email', e.currentTarget.value)}
                  className={cn(styles['edit-profile__wrapper__name'], styles['site-block'])}
                  caption={captionGenerator(touched?.socials?.email, errors.socials?.email)}
                />
              )}
            />
            <Field
              name="site"
              required
              render={() => (
                <Input
                  name="socials.site"
                  value={values.socials.site}
                  label="Website"
                  placeholder="Input website"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue('socials.site', e.currentTarget.value)}
                  className={cn(styles['edit-profile__wrapper__name'], styles['site-block'])}
                  caption={captionGenerator(touched?.socials?.site, errors.socials?.site)}
                />
              )}
            />
            <Field
              name="instagram"
              required
              render={() => (
                <Input
                  name="socials.instagram"
                  value={values.socials.instagram}
                  label="Instagram Username"
                  placeholder="@username"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue('socials.instagram', e.currentTarget.value)}
                  className={cn(styles['edit-profile__wrapper__name'], styles['site-block'])}
                  caption={captionGenerator(touched?.socials?.instagram, errors.socials?.instagram)}
                />
              )}
            />
            <Field
              name="twitter"
              required
              render={() => (
                <Input
                  name="socials.twitter"
                  value={values.socials.twitter}
                  label="Twitter Username"
                  placeholder="@username"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue('socials.twitter', e.currentTarget.value)}
                  className={cn(styles['edit-profile__wrapper__name'], styles['site-block'])}
                  caption={captionGenerator(touched?.socials?.twitter, errors.socials?.twitter)}
                />
              )}
            />
            {isMobile && (
            <>
              <Field
                name="description"
                render={() => (
                  <Input
                    name="description"
                    value={values.description}
                    label="Bio"
                    placeholder="Input description"
                    onChange={(e) => setter('description')(e.currentTarget.value)}
                    component="textarea"
                    onBlur={handleBlur}
                    className={cn(styles['edit-profile__wrapper__description'], styles['site-block'])}
                    caption={captionGenerator(touched.description, errors.description)}
                  />
                )}
              />
              <Text className={styles.counter} size="xs" weight="normal">
                {values.description.length} / {createValidator.description.max}
              </Text>
            </>
            )}
          </div>
        </div>
      </div>
      <div className={styles['btns-section']}>
        <div className={styles.button}>
          <Button
            disabled={!!Object.keys(errors).length || !Object.keys(touched).length || isSubmitting}
            className={styles['submit-btn']}
            onClick={() => onSubmitClick(values)}
          >
            Save
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            variant="outlined"
            disabled={isSubmitting}
            className={styles['submit-btn']}
            to={createDynamicLink(routes.nest.profile.nest.aboutMe.path, { userId })}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default MainForm;
