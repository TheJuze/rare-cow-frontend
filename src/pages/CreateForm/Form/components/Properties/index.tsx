import React, {
  useCallback, useEffect, useRef, useState, FocusEvent, VFC,
} from 'react';

import cn from 'classnames';

import { Button, Input, Text } from 'components';

import { EInputStatus, TInputCaption, TSingleProp } from 'types';

import { TrashIcon } from 'assets/icons/icons';
import styles from './styles.module.scss';

type PropError = {
  id: number | null;
  name: string;
  type: string;
};

type EditableProp = TSingleProp & {
  onDeleteClick: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField: (name: keyof TSingleProp, value: any, id: number) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: PropError;
};

interface IProperties {
  initProps: TSingleProp[];
  setProps: (props: TSingleProp[]) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initErrors?: any[] | any;
  isClearing?: boolean;
}

const captionGenerator = (error: string | undefined) => {
  const caption: TInputCaption = { status: EInputStatus.COMMON, caption: '' };
  if (error) {
    caption.status = EInputStatus.ERROR;
    caption.caption = error;
  }
  return caption;
};

const SingleProp: VFC<EditableProp> = ({
  id,
  name,
  type,
  onDeleteClick,
  setField,
  onBlur,
  error,
}) => (
  <div className={styles['single-prop__body']}>
    <div className={styles['single-prop__body-inputs']}>
      <Input
        name={`property${name}${id}`}
        value={name}
        label="Name"
        placeholder="Name"
        className={styles['single-prop__body-inputs__input']}
        onChange={(e) => setField('name', e.currentTarget.value, id)}
        onBlur={onBlur}
        caption={captionGenerator(error?.name)}
      />
      <Input
        name={`property${type}${id}`}
        value={type}
        onBlur={onBlur}
        label="Type"
        placeholder="Type Name"
        className={styles['single-prop__body-inputs__input']}
        onChange={(e) => setField('type', e.currentTarget.value, id)}
        caption={captionGenerator(error?.type)}
      />
    </div>
    <Button
      size="sm"
      className={styles['single-prop__body__remove']}
      variant="text"
      icon={<TrashIcon />}
      onClick={() => onDeleteClick(id)}
    />
  </div>
);

const Properties: VFC<IProperties> = ({
  initProps,
  setProps,
  onBlur,
  className,
  initErrors,
  isClearing,
}) => {
  const [properties, setProperties] = useState<TSingleProp[]>(initProps);
  const [errors, setErrors] = useState<PropError[]>([]);
  const idx = useRef(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const onDelete = useCallback(
    (id: number) => {
      const newProperties = properties.filter((p) => p.id !== id);
      setProps(newProperties);
      setProperties(newProperties);
    },
    [properties, setProps],
  );

  useEffect(() => {
    if (isClearing) {
      idx.current = 0;
      setProperties([{ id: 0, name: '', type: '' }]);
    }
  }, [isClearing]);

  const setProp = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fieldName: keyof TSingleProp, fieldValue: any, id: number) => {
      const addableProp = properties.find((p) => p.id === id);
      const addablePropId = properties.findIndex((p) => p.id === id);
      if (addableProp && addableProp[fieldName] !== undefined) {
        const value = addableProp[fieldName];
        if (value !== fieldValue) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (addableProp[fieldName] as any) = fieldValue;
          const newProperties = [
            ...properties.slice(0, addablePropId),
            addableProp,
            ...properties.slice(addablePropId + 1),
          ];
          setProps(newProperties);
          setProperties(newProperties);
        }
      }
    },
    [properties, setProps],
  );

  const checkPropsValid = useCallback((props: TSingleProp[]) => {
    const res: PropError[] = [];
    props.forEach((p) => p.type.trim().toLowerCase());
    props.forEach((p) => {
      const err: PropError = { id: null, type: '', name: '' };
      if (!p.name.length) {
        err.id = p.id;
        err.name = 'Field is required';
      }
      if (!p.type.length) {
        err.id = p.id;
        err.type = 'Field is required';
      }
      const sameProp = props.find(
        (np) => np.name === p.name &&
          np.type.toLowerCase().trim() === p.type.toLowerCase().trim() &&
          np.id !== p.id,
      );

      if (sameProp) {
        err.id = sameProp.id;
        err.type = 'Type should be unique';
      }
      if (err.id !== null) {
        res.push(err);
      }
    });
    return res;
  }, []);

  useEffect(() => {
    if (initErrors) setErrors(checkPropsValid(properties));
  }, [properties, initErrors, checkPropsValid]);

  const getErrorById = useCallback((id: number) => errors.find((e) => e.id === id), [errors]);

  const addProp = useCallback(() => {
    const validation = checkPropsValid(properties);
    if (!validation.length) {
      const newProp: TSingleProp = {
        id: idx.current + 1,
        name: '',
        type: '',
      };
      idx.current += 1;
      setProperties([...properties, newProp]);
      setErrors([]);
    } else {
      setErrors(validation);
    }
  }, [checkPropsValid, properties]);

  useEffect(() => {
    parentRef.current.scrollTo({
      top:
        bottomRef.current.getBoundingClientRect().top -
        parentRef.current.getBoundingClientRect().top,
      behavior: 'smooth',
    });
  }, [properties]);

  return (
    <section className={cn(styles['properties-wrapper'], className)}>
      <Text
        tag="h4"
        color="base900"
        weight="medium"
        className={styles['properties-wrapper__title']}
      >
        Properties
      </Text>
      <div ref={parentRef} className={styles['properties-wrapper__body']}>
        {properties.map((p) => (
          <SingleProp
            key={p.id}
            error={getErrorById(p.id)}
            {...p}
            onDeleteClick={() => onDelete(p.id)}
            setField={setProp}
            onBlur={onBlur}
          />
        ))}
        <div key="bottomRef" ref={bottomRef} style={{ height: 0, opacity: 0 }} />
      </div>
      <div className={styles['properties-wrapper__add']}>
        <Button size="sm" onClick={addProp}>
          {`Add ${properties.length ? 'more' : ''} +`}
        </Button>
      </div>
    </section>
  );
};

export default Properties;
