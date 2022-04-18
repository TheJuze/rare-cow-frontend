/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { Text } from 'components';
import { ChevronDown } from 'assets/icons/icons';

import styles from './styles.module.scss';

type OptionType = {
  id: number;
  name: string;
};

interface IProps {
  options: OptionType[];
  value: OptionType;
  setValue: (value: OptionType) => void;
  className?: string;
}

const TitleDropdown: FC<IProps> = ({
  options, value, setValue, className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOptionClick = (option: OptionType) => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <div className={cn(styles.titleDropdown, className)}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={styles.selected}
        >
          <Text variant="heading-2" color="accent" className={styles.blueValue}>
            {value.name}
          </Text>
          <div className={styles.dropdownContainer}>
            <ChevronDown className={cn(styles.selectedImg, { [styles.selectedImgOpen]: isOpen })} />
            <div className={cn(styles.selectionWrapper, { [styles.activeDropdown]: isOpen })}>
              <div className={`${styles.triangle}`} />
              <ul className={cn(styles.body, { [styles.activeDropdown]: isOpen })}>
                {options.map((option) => (
                  <li key={JSON.stringify(option)}>
                    <div
                      // key={option.value}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        handleOptionClick(option);
                      }}
                      className={styles.option}
                    >
                      <Text size="l">{option.name}</Text>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default TitleDropdown;
